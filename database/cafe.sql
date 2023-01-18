/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50724 (5.7.24)
 Source Host           : localhost:3306
 Source Schema         : cafe

 Target Server Type    : MySQL
 Target Server Version : 50724 (5.7.24)
 File Encoding         : 65001

 Date: 18/01/2023 17:51:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for attributes
-- ----------------------------
DROP TABLE IF EXISTS `attributes`;
CREATE TABLE `attributes`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `categoty_id` int(10) NULL DEFAULT NULL,
  `type_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `option_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sweetness_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `active_status` tinyint(1) NULL DEFAULT 1 COMMENT '0 = ไม่ได้ใช้งาน, 1 = ใช้งาน',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attributes
-- ----------------------------
INSERT INTO `attributes` VALUES (1, 1, '1,2', '1,2', '1,2,3', 1);
INSERT INTO `attributes` VALUES (2, 2, '1,2', '1,2', '1,2,3', 1);
INSERT INTO `attributes` VALUES (3, 3, NULL, '1,2', NULL, 1);

-- ----------------------------
-- Table structure for beverage
-- ----------------------------
DROP TABLE IF EXISTS `beverage`;
CREATE TABLE `beverage`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `category_id` int(10) NULL DEFAULT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `duration` int(3) NULL DEFAULT NULL,
  `create_date` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modify_date` datetime NULL DEFAULT NULL,
  `active_status` tinyint(1) NULL DEFAULT 1 COMMENT '0 = ไม่ได้ใช้งาน , 1 = ใช้งาน',
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of beverage
-- ----------------------------
INSERT INTO `beverage` VALUES (1, 1, 'Espresso', 25.00, 35, '2023-01-18 17:49:57', '2023-01-18 17:44:01', 1, 'เอสเปรสโซ่กลั่น3 ออนซ์\r\nนมข้นหวาน1 ออนซ์\r\nนมข้นจืด1 ออนซ์ ');
INSERT INTO `beverage` VALUES (2, 1, 'Americano', 30.00, 40, '2023-01-18 10:28:01', '2023-01-18 10:28:01', 1, NULL);
INSERT INTO `beverage` VALUES (3, 1, 'Latte', 35.00, 45, '2023-01-18 10:28:01', '2023-01-18 10:28:01', 1, NULL);
INSERT INTO `beverage` VALUES (4, 2, 'Taiwan tea', 35.00, 35, '2023-01-18 10:28:01', '2023-01-18 10:28:01', 1, NULL);
INSERT INTO `beverage` VALUES (5, 2, 'Thai tea', 25.00, 35, '2023-01-18 10:28:01', '2023-01-18 10:28:01', 1, NULL);
INSERT INTO `beverage` VALUES (6, 3, 'Soda', 15.00, 30, '2023-01-18 10:28:01', '2023-01-18 10:28:01', 1, NULL);
INSERT INTO `beverage` VALUES (7, 3, 'Cola', 15.00, 30, '2023-01-18 10:28:01', '2023-01-18 10:28:01', 1, NULL);
INSERT INTO `beverage` VALUES (8, 3, 'Energy drink', 25.00, 30, '2023-01-18 10:28:01', '2023-01-18 10:28:01', 1, NULL);
INSERT INTO `beverage` VALUES (9, 2, 'Green Tea', 40.00, 40, NULL, NULL, 1, '');
INSERT INTO `beverage` VALUES (10, 2, 'Green Tea', 40.00, 40, NULL, NULL, 1, '');
INSERT INTO `beverage` VALUES (11, 2, 'Green Tea', 40.00, 40, '2023-01-18 17:28:41', NULL, 1, '');
INSERT INTO `beverage` VALUES (12, 2, 'Green Tea', 40.00, 40, '2023-01-18 17:47:22', NULL, 0, '');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'Coffee');
INSERT INTO `category` VALUES (2, 'Tea');
INSERT INTO `category` VALUES (3, 'Sotf drink');

-- ----------------------------
-- Table structure for options
-- ----------------------------
DROP TABLE IF EXISTS `options`;
CREATE TABLE `options`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of options
-- ----------------------------
INSERT INTO `options` VALUES (1, 'Straw');
INSERT INTO `options` VALUES (2, 'Cup cover');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `order_code` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `beverage_id` int(10) NULL DEFAULT NULL,
  `quantity` int(4) NULL DEFAULT NULL,
  `create_date` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type_id` int(10) NULL DEFAULT NULL,
  `option_id` int(10) NULL DEFAULT NULL,
  `sweetness_id` int(10) NULL DEFAULT NULL,
  `amount` decimal(10, 2) NULL DEFAULT NULL,
  `duration` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES (1, '1674033130453', 2, 2, '2023-01-18 16:12:10', 2, 1, 1, 70.00, 80);
INSERT INTO `orders` VALUES (2, '1674035528387', 2, 2, '2023-01-18 16:52:08', 2, 1, 1, 70.00, 80);
INSERT INTO `orders` VALUES (3, '1674035568602', 2, 2, '2023-01-18 16:52:48', 2, 1, 1, 70.00, 80);

-- ----------------------------
-- Table structure for payment
-- ----------------------------
DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `order_code` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `amount` int(10) NULL DEFAULT NULL,
  `pay` int(10) NULL DEFAULT NULL,
  `change` int(10) NULL DEFAULT NULL,
  `status_payment` tinyint(1) NULL DEFAULT 0 COMMENT '0 = ยังไม่ได้จ่าย , 1 = จ่ายแล้ว',
  `duration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of payment
-- ----------------------------
INSERT INTO `payment` VALUES (1, '1674033130453', 70, 70, 0, 1, NULL);
INSERT INTO `payment` VALUES (2, '1674035528387', 70, NULL, NULL, 0, NULL);
INSERT INTO `payment` VALUES (3, '1674035568602', 70, 70, 0, 1, '80');

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock`  (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `pcs` int(3) NULL DEFAULT NULL,
  `beverage_id` int(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of stock
-- ----------------------------
INSERT INTO `stock` VALUES (1, 15, 1);
INSERT INTO `stock` VALUES (2, 3, 2);
INSERT INTO `stock` VALUES (3, 5, 3);
INSERT INTO `stock` VALUES (4, 1, 4);
INSERT INTO `stock` VALUES (5, 2, 5);
INSERT INTO `stock` VALUES (6, 1, 6);
INSERT INTO `stock` VALUES (7, 10, 7);
INSERT INTO `stock` VALUES (8, 8, 8);
INSERT INTO `stock` VALUES (9, 10, 12);

-- ----------------------------
-- Table structure for sweetness
-- ----------------------------
DROP TABLE IF EXISTS `sweetness`;
CREATE TABLE `sweetness`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sweetness
-- ----------------------------
INSERT INTO `sweetness` VALUES (1, 'Less sugar');
INSERT INTO `sweetness` VALUES (2, 'Default');
INSERT INTO `sweetness` VALUES (3, 'More sugar');

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES (1, 'Hot', 0.00);
INSERT INTO `type` VALUES (2, 'Cold', 5.00);

SET FOREIGN_KEY_CHECKS = 1;
