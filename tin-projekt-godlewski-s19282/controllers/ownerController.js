exports.showOwnerList = (rex,res,next) => {
    res.render('pages/owner/list',{ navLocation: 'owner' });
}

exports.showAddOwnerForm = (rex,res, next) =>
{
    res.render('pages/owner/form',{ navLocation: 'owner' });
}
exports.showOwnerDetails = (rex,res, next) =>
{
    res.render('pages/owner/details',{ navLocation: 'owner' });
}
exports.showEditOwnerForm = (rex,res, next) =>
{
    res.render('pages/owner/edit',{ navLocation: 'owner' });
}
