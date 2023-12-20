-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: newdb3
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_users`
--

DROP TABLE IF EXISTS `auth_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_users` (
  `auth_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `verified` varchar(5) COLLATE utf8mb4_general_ci DEFAULT 'false',
  `auth_code` int DEFAULT NULL,
  `verificationToken` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `role` int DEFAULT '0',
  `refreshtoken` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` int DEFAULT '1',
  PRIMARY KEY (`auth_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `auth_users_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_users`
--

LOCK TABLES `auth_users` WRITE;
/*!40000 ALTER TABLE `auth_users` DISABLE KEYS */;
INSERT INTO `auth_users` VALUES (9,9,'true',NULL,'đã xác nhận',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiYWRtaW4iOiJzdWNjZXNzIiwiaWF0IjoxNzAyOTAwMjY3LCJleHAiOjE3MzQ0MzYyNjd9.XT6pYsAgReMlQ9thWLWhCWUUENbkH0RLIeqxmPKwAdo',1),(10,10,'true',220621,'đã xác nhận',0,NULL,0),(11,11,'true',NULL,'đã xác nhận',0,NULL,1),(12,12,'true',NULL,'đã xác nhận',0,NULL,1);
/*!40000 ALTER TABLE `auth_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_detail_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_detail_id` (`product_detail_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`),
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_detail_id`) REFERENCES `product_details` (`detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (8,9),(9,10),(10,11),(11,12);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Giày bóng rổ','https://authentic-shoes.com/wp-content/uploads/2023/04/748226_01.jpg_750348a704f6432c8ca93b1d956515bb.jpeg'),(2,'Giầy đá bóng','https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/61d18281-89f5-4a1d-a0a5-3f426a8a5d03/metcon-8-workout-shoes-p9rQzn.png'),(3,'Giày chạy','https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d646b481-eece-4618-83b6-2aef6bb85047/zoom-metcon-turbo-2-workout-shoes-jPvmwl.png'),(4,'Giày gym','https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/9b2ac01d-e0c0-456c-b4c5-079373ce857f/free-metcon-5-workout-shoes-7wNZNf.png'),(5,'Giầy jordon','https://shopgiayreplica.com/wp-content/uploads/2021/05/Jordan-1-Retro-High-University-B.jpg');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites_products`
--

DROP TABLE IF EXISTS `favorites_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `favorites_products_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `favorites_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites_products`
--

LOCK TABLES `favorites_products` WRITE;
/*!40000 ALTER TABLE `favorites_products` DISABLE KEYS */;
INSERT INTO `favorites_products` VALUES (6,10,1,'2023-12-14 11:41:19'),(8,10,29,'2023-12-15 14:54:44');
/*!40000 ALTER TABLE `favorites_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `body` text COLLATE utf8mb4_general_ci,
  `data` longtext COLLATE utf8mb4_general_ci,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,11,'',NULL,NULL,'2023-12-16 07:09:07',0);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `order_detail_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_detail_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`order_detail_id`) USING BTREE,
  KEY `order_details_ibfk_1` (`order_id`),
  KEY `order_details_ibfk_2` (`product_detail_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_detail_id`) REFERENCES `product_details` (`detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (35,38,9,1,2929000.00,NULL),(36,39,6,1,5279000.00,NULL),(37,40,9,1,2929000.00,NULL),(38,41,9,1,2929000.00,NULL),(39,42,9,2,2929000.00,NULL),(40,43,9,1,2929000.00,NULL),(41,44,9,1,2929000.00,NULL),(42,45,9,1,2929000.00,NULL),(43,46,9,2,2929000.00,NULL),(44,47,9,1,2929000.00,NULL),(45,48,9,1,2929000.00,NULL),(46,49,9,1,2929000.00,NULL),(47,49,6,1,5279000.00,NULL),(48,50,7,3,1909000.00,NULL),(49,51,7,3,1909000.00,NULL);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `status_code` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `status_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'PENDING','đã gửi'),(2,'PROCESSING','đang xử lý'),(3,'SHIPPING','đang vận chuyển'),(4,'SHIPPED','đã vận chuyển'),(5,'DELIVERED','đã nhận'),(6,'CANCELED','đã hủy');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `status_id` int NOT NULL DEFAULT '1',
  `shipping_address_id` int NOT NULL,
  `delivered_address` text COLLATE utf8mb4_general_ci,
  `payment_method_id` int NOT NULL,
  `freight_cost` decimal(10,2) NOT NULL DEFAULT '0.00',
  `payment_status` enum('PAID','UNPAID') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'UNPAID',
  `transaction_code` varchar(8) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `orders_ibfk_2_idx` (`status_id`),
  KEY `order_ibfk_3_idx` (`shipping_address_id`),
  KEY `order_ibfk_4_idx` (`payment_method_id`),
  CONSTRAINT `order_ibfk_37` FOREIGN KEY (`shipping_address_id`) REFERENCES `shipping_addresses` (`address_id`),
  CONSTRAINT `order_ibfk_47` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method_types` (`id`),
  CONSTRAINT `orders_ibfk_17` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `orders_ibfk_27` FOREIGN KEY (`status_id`) REFERENCES `order_status` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (38,10,'2023-12-15 07:31:57',2879002.00,2,4,NULL,1,0.00,'UNPAID',NULL),(39,10,'2023-12-15 09:24:03',5289000.00,6,4,NULL,1,10000.00,'UNPAID',NULL),(40,10,'2023-12-15 10:54:07',2939000.00,6,4,NULL,2,10000.00,'UNPAID','15185418'),(41,10,'2023-12-15 11:55:29',2939000.00,5,4,NULL,1,10000.00,'PAID',NULL),(42,10,'2023-12-15 11:58:08',5818002.00,5,4,NULL,1,10000.00,'PAID',NULL),(43,10,'2023-12-15 14:32:47',2939000.00,6,4,NULL,2,10000.00,'UNPAID','15213318'),(44,10,'2023-12-15 14:55:17',2939000.00,5,4,NULL,2,10000.00,'PAID','15215542'),(45,10,'2023-12-15 14:57:39',2939000.00,5,4,NULL,1,10000.00,'PAID',NULL),(46,10,'2023-12-16 05:02:33',5868000.00,5,4,NULL,1,10000.00,'PAID',NULL),(47,10,'2023-12-16 05:06:39',2939000.00,5,4,NULL,1,10000.00,'PAID',NULL),(48,10,'2023-12-16 05:22:39',2939000.00,5,4,NULL,1,10000.00,'PAID',NULL),(49,10,'2023-12-16 17:59:42',8218000.00,6,4,NULL,1,10000.00,'UNPAID',NULL),(50,12,'2023-12-16 19:38:31',5737000.00,6,5,NULL,1,10000.00,'UNPAID',NULL),(51,12,'2023-12-18 10:51:52',5737000.00,4,5,NULL,1,10000.00,'UNPAID',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_method_types`
--

DROP TABLE IF EXISTS `payment_method_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_method_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payment_method_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_method_types`
--

LOCK TABLES `payment_method_types` WRITE;
/*!40000 ALTER TABLE `payment_method_types` DISABLE KEYS */;
INSERT INTO `payment_method_types` VALUES (1,'COD'),(2,'VNPAY');
/*!40000 ALTER TABLE `payment_method_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_details`
--

DROP TABLE IF EXISTS `product_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_details` (
  `detail_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `color` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `size` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `stock` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`detail_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_details_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_details`
--

LOCK TABLES `product_details` WRITE;
/*!40000 ALTER TABLE `product_details` DISABLE KEYS */;
INSERT INTO `product_details` VALUES (6,1,'Trắng','39',99,1,'2023-12-14 10:51:09'),(7,27,'red','40',97,1,'2023-12-14 11:21:46'),(8,28,'red','40',100,1,'2023-12-14 11:22:15'),(9,29,'red','40',95,1,'2023-12-14 11:26:12'),(10,30,'red','40',100,1,'2023-12-14 11:28:23'),(11,31,'red','40',100,1,'2023-12-14 11:28:37'),(12,32,'red','40',100,1,'2023-12-14 11:30:40'),(13,33,'red','40',100,1,'2023-12-14 11:31:59'),(14,34,'red','40',100,1,'2023-12-14 11:33:12'),(15,35,'red','40',100,1,'2023-12-14 11:34:16'),(16,36,'red','40',100,1,'2023-12-14 11:37:51'),(17,37,'red','40',100,1,'2023-12-14 11:39:19'),(18,39,'Xám','40',100,400,'2023-12-17 08:36:03'),(19,39,'Đen','40',100,400,'2023-12-17 08:36:03'),(20,39,'Nâu','40',100,400,'2023-12-17 08:36:03'),(21,39,'Xám','40',100,400,'2023-12-17 08:36:03');
/*!40000 ALTER TABLE `product_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image_url` text COLLATE utf8mb4_general_ci,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,'[\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/efa43a76-b684-484d-8629-3061a14db85f/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/91f8727e-f7b3-4df3-a5ef-729825a7a8e4/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d7cb3d69-d45c-46dd-90a1-a042b67b8bf6/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ed9491b1-a617-414f-902f-d27c596ef6be/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/371731b0-2e72-49d5-bbce-415c0d67afca/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f99a351a-3986-4c46-9e4c-0eba66575847/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3b0b267e-586a-4ff2-9dc9-0505fd9a5913/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/bcd11a99-db00-40e4-a2ba-c482576e259d/gt-jump-2-ep-basketball-shoes-1F15Gp.png\",\"https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/907a2e34-49e3-4f28-93e4-eda8188ecb0e/gt-jump-2-ep-basketball-shoes-1F15Gp.png\"]',1),(7,'[\"https://i.ibb.co/k8y5n7R/e0391e7a-e108-4ecc-bfed-fe53fbf4fe6f.webp\"]',27),(8,'[\"https://i.ibb.co/5LpTKh1/20fe4aad-81c0-4c0f-81ca-76718194dd83.webp\",\"https://i.ibb.co/py5gCcK/92f12e02-d2ec-4f7a-bcf3-941c3b311fea.webp\",\"https://i.ibb.co/s1R8L57/586eaebb-8b45-4315-9d89-645bc5a1db0c.webp\",\"https://i.ibb.co/wpb0DtC/3455c414-a1f2-44e0-ba40-23d156b7875e.webp\",\"https://i.ibb.co/GsnV5dH/b21a1966-f853-4216-9cc3-43ed536ed2a6.webp\",\"https://i.ibb.co/fGbCG4Q/c9602d2a-8aca-43eb-b242-e5e623f40325.webp\",\"https://i.ibb.co/5Fyvm5C/e1cf6fd0-7f65-4737-8b23-515d29c306cb.webp\",\"https://i.ibb.co/fVghjvh/gt-cut-2-ep-basketball-shoes-M7jcxn.jpg\"]',28),(9,'[\"https://i.ibb.co/0yhM7mb/b7d9211c-26e7-431a-ac24-b0540fb3c00f.webp\",\"https://i.ibb.co/frfwjTQ/fc4622c4-2769-4665-aa6e-42c974a7705e.webp\"]',29),(10,'[\"https://i.ibb.co/mN7XW9D/02b23dcb-401d-45d7-a31f-d9a553534126.webp\",\"https://i.ibb.co/s9SbJGw/558b410d-2ce2-4de4-94f5-7f371c5284c3.webp\",\"https://i.ibb.co/v3N6ynF/ebe3adbd-0e86-4c4c-9789-0cba0936cbe5.webp\",\"https://i.ibb.co/tpPGCNb/gt-hustle-2-ep-basketball-shoes-Njc3-Q0-1.jpg\",\"https://i.ibb.co/Xt9S2vG/gt-hustle-2-ep-basketball-shoes-Njc3-Q0-2.jpg\",\"https://i.ibb.co/nn7qzGp/gt-hustle-2-ep-basketball-shoes-Njc3-Q0.jpg\"]',30),(11,'[\"https://i.ibb.co/x3nKXtX/df6a994a-bc85-4637-94bf-3ae4af43a8fe.webp\",\"https://i.ibb.co/Xj33ydw/e01eb9e0-ddc1-48bf-a516-bcbd40c78e39.webp\",\"https://i.ibb.co/64zS7Fr/infinityrn-4-road-running-shoes-m-LRjcz-1.jpg\",\"https://i.ibb.co/VH9Py9G/infinityrn-4-road-running-shoes-m-LRjcz.jpg\"]',31),(12,'[\"https://i.ibb.co/QFWQ1C8/478926ab-d0d9-4d8e-a12c-121c4a163200.webp\",\"https://i.ibb.co/kBG3s7p/invincible-3-road-running-shoes-Wwmmlp-1.jpg\",\"https://i.ibb.co/HhH6rcT/invincible-3-road-running-shoes-Wwmmlp-2.jpg\",\"https://i.ibb.co/sF7ftfC/invincible-3-road-running-shoes-Wwmmlp-3.jpg\",\"https://i.ibb.co/HYKX14g/invincible-3-road-running-shoes-Wwmmlp-4.jpg\",\"https://i.ibb.co/hYJ6nXk/invincible-3-road-running-shoes-Wwmmlp.jpg\"]',32),(13,'[\"https://i.ibb.co/52sqsWp/5d6de434-d587-4181-8499-65a539a004ce.webp\",\"https://i.ibb.co/6Y2qznn/9ea6b77d-8ceb-4d2c-8f53-09432b41fc63.webp\",\"https://i.ibb.co/SKGSKLr/94b95619-651a-42fc-83d0-07182b97b98c.webp\",\"https://i.ibb.co/TB7PRPr/524b79d8-5569-4ad6-8695-522bab6cf442.webp\",\"https://i.ibb.co/DfhcR16/9879c202-fff4-4949-98a5-b287267d9e26.webp\",\"https://i.ibb.co/hZqS6Ts/b820c152-2dd5-4589-a5ac-86bd20087362.webp\",\"https://i.ibb.co/wYcNbzL/bde541ad-9a35-4066-b471-02be89282049.webp\",\"https://i.ibb.co/NF1FHdK/dc874e61-c2ea-47dd-adaf-2911556b4cc7.webp\"]',33),(14,'[\"https://i.ibb.co/BKLWjqL/98fd9b9f-775d-452e-9e91-5135da978368.webp\",\"https://i.ibb.co/j6ZNf7k/8381da7c-769d-43c4-a9bc-e80db72724ed.webp\",\"https://i.ibb.co/c61nCRS/cc8cefcd-cfb4-4e3a-aec8-447617422737-1.webp\",\"https://i.ibb.co/zScd9t3/cc8cefcd-cfb4-4e3a-aec8-447617422737.webp\"]',34),(15,'[\"https://i.ibb.co/1sdNM9L/07d1d2ef-4e45-4474-802c-c5fca3814391.webp\",\"https://i.ibb.co/GVrHd9L/69e87ac5-5ae6-4ba1-b6ac-1d33b631255a.webp\",\"https://i.ibb.co/2yds7Yk/559150c4-fedb-4676-bf2e-17714d69c613.webp\",\"https://i.ibb.co/x8rYpBv/dd8538d2-f47b-403b-bc7d-50d148ffa954.webp\",\"https://i.ibb.co/SxcMD3h/df7fa56c-0731-41df-9d80-4cf7b680e354.webp\",\"https://i.ibb.co/56hxfgF/zoom-metcon-turbo-2-workout-shoes-j-Pvmwl.jpg\"]',35),(16,'[\"https://i.ibb.co/XYpgSVq/2cfa0834-2b63-4b2a-92db-987c2f58428a.webp\",\"https://i.ibb.co/JK1mMLy/176c2fca-f004-4c5a-9e0c-ad8cb7d79678.webp\",\"https://i.ibb.co/GcJ9YDR/716addb1-81b2-4983-8ba7-c4fe312e03de.webp\",\"https://i.ibb.co/R2H0bDR/a3ba7907-29a4-44c1-96c2-cfce805fa04b.webp\",\"https://i.ibb.co/gDKnB5S/e2b4711c-9a38-4832-9021-d3a30d80334f.webp\",\"https://i.ibb.co/m07Hg8D/f67ef8ea-64cb-40db-ae97-800a3e91b94d.webp\"]',36),(17,'[\"https://i.ibb.co/smJkW15/041d6fbb-f3a5-4e18-906d-b83bf4086587.webp\",\"https://i.ibb.co/pXpCw72/35817c62-6ed8-461a-8d1e-38ce255c7b13.webp\",\"https://i.ibb.co/VvQVrrQ/d1134792-094e-43e1-8799-38aa2abb9c43.webp\",\"https://i.ibb.co/XbSwwVW/jordan-max-aura-5-shoes-ZBZ4-Pz-1.jpg\",\"https://i.ibb.co/KzFvQrR/jordan-max-aura-5-shoes-ZBZ4-Pz-2.jpg\",\"https://i.ibb.co/SyCPkHQ/jordan-max-aura-5-shoes-ZBZ4-Pz.jpg\"]',37),(18,'[\"https://i.ibb.co/R7XJ5F3/3f6727f7-0f97-4ab3-978d-e5ab6b1fdfb6.webp\",\"https://i.ibb.co/hgdmFsH/8de36952-de2f-48ba-b7f4-6048f870007c.webp\",\"https://i.ibb.co/zPt4fN0/074bce19-79ac-42d8-b880-6c89c0373107.webp\",\"https://i.ibb.co/BgTnKwB/3535fef2-42c0-4683-a71d-a291fe40a9b5.webp\",\"https://i.ibb.co/sq7qZYP/8a6ca92e-3475-42dc-9797-4b49c778123c.webp\"]',39);
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_ratings`
--

DROP TABLE IF EXISTS `product_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_ratings` (
  `rating_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `rating` int NOT NULL,
  `rating_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`rating_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `product_ratings_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_ratings`
--

LOCK TABLES `product_ratings` WRITE;
/*!40000 ALTER TABLE `product_ratings` DISABLE KEYS */;
INSERT INTO `product_ratings` VALUES (4,10,1,5,'2023-12-15 20:25:47'),(5,10,29,5,'2023-12-15 20:53:11'),(6,10,29,4,'2023-12-15 21:58:23');
/*!40000 ALTER TABLE `product_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_reviews`
--

DROP TABLE IF EXISTS `product_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `review_text` text COLLATE utf8mb4_general_ci NOT NULL,
  `review_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_reviews`
--

LOCK TABLES `product_reviews` WRITE;
/*!40000 ALTER TABLE `product_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `product_description` text COLLATE utf8mb4_general_ci,
  `product_price` decimal(10,2) NOT NULL,
  `category_id` int NOT NULL,
  `thumbnail` varchar(1500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Nike G.T. Jump 2 EP','Bạn muốn bay cao bao nhiêu? Hãy cất cánh khỏi mặt đất nhanh hơn với thiết kế giúp bạn bay lơ lửng và giữ mình trên không khi hành động theo phương thẳng đứng. Nếu bạn là một vận động viên bắn súng đang cố gắng tăng thêm lực nâng cho cú nhảy của mình, một tòa nhà chọc trời hy vọng bay lơ lửng giữa các vì sao hoặc một con thú trên mặt đất đang cố gắng đánh bại đối thủ để bật ra khỏi vành, chiếc giày này có thể thêm yếu tố bùng nổ cho cú nhảy của bạn. trò chơi. Lực nảy không giống bất cứ điều gì bạn từng cảm nhận trước đây và việc tiếp đất được giảm chấn, giúp bạn bật ngược lên trời sau khi chạm đất. Với đế ngoài bằng cao su siêu bền, phiên bản này mang lại cho bạn lực kéo trên sân ngoài trời.',5280000.00,3,'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/40f17abc-8b7e-4756-a768-557750354d61/gt-jump-2-ep-basketball-shoes-1F15Gp.png'),(27,'Nike Court Vision Low Next Nature','Yêu thích vẻ ngoài cổ điển của bóng rổ thập niên 80 nhưng lại quan tâm đến văn hóa nhịp độ nhanh của trò chơi ngày nay? Gặp gỡ Nike Court Vision Low. Một sản phẩm cổ điển được phối lại với ít nhất 20% vật liệu tái chế tính theo trọng lượng, lớp phủ trên và đường khâu sắc nét vẫn giữ được linh hồn của phong cách nguyên bản. Cổ áo sang trọng, cắt thấp giúp kiểu dáng đẹp và thoải mái cho thế giới của bạn.',1909000.00,3,'https://i.ibb.co/k8y5n7R/e0391e7a-e108-4ecc-bfed-fe53fbf4fe6f.webp'),(28,'Nike GT Cut 2 EP','Trong trò chơi ngày nay, những con sên chậm chân sẽ bị phát hiện và lộ diện. Người tạo không gian vẫn ở trên sàn. GT Cut 2 EP giúp bạn dừng ngay lập tức và tăng tốc trở lại làn đường rộng mở với thiết kế thấp so với mặt đất giúp giảm thiểu sự tiếp xúc với sân khi chuyển hướng. Chúng tôi đã sử dụng những hiểu biết sâu sắc từ các vận động viên nữ để tạo ra một đôi giày giúp bạn chơi nhanh và tự tin—điều mà mọi cầu thủ bóng rổ đều cần. Tách người chơi khỏi người chơi trong một thiết kế được xây dựng dựa trên việc tạo ra sự tách biệt nhưng đủ hỗ trợ để giúp bạn chơi cả ngày. Với đế ngoài bằng cao su siêu bền, phiên bản này mang lại cho bạn lực kéo trên sân ngoài trời.',4999999.00,1,'https://i.ibb.co/5LpTKh1/20fe4aad-81c0-4c0f-81ca-76718194dd83.webp'),(29,'Nike Air Force 1 \'07','PHONG CÁCH HUYỀN THOẠI TINH TẾ.\r\n\r\n\r\nSự rạng rỡ vẫn tồn tại trong Nike Air Force 1 \'07, phiên bản bóng rổ nguyên bản mang đến sự thay đổi mới mẻ về những gì bạn biết rõ nhất: lớp phủ được khâu bền, lớp hoàn thiện gọn gàng và lượng đèn flash hoàn hảo giúp bạn tỏa sáng.\r\n\r\n\r\nNhững lợi ích\r\n\r\nCác lớp phủ được khâu ở phía trên tăng thêm phong cách di sản, độ bền và khả năng hỗ trợ.\r\nĐược thiết kế ban đầu cho các vòng thi đấu, đệm Nike Air tăng thêm trọng lượng nhẹ, sự thoải mái cả ngày.\r\nKiểu dáng cắt thấp mang lại vẻ ngoài gọn gàng, hợp lý.\r\nCổ áo có đệm tạo cảm giác mềm mại và thoải mái.\r\n\r\nThông tin chi tiết sản phẩm\r\n\r\nĐế giữa xốp\r\nCác vết thủng ở ngón chân\r\nĐế cao su\r\nMàu sắc hiển thị: Đen/Đen\r\nPhong cách: CW2288-001\r\nQuốc gia/Khu vực xuất xứ: Việt Nam, Ấn Độ\r\n\r\nNguồn gốc của lực lượng không quân 1\r\n\r\nRa mắt lần đầu tiên vào năm 1982, AF-1 là đôi giày bóng rổ đầu tiên có Nike Air, tạo nên một cuộc cách mạng trong môn thể thao này đồng thời nhanh chóng thu hút được sự chú ý trên toàn thế giới. Ngày nay, Air Force 1 vẫn giữ nguyên nguồn gốc của nó với lớp đệm mềm mại và đàn hồi đã làm thay đổi lịch sử giày sneaker.',2929000.00,3,'https://i.ibb.co/0yhM7mb/b7d9211c-26e7-431a-ac24-b0540fb3c00f.webp'),(30,'Nike G.T. Hustle 2 EP','Một bước có thể tạo ra sự khác biệt hoàn toàn khi đó là điểm của trò chơi, chẳng hạn như một pha đột nhập cửa sau thành công lén lút nhưng bị chặn nếu không có một chút tách biệt hoặc một cú nhảy vào giây cuối cùng của đối thủ khiến 3 người của họ văng ra khỏi vành. Chúng tôi đã sử dụng những hiểu biết sâu sắc từ các vận động viên nữ để tạo nên giải G.T. Hustle 2 mềm mại, hỗ trợ tốt và nhẹ—điều mà mọi người chơi bóng rổ đều cần. Được trang bị lớp đệm ở lõi và Zoom Air, đôi giày này giúp bạn luôn tiến về phía trước—từ kiểm tra đến \"trận đấu đó\". Chạy nước rút, dừng lại và ghi điểm từ đầu đến cuối, tập trung vào việc chiếm ưu thế, không sa sút trong suốt chặng đường. Với đế ngoài bằng cao su siêu bền, phiên bản này mang lại cho bạn lực kéo trên sân ngoài trời.\r\n\r\n\r\nNhẹ, mượt, nhạy\r\n\r\nLớp bọt có chiều dài tối đa hoàn hảo để cung cấp khả năng giảm chấn ở tốc độ cao và giúp chân bạn không bị dịch chuyển trong giày. Chúng tôi kết hợp miếng xốp với đế đúc để tạo nên sự kết hợp mạnh mẽ giữa khả năng phản hồi mềm mại.\r\n\r\n\r\nĐộ nảy và mịn\r\n\r\nChúng tôi đã khâu một bộ Zoom Air có chiều dài đầy đủ vào phần dưới cùng của phần trên để mang lại cho bạn cảm giác đẩy xuống sàn và hoàn trả năng lượng tối ưu từ bước đầu tiên bạn thực hiện đến bước cuối cùng. Cho dù bạn đang bùng nổ trước mối đe dọa gấp ba hay chạy nước rút từ đường cơ sở này sang đường cơ sở khác, nó sẽ mang lại cho bạn khả năng phản hồi ngay dưới chân mình.\r\n\r\n\r\nTối thiểu để bạn có thể di chuyển\r\n\r\nĐược thiết kế giống như một đôi giày chạy bộ hiện đại, phần thân trên tối giản giúp giày nhẹ nhất có thể. Lưới được thiết kế sử dụng các lớp gia cố để tạo sự hỗ trợ xung quanh ngón chân, gót chân và giữa bàn chân, mang lại sự ổn định mà không tăng thêm trọng lượng.\r\n\r\n\r\nHỗ trợ mắt cá chân\r\n\r\nCổ áo có đệm, cao vừa phải giúp hỗ trợ quanh mắt cá chân mà không ảnh hưởng đến sự linh hoạt.\r\n\r\n\r\nNhiều lợi ích hơn\r\n\r\nLưỡi xốp giúp giảm áp lực ren.\r\nMẫu lực kéo xương cá Waffle mang lại cảm giác cắn và chạm tuyệt vời.\r\nMàu sắc hiển thị: Màu đỏ theo dõi/Đỏ huyền bí/linh sam/Bạc kim loại\r\nPhong cách: DJ9404-601\r\nQuốc gia/Khu vực xuất xứ: Trung Quốc',4999999.00,1,'https://i.ibb.co/mN7XW9D/02b23dcb-401d-45d7-a31f-d9a553534126.webp'),(31,'Nike InfinityRN 4','Giày càng hỗ trợ tốt thì nó càng mang lại sự ổn định cho sải bước tự nhiên của bạn. Sự kết hợp giữa hỗ trợ điều chỉnh và đệm được đặt có chủ ý giúp bạn cảm thấy an toàn trong mỗi bước đi. Đế ngoài cong giúp bàn chân của bạn di chuyển nhẹ nhàng từ gót chân đến ngón chân và từ bước tiến đến bước chân. Nó làm cho mỗi bước đi trở nên tự nhiên hơn và tăng thêm hiệu quả cho quá trình chạy của bạn, giúp bạn ít lãng phí năng lượng hơn khi đạt được sải chân. Dải vừa vặn Flyknit bên trong mới (giống như dây cao su quanh giữa bàn chân của bạn) mang lại khả năng hỗ trợ đàn hồi và an toàn.\r\n\r\n\r\nĐộ phản hồi: vừa phải\r\n\r\nGiày càng phản ứng nhanh thì bạn càng nhận được nhiều năng lượng hơn sau mỗi bước đi. Cho dù bạn muốn chạy nhanh hơn một chút hay tốn ít nỗ lực hơn một chút, những đôi giày có độ đàn hồi cao sẽ giúp bạn bước đi uyển chuyển hơn một chút để đạt được hiệu quả cao hơn trong quá trình chạy. Bọt ReactX mang lại cho bạn +13% năng lượng hoàn trả so với bọt React, giúp bạn luôn sảng khoái và bồng bềnh trong suốt quá trình chạy.\r\n\r\n\r\nCó khả năng thở\r\n\r\nLớp lót chống thấm nước ở ngón chân giúp bạn luôn khô ráo khi thời tiết chuyển mùa.\r\n\r\n\r\nNhiều lợi ích hơn\r\n\r\nĐế ngoài hình bánh quế cung cấp lực kéo bền.\r\nLưỡi Flyknit có thể điều chỉnh và sang trọng.\r\nCổ áo xốp mềm mại và hỗ trợ khi chạm vào.\r\nCao su tăng ở đế ngoài mang lại lực kéo và độ bền.\r\n\r\nThông tin chi tiết sản phẩm\r\n\r\nTrọng lượng: 353g (Nam size 10)\r\nĐộ sâu từ gót đến ngón chân: 9mm\r\nMàu sắc hiển thị: Trắng/Màu bạch kim/Đỏ thẫm nhạt/Nâu nhung\r\nPhong cách: DR2665-100\r\nQuốc gia/Khu vực xuất xứ: Việt Nam',4699000.00,3,'https://i.ibb.co/x3nKXtX/df6a994a-bc85-4637-94bf-3ae4af43a8fe.webp'),(32,'Nike Invincible 3','Khả năng phản hồi: siêu cao\r\n\r\nGiày càng phản ứng nhanh thì bạn càng nhận được nhiều năng lượng hơn sau mỗi bước đi. Cho dù bạn muốn chạy nhanh hơn một chút hay tốn ít nỗ lực hơn một chút, những đôi giày có độ đàn hồi cao sẽ giúp bạn bước đi uyển chuyển hơn một chút để đạt được hiệu quả cao hơn trong quá trình chạy. Bọt Nike ZoomX cực kỳ nhạy và nhẹ, mang lại cho bạn độ nảy và phản ứng linh hoạt với mỗi bước đi.\r\n\r\n\r\nPhù hợp: an toàn, thoáng khí, thoải mái\r\n\r\nCông nghệ Flyknit cải tiến nâng cao vùng thoáng khí nơi chân bạn nóng lên nhiều nhất. Nó chắc chắn và bền bỉ, giúp giữ chân bạn an toàn trên mỗi dặm đường.\r\n\r\n\r\nCó gì mới về Invincible 3?\r\n\r\nĐế giữa rộng hơn mang lại độ ổn định cao hơn so với phiên bản trước của chúng tôi. Ngăn xếp xốp cao hơn phiên bản trước của chúng tôi nâng cao tiêu chuẩn về khả năng giảm chấn và sự thoải mái, trong một thiết kế đẹp mắt hơn. Lớp nhựa chắc chắn quanh gót chân nhỏ hơn so với phiên bản trước của chúng tôi trong khi vẫn mang lại sự vừa vặn, an toàn và thoải mái.\r\n\r\n\r\nThông tin chi tiết sản phẩm\r\n\r\nKhông nhằm mục đích sử dụng làm thiết bị bảo hộ cá nhân (PPE)\r\nTrọng lượng: 310g (size 9 của nam)\r\nĐộ sâu từ gót đến ngón chân: 9mm\r\nDo cập nhật thiết kế, dòng chữ ở gót chân của sản phẩm bạn mua có thể khác với dòng chữ ở gót chân được mô tả trên Nike.com. Trong trường hợp có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận dịch vụ tiêu dùng của Nike.\r\nMàu sắc hiển thị: Tiếng ồn Aqua/Đại dương hạnh phúc/Vực thẳm xanh\r\nPhong cách: DR2615-401\r\nQuốc gia/Khu vực xuất xứ: Việt Nam',4487149.00,3,'https://i.ibb.co/QFWQ1C8/478926ab-d0d9-4d8e-a12c-121c4a163200.webp'),(33,'Nike Tiempo Legend 10 Club','Ngay cả Huyền thoại cũng tìm cách phát triển. Cho dù bạn mới bắt đầu hay chỉ chơi để giải trí, phiên bản mới nhất của giày Câu lạc bộ này sẽ giúp bạn thi đấu trên sân mà không ảnh hưởng đến chất lượng. Các đường viền bằng da tổng hợp ôm sát bàn chân của bạn và không bị giãn quá mức, giúp bạn kiểm soát tốt hơn. Nhẹ hơn và đẹp hơn bất kỳ Tiempo nào khác cho đến nay, Legend 10 dành cho bất kỳ vị trí nào trên sân, cho dù bạn đang gửi một đường chuyền chính xác xuyên qua hàng phòng ngự hay theo dõi để ngăn chặn một pha đột phá.\r\n\r\n\r\nCảm ứng khuếch đại\r\n\r\nDa tổng hợp đúc mô phỏng cảm giác được chần bông để cải thiện cảm giác chạm.\r\n\r\n\r\nTạo đường nét tự nhiên, phù hợp\r\n\r\nKhuôn da tổng hợp ôm sát bàn chân và giúp bạn kiểm soát tốt hơn, giúp bạn luôn thoải mái trong trận đấu.\r\n\r\n\r\nLực kéo cho sân\r\n\r\nTấm đặt các đinh tán hình nón ở gót chân để tạo lực kéo và độ ổn định tối ưu khi phanh và đổi hướng—vừa phải trong mọi điều kiện.\r\n\r\n\r\nThông tin chi tiết sản phẩm\r\n\r\nĐể sử dụng trên bề mặt tự nhiên và tổng hợp\r\nĐế đệm\r\nMàu sắc hiển thị: Trắng/Đỏ tươi/Đen\r\nPhong cách: DV4344-100\r\nQuốc gia/Khu vực xuất xứ: Việt Nam',1609000.00,2,'https://i.ibb.co/52sqsWp/5d6de434-d587-4181-8499-65a539a004ce.webp'),(34,'Nike Mercurial Superfly 9 Academy','Chào mừng đến với sân đấu, Zoom\r\n\r\nLần đầu tiên trong lịch sử của chúng tôi, Nike đã phát triển một bộ Zoom Air hoàn toàn mới. Nó nằm trong tấm đế và mang lại cảm giác đàn hồi dưới chân, giúp bạn di chuyển nhanh hơn trên sân và tạo ra sự tách biệt khi điều đó quan trọng nhất—cho dù bạn đang ghi bàn, là người đầu tiên nhận bóng hay vượt qua các hậu vệ.\r\n\r\n\r\nLái xe tốc độ của bạn\r\n\r\nLồng tốc độ bên trong cấu trúc được làm từ vật liệu mỏng nhưng chắc chắn giúp cố định bàn chân vào đế ngoài mà không tăng thêm trọng lượng để khóa tối ưu.\r\n\r\n\r\nĐào vào, cất cánh\r\n\r\nMẫu lực kéo độc đáo cung cấp lực kéo siêu tích điện với khả năng nhả nhanh để tạo sự tách biệt.\r\n\r\n\r\nCải thiện sự phù hợp\r\n\r\nFlyknit quấn mắt cá chân của bạn bằng vải mềm, co giãn để mang lại cảm giác an toàn. Thiết kế được làm lại giúp cải thiện độ vừa vặn để mô phỏng bàn chân tốt hơn. Chúng tôi đã thực hiện điều này bằng cách tiến hành nhiều cuộc kiểm tra độ mòn trên hàng trăm vận động viên. Kết quả là phần ngón chân có đường nét hơn và khả năng khóa gót chân tốt hơn.\r\n\r\n\r\nCảm giác chân trần\r\n\r\nPhần trên có NikeSkin, một chất liệu lưới mềm và dẻo được liên kết với nhau bằng một lớp phủ mỏng. Nó giúp kiểm soát bóng và thực sự mang lại cho bạn cảm giác như đang chơi bóng bằng chân trần.\r\n\r\n\r\nThông tin chi tiết sản phẩm\r\n\r\nĐể sử dụng trên bề mặt tự nhiên và tổng hợp\r\nĐế đệm\r\nMàu sắc hiển thị: Đen/Hyper Royal/Chrome\r\nPhong cách: DJ5625-040\r\nQuốc gia/Khu vực xuất xứ: Trung Quốc',3856147.00,2,'https://i.ibb.co/BKLWjqL/98fd9b9f-775d-452e-9e91-5135da978368.webp'),(35,'Nike Zoom Metcon Turbo 2','Nike Zoom Metcon Turbo 2 mang lại tốc độ hưng phấn cho quá trình tập luyện hàng ngày của bạn. Nó kết hợp sự ổn định và khả năng phản hồi trong một gói nhẹ để giúp bạn di chuyển nhanh chóng trong quá trình luyện tập theo mạch, các bài tập cường độ cao trên máy chạy bộ, bài tập tim mạch mà bạn đã thực hiện trên đường về nhà—bất cứ điều gì bạn chọn. Từ đệm Zoom Air dưới chân cho đến dây quấn ở mu bàn chân, mọi chi tiết đều được tinh giản để giảm thiểu trọng lượng đồng thời tối đa hóa chức năng và độ bền. Vật liệu nhẹ hơn, chắc chắn hơn được chế tạo để mang lại tốc độ và sức mạnh.\r\n\r\n\r\nĐệm cho tốc độ\r\n\r\nZoom Air nhẹ và phản hồi nhanh cho các chuyển động nhanh, lặp đi lặp lại như nhảy hộp và nhảy hai lần. Bạn có được lò xo khi cất cánh và cảm giác êm ái khi hạ cánh. Bọt Nike React nhẹ và phản ứng nhanh cho các chuyển động nhanh, lặp đi lặp lại như nhảy hộp và nhảy hai chân. Bạn có được lò xo khi cất cánh và cảm giác êm ái khi hạ cánh.\r\n\r\n\r\nMạnh mẽ nhưng thoáng khí\r\n\r\nMu bàn chân phía trên mỏng và nhẹ nhưng vẫn dẻo dai để chống mài mòn. Lưới ở phần bên ngoài giúp thoáng khí khi tập ở nhiệt độ cao.\r\n\r\n\r\nCàng đơn giản càng đẹp\r\n\r\nCác tính năng mà bạn yêu thích, chẳng hạn như dây quấn và kẹp gót chân trồng cây chuối, đã được thiết kế lại và giảm bớt để giảm bớt trọng lượng. Chúng cung cấp cho bạn chức năng và độ bền tương tự, trừ đi trọng lượng.\r\n\r\n\r\nNhiều lợi ích hơn\r\n\r\nGót chân rộng, phẳng giúp bạn đứng vững.\r\nĐế cao su dẻo dẻo giúp bàn chân uốn cong thoải mái.\r\nMàu sắc hiển thị: Ngọc trong suốt/Mòng mòng Geode/Rừng sâu/Trắng\r\nPhong cách: DH3392-302\r\nQuốc gia/Khu vực xuất xứ: Việt Nam',4409000.00,4,'https://i.ibb.co/1sdNM9L/07d1d2ef-4e45-4474-802c-c5fca3814391.webp'),(36,'Nike Air Max Alpha Trainer 4','ĐỆM ỔN ĐỊNH CHO CÁC CÔNG VIỆC TUYỆT VỜI NHẤT.\r\n\r\n\r\nThực hiện các bài tập cường độ cao nhất của bạn với Nike Air Max Alpha Trainer 4. Đế rộng, phẳng với đệm Nike Air mang lại cho bạn sự ổn định thoải mái khi nâng. Gót chân được thiết kế lại với lớp đệm hỗ trợ giúp giảm tải trong những hiệp đấu nặng nhất của bạn. Mọi thứ kết hợp với nhau trong một chiếc giày bền được thiết kế để chịu được điều kiện khắc nghiệt của phòng tập.\r\n\r\n\r\nTăng cường để hỗ trợ\r\n\r\nPhần bọc gót chân tiếp xúc với dây buộc ở giữa bàn chân, để hỗ trợ trong các động tác bùng nổ. Lưới bền, miếng dán và lớp phủ chắc chắn giúp chân bạn được thở trong khi đáp ứng nhu cầu tập luyện hàng ngày.\r\n\r\n\r\nĐệm cho thoải mái\r\n\r\nBọt với bộ phận Max Air ở gót chân đệm bàn chân của bạn, mang lại sự thoải mái kéo dài suốt thời gian bạn làm việc. Vòng cổ đệm mắt cá chân của bạn từ động tác này sang động tác tiếp theo.\r\n\r\n\r\nNền tảng vững chắc\r\n\r\nĐế phẳng, rộng với mặt đế cao su mang lại cho bạn sự ổn định và lực kéo. Cao su quấn bên hông để giữ chân bạn chắc chắn trên đế trong khi di chuyển sang bên.',1999199.00,4,'https://i.ibb.co/XYpgSVq/2cfa0834-2b63-4b2a-92db-987c2f58428a.webp'),(37,'Jordan Max Aura 5','Khi bạn cần một đôi giày luôn sẵn sàng 24/7, đó phải là Max Aura 5. Lấy cảm hứng từ AJ3, đôi giày này tạo nên nét hiện đại trên nền cổ điển. Chúng được làm từ da và vải bền, bên trên có lớp đệm Nike Air ở gót để bạn có thể đi bộ, chạy hoặc trượt băng cả ngày mà vẫn có cảm giác thoải mái ở đế.\r\n\r\n\r\nNhững lợi ích\r\n\r\nCác đơn vị Nike Air-Sole cung cấp đệm nhẹ.\r\nĐế ngoài cao su tăng thêm lực kéo hàng ngày.\r\nNhựa chắc chắn xung quanh gót chân tăng thêm sự hỗ trợ.\r\n\r\nThông tin chi tiết sản phẩm\r\n\r\nNhãn Jumpman trên lưỡi\r\nKhoen tham khảo AJ3\r\nPhần gót nhựa chắc chắn lấy cảm hứng từ khuôn AJ3\r\nMàu sắc hiển thị: Trắng/Đỏ Varsity/Xám sói/Đen\r\nPhong cách: DZ4353-101\r\nQuốc gia/Khu vực xuất xứ: Việt Nam',3829000.00,5,'https://i.ibb.co/smJkW15/041d6fbb-f3a5-4e18-906d-b83bf4086587.webp'),(39,'Nike Full Force Low','Một đôi giày mới với nét hấp dẫn cổ điển—giấc mơ cổ điển của bạn vừa trở thành hiện thực. Thiết kế tối giản này lấy cảm hứng từ AF-1 cổ điển, sau đó chuyển sang phong cách thập niên 80 với đường khâu ngược và màu sắc lấy cảm hứng từ trường đại học. Tuy nhiên, không phải mọi thứ đều phải cũ—sự thoải mái và độ bền hiện đại giúp chúng dễ dàng đeo mọi lúc, mọi nơi. Đã đến lúc ném chúng vào và dùng hết sức lực.\r\n\r\n\r\nNhững lợi ích\r\n\r\nDa trên có độ tuổi mềm mại hoàn hảo.\r\nChọn từ nhiều cách phối màu lấy cảm hứng từ trường đại học để phù hợp với mọi tâm trạng và diện mạo.\r\nLớp bọt tiếp xúc cho phép bạn cảm nhận được sự mềm mại chạy hoàn toàn dưới chân.\r\n\r\nThông tin chi tiết sản phẩm\r\n\r\nĐế giữa xốp\r\nĐế giày cao su\r\nMàu sắc hiển thị: Trắng/Thiếc/Cánh buồm/Đen\r\nPhong cách: FB1362-101\r\nQuốc gia/Khu vực xuất xứ: Việt Nam',2649000.00,3,'https://i.ibb.co/R7XJ5F3/3f6727f7-0f97-4ab3-978d-e5ab6b1fdfb6.webp');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_history`
--

DROP TABLE IF EXISTS `purchase_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_history` (
  `purchase_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_detail_id` int NOT NULL,
  `purchase_date` date NOT NULL,
  PRIMARY KEY (`purchase_id`),
  KEY `user_id` (`user_id`),
  KEY `order_detail_id` (`order_detail_id`),
  CONSTRAINT `purchase_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `purchase_history_ibfk_2` FOREIGN KEY (`order_detail_id`) REFERENCES `order_details` (`order_detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_history`
--

LOCK TABLES `purchase_history` WRITE;
/*!40000 ALTER TABLE `purchase_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_addresses`
--

DROP TABLE IF EXISTS `shipping_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_addresses` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `recipient_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `street_address` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `state` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `postal_code` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `recipient_numberphone` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `shipping_addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_addresses`
--

LOCK TABLES `shipping_addresses` WRITE;
/*!40000 ALTER TABLE `shipping_addresses` DISABLE KEYS */;
INSERT INTO `shipping_addresses` VALUES (4,10,'Nguyễn Văn Huy','Quận Ba Đình','Thành phố Hà Nội','Phường Phúc Xá','chưa cập nhật','0374786779'),(5,12,'Minh','Quận Bắc Từ Liêm','Thành phố Hà Nội','Phường Quán Thánh','chưa cập nhật','0389119966');
/*!40000 ALTER TABLE `shipping_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` int DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `gender` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatar` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `notify_token` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `notify_token_UNIQUE` (`notify_token`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9,'mingchen1','$2b$10$1fwO1QO06GA.MzEp5ECYCO99f4HLbE/vh/NmR/UCctyJdzpufnt5a','tminh400@gmail.com','Nguyễn Văn Huy','0384675898',3,'2023-12-16',NULL,'https://bizweb.dktcdn.net/100/438/408/files/avatar-hai-yody-vn-12.jpg?v=1700119238352',NULL),(10,'huyph20687','$2b$10$G8dPXmV7j4a.8HQ5aW9S9unaMydTupM6BVI.9rfxTeX2gHVmz3HvW','huymaxpro123@gmail.com','Nguyễn Văn A','0374786775',4,'2003-12-17','female',NULL,NULL),(11,'huydz23','$2b$10$J2P7vY0bn9mH.FnjjeMXuOYyXNS9x3GV/SUT7QeiK4MmYA.p0k1yG','huy339093@gmail.com','Huy',NULL,NULL,'2023-12-16',NULL,NULL,NULL),(12,'mingchen','$2b$10$atb9HEot/LBIz4EOxuNPVOg9rqce/xLp5/xx3FviPMh5gNpy8uCja','tminh401@gmail.com',NULL,NULL,5,NULL,NULL,NULL,'ExponentPushToken[un5g0DFUqG0cgJ2Fw0fOyo]');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `voucher_id` int NOT NULL AUTO_INCREMENT,
  `voucher_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `voucher_code` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `start_time` text COLLATE utf8mb4_general_ci,
  `end_time` text COLLATE utf8mb4_general_ci,
  `voucher_type` int NOT NULL,
  `reward_type` int NOT NULL,
  `usage_quantity` int NOT NULL,
  `discount_amount` float NOT NULL,
  `max_price` float NOT NULL,
  `item_product_id_list` longtext COLLATE utf8mb4_general_ci,
  `item_user_id_list` longtext COLLATE utf8mb4_general_ci,
  `voucher_purpose` int DEFAULT '0',
  `use_history` longtext COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`voucher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
INSERT INTO `vouchers` VALUES (13,'Giảm mua hàng 100k','80HF5Z9WZZ','1702486800','1702659540',3,1,8,10,0,NULL,NULL,0,NULL),(14,'Miễn phí ship','STLF8RUTC6','1703178000','1703523540',3,3,0,10000,0,NULL,'[10]',0,NULL),(15,'Giảm 50k khi mua hàng','2885MLI8KZ','1702562400','1702659540',1,2,2,49998,0,'[1,28,30,33,34,27,29,31,32,35,36]','[10]',0,'[1,10]'),(16,'Giảm 30% cho đơn hàng ','FEAX4SX3GC','1702573200','1702745940',1,1,0,30,0,'[1,28,30,33,34,27,29,31,32,35,36,37]',NULL,0,NULL);
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-18 19:31:21
