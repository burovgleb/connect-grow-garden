# Настройка формы заявки, Google Sheet и Telegram

Этот лендинг остаётся полностью статическим. Данные с формы отправляются в Google Apps Script web app, а он уже:

- добавляет строку в Google Sheet
- отправляет уведомление в Telegram

Без промежуточного Google Form.

## 1. Создайте Google Sheet

Создайте таблицу для заявок, например лист `Заявки`.

Рекомендуемые колонки:

- `Timestamp`
- `Имя`
- `Телефон или Telegram`
- `Комментарий`
- `Согласие`
- `Страница`
- `UTM Source`
- `UTM Medium`
- `UTM Campaign`

## 2. Добавьте Apps Script к таблице

Откройте таблицу:

1. `Extensions` → `Apps Script`
2. Создайте проект, привязанный к таблице
3. Вставьте код из `docs/on-lead-form-submit.gs`

Этот скрипт будет принимать POST-запрос с сайта, записывать данные в таблицу и отправлять уведомление в Telegram.

Если скрипт создан прямо из этой таблицы, связь уже есть автоматически. Но мы дополнительно фиксируем её через `SPREADSHEET_ID`, чтобы deployment точно писал в нужную таблицу даже если скрипт позже станет standalone.

## 3. Настройте Script Properties

Откройте `Project Settings` → `Script Properties` и добавьте:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `LEADS_SHEET_NAME`
- `LOGS_SHEET_NAME`
- `SPREADSHEET_ID`

Где:

- `TELEGRAM_BOT_TOKEN` — токен бота из `@BotFather`
- `TELEGRAM_CHAT_ID` — id Telegram-группы
- `LEADS_SHEET_NAME` — имя листа, например `Заявки`
- `LOGS_SHEET_NAME` — имя листа с логами, например `Logs`
- `SPREADSHEET_ID` — id Google Sheet из адресной строки

Пример URL таблицы:

```text
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit#gid=0
```

Нужно взять часть между `/d/` и `/edit`.

## 4. Настройте Telegram-бота

1. Создайте бота через `@BotFather`
2. Добавьте его в рабочую группу
3. Дайте право писать сообщения

## 5. Получите `chat_id` группы

1. Напишите тестовое сообщение в Telegram-группу
2. Откройте:

```text
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
```

3. Найдите объект чата и возьмите `chat.id`

Для группы это обычно отрицательное число.

## 6. Опубликуйте Apps Script как web app

В Apps Script:

1. Нажмите `Deploy` → `New deployment`
2. Выберите тип `Web app`
3. Укажите:
   - `Execute as`: `Me`
   - `Who has access`: `Anyone`
4. Опубликуйте deployment
5. Скопируйте URL вида:

```text
https://script.google.com/macros/s/.../exec
```

Это и есть endpoint, на который будет отправлять форма на сайте.

## 7. Заполните публичный конфиг лендинга

Создайте локальный `.env` по примеру `.env.example`:

```bash
VITE_LEAD_SCRIPT_URL="https://script.google.com/macros/s/.../exec"
VITE_LEAD_CONSENT_VALUE="Да, согласен(а)"
VITE_POLICY_URL="https://recoveryvsadu.ru/#policy"
```

После этого перезапустите `npm run dev`.

## 8. Какой payload шлёт лендинг

Сайт отправляет POST-форму с такими полями:

- `name`
- `contact`
- `comment`
- `consent`
- `page_url`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `company` — honeypot для антиспама

## 9. Проверьте end-to-end

1. Запустите лендинг локально
2. Отправьте тестовую заявку
3. Убедитесь, что:
   - в таблице появилась новая строка
   - в Telegram-группу пришло сообщение

## 10. Логи Telegram и ошибок

Скрипт автоматически пишет служебные записи в отдельный лист `Logs`.

Рекомендуемые колонки создаются автоматически:

- `Timestamp`
- `Status`
- `Stage`
- `Name`
- `Contact`
- `Telegram Status`
- `Details`

Что туда попадает:

- успешная отправка уведомления в Telegram
- ошибка Telegram API
- ошибка конфигурации
- ошибка валидации
- honeypot-запросы

Если уведомления перестали приходить, сначала проверьте лист `Logs`:

- `Status = ok` и `Stage = telegram` — уведомление ушло
- `Status = error` и `Stage = telegram` — Telegram вернул ошибку
- `Status = error` и `Stage = request` — упал сам запрос или таблица
- `Telegram Status` и `Details` обычно содержат HTTP-код и текст ответа Telegram

Важно: после обновления кода Apps Script нужно заново сделать `Deploy -> Manage deployments -> Edit -> Deploy`, иначе опубликованный web app продолжит работать на старой версии.

## 11. Важная юридическая заметка

Сейчас политика по умолчанию ведёт на:

- `https://recoveryvsadu.ru/#policy`

Но на основном сайте текст политики выглядит унаследованным и местами ссылается на `recoverybook.ru`. Перед публикацией это стоит проверить и, при необходимости, обновить.
