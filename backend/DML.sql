-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for pcb
CREATE DATABASE IF NOT EXISTS `pcb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pcb`;

-- Dumping structure for table pcb.mach_dien
CREATE TABLE IF NOT EXISTS `mach_dien` (
  `id_mach` int NOT NULL AUTO_INCREMENT,
  `anh_mach` varchar(255) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `so_loi` int DEFAULT NULL,
  `bao_cao` text COLLATE utf8mb4_vietnamese_ci,
  `ngay_them` datetime DEFAULT CURRENT_TIMESTAMP,
  `id` int DEFAULT NULL,
  PRIMARY KEY (`id_mach`),
  KEY `id` (`id`),
  CONSTRAINT `mach_dien_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table pcb.mach_dien: ~0 rows (approximately)
INSERT INTO `mach_dien` (`id_mach`, `anh_mach`, `so_loi`, `bao_cao`, `ngay_them`, `id`) VALUES
	(8, 'mach_dien_01.png', 2, 'hoan thanh tot', '2024-09-23 00:00:00', 4);

-- Dumping structure for table pcb.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `provider` enum('google','github','email') COLLATE utf8mb4_vietnamese_ci DEFAULT 'email',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table pcb.user: ~9 rows (approximately)
INSERT INTO `user` (`id`, `name`, `email`, `password`, `provider`, `created_at`, `is_admin`) VALUES
	(4, 'tttttttt', 'hairobet15092005@gmail.com', '$2a$10$cme5WDoJ1JOaoyRcHHOwC.9dYEuoa0Sp7g/XVelrik05UNA/2091K', 'email', '2024-09-23 02:50:00', 1),
	(6, 'Tran van Hai', 'tranvanhai12345@gmail.com', '$2a$10$1s3EmDKhWekhSuhU.S/n.O9KV3e/Mo2f5gBiC23E8C8JQdK9VeJAq', 'email', '2024-09-23 07:33:37', 0),
	(7, 'j365030@gmail.com', 'hairobet150920r05@gmail.com', '$2a$10$c59b8H.FcmLR6Ax9v8bzVe9SUtrglcI0HaGXnyHlv.5eTNwNIeVbm', 'email', '2024-09-23 07:33:43', 0);

-- Dumping structure for table pcb.user_sessions
CREATE TABLE IF NOT EXISTS `user_sessions` (
  `session_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `access_token` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `refresh_token` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` timestamp NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table pcb.user_sessions: ~1 rows (approximately)
INSERT INTO `user_sessions` (`session_id`, `user_id`, `access_token`, `refresh_token`, `created_at`, `expires_at`) VALUES
	(69, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaXNfYWRtaW4iOjEsImlhdCI6MTcyNzE5NzE3NCwiZXhwIjoxNzI3MTk3MjM0fQ.fcIhr0cqpCpoJDh3FNkwxOuQstsH9M-t9J4EdAiV_Tk', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaXNfYWRtaW4iOjEsImlhdCI6MTcyNzE5NzE3NCwiZXhwIjoxNzU4NzMzMTc0fQ.VHflzjL4mGBtc7RvyK0Ixg-bMgwhM6mDZL2Pl1-JF44', '2024-09-24 16:59:34', '2025-09-24 16:59:34');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
