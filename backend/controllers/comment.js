const database = require ('../db/connection');
const Comment = require('../models/comment');


// création du profil
exports.createComment = (req, res, next) => {
    //console.log(req.body);
    const user_id = req.userId;
    const post_id = req.body.post_id;
    const comment = req.body.comment;
    console.log(comment)
    if (comment === null || comment === '' || comment === undefined) {
       return res.status(400).json({ error :"Veuillez écrire un commentaire"});
    }

    Comment.createComment({
        user_id,
        post_id,
        comment
    }, (err, data) => {
        if (err) {
            return res.status(500).send({message:  err.message})
        }
        return res.status(201).send(data)
    })
}

// Recuperer tout les commentaires
exports.getAllComment = (req, res) => {


    Comment.getAllComment(
        (err, data) => {
        if ( err ) {
            return res.status(404).send({message: err.message})
        }
        return res.status(200).send(data)
    })
}

// Recuperer 1 commentaire
exports.getOneComment = (req, res) => {
    const id = req.params.id;

    Comment.getOneComment({
        id
    }, (err, data) => {
        if (err) {
            return res.status(404).send({message: err.message})
        }
        return res.status(200).send(data)
    })
}

// Supression commentaire
exports.deleteComment = (req, res) => {

    const id = req.params.id;
    console.log(id)

    Comment.deleteComment(id, (err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message})
        }
        console.log(data)
        res.status(200).send(data)
    })
}