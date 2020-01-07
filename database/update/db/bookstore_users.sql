CREATE DATABASE  IF NOT EXISTS `bookstore` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `bookstore`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bookstore
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.31-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Password` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Fullname` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `CMND` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `Sex` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Address` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Phone` varchar(15) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Permission` int(11) DEFAULT NULL COMMENT 'admin: 2\nnhanvien: 1\nkhachhang: 0',
  `Actived` int(11) DEFAULT NULL COMMENT 'actived: 1\nblocked: 0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'nnlinh97','e7042ac7d09c7bc41c8cfa5749e41858f6980643bc0db1a83cc793d3e24d3f77','Nguyễn Ngọc Linh','212481093','1997-07-14 00:00:00','Male','Quận 10','0978289014','nnlinh97it@gmail.com',1,1),(2,'huantd','e7042ac7d09c7bc41c8cfa5749e41858f6980643bc0db1a83cc793d3e24d3f77','Trần Đình Huân','212481095','1997-10-11 00:00:00','Female','Bình Thạnh','0976998997','huantd@gmail.com',1,1),(4,'huycao','e7042ac7d09c7bc41c8cfa5749e41858f6980643bc0db1a83cc793d3e24d3f77','Cao Gia Huy','212234543','2018-06-20 00:00:00','Male','Quận 5','0987654322','huycao@gmail.com',1,0),(6,'hieuho','e7042ac7d09c7bc41c8cfa5749e41858f6980643bc0db1a83cc793d3e24d3f77','Ho Chi Hieu','212652369','1997-10-23 00:00:00','Male','181/3 TP','0987654554','hieuho@gmail.com',0,1),(7,'tiendinh','e7042ac7d09c7bc41c8cfa5749e41858f6980643bc0db1a83cc793d3e24d3f77','Nguyễn Đình Tiến','212111357','2018-06-27 00:00:00','Male','Quận 11','0987543754','tiendinh@gmail.com',0,1),(8,'thanglee','e7042ac7d09c7bc41c8cfa5749e41858f6980643bc0db1a83cc793d3e24d3f77','Trần Lê Thăng','2122243336','2018-06-27 00:00:00','Other','606/12 Q10','0987654008','thanglee@gmail.com',0,1),(9,'tradat','9c31e4a36195f37bb6804015199277eae880c6643588c9b3a5c9e8263e1c8128','Trà Ngọc Tiến Đạt','2122243224','1997-08-14 00:00:00','Female','KTX Hòa Hảo','0987334597','tiendat97@gmail.com',1,1),(11,'minhdat','e7042ac7d09c7bc41c8cfa5749e41858f6980643bc0db1a83cc793d3e24d3f77','Trần Minh Đạt','212224431','1997-07-30 00:00:00','Other','Quận 10','0987543754','datdat@gmail.com',1,0),(12,'anlee','9dbaa0f36388f66c058c2983697c48553c79f2ec44c0a2ff31541e4793a84ef7','Hoàng Lê An','2122243225','1997-10-21 00:00:00','Other','181/3 TP','0987654442','anlee@gmail.com',1,1),(18,'longk','6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b','Thai Ba Long','2122243339','2018-06-20 00:00:00','Female','Quận 5','0987654559','longk@gmail.com',0,1);
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

-- Dump completed on 2018-06-25 23:41:49
