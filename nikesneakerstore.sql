-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 01, 2023 lúc 05:37 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nikesneakerstore`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `auth_users`
--

CREATE TABLE `auth_users` (
  `auth_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `verified` varchar(5) DEFAULT 'false',
  `auth_code` int(11) DEFAULT NULL,
  `verificationToken` varchar(500) NOT NULL,
  `role` int(11) DEFAULT 0,
  `refreshtoken` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `auth_users`
--

INSERT INTO `auth_users` (`auth_id`, `user_id`, `verified`, `auth_code`, `verificationToken`, `role`, `refreshtoken`) VALUES
(1, 57, 'false', 203735, '6434514570577b8468e3b6accfbecd99c1b64042', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTcsImFkbWluIjoic3VjZXNzIiwiaWF0IjoxNjk4ODMyMjQ4LCJleHAiOjE3MzAzNjgyNDh9.p-sjrtiu6S5NZ5TyCZnKEhLER-MEbxcxok85rv_sgu8'),
(2, 61, 'false', NULL, '062e13a72747c30ce05b7326af13ab90028e02c4', 0, NULL),
(3, 62, 'false', NULL, '100b9f016c0205c9f362a2c35078af68863a50a8', 0, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `carts`
--

CREATE TABLE `carts` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `carts`
--

INSERT INTO `carts` (`cart_id`, `user_id`) VALUES
(1, 24),
(2, 25),
(3, 26),
(4, 27),
(5, 28);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart_items`
--

CREATE TABLE `cart_items` (
  `item_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_detail_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cart_items`
--

INSERT INTO `cart_items` (`item_id`, `cart_id`, `product_detail_id`, `quantity`) VALUES
(2, 1, 1, 2),
(3, 2, 3, 1),
(4, 3, 2, 3),
(5, 4, 4, 2),
(6, 5, 5, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `image`) VALUES
(1, 'Sneakers', NULL),
(2, 'Running Shoes', NULL),
(3, 'Football Boots', NULL),
(4, 'Basketball Shoes', NULL),
(5, 'Category 1', NULL),
(6, 'Category 2', NULL),
(7, 'Category 3', NULL),
(8, 'Category 4', NULL),
(9, 'Category 5', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `status` varchar(50) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `order_date`, `status`, `total_amount`) VALUES
(1, 24, '2023-10-07', 'Shipped', 59.98),
(2, 25, '2023-10-07', 'Processing', 89.97),
(3, 26, '2023-10-07', 'Delivered', 119.96),
(4, 27, '2023-10-07', 'Cancelled', 99.98),
(5, 28, '2023-10-07', 'Shipped', 29.99);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_detail_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`order_detail_id`, `order_id`, `product_detail_id`, `quantity`) VALUES
(1, 1, 1, 2),
(2, 2, 3, 3),
(3, 3, 2, 1),
(4, 4, 4, 2),
(5, 5, 5, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payment_methods`
--

CREATE TABLE `payment_methods` (
  `payment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `method_type` varchar(50) NOT NULL,
  `card_number` varchar(20) DEFAULT NULL,
  `expiry_date` varchar(7) DEFAULT NULL,
  `security_code` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `payment_methods`
--

INSERT INTO `payment_methods` (`payment_id`, `user_id`, `method_type`, `card_number`, `expiry_date`, `security_code`) VALUES
(1, 24, 'Credit Card', '1234-5678-9101-1121', '10/25', '123'),
(2, 25, 'PayPal', 'paypal@example.com', NULL, NULL),
(3, 26, 'Credit Card', '2222-3333-4444-5555', '09/24', '456'),
(4, 27, 'Credit Card', '5678-9101-1213-1415', '08/23', '789'),
(5, 28, 'Debit Card', '9876-5432-1011-1121', '07/22', '321');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_description` text DEFAULT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `category_id` int(11) NOT NULL,
  `thumbnail` varchar(1500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_description`, `product_price`, `category_id`, `thumbnail`) VALUES
(1, 'Nike Structure 25', 'With stability where you need it and cushion where you want it, the Structure 25 supports you for long miles, short training runs and even a down-and-back before the day ends. It\'s the stability you seek, loyal from the first tie-up, tried and tested, with a midfoot system that\'s fully supportive and with more comfortable cushioning than before.', 3829000.00, 1, 'https://user-images.githubusercontent.com/24969335/271076401-bbccaf65-0e37-4994-9aa4-8796493f6646.png'),
(2, 'Nike Air Force 1 \'07', 'The radiance lives on in the Nike Air Force 1 \'07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.', 2929000.00, 2, 'https://user-images.githubusercontent.com/24969335/271081500-14d3a34f-0045-455d-8fe4-3f5e8ac8c69e.png'),
(3, 'Nike Air Max SYSTM', 'Max style, Max feel. The Air Max SYSTM brings back everything you love about your favourite \'80s models, including throwback varsity colours. Tried-and-tested Nike Air cushioning is paired with a sleek, sport-inspired upper. It\'s Air Max delivering again.', 2779000.00, 3, 'https://user-images.githubusercontent.com/24969335/271084712-8bdb9b9a-2711-4514-b6ec-fefd55d010cf.png'),
(4, 'NikeCourt Legacy', 'Honouring a history rooted in tennis culture, the Nike Court Legacy brings you a time-tested staple. Its pebbled upper, heritage stitching and retro Swoosh design let you blend sport and fashion. And, you get to do good by looking good.', 2069000.00, 4, 'https://user-images.githubusercontent.com/24969335/271085937-9e7585a7-d929-4bdb-9671-51551d807c8a.png'),
(5, 'Product 1', 'Description for Product 1', 19.99, 1, 'thumbnail1.jpg'),
(6, 'Product 2', 'Description for Product 2', 29.99, 2, 'thumbnail2.jpg'),
(7, 'Product 3', 'Description for Product 3', 39.99, 3, 'thumbnail3.jpg'),
(8, 'Product 4', 'Description for Product 4', 49.99, 4, 'thumbnail4.jpg'),
(9, 'Product 5', 'Description for Product 5', 59.99, 5, 'thumbnail5.jpg'),
(10, 'Product 1', 'Description for Product 1', 19.99, 1, 'thumbnail1.jpg'),
(11, 'Product 2', 'Description for Product 2', 29.99, 2, 'thumbnail2.jpg'),
(12, 'Product 3', 'Description for Product 3', 39.99, 3, 'thumbnail3.jpg'),
(13, 'Product 4', 'Description for Product 4', 49.99, 4, 'thumbnail4.jpg'),
(14, 'Product 5', 'Description for Product 5', 59.99, 5, 'thumbnail5.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_details`
--

CREATE TABLE `product_details` (
  `detail_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `color` varchar(50) NOT NULL,
  `size` varchar(10) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_details`
--

INSERT INTO `product_details` (`detail_id`, `product_id`, `color`, `size`, `stock`) VALUES
(1, 2, 'red', '12', 100),
(2, 1, 'Red', 'M', 100),
(3, 2, 'Blue', 'L', 150),
(4, 3, 'Green', 'S', 200),
(5, 4, 'Yellow', 'XL', 120),
(6, 5, 'Black', 'XXL', 180),
(7, 1, 'Red', 'M', 100),
(8, 2, 'Blue', 'L', 150),
(9, 3, 'Green', 'S', 200),
(10, 4, 'Yellow', 'XL', 120),
(11, 5, 'Black', 'XXL', 180),
(12, 1, 'Red', 'M', 100),
(13, 2, 'Blue', 'L', 150),
(14, 3, 'Green', 'S', 200),
(15, 4, 'Yellow', 'XL', 120),
(16, 5, 'Black', 'XXL', 180);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_image`
--

CREATE TABLE `product_image` (
  `id` int(11) NOT NULL,
  `image_url` varchar(1000) DEFAULT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_image`
--

INSERT INTO `product_image` (`id`, `image_url`, `product_id`) VALUES
(1, 'huy', 3),
(2, 'product1_image1.jpg', 1),
(3, 'product1_image2.jpg', 1),
(4, 'product2_image1.jpg', 2),
(5, 'product3_image1.jpg', 3),
(6, 'product4_image1.jpg', 4),
(7, 'product1_image1.jpg', 1),
(8, 'product1_image2.jpg', 1),
(9, 'product2_image1.jpg', 2),
(10, 'product3_image1.jpg', 3),
(11, 'product4_image1.jpg', 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_ratings`
--

CREATE TABLE `product_ratings` (
  `rating_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `rating_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_ratings`
--

INSERT INTO `product_ratings` (`rating_id`, `user_id`, `product_id`, `rating`, `rating_date`) VALUES
(1, 24, 1, 4, '2023-10-07'),
(2, 25, 2, 5, '2023-10-07'),
(3, 26, 3, 3, '2023-10-07'),
(4, 27, 4, 4, '2023-10-07'),
(5, 28, 5, 5, '2023-10-07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_reviews`
--

CREATE TABLE `product_reviews` (
  `review_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `review_text` text NOT NULL,
  `review_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product_reviews`
--

INSERT INTO `product_reviews` (`review_id`, `user_id`, `product_id`, `review_text`, `review_date`) VALUES
(1, 24, 1, 'Great product!', '2023-10-07'),
(2, 25, 2, 'Excellent quality!', '2023-10-07'),
(3, 26, 3, 'Good product for the price.', '2023-10-07'),
(4, 27, 4, 'Satisfied with the purchase.', '2023-10-07'),
(5, 28, 5, 'Highly recommended!', '2023-10-07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `purchase_history`
--

CREATE TABLE `purchase_history` (
  `purchase_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_detail_id` int(11) NOT NULL,
  `purchase_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `purchase_history`
--

INSERT INTO `purchase_history` (`purchase_id`, `user_id`, `order_detail_id`, `purchase_date`) VALUES
(1, 24, 1, '2023-10-07'),
(2, 25, 2, '2023-10-07'),
(3, 26, 3, '2023-10-07'),
(4, 27, 4, '2023-10-07'),
(5, 28, 5, '2023-10-07');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `shipping_addresses`
--

CREATE TABLE `shipping_addresses` (
  `address_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `recipient_name` varchar(100) NOT NULL,
  `street_address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `shipping_addresses`
--

INSERT INTO `shipping_addresses` (`address_id`, `user_id`, `recipient_name`, `street_address`, `city`, `state`, `postal_code`) VALUES
(1, 24, 'John Doe', '456 Maple St', 'City1', 'State1', '54321'),
(2, 25, 'Jane Smith', '789 Oak St', 'City2', 'State2', '65432'),
(3, 26, 'Alice Johnson', '101 Pine St', 'City3', 'State3', '76543'),
(4, 27, 'Bob Brown', '202 Cedar St', 'City4', 'State4', '87654'),
(5, 28, 'Eva Wilson', '303 Elm St', 'City5', 'State5', '98765');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`, `full_name`, `phone`, `address`) VALUES
(24, 'user1', 'password1', 'user1@example.com', 'User One', '123456789', '123 Main St, City1, State1, 12345'),
(25, 'user2', 'password2', 'user2@example.com', 'User Two', '987654321', '456 Elm St, City2, State2, 67890'),
(26, 'user3', 'password3', 'user3@example.com', 'User Three', '111222333', '789 Oak St, City3, State3, 13579'),
(27, 'user4', 'password4', 'user4@example.com', 'User Four', '444555666', '101 Pine St, City4, State4, 24680'),
(28, 'user5', 'password5', 'user5@example.com', 'User Five', '777888999', '202 Cedar St, City5, State5, 11223'),
(57, 'huy123', '$2a$10$eqERfFnUJTd31IwRW/lHmObGCpZ.bLMJnZPVU4xTDOlwwYn83bhie', 'huy339093@gmail.com', NULL, NULL, NULL),
(60, 'huyop123', '$2b$10$4eaqTwwAYtLZb/1ihZ8R1egrPaICTXNECdGg1wFfTxwLYqQtyU3Fe', 'huy339093@gmail.com', NULL, NULL, NULL),
(61, 'thonglon123', '$2b$10$YsXYIkYmGbQkpI6Sv9qXVOH.ZEJUCgCvbgy1N5idpmzdKB2gUW2wW', 'truongthong812003@gmail.com', NULL, NULL, NULL),
(62, 'anh123', '$2b$10$nnXkJF6JeVUIXAoPn/XAEOddDaH2lF9RF8dsuQ2YqBYX5AGenT.0i', 'huy339093@gmail.com', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vouchers`
--

CREATE TABLE `vouchers` (
  `voucher_id` int(11) NOT NULL,
  `voucher_name` varchar(255) NOT NULL,
  `voucher_code` varchar(255) NOT NULL,
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `voucher_type` int(11) NOT NULL,
  `reward_type` int(11) NOT NULL,
  `usage_quantity` int(11) NOT NULL,
  `discount_amount` float NOT NULL,
  `max_price` float NOT NULL,
  `item_id_list` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`item_id_list`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `vouchers`
--

INSERT INTO `vouchers` (`voucher_id`, `voucher_name`, `voucher_code`, `start_time`, `end_time`, `voucher_type`, `reward_type`, `usage_quantity`, `discount_amount`, `max_price`, `item_id_list`) VALUES
(1, 'Voucher 1', 'CODE123', '2023-10-31 17:00:00', '2023-11-30 16:59:59', 1, 1, 100, 10.5, 500, '[1, 2, 3]'),
(2, 'Voucher 2', 'CODE456', '2023-11-04 17:00:00', '2023-11-25 16:59:59', 2, 1, 50, 5, 200, '[4, 5, 6]'),
(3, 'Voucher 3', 'CODE789', '2023-11-09 17:00:00', '2023-11-20 16:59:59', 1, 2, 200, 15, 800, '[7, 8, 9]');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `auth_users`
--
ALTER TABLE `auth_users`
  ADD PRIMARY KEY (`auth_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_detail_id` (`product_detail_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`order_detail_id`) USING BTREE,
  ADD KEY `order_details_ibfk_1` (`order_id`),
  ADD KEY `order_details_ibfk_2` (`product_detail_id`);

--
-- Chỉ mục cho bảng `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Chỉ mục cho bảng `product_details`
--
ALTER TABLE `product_details`
  ADD PRIMARY KEY (`detail_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `product_ratings`
--
ALTER TABLE `product_ratings`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `purchase_history`
--
ALTER TABLE `purchase_history`
  ADD PRIMARY KEY (`purchase_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `order_detail_id` (`order_detail_id`);

--
-- Chỉ mục cho bảng `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Chỉ mục cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`voucher_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `auth_users`
--
ALTER TABLE `auth_users`
  MODIFY `auth_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=206;

--
-- AUTO_INCREMENT cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `product_details`
--
ALTER TABLE `product_details`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `product_ratings`
--
ALTER TABLE `product_ratings`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `purchase_history`
--
ALTER TABLE `purchase_history`
  MODIFY `purchase_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `voucher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `auth_users`
--
ALTER TABLE `auth_users`
  ADD CONSTRAINT `auth_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_detail_id`) REFERENCES `product_details` (`detail_id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_detail_id`) REFERENCES `product_details` (`detail_id`);

--
-- Các ràng buộc cho bảng `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD CONSTRAINT `payment_methods_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Các ràng buộc cho bảng `product_details`
--
ALTER TABLE `product_details`
  ADD CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Các ràng buộc cho bảng `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Các ràng buộc cho bảng `product_ratings`
--
ALTER TABLE `product_ratings`
  ADD CONSTRAINT `product_ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `product_ratings_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Các ràng buộc cho bảng `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Các ràng buộc cho bảng `purchase_history`
--
ALTER TABLE `purchase_history`
  ADD CONSTRAINT `purchase_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `purchase_history_ibfk_2` FOREIGN KEY (`order_detail_id`) REFERENCES `order_details` (`order_detail_id`);

--
-- Các ràng buộc cho bảng `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  ADD CONSTRAINT `shipping_addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
