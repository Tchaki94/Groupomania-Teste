const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const postCtrl = require('../controllers/post');
const multer = require('../middlewares/multer-config');



router.post('/',auth, multer, postCtrl.createPost);
router.put('/:id', postCtrl.modifyPost);
router.get('/all', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);

router.delete('/delete/:id',auth, postCtrl.deletePost);



module.exports = router;