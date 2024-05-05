# MindEase stressinhallinta sovellus
## Start Backend-server
```
npm run dev
```
tai
```
npm run start
```

## Required packages
### bcryptjs
```
npm install bcrypt
```
### Chart js
```
npm i chart.js
```

### Chart js plugin zoom
```
npm i chartjs-plugin-zoom
```

### cors (cross-origin resquests)
```
npm install cors
```
### dotenv
```
npm install dotenv
```

### express validator
```
npm install express-validator
```

### mysql2
```
npm install --save mysql2
npm audit fix
nmp i mysql2
```

> [!WARNING]
> Make sure your using version 3.9.7 or higher of mysql2.

# Routes

## Authentication/authorization endpoints

##
## /api/auth/login
##

### Login as a regular user
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "username" : "",
  "password": ""
}
```
##
## /api/auth/professional/
##

### Login as an admin/hpc
```
POST http://localhost:3000/api/auth/professional/login
Content-Type: application/json

{
  "username" : "",
  "password": ""
}
```
##
## /api/auth/me
##

### Fetch user's data (requires token)
```
GET http://localhost:3000/api/auth/me
Authorization: Bearer
```
## User data related endpoints

##
## /api/users endpoint
##

### Fetcht all user data (requires token)
```
GET http://localhost:3000/api/users
Authorization: Bearer
```
### Fetch user data by user's id (requires token)
```
GET http://localhost:3000/api/users/6
Authorization: Bearer
```
### Create a new user
```
POST  http://localhost:3000/api/users
content-type: application/json

{
    "username": "",
    "password": "",
    "email" : "",
    "first_name": "",
    "last_name": ""
}
```
### Edit an existing user's data (requires token)
```
PUT http://localhost:3000/api/users/5
Authorization: Bearer
Content-Type: application/json

{
    "username": "",
    "password": "", 
    "first_name": "",
    "last_name": "",
    "chat_permission" : "",
    "chat_permission_date" : ""
}
```
### Delete an existing user (requires token)
```
DELETE http://localhost:3000/api/users/6
Authorization: Bearer
```
##
## /api/student routes (requires token)
## 

### Fetch all student's ids and usernames (requires token)
```
GET http://localhost:3000/api/student/
Authorization: Bearer
```
## Symptom related endpoints

##
## /api/symptoms routes
##

### Fetch all entries in symptoms (requires token)
```
GET http://localhost:3000/api/symptoms/
Authorization: Bearer
```

##
## /api/symptoms/:id routes
##

### Fetch all of the entries by user_id
```
GET http://localhost:3000/api/symptoms/11
Authorization: Bearer
```
### Create a new symptom entry (requires token)
```
POST http://localhost:3000/api/3
Authorization: Bearer
Content-Type: application/json

{
  "entry_date" : "2024-04-05", 
  "frustration" : "1", 
  "grumpiness" : "1", 
  "recall_problems": "1", 
  "restlesness": "1", 
  "disquiet": "1", 
  "tiredness": "1", 
  "anxiety" : "1", 
  "difficulty_making_decisions" : "1", 
  "sleep_disturbances": "1", 
  "changes_in_appetite": "1", 
  "headache": "1", 
  "neck_pain": "1", 
  "vertigo": "1", 
  "palpitation": "1", 
  "nausea": "1", 
  "upset_stomach": "1", 
  "recurring_colds": "1", 
  "back_issues": "1", 
  "stress_level": "5"
}
```
### Edit an existing entry in symptoms (requires token)
```
PUT http://localhost:3000/api/symptoms/5
Authorization: Bearer 
Content-Type: application/json

