const express = require('express');
const router = express.Router();
const upload = require("multer")();
const collectionsCtrl = require('../../controllers/api/collections');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

 
router.get('/', collectionsCtrl.index);
router.post('/', ensureLoggedIn, collectionsCtrl.create);
router.post('/upload', upload.single('image'), collectionsCtrl.upload);
router.post('/:id/uploadtrack', upload.single('track'), ensureLoggedIn, collectionsCtrl.uploadTrack)
router.put('/:id', ensureLoggedIn, collectionsCtrl.update);
router.delete('/:id', ensureLoggedIn, collectionsCtrl.delete);



module.exports = router;