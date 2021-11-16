//const mysql = require('mysql2');
const connection = require('../db/connection');

const User = function (user) {
    this.id = user.id ? user.id : null;
    this.name = user.name ? user.name : null;
    this.email = user.email ? user.email : null;
    this.password = user.password ? user.password : null;
    this.image = user.image ? user.image : null;
    this.description = user.description ? user.description : null;
    this.isadmin = user.isadmin ? user.isadmin : null;
};

User.createUser = (newUser, callback) => {
    console.log(newUser);
    connection.query('INSERT INTO users SET ?', newUser, (err, res) => {
        if (err){
            throw err
        }
        console.log(res);
        callback(null, {id: res.insertId, ...newUser})
    })
}

User.findOne = (email, callback) => {
    connection.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
        if (err) {
            // si erreur je passe pas de données
            callback(err, null);
            return;
        }
        if (res.length) {
            // si j'ai pas d'erreur on envoie les données
            callback(null, res[0]);
            return;
        }
    })
};

User.findById = (id, callback) => {
    connection.query(`SELECT * FROM users WHERE id = '${id}'`, (err, res) => {
        if (err) {
            // si erreur je passe pas de données
            callback(err, null);
            return;
        }
        if (res.length) {
            // si j'ai pas d'erreur on envoie les données
            callback(null, res[0]);
            return;
        }
    })
}

User.findAll = (callback) => {
    connection.query(`SELECT * FROM users `, (err, res) => {
        if (err) {
            // si erreur je passe pas de données
            callback(err, null);
            return;
        }
        if (res.length) {
            // si j'ai pas d'erreur on envoie les données
            callback(null, res);
            return;
        }
    })
};

module.exports = User;