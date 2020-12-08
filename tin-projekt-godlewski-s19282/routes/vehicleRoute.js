const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/vehicleController');

router.get('/',ownerController.showVehicleList);
router.get('/add',ownerController.showAddVehicleForm);
router.get('/details', ownerController.showVehicleDetails);

module.exports = router;