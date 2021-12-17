const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const commentCtrl = require('../controllers/comment');
const multer = require('../middlewares/multer-config');

router.post('/', auth, multer,  commentCtrl.createComment);
router.get("/all", commentCtrl.getAllComment);
router.get("/:id", auth, commentCtrl.getOneComment);

module.exports = router;