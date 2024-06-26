--Drops the database if it exists
DROP DATABASE IF EXISTS MindEase;
CREATE DATABASE MindEase;

USE MindEase;

CREATE TABLE Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email  VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(20),
  last_name VARCHAR(20), 
  title VARCHAR(20) DEFAULT 'Opiskelija', 
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_level VARCHAR(10) DEFAULT 'regular',
  risk_group VARCHAR(5) DEFAULT 'ei',
  risk_group_date DATETIME,
  chat_permission VARCHAR(5) DEFAULT 'ei',
  chat_permission_date DATETIME
);

CREATE TABLE Symptoms (
  symptom_id INT AUTO_INCREMENT,
  entry_date DATE NOT NULL,
  frustration BOOLEAN,
  grumpiness BOOLEAN,
  recall_problems BOOLEAN,
  restlesness BOOLEAN,
  disquiet BOOLEAN,
  tiredness BOOLEAN,
  anxiety BOOLEAN,
  difficulty_making_decisions BOOLEAN,
  sleep_disturbances BOOLEAN,
  changes_in_appetite BOOLEAN,
  headache BOOLEAN,
  neck_pain BOOLEAN,
  vertigo BOOLEAN,
  palpitation BOOLEAN,
  nausea BOOLEAN,
  upset_stomach BOOLEAN,
  recurring_colds BOOLEAN,
  back_issues BOOLEAN,
  stress_level INT,
  user_id INT NOT NULL,
  PRIMARY KEY (symptom_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Messages (
  message_id INT AUTO_INCREMENT PRIMARY KEY,
  conversation_id INT,
  recipient_id INT NOT NULL,
  message_content VARCHAR(200),
  message_sent_at DATETIME, 
  message_read BOOLEAN DEFAULT '0',
  sender_id INT NOT NULL,
  FOREIGN KEY (sender_id) REFERENCES Users(user_id)
);

CREATE TABLE Lifestyle (
  lifestyle_id INT AUTO_INCREMENT,
  entry_date DATE NOT NULL,
  feel_healthy VARCHAR(10),
  medication VARCHAR(255),
  medication_purpose VARCHAR(255),
  caffeine_intake DECIMAL(5,2),
  nicotine_intake DECIMAL(5,2),
  alcohol_intake DECIMAL(5,2),
  hours_slept DECIMAL(5,2),
  enough_sleep VARCHAR(10),
  quality_sleep VARCHAR(50),
  physical_activity VARCHAR(100),
  duration INT,
  intensity VARCHAR(20),
  user_id INT NOT NULL,
  PRIMARY KEY (lifestyle_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE hrv_analysis (
  hrv_id INT AUTO_INCREMENT,
  stress_index FLOAT,
  mood INT,
  entry_date DATE,
  av_hrv FLOAT,
  mean_rr_ms FLOAT,
  sdnn_ms FLOAT,
  readiness FLOAT,
  user_id INT NOT NULL,
  PRIMARY KEY (hrv_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Complete_analysis (
  analysis_id INT AUTO_INCREMENT,
  user_id INT NOT NULL,
  analysis_result VARCHAR(50),
  analysis_enumerated INT NOT NULL,
  created_at DATETIME NOT NULL,
  PRIMARY KEY (analysis_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

--Inserts  sample data

-- Only required data When creating a student profile in db
/* INSERT INTO Users(username, password, email, first_name) VALUES
('johndoe', 'hashed_password', 'johndoe@example.com', 'John', 'Doe');*/

-- Insert sample student info
INSERT INTO Users(password, username, email, first_name, last_name, created_at, risk_group, chat_permission ) VALUES
('$2a$10$MlG42c49xY993QgyouBdKOb4XltlVQM2DO1SkrJclD3z/819EHQz2', 'johndoe@example.com', 'johndoe@example.com', 'John', 'Doe', '2024-03-24 09:00:00', 'ei', 'ei'),
('$2a$10$MlG42c49xY993QgyouBdKOb4XltlVQM2DO1SkrJclD3z/819EHQz2', 'tom.smith@example.com','tom.smith@example.com', 'Tom', 'Smith', '2024-03-24 09:00:00', 'ei', 'ei' );

-- Sample riskgroup student
INSERT INTO Users(password, username, email, first_name, last_name, created_at, risk_group, chat_permission, risk_group_date, chat_permission_date) VALUES
('$2a$10$MlG42c49xY993QgyouBdKOb4XltlVQM2DO1SkrJclD3z/819EHQz2', 'ajones@example.com', 'ajones@example.com', 'Alice', 'Jones', '2024-03-24 09:00:00', 'kyllä', 'kyllä', '2024-03-25 09:00:00', '2024-02-26 09:00:00');

-- Insert sample professional roles
INSERT INTO Users(password, username, title, created_at, user_level, chat_permission, chat_permission_date, email) VALUES 
('$2a$10$MlG42c49xY993QgyouBdKOb4XltlVQM2DO1SkrJclD3z/819EHQz2', 'jane.doe@example.com', 'Ylläpitäjä', '2024-03-24 08:00:00', 'admin', 'kyllä', '2024-03-24 08:00:00', 'jane.doe@example.com'), 
('$2a$10$MlG42c49xY993QgyouBdKOb4XltlVQM2DO1SkrJclD3z/819EHQz2', 'bob@example.com', 'Sairaanhoitaja', '2024-03-24 08:15:00', 'hcp', 'kyllä', '2024-03-24 08:15:00', 'bob@example.com');

-- Insert sample symptoms (oirekysely)
INSERT INTO Symptoms(entry_date, frustration, grumpiness, recall_problems, restlesness, disquiet,
 tiredness, anxiety, difficulty_making_decisions, sleep_disturbances, changes_in_appetite, headache,
 neck_pain, vertigo, palpitation, nausea, upset_stomach, recurring_colds, back_issues, stress_level, user_id) VALUES 
('2024-03-25', '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2', '1' ),
('2024-03-25', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '0', '0', '4', '3' );


-- Insert sample lifestyle factors (Elämäntapakysely)
INSERT INTO Medications(entry_date, medication, dose, unit, frequency, indication, user_id) VALUES
('2024-03-25', 'Histec', '10', 'mg', 'kerran päivässä', 'heinäallergia', '1' ),
('2024-03-25', 'Panadol', '500', 'mg', '2 kertaa päivsässä', 'flunssa', '3');

-- Insert sample lifestyle factors (Elämäntapakysely)
INSERT INTO Dietaries(entry_date, dietary_supplement, dose, unit, user_id) VALUES 
('2024-03-25', 'D-vitamiini', '20', 'mikrog', '3'),
('2024-03-25', 'Calcichew', '500', 'mg', '3');

-- Insert sample lifestyle factors (Elämäntapakysely)
INSERT INTO Intoxicants(entry_date, caffeine, nicotine, alcohol, user_id) VALUES 
('2024-03-25','400', '30', '4', '1'),
('2024-03-25', '320', '0.0', '0.0', '3');

-- Insert sample messages
INSERT INTO Messages(conversation_id, recipient_id, message_content, message_sent_at, sender_id) VALUES 
('1', '5', 'Moi, miten voin auttaa?', '2024-03-25 09:00:00', '7'),
('1', '7', 'Moi, mua stressaa.', '2024-03-25 09:01:00', '5'),
('1', '5', 'Okei, katon sun tietoja.', '2024-03-25 09:02:00', '7');

-- Insert sample lifestyle factors (Elämäntapakysely)
INSERT INTO hrv_analysis(stress_index, mood, entry_date, av_hrv, user_id) VALUES 
('1.676786867394357', '4', '2024-03-25', '60.50632717079356', '1'),
('8.676786867394357', '3', '2024-03-25', '64.40632717079356', '3'); 

-- Insert sample analysis (kokonaisanalyysi)
INSERT INTO Complete_analysis(user_id, analysis_result, analysis_enumerated, created_at) VALUES 
('6', 'Alhainen stressi', '1', '2024-03-25 10:00:00'),
('6', 'Kohtalainen stressi', '2', '2024-03-26 10:00:00'),
('6', 'Alhainen stressi', '1', '2024-03-27 10:00:00'),
('6', 'Korkea stressi', '3', '2024-03-28 10:00:00'),
('6', 'Korkea stressi', '3', '2024-03-29 10:00:00'),
('6', 'Kohtalainen stressi', '2', '2024-03-30 10:00:00');  