CREATE USER 'myusername'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON `databasename`.* TO 'myusername'@'localhost';
FLUSH PRIVILEGES;
