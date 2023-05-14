-- MySQL dump 10.16  Distrib 10.1.48-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: hotspot_system
-- ------------------------------------------------------
-- Server version	10.1.48-MariaDB-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fiscalCode` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `addressCompany` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `vatCode` varchar(255) DEFAULT NULL,
  `web` varchar(255) DEFAULT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `defaultBandwidth` varchar(255) DEFAULT NULL,
  `bandwidthProfiles` text,
  `websurferCustomFields` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ResellerId` int(11) DEFAULT NULL,
  `preAuthLandingPage` text,
  `postAuthLandingPage` text,
  PRIMARY KEY (`id`),
  KEY `ResellerId` (`ResellerId`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`ResellerId`) REFERENCES `reseller` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'111111','Brescia','Azienda1','azienda1@it.it','2312312','Via Sandro Pertini n.33','asd','293810239','23912091000','https://www.azienda1.it','2391209100023423','slow','[\n{\"id\":\"0\", \"name\": \"slow1\", \"download\": \"5555\", \"upload\": \"5555\"},\n{\"id\":\"1\", \"name\": \"base1\", \"download\": \"111111\", \"upload\": \"111111\"},\n{\"id\":\"2\", \"name\": \"premium1\", \"download\": \"222222\", \"upload\": \"222222\"},\n{\"id\":\"3\", \"name\": \"professional1\", \"download\": \"333333\", \"upload\": \"333333\"}\n]','[\n{\"id\":\"1\", \"name\": \"tavolo\"},\n{\"id\":\"2\", \"name\": \"stanza\"},\n{\"id\":\"3\", \"name\": \"mese\"},\n]','2023-05-05 00:00:00','2023-05-14 16:33:15',1,'https://www.wifinetcom.net/preAutoPage.html','https://www.wifinetcom.net/postAutoPage.html'),(2,'222222','Brescia','Azienda2','azienda2@it.it','2312312','Via Sandro Pertini n.33','asd','293810239','2391\'2091','https://www.azienda1.it','2312312','1024','1024',NULL,'2023-05-05 00:00:00','2023-05-05 00:00:00',1,NULL,NULL),(3,'333333','Brescia','Azienda3','azienda3@it.it','2312312','Via Sandro Pertini n.33','asd','293810239','333333','https://www.azienda1.it','333333','1024','1024',NULL,'2023-05-05 00:00:00','2023-05-05 00:00:00',1,NULL,NULL),(4,'444444','Brescia','Azienda4','azienda4@it.it','444444','Via Sandro Pertini n.33','asd','293810239','444444','https://www.azienda1.it','444444','1024','1024',NULL,'2023-05-05 00:00:00','2023-05-05 00:00:00',1,NULL,NULL),(5,'555555','Brescia','Azienda5','azienda5@it.it','555555','Via Sandro Pertini n.33','asd','293810239','555555','https://www.azienda1.it','555555','1024','1024',NULL,'2023-05-05 00:00:00','2023-05-05 00:00:00',1,NULL,NULL),(6,'666666','Brescia','Azienda6','azienda6@it.it','666666','Via Sandro Pertini n.33','asd','293810239','666666','https://www.azienda1.it','666666','1024','1024',NULL,'2023-05-05 00:00:00','2023-05-05 00:00:00',1,NULL,NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reseller`
--

DROP TABLE IF EXISTS `reseller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reseller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fiscalCode` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `addessCompany` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `vatCode` varchar(255) DEFAULT NULL,
  `web` varchar(255) DEFAULT NULL,
  `pin` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `defaultBandwidth` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reseller`
--

LOCK TABLES `reseller` WRITE;
/*!40000 ALTER TABLE `reseller` DISABLE KEYS */;
INSERT INTO `reseller` VALUES (1,'9999999','Soleto','Wifinetcom','gio.t@wifinetcom.net','127312','Via Agnesi n.16','878979','392949559','23810201','https://www.wifinetcom.net','813','RESELLER','1024','2023-05-05 00:00:00','2023-05-05 00:00:00');
/*!40000 ALTER TABLE `reseller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ticket` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `emissionDate` date DEFAULT NULL,
  `firstUse` date DEFAULT NULL,
  `expirationDate` date DEFAULT NULL,
  `expirationUsageDate` date DEFAULT NULL,
  `durationDays` int(11) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `serialNumber` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ResellerId` int(11) DEFAULT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  `WebsurferId` int(11) DEFAULT NULL,
  `bandwidthProfile` text,
  PRIMARY KEY (`id`),
  KEY `ResellerId` (`ResellerId`),
  KEY `CustomerId` (`CustomerId`),
  KEY `WebsurferId` (`WebsurferId`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`ResellerId`) REFERENCES `reseller` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`WebsurferId`) REFERENCES `websurfer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (14,'2023-05-14','2023-05-14','2023-05-21','2023-05-21',7,'095474',NULL,'98321',NULL,'active','2023-05-14 18:18:30','2023-05-14 18:18:30',1,1,14,'{\"id\":\"2\",\"name\":\"premium1\",\"download\":\"222222\",\"upload\":\"222222\"}');
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` enum('SUPERADMIN','RESELLER','HOTEL','USER') NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `utente` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ResellerId` int(11) DEFAULT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ResellerId` (`ResellerId`),
  KEY `CustomerId` (`CustomerId`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`ResellerId`) REFERENCES `reseller` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'RESELLER','reseller','reseller','2023-05-05 00:00:00','2023-05-05 00:00:00',1,1),(2,'HOTEL','hotel1','hotel1','2023-05-05 00:00:00','2023-05-05 00:00:00',1,1),(3,'HOTEL','hotel2','hotel2','2023-05-05 00:00:00','2023-05-05 00:00:00',1,2),(4,'HOTEL','hotel3','hotel3','2023-05-05 00:00:00','2023-05-05 00:00:00',1,3),(5,'HOTEL','hotel4','hotel4','2023-05-05 00:00:00','2023-05-05 00:00:00',1,4),(6,'HOTEL','hotel5','hotel5','2023-05-05 00:00:00','2023-05-05 00:00:00',1,5),(7,'HOTEL','hotel6','hotel6','2023-05-05 00:00:00','2023-05-05 00:00:00',1,6),(1000,'SUPERADMIN','superadmin','superadmin','2023-05-05 00:00:00','2023-05-05 00:00:00',1,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `websurfer`
--

DROP TABLE IF EXISTS `websurfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `websurfer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `idSocial` varchar(255) DEFAULT NULL,
  `typeSocial` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CustomerId` (`CustomerId`),
  CONSTRAINT `websurfer_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `websurfer`
--

LOCK TABLES `websurfer` WRITE;
/*!40000 ALTER TABLE `websurfer` DISABLE KEYS */;
INSERT INTO `websurfer` VALUES (14,'a','b','c','e','d',NULL,NULL,'2023-05-14 18:18:25','2023-05-14 18:18:25',1);
/*!40000 ALTER TABLE `websurfer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-14 21:55:33
