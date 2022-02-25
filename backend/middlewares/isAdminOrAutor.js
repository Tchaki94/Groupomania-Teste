const User = require('../models/users');
const Comment = require('../models/comment');
const Post = require('../models/posts')

module.exports = (req, res, next) => {
    
    // on cherche si user est admin ou autor

    User.findById(req.userId, (err, data)=> {
        if(err){
           return res.status(401).json({message : "Acces interdit"})
        }else{
            if(data.isadmin){
                next();
            }else {
                const target = req.baseUrl.split('/')[2]
                if(target == "comment"){
                    Comment.getOneComment(req.params.id, (err, data)=> {
                        if(err){
                            return res.status(404).json({message : "Not found"})
                        }else{
                            if(data[0].user_id == req.userId){
                                next();
                            }else{
                                return res.status(401).json({message : "Acces interdit"})
                            }
                        }
                    })
                }
                if(target == "post"){
                    Post.getOnePost(req.params.id, (err, data)=> {
                        if(err){
                            return res.status(404).json({message : "Not found"})
                        }else{
                            if(data[0].user_id == req.userId){
                                next();
                            }else{
                                return res.status(401).json({message : "Acces interdit"})
                            }
                        }
                    })
                }
                return res.status(401).json({message : "Acces interdit"})
            }
        }
    }) 
};