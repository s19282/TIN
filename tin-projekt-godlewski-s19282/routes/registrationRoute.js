const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

router.get('/',registrationController.showRegistrationList);
router.get('/add',registrationController.showAddRegistrationForm);
router.get('/edit/:registrationId',registrationController.showEditRegistrationForm);
router.get('/details/:registrationId', registrationController.showRegistrationDetails);
router.get('/delete/:registrationId',registrationController.deleteRegistration);
router.post('/add',registrationController.addRegistration);
router.post('/edit',registrationController.updateRegistration);

module.exports = router;