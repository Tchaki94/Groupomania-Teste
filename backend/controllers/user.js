const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const fs = require("fs");



// Ajout d'un utilisateur ( newuser )
exports.signup = (req, res) => {
    try{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (name === null || name === '' || email === null || email === '' || password === null || password === '') {
        res.status(400).json({ error :"Veuillez remplir les champs du formulaire "});
    }

    if (name && email && password) {
        //console.log("ok")
       
        bcrypt.hash(password, 10)
            .then(hash =>{
                 User.createUser({
                    email: email,
                    name: name,
                    password: hash,
                    isadmin: false
                }, (err, data) => {
                    if(err){
                        return res.status(500).send({message: err.message})
                    }
                    return res.status(201).send(data);
                        
                })
            })
    }
    }catch(err){
        return res.status(500).send({message: err.message})
    }
    	
}

// login de l'utilisateur ( login )
exports.login = (req, res) => {
    User.findOne(req.body.email, (err, user) => {
        //console.log(user);
        if(err){
            return res.status(500).send({message: err.message})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user.id,
                isadmin: user.isadmin,
                token: jwt.sign(
                    { userId: user.id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });   
    })  
})
}

// trouver un User
exports.findByEmail = (req, res) => {
    const email = req.body.email;

    User.findOne(
        email
    , (err, data) => {
        if ( err ) {
            return res.status(500).send({ message: err.message})
        }
        res.status(200).send(data)
    })
}

//trouver un user par l'id passe en param
exports.findOneUser = (req, res) => {
    const id = req.params.id
    User.findById(id, (err, data) => {
        if ( err ) {
            return res.status(500).send({ message: err.message})
        }
        const formattedData = {
            name: data.name,
            image: data.image
        }
        res.status(200).send(formattedData)
    })
}

// trouver tout les user
exports.findAllUsers = ( req, res ) => {

    User.findAll(
        (err, data) => {
        if (err) {
            return res.status(500).send({message: err.message})
        }
        res.status(200).send(data)
    })
}

exports.findConnectedUser = (req, res) => {
    //console.log('hello')
    const id = req.userId
    //console.log(id)
    User.findById(id, (err, data) => {
        if ( err ) {
            return res.status(500).send({ message: err.message})
        }
        
        res.status(200).send(data)
    })  

}

// supprimer un utilisateur
exports.deleteUser = ( req, res) => {

    const id = req.userId
    console.log(id)

    User.deleteUser(id, (err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message})
        }
        console.log(data)
        res.status(200).send(data)
    })
}
