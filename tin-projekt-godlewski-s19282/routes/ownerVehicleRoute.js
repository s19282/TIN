const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerVehicleController');

router.get('/',ownerController.showOwnerVehicleList);
router.get('/add',ownerController.showAddOwnerVehicleForm);
router.get('/details', ownerController.showOwnerVehicleDetails);

module.exports = router;