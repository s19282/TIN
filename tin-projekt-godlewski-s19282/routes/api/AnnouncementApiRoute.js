const express = require('express');
const router = express.Router();

const announcementApiController = require('../../api/AnnouncementAPI');
const isAdmin = require('../../middleware/isAdmin');
const isAuth = require('../../middleware/isAuth');

router.get('/', announcementApiController.getAnnouncements);
router.get('/admin', announcementApiController.getAnnouncementsAdmin);
router.get('/:announcementId', isAuth, isAdmin, announcementApiController.getAnnouncementById);
router.post('/', isAuth, isAdmin, announcementApiController.createAnnouncement);
router.put('/:announcementId', isAuth, isAdmin, announcementApiController.updateAnnouncement);
router.delete('/:announcementId', isAuth, isAdmin, announcementApiController.deleteAnnouncement);

module.exports = router;

