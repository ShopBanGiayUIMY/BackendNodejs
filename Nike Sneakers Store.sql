CREATE DATABASE nikesneakerstore character set utf8mb4 collate UTF8MB4_GENERAL_CI;

USE nikesneakerstore;

DROP TABLE IF EXISTS `cart_items`;
DROP TABLE IF EXISTS `product_details`;
DROP TABLE IF EXISTS `carts`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `product_image`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `order_details`;
DROP TABLE IF EXISTS `product_ratings`;
DROP TABLE IF EXISTS `product_reviews`;
DROP TABLE IF EXISTS `payment_methods`; 
DROP TABLE IF EXISTS `discount_codes`; 
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(50) UNIQUE,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
);
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `image`varchar(200) DEFAULT NULL
);
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `product_name` varchar(100) NOT NULL,
  `product_description` text,
  `product_price` decimal(10,2) NOT NULL,
  `category_id` int NOT NULL,
  `thumbnail` varchar(1500) DEFAULT NULL,
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
);
CREATE TABLE `product_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` varchar(1000) DEFAULT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
);
CREATE TABLE `product_details` (
  `detail_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `product_id` int NOT NULL,
  `color` varchar(50) NOT NULL,
  `size` varchar(10) NOT NULL,
  `stock` int NOT NULL,
  FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
);
CREATE TABLE `carts` (
  `cart_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);
CREATE TABLE `cart_items` (
  `item_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `cart_id` int NOT NULL,
  `product_detail_id` int NOT NULL,
  `quantity` int NOT NULL,
  FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`),
  FOREIGN KEY (`product_detail_id`) REFERENCES `product_details` (`detail_id`)
);
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `order_date` date NOT NULL,
  `status` varchar(50) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);
CREATE TABLE `order_details` (
  `order_detail_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `order_id` int NOT NULL,
  `product_detail_id` int NOT NULL,
  `quantity` int NOT NULL,
  KEY `order_details_ibfk_1` (`order_id`),
  KEY `order_details_ibfk_2` (`product_detail_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  FOREIGN KEY (`product_detail_id`) REFERENCES `product_details` (`detail_id`)
);
CREATE TABLE `product_ratings` (
  `rating_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `rating` int NOT NULL,
  `rating_date` date NOT NULL,
   FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
   FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
);
CREATE TABLE `product_reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `review_text` text NOT NULL,
  `review_date` date NOT NULL,
   FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
);
CREATE TABLE `payment_methods` (
  `payment_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `method_type` varchar(50) NOT NULL,
  `card_number` varchar(20) DEFAULT NULL,
  `expiry_date` varchar(7) DEFAULT NULL,
  `security_code` varchar(4) DEFAULT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);
CREATE TABLE `shipping_addresses` (
  `address_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `recipient_name` varchar(100) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);
CREATE TABLE `purchase_history` (
  `purchase_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `order_detail_id` int NOT NULL,
  `purchase_date` date NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  FOREIGN KEY (`order_detail_id`) REFERENCES `order_details` (`order_detail_id`)
);
CREATE TABLE `auth_user` (
  `auth_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `verified` VARCHAR(5) DEFAULT 'false',
  `auth_code` INT DEFAULT NULL,
  `verificationToken` VARCHAR(500) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);
CREATE TABLE vouchers (
  voucher_id INT AUTO_INCREMENT PRIMARY KEY,
  voucher_name VARCHAR(255) NOT NULL,
  voucher_code VARCHAR(255) NOT NULL,
  start_time TIMESTAMP NULL,
  end_time TIMESTAMP NULL,
  voucher_type INT NOT NULL,
  reward_type INT NOT NULL,
  usage_quantity INT NOT NULL,
  discount_amount FLOAT NOT NULL,
  max_price FLOAT NOT NULL,
  item_id_list json NULL
);
-- thêm role vào bảng auth_user
ALTER TABLE auth_user
ADD COLUMN role INT DEFAULT 0;

ALTER TABLE auth_user
ADD COLUMN refreshtoken VARCHAR(1000);
--  đổi tên item_id_list item_product_id_list
ALTER TABLE vouchers
CHANGE COLUMN item_id_list item_product_id_list json NULL;
-- thêm 2 trường vào vouchers đọc chi tiết ở file excel
ALTER TABLE vouchers
ADD COLUMN item_user_id_list JSON NULL,
ADD COLUMN voucher_purpose INT DEFAULT 0;

CREATE TABLE vouchers_user (
  vouchers_user_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT unique NOT NULL ,
  voucher_id JSON,
  voucher_history JSON,
FOREIGN KEY (user_id) REFERENCES users(user_id)
);




SELECT *
FROM vouchers
WHERE voucher_id IN (SELECT JSON_UNQUOTE(JSON_EXTRACT(vu.voucher_id, '$[0]')) AS voucher_id
FROM vouchers_user AS vu
WHERE vu.user_id = 1);


SELECT JSON_VALUE(vu.voucher_id, '$[0]') AS voucher_id
FROM vouchers_user AS vu
WHERE vu.user_id = 1;
