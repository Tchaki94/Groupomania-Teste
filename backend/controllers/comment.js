const database = require ('../db/connection');
const Comment = require('../models/comment');

exports.createComment = (req, res, next) => {
    console.log(req.body);
    const user_id = req.userId;
    const post_id = req.body.post_id;
    const comment = req.body.comment;
    

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

exports.getAllComment = (req, res) => {


    Comment.getAllComment(
        (err, data) => {
        if ( err ) {
            return res.status(404).send({message: err.message})
        }
        return res.status(200).send(data)
    })
}

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