{
  "frustration" : "1", 
  "grumpiness" : "0", 
  "recall_problems": "1", 
  "restlesness": "0", 
  "disquiet": "1", 
  "tiredness": "0", 
  "anxiety" : "1", 
  "difficulty_making_decisions" : "0", 
  "sleep_disturbances": "1", 
  "changes_in_appetite": "0", 
  "headache": "1", 
  "neck_pain": "0", 
  "vertigo": "1", 
  "palpitation": "0", 
  "nausea": "1", 
  "upset_stomach": "0", 
  "recurring_colds": "1", 
  "back_issues": "0", 
  "stress_level": "5",
  "user_id" : "10"
}
```

##
## /api/symptoms/user/:id
##

### Fetch symptom entries by user's id (requires token)
```
GET http://localhost:3000/api/symptoms/user/6
Authorzation: Bearer 
```

##
## /api/symptoms/:symptom_id/user/:user_id
##

### Fetch symptoms by symptom_id and user_id (requires token)
```
GET http://localhost:3000/api/symptoms/2/user/6
Authorization: Bearer 
```
### Delete entry in symptoms with symptom_id and user_id (requires token)
```
DELETE http://localhost:3000/api/symptoms/4/user/10
Authorization: Bearer
```
# Lifestyle data related endpoints






# HRV data related endpoints






# Analysis related endpoints

##
## /api/analysis routes
## 

### Fecth all entries in analysis (requires token)
```
GET http://localhost:3000/api/analysis/
Authorization: Bearer 
```
### Fetch entry by analysis id (requires token)
```
GET http://localhost:3000/api/analysis/3
Authorization: Bearer 
```
### Create a new analysis entry (requires token)
```
POST http://localhost:3000/api/analysis/
Authorization: Bearer
Content-Type: application/json

{
  "user_id": "10",
  "analysis_result": "Korkea stressi",
  "analysis_enumerated": "1",
  "created_at": "2024-05-4 16:00:00"
}
```
### Edit an existing analysis entry (requires token) 
```
PUT http://localhost:3000/api/analysis/5
Authorization: Bearer 
Content-Type: application/json

{
  "user_id": "2",
  "analysis_result": "Korkea stressi",
  "analysis_enumerated": "3",
  "created_at": "2024-05-4 15:00:00"
}
```
##
## /api/analysis/user/ routes
##

### Fetch all analysis entries of a specific user (requires token)
```
GET http://localhost:3000/api/analysis/user/6
Authorization: Bearer 
```

##
## /api/analysis/:id/user/:id
##

### Delete a specific entry in analysis of a specific user (requires token)
```
DELETE http://localhost:3000/api/analysis/6/user/10
Authorization: Bearer
```

# Riskgroup data related endpoints







# Messages related endpoints

##
## /api/messages routes
##

### Fetch all messages (requires token)
```
GET http://localhost:3000/api/messages/
Authorization: Bearer
```

### Send a new message to a new conversation (requires token)
```
POST http://localhost:3000/api/messages/
Authorization: Bearer
Content-Type: application/json

{
  "recipient_id": "6", 
  "message_content": "Hello!",
  "message_sent_at" : "2024-05-05 14:02:00",
  "sender_id": "5"
}
```

### Send a new message to an existing conversation (requires token)
```
POST http://localhost:3000/api/messages/
Authorization: Bearer
Content-Type: application/json

{
  "conversation_id" : "1",
  "recipient_id": "6", 
  "message_content": "Toimiiko tää vittu?",
  "message_sent_at" : "2024-05-05 14:02:00",
  "sender_id": "5"
}
```
##
## /api/messages/:id routes
##

### Fetch message by message's id (requires token)
```
GET http://localhost:3000/api/messages/6
Authorization: Bearer
```

##
## /api/messages/conversation/:id routes 
##

### Fetch conversation by conversation id (requires token)
```
GET http://localhost:3000/api/messages/conversation/2
Authorization: Bearer 
```

##
## /api/conversation/user/:id routes
##

### Fetch conversation_id sender's or recipients's id (requires token)
```
GET http://localhost:3000/api/messages/user/5
Authorization: Bearer
```

##
## /api/messages/:id/user/:user_id
##

### Delete messages by message_id and user_id (requires token)
```
DELETE http://localhost:3000/api/messages/7/user/6
Authorization: Bearer
```