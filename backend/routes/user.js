const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/user');
const multer = require('../middlewares/multer-config');

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get('/userBoard', auth, userCtrl.findConnectedUser)
router.get("/all", userCtrl.findAllUsers);
router.get('/:id', userCtrl.findOneUser);
router.get('/', userCtrl.findByEmail)


module.exports = router;