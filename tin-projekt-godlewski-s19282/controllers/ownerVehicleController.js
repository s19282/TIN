exports.showOwnerVehicleList = (rex,res,next) => {
    res.render('pages/ownerVehicle/list',{});
}

exports.showAddOwnerVehicleForm = (rex,res, next) =>
{
    res.render('pages/ownerVehicle/form',{});
}
exports.showOwnerVehicleDetails = (rex,res, next) =>
{
    res.render('pages/ownerVehicle/details',{});
}
exports.showEditOwnerVehicleForm = (rex,res, next) =>
{
    res.render('pages/ownerVehicle/edit',{});
}
