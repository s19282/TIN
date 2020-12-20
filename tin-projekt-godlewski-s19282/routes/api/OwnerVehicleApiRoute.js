const express = require('express');
const router = express.Router();

const ownerVehicleApiController = require('../../api/OwnerVehicleAPI');

router.get('/', ownerVehicleApiController.getOwnerVehicles);
router.get('/:ownerVehicleId', ownerVehicleApiController.getOwnerVehicleById);
router.post('/', ownerVehicleApiController.createOwnerVehicle);
router.put('/:ownerVehicleId', ownerVehicleApiController.updateOwnerVehicle);
router.delete('/:ownerVehicleId', ownerVehicleApiController.deleteOwnerVehicle);
router.delete('/deleteMany', ownerVehicleApiController.deleteOwnerVehicle);

module.exports = router;

