const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');  // ✅ correct way
const path = require('path');

//Documentation packages
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


// Mongoose srtup
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

app.use(bodyParser.json()); 

let users = [];

let movies = [];

mongoose.connect('mongodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log('✅ Connected to MongoDB'))
     .catch(err => console.error('❌ MongoDB connection error:', err));

// Serve documentation.html at /documentation
app.get('/documentation', (req, res) => {
  res.sendFile(path.join(__dirname, 'documentation.html'));
});

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alice
 *               favoriteMovies:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Inception", "Matrix"]
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
//CREATE
app.post('/users', (req, res) => {
  const newUser = req.body;
  
  if(newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send('users need names');
  }
});

/**
 * @openapi
 * /users/{id}/{movieTitle}:
 *   post:
 *     summary: Add a movie to a user's favorite list
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: movieTitle
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie added successfully
 */
//CREATE
app.post('/users/:movieTitle', (req, res) => {
  const {id, movieTitle} = req.params;



  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);

  } else {
    res.status(400).send('users not found');
  }
})


/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
//DELETE 
app.delete('/users/:movieTitle', (req, res) => {
  const {id, movieTitle} = req.params;



  let user = users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);

  } else {
    res.status(400).send('users not found');
  }
})



//DELETE 
app.delete('/users/:id', (req, res) => {
  const {id} = req.params;



  let user = users.find( user => user.id == id );

  if (user) {
    users = users.filter( user => user.id != id );
    res.status(200).send(`user ${id} has been removed`);
  } else {
    res.status(400).send('users not found');
  }
})


/**
 * @openapi
 * /movies/{title}:
 *   get:
 *     summary: Get details about a movie by its title
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie object
 */
//READ
app.get('/movies/:title', (req, res) => {
  const title = req.params.title;
  const movie = movies.find( movie => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie');
  }
});


//READ
app.get('/movies/genre/:genreName', (req, res) => {
  const {genreName} = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre');
  }
});
  
//READ
app.get('/movies/director/:directorName', (req, res) => {
  const {directorName} = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director');
  }
});



// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie API",
      version: "1.0.0",
      description: "API for managing users and movies"
    },
    servers: [
      {
        url: "http://localhost:8080"
      }
    ]
  },
  apis: ["./server.js"], // path to your file with @openapi comments
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});


/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "056c5554-bde6-42f3-b832-2a3864bfc406"
 *         name:
 *           type: string
 *           example: "Alice"
 *         favoriteMovies:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Inception", "Matrix"]
 *     Movie:
 *       type: object
 *       properties:
 *         Title:
 *           type: string
 *           example: "Inception"
 *         Genre:
 *           type: object
 *           properties:
 *             Name:
 *               type: string
 *               example: "Sci-Fi"
 *         Director:
 *           type: object
 *           properties:
 *             Name:
 *               type: string
 *               example: "Christopher Nolan"
 */

// Open http://localhost:8080/api-docs to see the documentation

