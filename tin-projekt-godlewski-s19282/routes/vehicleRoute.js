const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/vehicleController');

router.get('/',ownerController.showVehicleList);
router.get('/add',ownerController.showAddVehicleForm);
router.get('/edit',ownerController.showEditVehicleForm);
router.get('/details/:vehicleId', ownerController.showVehicleDetails);

module.exports = router;