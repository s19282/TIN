const express = require('express');
const router = express.Router();

const vehicleApiController = require('../../api/VehicleAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', vehicleApiController.getVehicles);
router.get('/:vehicleId', vehicleApiController.getVehicleById);
router.post('/', isAuth, vehicleApiController.createVehicle);
router.put('/:vehicleId', isAuth, vehicleApiController.updateVehicle);
router.delete('/:vehicleId', isAuth, vehicleApiController.deleteVehicle);

module.exports = router;

