const express = require('express');
const router = express.Router();

const ownerApiController = require('../../api/OwnerAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/',isAuth, ownerApiController.getOwners);
router.get('/:ownerId',isAuth, ownerApiController.getOwnerById);
router.post('/',isAuth, ownerApiController.createOwner);
router.put('/:ownerId',isAuth, ownerApiController.updateOwner);
router.delete('/:ownerId',isAuth, ownerApiController.deleteOwner);

module.exports = router;

