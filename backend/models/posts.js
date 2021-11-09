const connection = require('../db/connection');

const Post = function (post) {
    this.id = post.id ? post.id : null;
    this.titre = post.titre ? post.titre : null;
    this.descrip = post.descrip ? post.descrip : null;
    this.image = post.image ? post.image : null;
    this.date_pub = post.date_pub ? post.date_pub : null;
    this.user_id = post.user_id ? post.user_id : null ;
}

Post.createPost = (newPost, callback) => {
    connection.query('INSERT INTO post (descrip,date_pub,user_id,titre) VALUES (?,?,NOW(),?,?)', [newPost.descrip, newPost.user_id, newPost.titre], (err, res) => {
        if (err){
            throw err
        }
        console.log(res);
        callback(null, {id: res.insertId, ...newPost})
    }) 
}

Post.modifyPost = (modPost, callback) => {
    connection.query('UPDATE post SET descrip = ?, titre = ? WHERE id', [modPost.descrip, modPost.id, modPost.user_id, modPost.titre], (err, res) => {
        if (err) {
            throw err
        }
        console.log(res);
        callback(null, res[0])
    })
}

Post.deletePost = (delPost, callback) => {
    connection.query('DELETE FROM post WHERE id = ?', [delPost.id], (err, res) => {
        if (err) {
            throw err
        }
        callback(null, res[0])
    })
}

Post.getAllPost = (allPost, callback) => {
    connection.query('SELECT * FROM post ORDER BY post.user_id = ?', [allPost.id], (err, res) =>{
        if (err) {
            throw err
        }
        callback(null, res[0])
    })
}

Post.getOnePost = (onePost, callback) => {
    connection.query('SELECT * FROM post WHERE id = ?', [onePost.id], (err, res) =>{
        if ( err ) {
            throw err
        }
        callback(null, res[0])
    })
}



module.exports = Post;