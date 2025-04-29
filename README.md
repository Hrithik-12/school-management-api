# 🎓 School Management API

This project is a **Node.js** and **Express.js** based REST API for managing schools, allowing users to add new schools and list them sorted by proximity to a given location.  
It uses **MySQL** as the database and is deployed on **Railway**.

---

## 🚀 Live API

Base URL: [https://school-management-api-production-b544.up.railway.app/](https://school-management-api-production-b544.up.railway.app/)

---

## ✨ Features
- **Add School**: Add a new school with name, address, latitude, and longitude.
- **List Schools**: Retrieve all schools sorted by distance from the user's location.

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MySQL
- Railway (Hosting)
- Postman (API Testing)

---

## 📚 API Endpoints

### 1. ➕ Add School
- **Endpoint**: `POST /addSchool`
- **Payload**:
  ```json
  {
    "name": "ABC School",
    "address": "123 Street, City",
    "latitude": 28.6139,
    "longitude": 77.2090
  }
  ```
- **Validation Rules**:
  - Name and Address must be non-empty strings.
  - Latitude must be a number between `-90` and `90`.
  - Longitude must be a number between `-180` and `180`.

- **Example Success Response**:
  ```json
  {
    "message": "School added successfully"
  }
  ```

---

### 2. 📍 List Schools
- **Endpoint**: `GET /listSchools`
- **Query Parameters**:
  - `latitude` (required)
  - `longitude` (required)

- **Example**:
  ```
  /listSchools?latitude=28.6139&longitude=77.2090
  ```

- **Functionality**:
  Returns a list of schools **sorted by nearest distance** to the provided location.

- **Example Success Response**:
  ```json
  [
    {
      "id": 1,
      "name": "ABC School",
      "address": "123 Street, City",
      "latitude": 28.6139,
      "longitude": 77.2090,
      "distance": 0.0
    },
    {
      "id": 2,
      "name": "XYZ School",
      "address": "456 Avenue, City",
      "latitude": 28.7041,
      "longitude": 77.1025,
      "distance": 12.5
    }
  ]
  ```

---

## 🔥 Project Setup (For Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/Hrithik-12/school-management-api.git
cd school-management-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup MySQL Database
- Create a database named `school_db`.
- Run this SQL command to create the `schools` table:
  ```sql
  CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
  );
  ```

### 4. Configure Environment Variables
- Create a `.env` file in the root directory:
  ```
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=school_db
  DB_PORT=3306
  ```
- Update your `db.js` to use these environment variables:
  ```javascript
  const mysql = require('mysql2');
  require('dotenv').config();

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  module.exports = connection;
  ```

### 5. Start the Server
```bash
node server.js
```
Server will run at: `http://localhost:3000/`

---

## 📫 Postman Collection

Test the APIs easily using the shared Postman collection:  
👉 [View the Postman Collection (https://www.postman.com/maintenance-astronaut-49797936/servers/collection/m2w0h97/school-management-api?action=share&creator=31961114)


---

## 📁 Folder Structure

```
school-management-api/
├── db.js
├── server.js
├── package.json
├── .env
└── node_modules/
```

---

## 👨‍💻 Author

- **Hrithik Garg**
- [LinkedIn Profile](https://www.linkedin.com/in/hrithikgarg1/)



