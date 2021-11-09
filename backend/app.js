const express = require('express');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();
const fs = require('fs');
const mysql = require('mysql2');
const connection = require('./db/connection');
//console.log(connection);

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require("./routes/comment");


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(helmet());


connection.execute(
    'SELECT * FROM `users`',
    function(err, results, fields){
        console.log("results", results);
    }
);
connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

//connection.end();

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;