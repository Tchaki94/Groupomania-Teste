const database = require ('../db/connection');
const Post = require('../models/posts');
const Comment = require('../models/comment');

exports.createPost = ( req, res, next) => {

    const image = req.file ?  `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";

    const descrip = req.body.descrip;
    const date_pub = req.body.date_pub;
    const user_id = req.userId;
    const titre = req.body.titre;

    Post.createPost({
        descrip,
        image,
        date_pub,
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

exports.deletePost = (req, res) => {

    const id = req.params.id;
 
    Post.deletePost(id, (err, data) => {
        if (err) {
            return res.status(500).send({ message: err.message})
        }
        console.log(data)
        return res.status(200).send(data)
    })
}

exports.getAllPost = (req, res, next) => {
    console.log("hello");

    Post.getAllPost(
        
        (err, posts) => {
        if (err) {

            return res.status(404).send({message: err.message})
        }
        
        Comment.getAllComment((err, comments) => {
            if (err) {
                console.log(err)
                return res.status(404).send({message: err.message})
            }
            console.log(comments)
            comments.forEach(comment => {
                postIndex = posts.findIndex(post => post.id == comment.postId)
                if(posts[postIndex].comments !== undefined) {
                    posts[postIndex].comments.push(comment)
                }else{
                    posts[postIndex].comments = [comment]
                }                 
            });
            console.log(posts);
            return res.status(200).send(posts)
        })
        
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