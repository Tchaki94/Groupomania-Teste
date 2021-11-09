const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/user');
const multer = require('../middlewares/multer-config');

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.get("/", userCtrl.findAllUsers);
router.get('/:id', userCtrl.findOneUser);

module.exports = router;