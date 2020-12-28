const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/ownerVehicleController');

router.get('/',registrationController.showOwnerVehicleList);
router.get('/add',registrationController.showAddOwnerVehicleForm);
router.get('/edit/:registrationId',registrationController.showEditOwnerVehicleForm);
router.get('/details/:registrationId', registrationController.showOwnerVehicleDetails);
router.get('/delete/:registrationId',registrationController.deleteRegistration);
router.post('/add',registrationController.addRegistration);
router.post('/edit',registrationController.updateRegistration);

module.exports = router;