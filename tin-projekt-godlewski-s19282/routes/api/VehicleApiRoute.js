const express = require('express');
const router = express.Router();

const vehicleApiController = require('../../api/VehicleAPI');

router.get('/', vehicleApiController.getVehicles);
router.get('/:vehicleId', vehicleApiController.getVehicleById);
router.post('/', vehicleApiController.createVehicle);
router.put('/:vehicleId', vehicleApiController.updateVehicle);
router.delete('/:vehicleId', vehicleApiController.deleteVehicle);

module.exports = router;

