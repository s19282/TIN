exports.showOwnerList = (rex,res,next) => {
    res.render('pages/owner/list',{});
}

exports.showAddOwnerForm = (rex,res, next) =>
{
    res.render('pages/owner/form',{});
}
exports.showOwnerDetails = (rex,res, next) =>
{
    res.render('pages/owner/details',{});
}
exports.showEditOwnerForm = (rex,res, next) =>
{
    res.render('pages/owner/edit',{});
}
