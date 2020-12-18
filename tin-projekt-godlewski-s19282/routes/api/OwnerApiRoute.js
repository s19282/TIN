const express = require('express');
const router = express.Router();

const ownerApiController = require('../../api/OwnerAPI');

router.get('/', ownerApiController.getOwners);
router.get('/:ownerId', ownerApiController.getOwnerById);
router.post('/', ownerApiController.createOwner);
router.put('/:ownerId', ownerApiController.updateOwner);
router.delete('/:ownerId', ownerApiController.deleteOwner);

module.exports = router;

