const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const postCtrl = require('../controllers/post');
const multer = require('../middlewares/multer-config');



router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.modifyPost);
router.delete('/delete/:id', postCtrl.deletePost);
router.get('/all', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);


module.exports = router;