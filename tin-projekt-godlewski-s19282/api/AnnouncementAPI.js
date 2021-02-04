const Announcement = require('../repository/sequelize/AnnouncementRepository');

exports.getAnnouncements = (req, res, next) => {
    Announcement.getAnnouncements()
        .then(announcements => {
            res.status(200).json(announcements);
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getAnnouncementsAdmin = (req, res, next) => {
    Announcement.getAnnouncementsAdmin()
        .then(announcements => {
            res.status(200).json(announcements);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getAnnouncementById = (req, res, next) => {
    const announcementId = req.params.announcementId;
    Announcement.getAnnouncementById(announcementId)
        .then(announcement => {
            if(!announcement) {
                res.status(404).json({
                    message: 'Announcement with id: '+announcementId+' not found'
                })
            } else {
                res.status(200).json(announcement);
            }
        });
};

exports.createAnnouncement = (req, res, next) => {
    Announcement.createAnnouncement(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateAnnouncement = (req, res, next) => {
    const announcementId = req.params.announcementId;
    Announcement.updateAnnouncement(announcementId, req.body)
        .then(result => {
            res.status(200).json({message: 'Announcement updated!', rowsModified: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteAnnouncement = (req, res, next) => {
    const announcementId = req.params.announcementId;
    Announcement.deleteAnnouncement(announcementId)
        .then(result => {
            res.status(200).json({message: 'Removed announcement', rowsRemoved: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

