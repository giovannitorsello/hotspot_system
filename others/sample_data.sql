-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)

--

-- Host: localhost    Database: hotspot_system

-- ------------------------------------------------------

-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */

;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */

;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */

;

/*!50503 SET NAMES utf8mb4 */

;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */

;

/*!40103 SET TIME_ZONE='+00:00' */

;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */

;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */

;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */

;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */

;

--

-- Table structure for table `customer`

--

DROP TABLE IF EXISTS `customer`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `customer` (
        `id` int NOT NULL AUTO_INCREMENT,
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
        `defaultBandwidth` varchar(255) DEFAULT NULL,
        `createdAt` datetime NOT NULL,
        `updatedAt` datetime NOT NULL,
        `ResellerId` int DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `ResellerId` (`ResellerId`),
        CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`ResellerId`) REFERENCES `reseller` (`id`) ON DELETE
        SET
            NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `customer`

--

LOCK TABLES `customer` WRITE;

/*!40000 ALTER TABLE `customer` DISABLE KEYS */

;

INSERT INTO `customer`
VALUES (
        1,
        '1',
        '1',
        '1',
        '1',
        '1',
        '1',
        '1',
        '1',
        '1',
        '1',
        '12345',
        '1',
        '2023-04-11 13:21:57',
        '2023-04-11 13:21:58',
        1
    ), (
        2,
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        '1231',
        'CIAONE',
        '2023-04-11 13:27:38',
        '2023-04-11 13:27:40',
        1
    ), (
        3,
        'ESKERE',
        'ESKERE',
        'ESKERE',
        'ESKERE',
        'ESKERE',
        'ESKERE',
        'ESKERE',
        'ESKERE',
        'ESKERE',
        'ESKERE',
        'ESKERE',
        'ESKERE',
        '2023-04-11 13:29:13',
        '2023-04-11 13:29:15',
        2
    );

/*!40000 ALTER TABLE `customer` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `reseller`

--

DROP TABLE IF EXISTS `reseller`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `reseller` (
        `id` int NOT NULL AUTO_INCREMENT,
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
    ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `reseller`

--

LOCK TABLES `reseller` WRITE;

/*!40000 ALTER TABLE `reseller` DISABLE KEYS */

;

INSERT INTO `reseller`
VALUES (
        1,
        '1',
        '1',
        '1',
        '1',
        '1',
        '1',
        '1',
        '1',
        '1',
        '1',
        '1111',
        '1',
        '1',
        '2023-04-11 13:21:43',
        '2023-04-11 13:21:45'
    ), (
        2,
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        '2023-04-11 13:28:51',
        '2023-04-11 13:28:52'
    );

/*!40000 ALTER TABLE `reseller` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `ticket`

--

DROP TABLE IF EXISTS `ticket`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `ticket` (
        `id` int NOT NULL AUTO_INCREMENT,
        `emissionDate` date DEFAULT NULL,
        `firstUse` date DEFAULT NULL,
        `expirationDate` date DEFAULT NULL,
        `expirationUsageDate` date DEFAULT NULL,
        `durationDays` int DEFAULT NULL,
        `login` varchar(255) DEFAULT NULL,
        `note` varchar(255) DEFAULT NULL,
        `password` varchar(255) DEFAULT NULL,
        `serialNumber` varchar(255) DEFAULT NULL,
        `state` varchar(255) DEFAULT NULL,
        `pinAzienda` int NOT NULL,
        `createdAt` datetime NOT NULL,
        `updatedAt` datetime NOT NULL,
        `ResellerId` int DEFAULT NULL,
        `CustomerId` int DEFAULT NULL,
        `WebsurferId` int DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `ResellerId` (`ResellerId`),
        KEY `CustomerId` (`CustomerId`),
        KEY `WebsurferId` (`WebsurferId`),
        CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`ResellerId`) REFERENCES `reseller` (`id`) ON DELETE
        SET
            NULL ON UPDATE CASCADE,
            CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`id`) ON DELETE
        SET
            NULL ON UPDATE CASCADE,
            CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`WebsurferId`) REFERENCES `websurfer` (`id`) ON DELETE
        SET
            NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `ticket`

--

LOCK TABLES `ticket` WRITE;

/*!40000 ALTER TABLE `ticket` DISABLE KEYS */

;

INSERT INTO `ticket`
VALUES (
        1,
        '2023-04-12',
        '2023-04-12',
        '2023-04-19',
        '2023-04-19',
        6,
        '929484',
        '',
        '17206',
        'BA:0C:7A:5E:92:A0',
        'active',
        12341,
        '2023-04-12 08:25:25',
        '2023-04-12 08:25:25',
        NULL,
        NULL,
        NULL
    );

