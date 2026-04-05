-- =========================
-- DEMO SHOP (MySQL 8+)
-- =========================

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS demo_shop;
USE demo_shop;

-- 2. Tables

CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orders (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36),
  status ENUM('PENDING','PAID','SHIPPED','CANCELLED') DEFAULT 'PENDING',
  total_price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_items (
  id CHAR(36) PRIMARY KEY,
  order_id CHAR(36),
  product_id CHAR(36),
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB;

-- 3. Sample Data

INSERT INTO users (id, email, password, full_name) VALUES
(UUID(), 'alice@example.com', 'hashed_pw_1', 'Alice Doe'),
(UUID(), 'bob@example.com', 'hashed_pw_2', 'Bob Smith');

INSERT INTO products (id, name, description, price, stock) VALUES
(UUID(), 'iPhone 15', 'Apple smartphone', 999.99, 10),
(UUID(), 'MacBook Pro', 'Apple laptop', 1999.99, 5),
(UUID(), 'AirPods Pro', 'Wireless earbuds', 249.99, 20);

INSERT INTO orders (id, user_id, status, total_price)
SELECT UUID(), u.id, 'PAID', 1249.98
FROM users u
WHERE u.email = 'alice@example.com';

INSERT INTO order_items (id, order_id, product_id, quantity, price)
SELECT UUID(), o.id, p.id, 1, p.price
FROM orders o
JOIN products p ON p.name = 'iPhone 15'
LIMIT 1;

-- 4. Indexes

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_products_name ON products(name);