const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

router.get('/',vehicleController.showVehicleList);
router.get('/add',vehicleController.showAddVehicleForm);
router.get('/edit/:vehicleId',vehicleController.showEditVehicleForm);
router.get('/details/:vehicleId',vehicleController.showVehicleDetails);
router.get('/delete/:vehicleId',vehicleController.deleteVehicle);
router.post('/add',vehicleController.addVehicle);
router.post('/edit',vehicleController.updateVehicle);

module.exports = router;