/*!40000 ALTER TABLE `ticket` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `user`

--

DROP TABLE IF EXISTS `user`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `user` (
        `id` int NOT NULL AUTO_INCREMENT,
        `role` enum(
            'SUPERADMIN',
            'RESELLER',
            'HOTEL',
            'USER'
        ) NOT NULL,
        `password` varchar(255) DEFAULT NULL,
        `utente` varchar(255) DEFAULT NULL,
        `createdAt` datetime NOT NULL,
        `updatedAt` datetime NOT NULL,
        `ResellerId` int DEFAULT NULL,
        `CustomerId` int DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `ResellerId` (`ResellerId`),
        KEY `CustomerId` (`CustomerId`),
        CONSTRAINT `user_ibfk_1` FOREIGN KEY (`ResellerId`) REFERENCES `reseller` (`id`) ON DELETE
        SET
            NULL ON UPDATE CASCADE,
            CONSTRAINT `user_ibfk_2` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`id`) ON DELETE
        SET
            NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `user`

--

LOCK TABLES `user` WRITE;

/*!40000 ALTER TABLE `user` DISABLE KEYS */

;

INSERT INTO `user`
VALUES (
        1,
        'RESELLER',
        'reseller',
        'reseller',
        '2023-04-11 13:22:13',
        '2023-04-11 13:22:15',
        1,
        1
    ), (
        2,
        'HOTEL',
        'hotel',
        'hotel',
        '2023-04-12 09:32:16',
        '2023-04-12 09:32:17',
        1,
        2
    ), (
        3,
        'RESELLER',
        'reseller1',
        'reseller1',
        '2023-04-12 09:51:13',
        '2023-04-12 09:51:15',
        2,
        1
    ), (
        4,
        'USER',
        'fsdfsdf',
        'wifinetcom',
        '2023-04-12 08:15:42',
        '2023-04-12 08:15:42',
        1,
        NULL
    );

/*!40000 ALTER TABLE `user` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `websurfer`

--

DROP TABLE IF EXISTS `websurfer`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `websurfer` (
        `id` int NOT NULL AUTO_INCREMENT,
        `firstname` varchar(255) NOT NULL,
        `lastname` varchar(255) NOT NULL,
        `email` varchar(255) NOT NULL,
        `note` varchar(255) DEFAULT NULL,
        `phone` varchar(255) NOT NULL,
        `idSocial` varchar(255) DEFAULT NULL,
        `typeSocial` varchar(255) DEFAULT NULL,
        `createdAt` datetime NOT NULL,
        `updatedAt` datetime NOT NULL,
        `CustomerId` int DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `CustomerId` (`CustomerId`),
        CONSTRAINT `websurfer_ibfk_1` FOREIGN KEY (`CustomerId`) REFERENCES `customer` (`id`) ON DELETE
        SET
            NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 20 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `websurfer`

--

LOCK TABLES `websurfer` WRITE;

/*!40000 ALTER TABLE `websurfer` DISABLE KEYS */

;

INSERT INTO `websurfer`
VALUES (
        2,
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        'CIAONE',
        NULL,
        NULL,
        '2023-04-11 13:28:11',
        '2023-04-11 13:28:12',
        2
    ), (
        3,
        'ESKERE',
        'ESKERE',
        'ESKERE',
        'ESKERE',
        'ESKERE',
        'ESKERE',
        'ESKERE',
        '2023-04-11 13:29:31',
        '2023-04-11 13:29:29',
        2
    ), (
        17,
        'Vincenzo',
        'Pomarico ',
        'v_pomarico@virgilio.it',
        NULL,
        '3926720022',
        NULL,
        NULL,
        '2023-04-12 12:11:35',
        '2023-04-12 12:11:35',
        NULL
    ), (
        18,
        'Antonio',
        'Cortese',
        'an.cortese19@gmail.com',
        NULL,
        '000000000',
        '115719538787542734973',
        'GOOGLE',
        '2023-04-12 12:18:31',
        '2023-04-12 12:18:31',
        1
    ), (
        19,
        'cortese',
        'antonio',
        'antoniocortese1999@gmail.com',
        'dsf',
        '3279958107',
        NULL,
        NULL,
        '2023-04-12 13:20:55',
        '2023-04-12 13:20:55',
        NULL
    );

/*!40000 ALTER TABLE `websurfer` ENABLE KEYS */

;

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */

;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */

;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */

;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */

;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */

;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */

;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */

;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */

;

-- Dump completed on 2023-04-12 15:53:10