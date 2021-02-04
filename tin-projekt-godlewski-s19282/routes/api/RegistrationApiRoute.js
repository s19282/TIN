const express = require('express');
const router = express.Router();

const registrationApiController = require('../../api/RegistrationAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', isAuth,registrationApiController.getRegistrations);
router.get('/:registrationId', isAuth, registrationApiController.getRegistrationById);
router.post('/', isAuth, registrationApiController.createRegistration);
router.put('/:registrationId', isAuth, registrationApiController.updateRegistration);
router.delete('/:registrationId', isAuth, registrationApiController.deleteRegistration);
router.delete('/deleteMany', isAuth, registrationApiController.deleteRegistration);

module.exports = router;

