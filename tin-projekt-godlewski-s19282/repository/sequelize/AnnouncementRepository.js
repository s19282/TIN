const Announcement = require('../../model/sequelize/Announcement');

exports.getAnnouncements = () =>
{
    return Announcement.findAll();
}

exports.getAnnouncementById = (announcementId) =>{
    return Announcement.findByPk(announcementId);
}

exports.createAnnouncement = (newAnnouncementData) => {
    return Announcement.create({
        expirationDate: newAnnouncementData.expirationDate,
    text: newAnnouncementData.text
    });
};

exports.updateAnnouncement = (announcementId, announcementData) => {
    return Announcement.update(announcementData, {where: {id: announcementId }});
};

exports.deleteAnnouncement = (announcementId) => {
    return Announcement.destroy({
        where: { id: announcementId }
    });
};