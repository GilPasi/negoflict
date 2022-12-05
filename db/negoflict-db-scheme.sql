create schema if not exists `negoflict`;

DROP USER IF EXISTS 'negoflict'@'%';
CREATE USER 'negoflict'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL ON 'negoflict'@'%'.* TO 'negoflict'@'%';
FLUSH PRIVILEGES;
