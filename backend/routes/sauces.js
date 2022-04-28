const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//router to create sauce
router.post('/', auth, multer, sauceCtrl.createSauce);

//router to modify sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

//router to delete sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce );

//router to select one sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);

//router to see all sauces
router.get('/', auth, sauceCtrl.getAllSauce);

//router to like or dislike one sauce
router.post('/:id/like', auth, sauceCtrl.likeDislike);

module.exports = router;

