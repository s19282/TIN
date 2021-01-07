const Announcement = require('../../model/sequelize/Announcement');

exports.getAnnouncements = () =>
{
    return Announcement.findAll();
}

exports.getAnnouncementById = (announcementId) =>{
    return Announcement.findByPk(announcementId);
}