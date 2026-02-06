# Архитектура проекта Orders & Products

Краткое описание структуры и соглашений для поддержки и онбординга.

## Структура каталогов

```
orders-products-app/
├── app/                    # Next.js App Router
│   ├── api/                # API routes (backend)
│   │   └── auth/           # POST login, register; GET me
│   ├── auth/               # Страницы: login, register
│   ├── cart/               # Страница корзины
│   ├── orders/              # Страница заказов
│   ├── products/           # Каталог продуктов
│   ├── layout.tsx          # Корневой layout
│   └── page.tsx            # Главная
├── components/             # React-компоненты по фичам
│   ├── cart/
│   ├── home/
│   ├── layout/             # Header, Sidebar, общие UI
│   ├── orders/
│   ├── products/
│   └── providers/          # Обёртки провайдеров (Redux, Auth, Socket)
├── config/
│   └── constants.ts        # Ключи storage, API paths, общие константы
├── contexts/               # React Context (Auth, Socket)
├── data/                   # Источники данных (in-memory)
│   └── databaseProducts.ts # Каталог продуктов
├── lib/                    # Бизнес-логика и утилиты
│   ├── api/                # Клиенты API (auth.ts)
│   └── auth/               # JWT, хранилище пользователей, storage
├── store/                  # Redux
│   ├── slices/             # cartSlice, ordersSlice
│   ├── selectors.ts        # Селекторы для state
│   ├── persistConfig.ts
│   ├── hooks.ts            # useAppDispatch, useAppSelector
│   └── index.ts
├── types/                  # TypeScript-типы
│   ├── auth.ts
│   ├── cart.ts
│   ├── order.ts            # Order, OrderItem (позиция в заказе)
│   ├── product.ts          # Продукт каталога
│   ├── sidebar.ts
│   └── index.ts            # Barrel export
├── utils/                  # Хелперы (cartUtils, dateFormatter)
├── server.js               # Кастомный сервер (Next + Socket.io)
└── docs/
    └── ARCHITECTURE.md     # Этот файл
```

## Слои и ответственность

| Слой            | Назначение                                                                  |
| --------------- | --------------------------------------------------------------------------- |
| **app/**        | Маршруты, страницы, API routes. Минимум логики, в основном композиция.      |
| **components/** | UI-компоненты. Получают данные через props/hooks, не знают об API напрямую. |
| **contexts/**   | Глобальное состояние и сервисы: авторизация (Auth), сокеты (Socket).        |
| **config/**     | Константы приложения (ключи, пути API). Один источник правды.               |
| **lib/**        | API-клиенты, auth (JWT, storage, user store), переиспользуемая логика.      |
| **store/**      | Redux: корзина, заказы. Persist в localStorage.                             |
| **types/**      | Общие типы. Barrel в `types/index.ts`.                                      |
| **data/**       | Статические/стартовые данные (заказы, каталог). In-memory «БД».             |

## Ключевые потоки

### Авторизация

1. **Регистрация/вход**: форма → `useAuth().login/register` → `lib/api/auth.ts` (fetch) → API route → `lib/auth` (JWT, user store).
2. **Сохранение сессии**: JWT и user в localStorage (`lib/auth/storage.ts`), ключи в `config/constants.ts`.
3. **Восстановление**: при загрузке приложения `AuthContext` вызывает `meApi(token)`; при успехе — user в state.

### Заказы

1. **Список**: страница заказов берёт `useAppSelector(selectOrders)` и фильтрует по `user.id` (`order.userId === user.id`).
2. **Создание**: корзина → «Оформить заказ» → `addOrder` с `userId: user.id`. Только для авторизованных.
3. **Хранение**: Redux + redux-persist; все заказы в одном массиве, разграничение по `userId`.

### Продукты и корзина

- Каталог: данные из `data/databaseProducts.ts` (через свой API/слой при необходимости).
- Корзина: Redux `cartSlice`; расчёт итогов в `utils/cartUtils.ts`.

## Соглашения

- **Типы**: общие типы в `types/`. В заказе позиция — `OrderItem` (в `order.ts`), продукт каталога — `Product` (в `product.ts`).
- **Константы**: ключи storage, пути API, настройки JWT — в `config/constants.ts`.
- **API**: вызовы к backend — через функции в `lib/api/*`, не размазаны по компонентам.
- **Селекторы**: доступ к Redux по возможности через `store/selectors.ts`.
- **Именование**: компоненты — PascalCase; файлы компонентов — PascalCase или kebab-case по принятому в проекте стилю.

## Запуск

- **С Socket.io** (счётчик сессий): `npm run dev` или `npm run start` (после `npm run build`) — запускается `server.js`.
- **Только Next.js**: `npm run dev:next` / `npm run start:next` — без сокетов.

Переменные окружения: `JWT_SECRET` (обязательно в production), `PORT` (по умолчанию 3000).

## Тесты (Vitest + React Testing Library)

- **Запуск**: `npm run test` (watch), `npm run test:run` (один прогон), `npm run test:coverage` (покрытие).
- **Структура**: тесты в `__tests__/`, зеркалируют структуру кода (utils, store, lib, config, components).
- **Покрытие**: утилиты (cartUtils, dateFormatter), слайсы Redux (cart, orders), селекторы, API-клиент auth (с моком fetch), JWT (sign/verify), константы, один компонент (EmptyCart) как пример тестов UI.
- **Setup**: `vitest.setup.ts` — jest-dom, `JWT_SECRET` для тестов. Конфиг в `vitest.config.ts`, алиас `@` резолвится в корень проекта.
