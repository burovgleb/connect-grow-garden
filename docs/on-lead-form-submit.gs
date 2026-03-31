function doPost(e) {
  const scriptProperties = PropertiesService.getScriptProperties();
  const telegramBotToken = scriptProperties.getProperty("TELEGRAM_BOT_TOKEN");
  const telegramChatId = scriptProperties.getProperty("TELEGRAM_CHAT_ID");
  const leadsSheetName = scriptProperties.getProperty("LEADS_SHEET_NAME") || "Заявки";
  const spreadsheetId = scriptProperties.getProperty("SPREADSHEET_ID");

  if (!telegramBotToken || !telegramChatId) {
    throw new Error("Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Script Properties.");
  }

  const params = e && e.parameter ? e.parameter : {};

  if ((params.company || "").trim()) {
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
    return jsonResponse_({
      ok: false,
      error: "Missing required fields.",
    });
  }

  const timestamp = formatDate_(new Date());
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const spreadsheet = spreadsheetId
      ? SpreadsheetApp.openById(spreadsheetId)
      : SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(leadsSheetName);

    if (!sheet) {
      throw new Error('Sheet "' + leadsSheetName + '" not found.');
    }

    sheet.appendRow([
      timestamp,
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
      "Время: " + timestamp,
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

    if (statusCode < 200 || statusCode >= 300) {
      throw new Error("Telegram notification failed with status " + statusCode + ": " + response.getContentText());
    }

    return jsonResponse_({ ok: true });
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

function formatDate_(value) {
  return Utilities.formatDate(new Date(value), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
}
