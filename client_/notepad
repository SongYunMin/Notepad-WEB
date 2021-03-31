-- MySQL dump 10.13  Distrib 8.0.23, for osx10.16 (x86_64)
--
-- Host: localhost    Database: notepad
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `notepads`
--

DROP TABLE IF EXISTS `notepads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notepads` (
  `number` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(30) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `memo` text,
  `tab` int NOT NULL,
  PRIMARY KEY (`number`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notepads_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notepads`
--

LOCK TABLES `notepads` WRITE;
/*!40000 ALTER TABLE `notepads` DISABLE KEYS */;
INSERT INTO `notepads` VALUES (4,'sms8377','송윤민','윤민',1),(6,'1234','New Tab 42257','',1),(7,'1234','ㅈㅂ덪버ㅏ인ㅁㅈㄷ','ㅈㅂ다ㅜㅏㅁ니어ㅣㅈㅂㄷ',1),(8,'1234','aa','aawqe',2);
/*!40000 ALTER TABLE `notepads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_sessions`
--

DROP TABLE IF EXISTS `user_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_sessions` (
  `user_id` varchar(30) NOT NULL,
  `count` int NOT NULL,
  `active` int NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_sessions`
--

LOCK TABLES `user_sessions` WRITE;
/*!40000 ALTER TABLE `user_sessions` DISABLE KEYS */;
INSERT INTO `user_sessions` VALUES ('1234',3,2),('sms8377',1,0);
/*!40000 ALTER TABLE `user_sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID` varchar(30) NOT NULL,
  `password` varchar(580) NOT NULL,
  `nickname` varchar(50) NOT NULL,
  `salt` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('1234','3e9kBMF4WidIvHK1Vbxoy/z3PC6kux+w4lB62OagfrzXIUqfXsMUGvkeRjAS4JnPpS++M+Kj1q4/X0mFfGE11g==','윤민','ZFO9fVm6gks5ZisjMBUMGTzpSqhQ/gTItdN/ZGRgauujBRH/ME4Dm52UJOuLO0KDfmr4q0Cvt6Ps2AcJScHcsw=='),('4321','H93CUJ5tqEA37jklhi5IRc+vucG4S4ecbxfWcvCglSX0QofguA3y3y26JBw38ylILTFfMlgvmqYdLALZgSOdtg==','Mins','Eb2tOa93TpNvvcQTjKqUVSLXI7+GWDy09hcUeop+yqdrIpw69RswcUKi68D/4OlkooJQK1d23A0b6u4Z6ovnZg=='),('sms8377','+XNdn2bmi6COwXD2/2XRs/wgDhq6x+I9Iz1Ono0vXyVQ2yp06zpO6WzbERiF9bFyA5cm6z+SqA2iFNG8+JMY6A==','Song','Zrlh6MQbBZn0gYOyFF7tHYWjx7zYOMTE7z/x1C9pEwP86V14L+zPCv93MBnA9soCkEtMr9o6TPTif6gZo1zjaA==');
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

-- Dump completed on 2021-03-31 14:15:58
