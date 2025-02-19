const express = require('express');
const router = express.Router();
const businessOwnersController = require('./controllers/businessOwnersController');

router.get('/', businessOwnersController.getAllBusinessOwners);
router.post('/', businessOwnersController.createBusinessOwner);

module.exports = router;