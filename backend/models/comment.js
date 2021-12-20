const connection = require('../db/connection');

const Comment = function (comment) {
    this.id = comment.id ? comment.id : null;
    this.date_pub = post.date_pub ? post.date_pub : null;
    this.user_id = post.user_id ? post.user_id : null ;
    this.post_id = comment.post_id ? comment.post_id : null;
    this.comment = comment.comment ? comment.comment : null;
}

Comment.createComment = (newComment, callback) => {

    connection.query('INSERT INTO comments (user_id, post_id, comment) VALUES (?,?,?)', [newComment.user_id, newComment.post_id, newComment.comment], (err, res) => {
        if (err){
            throw err
        }
        //console.log(res);
        callback(null, {id: res.insertId, ...newComment})
    }) 
}

Comment.getAllComment = (callback) => {

    connection.query(`SELECT c.id, c.date_pub, c.comment, p.id as 'postId', u.name as 'username', u.image as 'userimage' FROM comments c INNER JOIN post p on c.post_id = p.id INNER JOIN users u on c.user_id = u.id`, (err, res) => {
        if ( err ) {
            throw err
        }
        console.log(res.length)
        if (res.length) {
        callback(null, res);
        return;
        }else{
            callback(null, []);
        }
    })
}

Comment.getOneComment = (oneComment, callback) => {

    connection.query('SELECT * FROM comments WHERE id= ?', [oneComment.id], (err, res) => {
        if (err) {
            throw err
        }
        callback(null, res)
    })
}
    

module.exports = Comment;