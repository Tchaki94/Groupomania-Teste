const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const postCtrl = require('../controllers/post');
const multer = require('../middlewares/multer-config');
const isAdminOrUser = require('../middlewares/isAdminOrAutor');



router.post('/',auth, multer, postCtrl.createPost);
router.put('/:id', postCtrl.modifyPost);
router.get('/all', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);

router.delete('/delete/:id',auth, isAdminOrUser, postCtrl.deletePost);



module.exports = router;