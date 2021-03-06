const database = require ('../db/connection');
const Post = require('../models/posts');
const Comment = require('../models/comment');

// Creation d'un post
exports.createPost = ( req, res, next) => {

    const image = req.file ?  `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";

    const descrip = req.body.descrip ;
    const date_pub = req.body.date_pub;
    const user_id = req.userId;
    const titre = req.body.titre;

    console.log(req.body)

    if(titre === null || titre === '' || descrip === null || descrip === '') {
        return res.status(400).json({'error': "Veuillez remplir les champs 'titre' et 'description' pour créer un article"});
    }


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

// Modification d'un post 
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

// Supression d'un post
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


// Récuperation de tout les posts
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

// Récuperation d'un Post
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