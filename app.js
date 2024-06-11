const path = require('path');
const express = require('express');

require('dotenv').config();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});


const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/', defaultRoutes);
app.use('/', restaurantRoutes);

app.use(function (req, res) {
    res.status(404).render('404');
});
app.use(function (error, req, res, next) {
    res.status(500).render('500');
});

app.listen(80);