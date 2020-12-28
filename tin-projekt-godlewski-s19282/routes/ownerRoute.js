const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');

router.get('/',ownerController.showOwnerList);
router.get('/add',ownerController.showAddOwnerForm);
router.get('/edit/:ownerId',ownerController.showEditOwnerForm);
router.get('/details/:ownerId',ownerController.showOwnerDetails);
router.get('/delete/:ownerId',ownerController.deleteOwner);
router.post('/add',ownerController.addOwner);
router.post('/edit',ownerController.updateOwner);

module.exports = router;