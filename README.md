
# School Management API

This project is a Node.js and Express.js based REST API for managing schools, allowing users to add new schools and list them sorted by proximity to a given location.  
It uses **MySQL** as the database.

## Features
- **Add School**: Add a new school with name, address, latitude, and longitude.
- **List Schools**: List all schools sorted by distance from a user-specified location.

---

## Tech Stack
- **Node.js**
- **Express.js**
- **MySQL**
- **Postman** (for API testing)

---

## API Endpoints

### 1. Add School
- **Endpoint**: `/addSchool`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "name": "ABC School",
    "address": "123 Street",
    "latitude": 28.6139,
    "longitude": 77.2090
  }
  ```
- **Validation**:  
  - Name and Address must be strings.
  - Latitude and Longitude must be valid numbers.
  - Latitude must be between -90 to 90 and Longitude between -180 to 180.

---

### 2. List Schools
- **Endpoint**: `/listSchools`
- **Method**: `GET`
- **Query Parameters**:
  - `latitude`
  - `longitude`
- **Example**:
  ```
  /listSchools?latitude=28.6139&longitude=77.2090
  ```
- **Functionality**:  
  Returns a list of schools sorted by nearest distance to the given location.

---

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/school-management-api.git
   cd school-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the MySQL database:
   - Create a database `school_db`
   - Run the following SQL to create the table:
     ```sql
     CREATE TABLE schools (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       address VARCHAR(255) NOT NULL,
       latitude FLOAT NOT NULL,
       longitude FLOAT NOT NULL
     );
     ```

4. Update your `db.js` file with your MySQL credentials.

5. Start the server:
   ```bash
   node server.js
   ```
6. The server will run at `http://localhost:3000/`

---

## Author
- Hrithik Garg
- https://www.linkedin.com/in/hrithikgarg1/

