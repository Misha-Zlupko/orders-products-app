# Схема базы данных

Описание таблиц и связей. Основной DDL — в [`../data/schema.sql`](../data/schema.sql).  
Для MySQL Workbench подготовлен отдельный файл: [`../data/schema-mysql.sql`](../data/schema-mysql.sql).

## Таблицы

| Таблица          | Назначение                                                         |
| ---------------- | ------------------------------------------------------------------ |
| `users`          | Пользователи (auth): id, email, name, password_hash                |
| `orders`         | Заказы: title, date, user_id, total, currency                      |
| `order_items`    | Позиции заказа (снимок: name, type, price, quantity)               |
| `products`       | Каталог продуктов: serial_number, title, type, guarantee, order_id |
| `product_prices` | Цены в разных валютах (USD, UAH) для каждого продукта              |

## Связи

- `orders.user_id` → `users.id`
- `order_items.order_id` → `orders.id`
- `order_items.product_id` → `products.id` (опционально)
- `products.order_id` → `orders.id` (заказ, к которому привязан продукт)
- `product_prices.product_id` → `products.id`

## Как использовать

1. **SQLite** (файл БД):

   ```bash
   sqlite3 orders_products.db < data/schema.sql
   ```

2. **PostgreSQL**: замените в `schema.sql` при необходимости:

   - `INTEGER PRIMARY KEY AUTOINCREMENT` → `SERIAL PRIMARY KEY`
   - `TEXT` → `VARCHAR(n)` или оставьте `TEXT`
   - `datetime('now')` → `CURRENT_TIMESTAMP`

3. **MySQL / MySQL Workbench**:

   - Откройте файл `data/schema-mysql.sql` в MySQL Workbench:
     - `File → Open SQL Script…` → выбрать `schema-mysql.sql`;
     - нажать кнопку выполнения (молния), чтобы создать БД `orders_products` и все таблицы.
   - Этот файл предназначен именно для проверки схемы в MySQL Workbench по требованиям ТЗ.

4. **Орм (Prisma/Drizzle)**: опишите модели по этой схеме и генерируйте миграции из них.
