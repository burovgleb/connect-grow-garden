function doPost(e) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const telegramBotToken = scriptProperties.getProperty("TELEGRAM_BOT_TOKEN");
  const telegramChatId = scriptProperties.getProperty("TELEGRAM_CHAT_ID");
  const leadsSheetName = scriptProperties.getProperty("LEADS_SHEET_NAME") || "Заявки";
  const logsSheetName = scriptProperties.getProperty("LOGS_SHEET_NAME") || "Logs";
  const spreadsheetId = scriptProperties.getProperty("SPREADSHEET_ID");
  const requestTimestamp = formatDate_(new Date());

  if (!telegramBotToken || !telegramChatId) {
    appendLogSafely_(spreadsheetId, logsSheetName, {
      timestamp: requestTimestamp,
      status: "error",
      stage: "config",
      details: "Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Script Properties.",
    });
    throw new Error("Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Script Properties.");
  }

  const params = e && e.parameter ? e.parameter : {};

  if ((params.company || "").trim()) {
    appendLogSafely_(spreadsheetId, logsSheetName, {
      timestamp: requestTimestamp,
      status: "ignored",
      stage: "honeypot",
      details: "Honeypot field was filled.",
    });
    return jsonResponse_({ ok: true, ignored: true });
  }

  const name = (params.name || "").trim();
  const contact = (params.contact || "").trim();
  const comment = (params.comment || "").trim();
  const consent = (params.consent || "").trim();
  const pageUrl = (params.page_url || "").trim();
  const utmSource = (params.utm_source || "").trim();
  const utmMedium = (params.utm_medium || "").trim();
  const utmCampaign = (params.utm_campaign || "").trim();

  if (!name || !contact || !consent) {
    appendLogSafely_(spreadsheetId, logsSheetName, {
      timestamp: requestTimestamp,
      status: "invalid",
      stage: "validation",
      name: name,
      contact: contact,
      details: "Missing required fields.",
    });
    return jsonResponse_({
      ok: false,
      error: "Missing required fields.",
    });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  let errorLogged = false;

  try {
    const spreadsheet = openSpreadsheet_(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(leadsSheetName);
    const logsSheet = getOrCreateLogsSheet_(spreadsheet, logsSheetName);

    if (!sheet) {
      throw new Error('Sheet "' + leadsSheetName + '" not found.');
    }

    sheet.appendRow([
      requestTimestamp,
      name,
      contact,
      comment,
      consent,
      pageUrl,
      utmSource,
      utmMedium,
      utmCampaign,
    ]);

    const message = [
      "Новая заявка с лендинга",
      "",
      "Имя: " + name,
      "Контакт: " + contact,
      "Комментарий: " + (comment || "—"),
      "Время: " + requestTimestamp,
    ].join("\n");

    const response = UrlFetchApp.fetch(
      "https://api.telegram.org/bot" + telegramBotToken + "/sendMessage",
      {
        method: "post",
        payload: {
          chat_id: telegramChatId,
          text: message,
        },
        muteHttpExceptions: true,
      },
    );

    const statusCode = response.getResponseCode();
    const responseBody = response.getContentText();

    if (statusCode < 200 || statusCode >= 300) {
      appendLog_(logsSheet, {
        timestamp: requestTimestamp,
        status: "error",
        stage: "telegram",
        name: name,
        contact: contact,
        telegramStatusCode: String(statusCode),
        details: responseBody,
      });
      errorLogged = true;
      throw new Error("Telegram notification failed with status " + statusCode + ": " + responseBody);
    }

    appendLog_(logsSheet, {
      timestamp: requestTimestamp,
      status: "ok",
      stage: "telegram",
      name: name,
      contact: contact,
      telegramStatusCode: String(statusCode),
      details: "Notification sent.",
    });

    return jsonResponse_({ ok: true });
  } catch (error) {
    if (!errorLogged) {
      appendLogSafely_(spreadsheetId, logsSheetName, {
        timestamp: requestTimestamp,
        status: "error",
        stage: "request",
        name: name,
        contact: contact,
        details: String(error),
      });
    }

    throw error;
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return jsonResponse_({
    ok: true,
    message: "Lead capture endpoint is running.",
  });
}

function jsonResponse_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}

function openSpreadsheet_(spreadsheetId) {
  return spreadsheetId
    ? SpreadsheetApp.openById(spreadsheetId)
    : SpreadsheetApp.getActiveSpreadsheet();
}

function getOrCreateLogsSheet_(spreadsheet, logsSheetName) {
  let sheet = spreadsheet.getSheetByName(logsSheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(logsSheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Status",
      "Stage",
      "Name",
      "Contact",
      "Telegram Status",
      "Details",
    ]);
  }

  return sheet;
}

function appendLog_(sheet, payload) {
  sheet.appendRow([
    payload.timestamp || "",
    payload.status || "",
    payload.stage || "",
    payload.name || "",
    payload.contact || "",
    payload.telegramStatusCode || "",
    payload.details || "",
  ]);
}

function appendLogSafely_(spreadsheetId, logsSheetName, payload) {
  try {
    const spreadsheet = openSpreadsheet_(spreadsheetId);
    const logsSheet = getOrCreateLogsSheet_(spreadsheet, logsSheetName);
    appendLog_(logsSheet, payload);
  } catch (loggingError) {
    Logger.log("Failed to write to logs sheet: " + loggingError);
  }
}

function formatDate_(value) {
  return Utilities.formatDate(new Date(value), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
}
