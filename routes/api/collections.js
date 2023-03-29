const express = require('express');
const router = express.Router();
const collectionsCtrl = require('../../controllers/api/collections');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

 
router.get('/', collectionsCtrl.index);
router.post('/', ensureLoggedIn, collectionsCtrl.create);
router.put('/:id/update', ensureLoggedIn, collectionsCtrl.update);
router.delete('/:id', ensureLoggedIn, collectionsCtrl.delete);

module.exports = router;