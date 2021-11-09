const database = require ('../db/connection');
const Post = require('../models/posts');

exports.createPost = ( req, res, next) => {

    const descrip = req.body.descrip;
    //const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    const user_id = req.body.user_id;
    const titre = req.body.titre;

    Post.createPost({
        descrip,
        //image,
        user_id,
        titre
    }, (err, data) => {
        if(err){
            return res.status(500).send({message: err.message})
        }
        return res.status(201).send(data);
            
    })
    
}

exports.modifyPost = (req, res, next) => {

    const descrip = req.body.descrip;
    const id = req.params.id;
    const user_id = req.body.user_id;
    const titre = req.body.titre;

    Post.modifyPost({
        descrip,
        id,
        user_id,
        titre
    }, (err, data) => {
        if ( err ) {  
            return res.status(500).send({message: err.message})
        }
        return res.status(201).send(data)
    })
}

exports.deletePost = (req, res, next) => {

    const id = req.params.id;
 
    Post.deletePost({
        id
    }, (err, data) => {
        if (err) {
            return res.status(500).send({message: err.message})
        }
        res.status(200).send(data)
    })
}

exports.getAllPost = (req, res, next) => {

    const id = req.params.id;

    Post.getAllPost({
        id
    }, (err, data) => {
        if (err) {
            return res.status(404).send({message: err.message})
        }
        return res.status(200).send(data)
    })
}

exports.getOnePost = (req, res, next) => {

    const id = req.params.id;

    Post.getOnePost({
        id
    }, (err, data) => {
        if (err) {
            return res.status(404).send({ message: err.message})
        }
        return res.status(200).send(data)
    })
}