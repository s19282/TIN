const express = require('express');
const router = express.Router();

const announcementApiController = require('../../api/AnnouncementAPI');

router.get('/', announcementApiController.getAnnouncements);
router.get('/:announcementId', announcementApiController.getAnnouncementById);
router.post('/', announcementApiController.createAnnouncement);
router.put('/:announcementId', announcementApiController.updateAnnouncement);
router.delete('/:announcementId', announcementApiController.deleteAnnouncement);

module.exports = router;

