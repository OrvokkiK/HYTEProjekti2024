CREATE USER 'myusername'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON `MindEase`.* TO 'myusername'@'localhost';
FLUSH PRIVILEGES;
