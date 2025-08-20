#  myFlix Server-Side (Achievement 2 Project)

##  Objective
The **myFlix API** is the server-side component of a movies web application.  
It provides users with access to information about movies, directors, and genres, while also allowing users to manage their profiles and favorite movie lists.

This project is part of the **MERN stack journey**:  
- **Achievement 2** → Build the server-side (Node.js, Express, MongoDB, Mongoose).  
- **Achievement 3** → Build the client-side (React).  
Together, they form a full-stack web application that can be showcased in a professional portfolio.

---

##  Features

### Essential
- Return a list of **all movies**.  
- Return **movie details** by title (description, genre, director, image URL, featured).  
- Return **genre details** by name/title (e.g., `"Thriller"`).  
- Return **director details** by name (bio, birth year, death year).  
- **User registration** (create account).  
- **Update user info** (username, password, email, date of birth).  
- **Add a movie** to favorites.  
- **Remove a movie** from favorites.  
- **Deregister** existing users.  

### Optional (future enhancements)
- View **actors** in each movie.  
- Get detailed info about **actors**.  
- Display **release dates, ratings**, or additional metadata for movies.  
- Allow users to create a **“To Watch”** list in addition to favorites.  

---

##  Tech Stack

- **Node.js** + **Express** → backend server & routing  
- **MongoDB** + **Mongoose** → database and business logic modeling  
- **REST architecture** → CRUD operations with HTTP methods (GET, POST, PUT, DELETE)  
- **Middleware** → e.g., `body-parser`, `morgan`, `cors`  
- **Postman** → API testing  
- **JWT + Passport** → authentication & authorization  
- **Heroku** → deployment  
- **GitHub** → version control and hosting code  

---

## 📂 Project Structure

