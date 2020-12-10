const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerVehicleController');

router.get('/',ownerController.showOwnerVehicleList);
router.get('/add',ownerController.showAddOwnerVehicleForm);
router.get('/edit',ownerController.showEditOwnerVehicleForm);
router.get('/details/:ownerVehicleId', ownerController.showOwnerVehicleDetails);

module.exports = router;