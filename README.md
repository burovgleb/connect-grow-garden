# Волонтёрский день в саду RECOVERY*

Лендинг волонтёрского дня для проекта RECOVERY* x VSADU и сада RECOVERY*.

Проект рассказывает о дне живой практики в авторском саду: работе с почвой и природными процессами, наблюдении, садовой йоге, совместном обеде и знакомстве с подходом восстановительного землепользования.

## Стек

- Vite
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui

## Запуск локально

```bash
npm install
npm run dev
```

По умолчанию dev-сервер доступен на `http://localhost:8080/`.

## Основные команды

```bash
npm run dev
npm run build
npm run test
npm run lint
```

## Форма заявки

В проекте реализована статическая inline-форма, которая:

- отправляет заявку в Google Apps Script web app через скрытый `iframe`
- сохраняет ответы напрямую в Google Sheet
- поддерживает Telegram-уведомления из того же Apps Script

Что нужно подключить перед публикацией:

- заполнить `VITE_LEAD_SCRIPT_URL` и при необходимости `VITE_LEAD_CONSENT_VALUE`
- создать Google Sheet
- развернуть Apps Script как `Web app`
- настроить Telegram bot token и `chat_id`

Подробная инструкция:

- [docs/lead-form-setup.md](/Users/burov_ge/Documents/Codex/Recovery/connect-grow-garden/docs/lead-form-setup.md)
- [docs/on-lead-form-submit.gs](/Users/burov_ge/Documents/Codex/Recovery/connect-grow-garden/docs/on-lead-form-submit.gs)

## SEO и брендовые ассеты

- `index.html` содержит обновлённые `title`, `description`, `keywords`, Open Graph и Twitter meta tags под лендинг волонтёрского дня.
- Добавлены `canonical`, `theme-color`, `application-name`, favicon links и JSON-LD для бренда RECOVERY* x VSADU.
- Используется официальный favicon бренда из основного сайта RECOVERY* x VSADU, сохранённый в `public/favicon-recovery.png`.
- Добавлен `public/site.webmanifest` для корректной иконки и брендовых данных на мобильных устройствах.

## Структура лендинга

- Hero с позиционированием и CTA
- Блок про смысл волонтёрского дня
- Блок пользы и состояния после дня в саду
- Расписание с конкретными задачами
- FAQ
- Финальный CTA на регистрацию

## Важная рамка контента

Тексты лендинга опираются на `AGENTS.md` проекта и не сводят RECOVERY* x VSADU к обычному ландшафтному сервису.

- RECOVERY* x VSADU описывается как практика создания живых садов по принципам восстановительного землепользования.
- сад RECOVERY* подаётся как авторская живая территория, пространство наблюдения, эксперимента и практики.
- Волонтёрский день описывается как опыт взаимодействия с живой системой, а не как декоративное благоустройство.
