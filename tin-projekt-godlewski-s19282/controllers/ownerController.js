exports.showOwnerList = (rex,res,next) => {
    res.render('pages/owner/list',{ navLocation: 'owner',validation:'none' });
}

exports.showAddOwnerForm = (rex,res, next) =>
{
    res.render('pages/owner/form',{ navLocation: 'owner',validation:'owner' });
}
exports.showOwnerDetails = (rex,res, next) =>
{
    res.render('pages/owner/details',{ navLocation: 'owner',validation:'none' });
}
exports.showEditOwnerForm = (rex,res, next) =>
{
    res.render('pages/owner/edit',{ navLocation: 'owner',validation:'owner' });
}
