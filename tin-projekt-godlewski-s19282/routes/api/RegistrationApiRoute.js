const express = require('express');
const router = express.Router();

const registrationApiController = require('../../api/RegistrationAPI');

router.get('/', registrationApiController.getRegistrations);
router.get('/:registrationId', registrationApiController.getRegistrationById);
router.post('/', registrationApiController.createRegistration);
router.put('/:registrationId', registrationApiController.updateRegistration);
router.delete('/:registrationId', registrationApiController.deleteRegistration);
router.delete('/deleteMany', registrationApiController.deleteRegistration);

module.exports = router;

