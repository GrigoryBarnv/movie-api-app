const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');  // ✅ correct way


app.use(bodyParser.json()); 

let users = [];

let movies = [];





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



app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});