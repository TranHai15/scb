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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table pcb.user: ~9 rows (approximately)
INSERT INTO `user` (`id`, `name`, `email`, `password`, `provider`, `created_at`, `is_admin`) VALUES
	(4, 'tttttttt', 'hairobet15092005@gmail.com', '$2a$10$cme5WDoJ1JOaoyRcHHOwC.9dYEuoa0Sp7g/XVelrik05UNA/2091K', 'email', '2024-09-23 02:50:00', 1),
	(6, 'Tran van Hai', 'tranvanhai12345@gmail.com', '$2a$10$1s3EmDKhWekhSuhU.S/n.O9KV3e/Mo2f5gBiC23E8C8JQdK9VeJAq', 'email', '2024-09-23 07:33:37', 0),
	(7, 'j365030@gmail.com', 'hairobet150920r05@gmail.com', '$2a$10$c59b8H.FcmLR6Ax9v8bzVe9SUtrglcI0HaGXnyHlv.5eTNwNIeVbm', 'email', '2024-09-23 07:33:43', 0),
	(8, 'matheobe ', 'hairobet92005@gmail.com', '$2a$10$kt7hDHT6vzUKCliBah1rOOwtjPIGOh.bhyqU/vpjr9XPA3LH.6nRK', 'email', '2024-09-23 08:45:23', 0),
	(9, 'hairobet15092005@gmail.com', 'hairobet15ee092005@gmail.com', '$2a$10$o/ezZSFcmcYUq.s27.eGlOAEeQonhFRVv6f4oKiV6X8ReZYaP5CAG', 'email', '2024-09-23 09:37:15', 0),
	(10, 'Tran van Hai', 'tranvanhai12uu345@gmail.com', '$2a$10$51BnkFS1VKjkb1pxxwnmaOtm1FCAUM9M..MEjXs9Le80bgfpZrD0q', 'email', '2024-09-23 11:18:44', 0),
	(11, 'jjjjhsjgbvjkba', 'hairobet5@gmail.com', '$2a$10$7npibaNwoMsRxQxyJWA4QuKipXDGvJuyXgE5dhnF8qIo8aEDRUEnG', 'email', '2024-09-23 13:59:47', 0),
	(12, 'dddddddd', 'hai@gmail.com', '$2a$10$GpBQba.4yuLVEGRJhKslKuZDiS9qEg4Efr/00dPYWgepO7.sFLYqG', 'email', '2024-09-23 14:00:11', 0),
	(13, 'j365030@gmail.com', 'hai123@gmail.com', '$2a$10$QuZWcDIxhbCXdyQ34HhEOuaIe/NiBno/DQwQ2R9.4lLpuS5nkc7nW', 'email', '2024-09-23 14:10:13', 0);

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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- Dumping data for table pcb.user_sessions: ~3 rows (approximately)
INSERT INTO `user_sessions` (`session_id`, `user_id`, `access_token`, `refresh_token`, `created_at`, `expires_at`) VALUES
	(33, 13, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlzX2FkbWluIjowLCJpYXQiOjE3MjcxMDA2MjMsImV4cCI6MTcyNzEwMDc0M30.Y5To6iJfCI_fMcHrpHD7MBJLaH26TvhwRDbFnxf2WvY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlzX2FkbWluIjowLCJpYXQiOjE3MjcxMDA2MjMsImV4cCI6MTc1ODYzNjYyM30.qpuWWKo2lxXgQJOwe6XGBuTvgqMvuY8yzvYbptYKoZE', '2024-09-23 14:10:23', '2025-09-23 14:10:24'),
	(34, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaXNfYWRtaW4iOjEsImlhdCI6MTcyNzEwMDk4NywiZXhwIjoxNzI3MTAxMTA3fQ.TvUx0nUkGyz3pG2LnaiZc-uIVAL38LIW6w2HN-2bwEo', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaXNfYWRtaW4iOjEsImlhdCI6MTcyNzEwMjk1NywiZXhwIjoxNzU4NjM4OTU3fQ.YHgKhzDCmvaD0_cqK7NxsbBUjTyb-B-Es7MzTilEwbM', '2024-09-23 14:16:27', '2025-09-23 14:16:27'),
	(35, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaXNfYWRtaW4iOjEsImlhdCI6MTcyNzEwMjQ3NiwiZXhwIjoxNzI3MTAyNTk2fQ.6ocGakZIRvAuX682gcn_76v2zFu9g3qAG7N52eVRjbw', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaXNfYWRtaW4iOjEsImlhdCI6MTcyNzEwMjk1NywiZXhwIjoxNzU4NjM4OTU3fQ.YHgKhzDCmvaD0_cqK7NxsbBUjTyb-B-Es7MzTilEwbM', '2024-09-23 14:41:16', '2025-09-23 14:41:17'),
	(36, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaXNfYWRtaW4iOjEsImlhdCI6MTcyNzEwMjkyNCwiZXhwIjoxNzI3MTAzMDQ0fQ.zH5zgc8u2MlHPTAhBEdY3pjahz35u0Tx1WmEeSEgxm4', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaXNfYWRtaW4iOjEsImlhdCI6MTcyNzEwMjk1NywiZXhwIjoxNzU4NjM4OTU3fQ.YHgKhzDCmvaD0_cqK7NxsbBUjTyb-B-Es7MzTilEwbM', '2024-09-23 14:48:44', '2025-09-23 14:48:44'),
	(37, 4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaXNfYWRtaW4iOjEsImlhdCI6MTcyNzEwMjk0MSwiZXhwIjoxNzI3MTAzMDYxfQ.LWezaptfA40ZKojxWv3DCpLiBpKpeDuGd9ZLAj2hevo', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaXNfYWRtaW4iOjEsImlhdCI6MTcyNzEwMjk1NywiZXhwIjoxNzU4NjM4OTU3fQ.YHgKhzDCmvaD0_cqK7NxsbBUjTyb-B-Es7MzTilEwbM', '2024-09-23 14:49:01', '2025-09-23 14:49:01');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
