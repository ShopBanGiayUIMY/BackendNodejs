-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shopbangiayuimy
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
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Sneakers',''),(2,'Running Shoes',''),(3,'Football Boots',''),(4,'Basketball Shoes','');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_details`
--

LOCK TABLES `product_details` WRITE;
/*!40000 ALTER TABLE `product_details` DISABLE KEYS */;
INSERT INTO `product_details` VALUES (1,1,'Black','US 9',100),(2,1,'White','US 10',75),(3,2,'Gray','US 8',50),(4,3,'Black','US 10',30),(5,4,'Red','US 11',60);
/*!40000 ALTER TABLE `product_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (1,'https://user-images.githubusercontent.com/24969335/271076401-bbccaf65-0e37-4994-9aa4-8796493f6646.png',1),(2,'https://user-images.githubusercontent.com/24969335/271076472-a5fb1201-13bf-470e-a202-4b4e2b06af5d.png',1),(3,'https://user-images.githubusercontent.com/24969335/271076517-f92b4b6a-911a-4f9a-8556-9edd0bbd4020.png',1),(4,'https://user-images.githubusercontent.com/24969335/271076537-7641350e-1aba-4120-8e74-957c9f0b7d56.png',1),(5,'https://user-images.githubusercontent.com/24969335/271076562-326f50e3-6ca0-493d-8e08-cada592d82c3.png',1),(6,'https://user-images.githubusercontent.com/24969335/271076576-355e978c-6af9-426d-b1f9-953f8f79e931.png',1),(7,'https://user-images.githubusercontent.com/24969335/271076593-8776af1f-26d2-4ceb-9eae-8f78c0ab352c.png',1),(8,'https://user-images.githubusercontent.com/24969335/271076614-bac09fd1-98a0-4cba-bd57-88a2870f6472.png',1),(9,'https://user-images.githubusercontent.com/24969335/271081500-14d3a34f-0045-455d-8fe4-3f5e8ac8c69e.png',2),(10,'https://user-images.githubusercontent.com/24969335/271081520-798da651-6c2f-477e-be91-e01bcedd81b5.png',2),(11,'https://user-images.githubusercontent.com/24969335/271081589-50d35e9e-3f17-4e49-9d1c-8d7f838cbd2d.png',2),(12,'https://user-images.githubusercontent.com/24969335/271081614-e98c3d89-fc94-4f75-a4d9-53038b656550.png',2),(13,'https://user-images.githubusercontent.com/24969335/271081630-4d39a358-144c-44cc-b39e-457b22f3b27e.png',2),(14,'https://user-images.githubusercontent.com/24969335/271081637-cd2cbecc-2aac-4c65-b243-e7b513d61467.png',2),(15,'https://user-images.githubusercontent.com/24969335/271081664-d9579a68-abf3-43fa-93e6-79bbb171682b.png',2),(16,'https://user-images.githubusercontent.com/24969335/271081675-b95e657c-0631-4b8d-b1ac-7a645a9308e8.png',2),(17,'https://user-images.githubusercontent.com/24969335/271084712-8bdb9b9a-2711-4514-b6ec-fefd55d010cf.png',3),(18,'https://user-images.githubusercontent.com/24969335/271084739-fb72cbb5-b43c-4748-a7ae-48cdf530979c.png',3),(19,'https://user-images.githubusercontent.com/24969335/271084769-0bffe5dc-e62e-405a-82d7-e22531d82792.png',3),(20,'https://user-images.githubusercontent.com/24969335/271084788-444690b4-2972-4e00-85e9-7cfc93664978.png',3),(21,'https://user-images.githubusercontent.com/24969335/271084807-c93e3810-48eb-4127-b101-9f9d250fa1ed.png',3),(22,'https://user-images.githubusercontent.com/24969335/271084840-7688c342-c320-434b-aa82-4bdd37fd01c3.png',3),(23,'https://user-images.githubusercontent.com/24969335/271084852-a0d4c9a9-120c-4822-897d-82990defd10e.png',3),(24,'https://user-images.githubusercontent.com/24969335/271084884-9bc85052-6b2e-466d-bb43-bf4f717cd8d0.png',3),(25,'https://user-images.githubusercontent.com/24969335/271085937-9e7585a7-d929-4bdb-9671-51551d807c8a.png',4),(26,'https://user-images.githubusercontent.com/24969335/271085955-e6337188-f7f0-4a3d-a176-3506add93fb5.png',4),(27,'https://user-images.githubusercontent.com/24969335/271085976-9c43e729-5ee4-4df6-a892-0d4a0639b32e.png',4),(28,'https://user-images.githubusercontent.com/24969335/271085987-90927e9f-874e-4c1c-9dc4-1fa4bc97a81c.png',4),(29,'https://user-images.githubusercontent.com/24969335/271086002-e38f1bd4-4171-4a16-a40c-fdeb0a52d1e4.png',4),(30,'https://user-images.githubusercontent.com/24969335/271086027-d9e2c7d3-a39c-41a0-b272-4776ded9fb39.png',4),(31,'https://user-images.githubusercontent.com/24969335/271086044-086e1c42-5b17-4a81-b9a4-640d4ecfeb6e.png',4),(32,'https://user-images.githubusercontent.com/24969335/271086057-627849e4-4461-48e1-8fa7-f947f8ad0ea9.png',4),(33,'https://user-images.githubusercontent.com/24969335/271086071-3dd0dc68-d338-4d10-93b6-f1c86ae251e0.png',4);
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_ratings`
--

LOCK TABLES `product_ratings` WRITE;
/*!40000 ALTER TABLE `product_ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_reviews`
--

LOCK TABLES `product_reviews` WRITE;
/*!40000 ALTER TABLE `product_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Nike Structure 25','With stability where you need it and cushion where you want it, the Structure 25 supports you for long miles, short training runs and even a down-and-back before the day ends. It\'s the stability you seek, loyal from the first tie-up, tried and tested, with a midfoot system that\'s fully supportive and with more comfortable cushioning than before.',3829000.00,1,'https://user-images.githubusercontent.com/24969335/271076401-bbccaf65-0e37-4994-9aa4-8796493f6646.png'),(2,'Nike Air Force 1 \'07','The radiance lives on in the Nike Air Force 1 \'07, the basketball original that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.',2929000.00,2,'https://user-images.githubusercontent.com/24969335/271081500-14d3a34f-0045-455d-8fe4-3f5e8ac8c69e.png'),(3,'Nike Air Max SYSTM','Max style, Max feel. The Air Max SYSTM brings back everything you love about your favourite \'80s models, including throwback varsity colours. Tried-and-tested Nike Air cushioning is paired with a sleek, sport-inspired upper. It\'s Air Max delivering again.',2779000.00,3,'https://user-images.githubusercontent.com/24969335/271084712-8bdb9b9a-2711-4514-b6ec-fefd55d010cf.png'),(4,'NikeCourt Legacy','Honouring a history rooted in tennis culture, the Nike Court Legacy brings you a time-tested staple. Its pebbled upper, heritage stitching and retro Swoosh design let you blend sport and fashion. And, you get to do good by looking good.',2069000.00,4,'https://user-images.githubusercontent.com/24969335/271085937-9e7585a7-d929-4bdb-9671-51551d807c8a.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'mingchen','$2b$10$7lZ/B9gfNQ2hXeJsdGKsDuGywb/JDNi70FCF5XiNOpXqdJD0JfC1O',NULL,NULL,NULL,NULL),(8,'mingchen1','$2b$10$Z9VVgg7LMN7ofAcy/BvFWufQ5J4gK7AOErlIqXOSP2sFH2aaM.5Cm',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-27 17:06:24
