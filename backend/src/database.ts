import Database from 'better-sqlite3';

const db: Database.Database = new Database('store.db');

export default db;

db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  )
`);

// Insert samples in tables

const categoryCount = db.prepare('SELECT COUNT(*) AS count FROM categories').get() as { count: number };

if (categoryCount.count === 0) {
  db.prepare(`INSERT INTO categories (name) VALUES (?)`).run('Electronics');
  db.prepare(`INSERT INTO categories (name) VALUES (?)`).run('Books');

  db.prepare(`INSERT INTO products (name, price, description, category_id) VALUES (?, ?, ?, ?)`)
    .run('Laptop', 999.99, 'A fast laptop', 1);
  db.prepare(`INSERT INTO products (name, price, description, category_id) VALUES (?, ?, ?, ?)`)
    .run('Novel', 14.99, 'A great book', 2);
}