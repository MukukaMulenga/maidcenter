-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: db1
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

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
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `application_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `job_id` int(11) DEFAULT NULL,
  `date_submitted` date DEFAULT NULL,
  `submitted_by` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`application_id`),
  KEY `user_id` (`user_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (26,NULL,51,'2024-09-29','Owen'),(37,4,NULL,'2024-10-01','Emelina'),(38,4,58,'2024-10-01','Emelina'),(39,4,NULL,'2024-10-01','Emelina'),(40,5,51,'2024-10-01','Mukuka'),(42,5,58,'2024-10-07','Mukuka');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `approvals`
--

DROP TABLE IF EXISTS `approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `approvals` (
  `approval_id` int(11) NOT NULL AUTO_INCREMENT,
  `application_id` int(11) DEFAULT NULL,
  `date_approved` date DEFAULT NULL,
  `approval_status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`approval_id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `approvals_ibfk_1` FOREIGN KEY (`application_id`) REFERENCES `applications` (`application_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approvals`
--

LOCK TABLES `approvals` WRITE;
/*!40000 ALTER TABLE `approvals` DISABLE KEYS */;
INSERT INTO `approvals` VALUES (1,NULL,NULL,'pending'),(2,NULL,'2024-09-10','approved'),(3,NULL,'2024-09-26','approved'),(4,NULL,'2024-09-26','approved'),(5,NULL,'2024-09-26','approved'),(6,NULL,NULL,'pending'),(7,NULL,'2024-09-26','rejected'),(8,NULL,'2024-09-26','rejected'),(9,NULL,'2024-09-26','approved'),(10,NULL,NULL,'pending'),(11,NULL,NULL,'pending'),(12,NULL,NULL,'pending'),(13,NULL,NULL,'pending'),(14,NULL,NULL,'pending'),(15,NULL,NULL,'pending'),(16,NULL,NULL,'pending'),(17,NULL,NULL,'pending'),(18,NULL,'2024-09-29','approved'),(19,NULL,NULL,'pending'),(20,NULL,NULL,'pending'),(21,NULL,NULL,'pending'),(22,NULL,'2024-09-29','rejected'),(23,NULL,NULL,'pending'),(24,NULL,'2024-10-01','rejected'),(25,NULL,'2024-10-01','rejected'),(26,26,'2024-10-07','approved'),(27,NULL,NULL,'pending'),(28,NULL,'2024-10-01','approved'),(29,NULL,NULL,'pending'),(30,NULL,NULL,'pending'),(31,NULL,NULL,'pending'),(32,NULL,NULL,'pending'),(33,NULL,NULL,'pending'),(34,NULL,NULL,'pending'),(35,NULL,NULL,'pending'),(36,NULL,NULL,'pending'),(37,37,'2024-10-07','approved'),(38,38,'2024-10-07','approved'),(39,39,'2024-10-03','approved'),(40,40,'2024-10-10','approved'),(41,NULL,'2024-10-03','approved'),(42,42,'2024-10-10','approved');
/*!40000 ALTER TABLE `approvals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attachments`
--

DROP TABLE IF EXISTS `attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attachments` (
  `attachment_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `doctype` varchar(20) DEFAULT NULL,
  `document_url` varchar(100) DEFAULT NULL,
  `descript` varchar(200) DEFAULT NULL,
  `date_loaded` date DEFAULT NULL,
  `application_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`attachment_id`),
  KEY `user_id` (`user_id`),
  KEY `fk_application` (`application_id`),
  CONSTRAINT `attachments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `fk_application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`application_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attachments`
--

LOCK TABLES `attachments` WRITE;
/*!40000 ALTER TABLE `attachments` DISABLE KEYS */;
INSERT INTO `attachments` VALUES (6,NULL,'png','uploads/g3g.png','Nrc & Certificate G12','2024-09-10',NULL),(7,NULL,'image/png','uploads/g.png','Attachment for job 1','2024-09-10',NULL),(8,4,'image/png','uploads/Screenshot (1).png','Attachment for job 49','2024-09-25',NULL),(9,4,'image/png','uploads/Screenshot (6).png','Attachment for job 49','2024-09-25',NULL),(10,4,'image/png','uploads/g3g.png','Attachment for job 49','2024-09-26',NULL),(11,4,'image/png','uploads/g.png','Attachment for job 49','2024-09-26',NULL),(12,4,'image/png','uploads/Screenshot (2).png','Attachment for job 49','2024-09-26',NULL),(13,4,'image/png','uploads/Screenshot (31).png','Attachment for job 51','2024-09-26',NULL),(14,4,'image/png','uploads/g.png','Attachment for job 49','2024-09-26',NULL),(15,4,'image/png','uploads/Screenshot (1).png','Attachment for job 51','2024-09-26',NULL),(16,4,'image/png','uploads/Screenshot (6).png','Attachment for job 51','2024-09-26',NULL),(17,4,'image/png','uploads/Screenshot (7).png','Attachment for job 49','2024-09-28',NULL),(18,4,'image/png','uploads/Screenshot (30).png','Attachment for job 49','2024-09-28',NULL),(19,4,'image/png','uploads/Screenshot (7).png','Attachment for job 49','2024-09-28',NULL),(20,4,'image/png','uploads/Screenshot (7).png','Attachment for job 49','2024-09-28',NULL),(21,4,'image/png','uploads/Screenshot (7).png','Attachment for job 49','2024-09-28',NULL),(22,4,'image/png','uploads/Screenshot (1).png','Attachment for job 51','2024-09-28',NULL),(23,4,'image/png','uploads/Screenshot (3).png','Attachment for job 49','2024-09-28',NULL),(24,4,'image/png','uploads/Screenshot (7).png','Attachment for job 51','2024-09-28',NULL),(25,4,'image/png','uploads/g3g.png','Attachment for job 49','2024-09-29',NULL),(26,4,'image/png','uploads/Screenshot (1).png','Attachment for job 49','2024-09-29',NULL),(27,4,'image/png','uploads/Screenshot (30).png','Attachment for job 49','2024-09-29',NULL),(28,4,'image/png','uploads/g.png','Attachment for job 49','2024-09-29',NULL),(29,4,'image/png','uploads/g2.png','Attachment for job 49','2024-09-29',NULL),(30,4,'image/png','uploads\\g3g.png','Attachment for job 51','2024-09-29',NULL),(31,4,'image/png','uploads\\g3g.png','Attachment for job 51','2024-09-29',NULL),(32,4,'image/png','uploads\\g3g.png','Attachment for job 51','2024-09-29',NULL),(33,4,'image/png','uploads\\Screenshot (2).png','Attachment for job 51','2024-09-29',NULL),(34,4,'image/png','uploads\\Screenshot (7).png','Attachment for job 49','2024-09-29',NULL),(35,NULL,'image/png','uploads\\1.png','Attachment for job 51','2024-09-29',26),(36,4,'image/png','uploads\\g3g.png','Attachment for job 59','2024-10-01',NULL),(37,4,'image/png','uploads\\Screenshot (7).png','Attachment for job 59','2024-10-01',NULL),(38,4,'image/png','uploads\\g3g.png','Attachment for job 59','2024-10-01',NULL),(39,4,'image/png','uploads\\Screenshot (7).png','Attachment for job 59','2024-10-01',NULL),(40,4,'image/png','uploads\\g.png','Attachment for job 54','2024-10-01',NULL),(41,4,'image/png','uploads\\Screenshot (1).png','Attachment for job 58','2024-10-01',NULL),(42,4,'image/png','uploads\\g3g.png','Attachment for job 57','2024-10-01',NULL),(43,4,'image/png','uploads\\Screenshot (1).png','Attachment for job 56','2024-10-01',NULL),(44,4,'image/png','uploads\\g3g.png','Attachment for job 58','2024-10-01',NULL),(45,4,'image/png','uploads\\Screenshot (6).png','Attachment for job 49','2024-10-01',NULL),(46,4,'image/png','uploads\\Screenshot (1).png','Attachment for job 56','2024-10-01',NULL),(47,4,'image/png','uploads\\g.png','Attachment for job 58','2024-10-01',NULL),(48,4,'image/png','uploads\\g.png','Attachment for job 49','2024-10-01',37),(49,4,'image/png','uploads\\Screenshot (6).png','Attachment for job 58','2024-10-01',38),(50,4,'image/png','uploads\\g3g.png','Attachment for job 59','2024-10-01',39),(51,5,'image/png','uploads\\g.png','Attachment for job 51','2024-10-01',40),(52,5,'image/png','uploads\\Screenshot_20240806-144910.png','Attachment for job 54','2024-10-03',NULL),(53,5,'image/png','uploads\\g3g.png','Attachment for job 58','2024-10-07',42);
/*!40000 ALTER TABLE `attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_requirements`
--

DROP TABLE IF EXISTS `job_requirements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `job_requirements` (
  `job_requirements_id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `actual_requirements` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`job_requirements_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `job_requirements_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_requirements`
--

LOCK TABLES `job_requirements` WRITE;
/*!40000 ALTER TABLE `job_requirements` DISABLE KEYS */;
INSERT INTO `job_requirements` VALUES (55,54,'Nrc'),(56,55,'Nrc'),(57,56,'Nrc'),(58,57,'Nrc'),(59,58,'Nrc'),(62,61,'Nrc'),(63,51,'Nrc,Male,Above 22'),(64,60,'Nrc'),(67,62,'Nrc');
/*!40000 ALTER TABLE `job_requirements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `job_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `desc` varchar(50) DEFAULT NULL,
  `date_posted` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (51,'Gateman','Lusaka,Chalala k6000/month\n','2024-10-04 01:00:10',NULL),(54,'Maid','Lusaka,Kamwala k6784/month','2024-09-29 23:12:11',NULL),(55,'Gardener','Ndola k2500/month','2024-09-30 00:03:17',NULL),(56,'Gardener','Ndola k2500/month','2024-09-30 00:04:03',NULL),(57,'Nanny','Lusaka,CHilengek674/month','2024-09-30 02:01:12',NULL),(58,'Nanny','Lusaka,Linda k3663/month','2024-10-01 19:03:19',NULL),(60,'Kamalonda','Lusaka,k2000/month','2024-10-04 01:00:25',4),(61,'House Help','Kitwe,k8982/month','2024-10-03 21:51:46',4),(62,'Gardener','Mansa,k2900/month','2024-10-04 01:26:59',4);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `actual_message` text NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (33,'Dear Mukuka Your Appplication for the job Nanny has been Successfully Approved!\nEmployer Line 0978363746',5,'2024-10-10');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL AUTO_INCREMENT,
  `actual_notification` text NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email_address` varchar(200) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `nrc` varchar(12) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `marital_status` varchar(12) DEFAULT NULL,
  `image_url` varchar(100) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_address` (`email_address`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Emelina','Kombe','emelinak48@gmail.com','2024-09-10','Female',77760632,'40279482','$2b$12$Yv5ACYBC9HmWa3TtLTjnPutFCu/rH9zX02WPqXz1ZBqn0yikkJoca','Married','IMG_20231108_103721.jpg',1),(5,'Mukuka','Mulenga','mukukamulenga356@gmail.com','2024-09-15','male',777606362,'402792171','$2b$12$ruqBEdr5LtJPkAyEpHntzOdC1weDQx1gDNTvJGftv9M5yvmJ1VfLS','single','2.png',0);
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

-- Dump completed on 2024-10-10 21:56:34
