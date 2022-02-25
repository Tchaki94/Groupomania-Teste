const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const commentCtrl = require('../controllers/comment');
const multer = require('../middlewares/multer-config');
const isAdminOrUser = require('../middlewares/isAdminOrAutor');

router.post('/', auth, commentCtrl.createComment);
router.get("/all", commentCtrl.getAllComment);
router.get("/:id", auth, commentCtrl.getOneComment);

router.delete('/delete/:id', auth, isAdminOrUser, commentCtrl.deleteComment);

module.exports = router;