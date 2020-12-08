const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');

router.get('/',ownerController.showOwnerList);
router.get('/add',ownerController.showAddOwnerForm);
router.get('/details/:ownerId', ownerController.showOwnerDetails);

module.exports = router;