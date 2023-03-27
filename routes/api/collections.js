const express = require('express');
const router = express.Router();
const upload = require("multer")();
const collectionsCtrl = require('../../controllers/api/collections');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


router.get('/', collectionsCtrl.index);
router.post('/', upload.single('art'), ensureLoggedIn, collectionsCtrl.create);

module.exports = router