SET character_set_client = utf8;

CREATE TABLE `userinfo` (
  `userid` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `balance` int DEFAULT NULL,
  `amdin` TINYINT(1) NOT NULL ,
  PRIMARY KEY (`userid`)
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;


CREATE TABLE `movieset` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mv_name` varchar(20) NOT NULL UNIQUE,
  `mv_lang` varchar(20) DEFAULT NULL,
  `poster` varchar(50) DEFAULT NULL,
  `introduce` varchar(200) DEFAULT NULL,
  `duration` int NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `grade` float DEFAULT NULL,
  PRIMARY KEY (`id`,`mv_name`)
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

CREATE TABLE `cinema_info` (
  `cinema_id` int NOT NULL AUTO_INCREMENT,
  `cinema_name` varchar(20) NOT NULL UNIQUE,
  `cinema_loc` varchar(20) DEFAULT NULL,
  `cinema_discrip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`cinema_id`,`cinema_name`)
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

CREATE TABLE `cinema_hall` (
  `cinema_id` int NOT NULL,
  `hall_id` int NOT NULL,
  `totalseat` int NOT NULL,
  `seat_row` int NOT NULL,
  `seat_col` int NOT NULL,
  PRIMARY KEY (`cinema_id`,`hall_id	`),
  FOREIGN KEY(cinema_id) REFERENCES cinema_info(cinema_id)
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

CREATE TABLE `filmsession`(
  `film_id` INT NOT NULL AUTO_INCREMENT,
  `cinema_id` int NOT NULL,
  `hall_id` int NOT NULL,
  `mv_name` varchar	(20) NOT NULL,
  `start_time` DATETIME NOT NULL,
  `end_time` DATETIME NOT NULL,
  PRIMARY KEY (`film_id`),
  FOREIGN KEY(cinema_id,hall_id) REFERENCES cinema_hall(cinema_id,hall_id),
  FOREIGN KEY(mv_name) REFERENCES movieset(mv_name)
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;

CREATE TABLE `tickets`(
  `tickets_id` int NOT NULL AUTO_INCREMENT,
  `film_id` int NOT NULL,
  `userid` varchar(20) NOT NULL,
  `row` INT NOT NULL,
  `col` INT NOT NULL,
  PRIMARY KEY(`tickets_id`),
  FOREIGN KEY(film_id) REFERENCES filmsession(film_id),
  FOREIGN KEY(userid) REFERENCES userinfo(userid)
)ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_general_ci;