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
> Make sure your using version 3.9.7 or higher of my sql.

# Routes

## Authentication/authorization endpoints

##
## /api/auth/login
##

### Login as a regular user
POST http://localhost:3000/api/auth/login
Content-Type: application/json
{
  "username" : "",
  "password": ""
}

##
## /api/auth/professional/
##

### Login as an admin/hpc
POST http://localhost:3000/api/auth/professional/login
Content-Type: application/json

{
  "username" : "",
  "password": ""
}

##
## /api/auth/me
##

### Fetch user's data (requires token)
GET http://localhost:3000/api/auth/me
Authorization: Bearer

## User data related endpoints

##
## /api/users endpoint
##

### Fetcht all user data (requires token)
GET http://localhost:3000/api/users
Authorization: Bearer

### Fetch user data by user's id (requires token)
GET http://localhost:3000/api/users/6
Authorization: Bearer

### Create a new user
POST  http://localhost:3000/api/users
content-type: application/json


{
    "username": "",
    "password": "",
    "email" : "",
    "first_name": "",
    "last_name": ""
}

### Edit an existing user's data (requires token)
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

### Delete an existing user (requires token)
DELETE http://localhost:3000/api/users/6

##
## /api/student routes (requires token)
## 

### Fetch all student's ids and usernames (requires token)
GET http://localhost:3000/api/student/
Authorization: Bearer

## Symptom related endpoints

##
## /api/symptoms routes
##

### Fetch all entries in symptoms (requires token)
GET http://localhost:3000/api/symptoms/
Authorization: Bearer


##
## /api/symptoms/:id routes
##

### Fetch all of the entries by user_id
GET http://localhost:3000/api/symptoms/11
Authorization: Bearer

### Create a new symptom entry (requires token)
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

### Edit an existing entry in symptoms (requires token)
PUT http://localhost:3000/api/symptoms/5
Authorization: Bearer 

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

##
## /api/symptoms/user/:id
##

### Fetch symptom entries by user's id (requires token)
GET http://localhost:3000/api/symptoms/user/6
Authorzation: Bearer 

##
## /api/symptoms/:symptom_id/user/:user_id
##

### Fetch symptoms by symptom_id and user_id (requires token)
GET http://localhost:3000/api/symptoms/2/user/6
Authorization: Bearer 

### Delete entry in symptoms with symptom_id and user_id (requires token)
DELETE http://localhost:3000/api/symptoms/4/user/10
Authorization: Bearer

# analysis related endpoints

##
## /api/analysis routes
## 

### Fecth all entries in analysis (requires token)
GET http://localhost:3000/api/analysis/
Authorization: Bearer 

### Fetch entry by analysis id (requires token)
GET http://localhost:3000/api/analysis/3
Authorization: Bearer 

### Create a new analysis entry (requires token)
POST http://localhost:3000/api/analysis/
Authorization: Bearer
Content-Type: application/json

{
  "user_id": "10",
  "analysis_result": "Korkea stressi",
  "analysis_enumerated": "1",
  "created_at": "2024-05-4 16:00:00"

}

### Edit an existing analysis entry (requires token) 
PUT http://localhost:3000/api/analysis/5
Authorization: Bearer 
Content-Type: application/json

{
  "user_id": "",
  "analysis_result": "Korkea stressi",
  "analysis_enumerated": "3",
  "created_at": "2024-05-4 15:00:00"
}

##
## /api/analysis/user/ routes
##

### GET all analysis entries of a specific user (requires token)
GET http://localhost:3000/api/analysis/user/6
Authorization: Bearer 

##
## /api/analysis/:id/user/:id
##

### DELETE a specific entry in analysis (requires token)
DELETE http://localhost:3000/api/analysis/6/user/10
Authorization: Bearer