# LUMI beauty — React проект

Сайт студии красоты. Тёмная атмосферная тема, React + Vite, CSS Modules.

## Быстрый старт

```bash
# Установить зависимости
npm install

# Запустить dev-сервер (http://localhost:5173)
npm run dev

# Собрать для продакшена
npm run build
```

## Структура проекта

```
src/
├── components/
│   ├── Background.jsx / .module.css   — атмосферный фон, SVG ресницы, зерно
│   ├── Cursor.jsx / .module.css       — кастомный курсор
│   ├── Header.jsx / .module.css       — хедер + мобильное меню
│   ├── Hero.jsx / .module.css         — главный экран
│   ├── Marquee.jsx / .module.css      — бегущая строка
│   ├── About.jsx / .module.css        — о мастере
│   ├── Services.jsx / .module.css     — услуги (аккордеон)
│   ├── Works.jsx / .module.css        — портфолио (карусель)
│   ├── Reviews.jsx / .module.css      — отзывы (карусель)
│   ├── Pricing.jsx / .module.css      — цены
│   ├── Contact.jsx / .module.css      — форма записи
│   ├── MapSection.jsx / .module.css   — карта
│   ├── Footer.jsx / .module.css       — футер
│   └── Chatbot.jsx / .module.css      — чат-бот
├── data/
│   └── services.js                    — данные об услугах
├── hooks/
│   ├── useReveal.js                   — анимации при скролле
│   └── useCarousel.js                 — логика карусели
├── styles/
│   └── global.css                     — глобальные стили, CSS vars, кнопки
├── App.jsx
└── main.jsx
```

## Как заменить фото-плейсхолдеры

В файлах компонентов ищите блоки с `background: linear-gradient(...)` —
замените на `background: url('your-photo.jpg') center/cover`.

## Стек

- **React 18** + **Vite 5**
- **CSS Modules** — изолированные стили на каждый компонент
- **Нет внешних UI-библиотек** — всё с нуля
