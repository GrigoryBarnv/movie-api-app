const bodyParser = require('body-parser');
const express = require('express'); // load the express module
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express(); // create express app

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// --- Logging setup ---
// 1) log to terminal
app.use(morgan('common'));

// 2) log to access.log file
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

const movies = [
  { title: 'The Matrix', year: 1999 },
  { title: 'Interception', year: 2010},
  { title: 'Interstellar', year: 2014 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Dark Knight', year: 2008 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'Fight Club', year: 1999 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'Parasite', year: 2019 }
];




app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/', (req, res) => {
  res.send('Thank you for visiting the movie app');
})

app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
 });

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
})