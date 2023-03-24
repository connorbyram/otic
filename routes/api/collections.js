const express = require('express');
const router = express.Router();
const collectionsCtrl = require('../../controllers/api/collections');
const ensureLoggedIn = require('../../config/ensureLoggedIn');


router.get('/', collectionsCtrl.index);
router.post('/', collectionsCtrl.create);

module.exports = router