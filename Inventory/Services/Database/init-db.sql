-- init-db.sql
CREATE DATABASE IF NOT EXISTS monitoring;
GRANT ALL PRIVILEGES ON inventory.* TO 'app_user'@'%';
GRANT ALL PRIVILEGES ON monitoring.* TO 'app_user'@'%';
FLUSH PRIVILEGES;

