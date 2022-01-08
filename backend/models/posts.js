const connection = require('../db/connection');

const Post = function (post) {
    this.id = post.id ? post.id : null;
    this.descrip = post.descrip ? post.descrip : null;
    this.image = post.image ? post.image : null;
    this.date_pub = post.date_pub ? post.date_pub : null;
    this.user_id = post.user_id ? post.user_id : null ;
    this.titre = post.titre ? post.titre : null;
}

Post.createPost = (newPost, callback) => {
    connection.query('INSERT INTO post (descrip,image,date_pub,user_id,titre) VALUES (?,?,NOW(),?,?)', [newPost.descrip, newPost.image, newPost.user_id, newPost.titre], (err, res) => {
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
        //console.log(res);
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

Post.getAllPost = (callback) => {
    connection.query(`SELECT p.id, p.titre, p.descrip, p.image, p.date_pub, u.name as 'userName', u.id as 'userId', u.image as 'userImage' FROM post p INNER JOIN users u on p.user_id = u.id`, (err, res) =>{
        if (err) {
            throw err
        }
        if(res.length){
        callback(null, res);
        return;
        }
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