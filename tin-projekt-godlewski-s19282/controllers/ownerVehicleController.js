exports.showOwnerVehicleList = (rex,res,next) => {
    res.render('pages/ownerVehicle/list',{ navLocation: 'ownerVehicle' });
}

exports.showAddOwnerVehicleForm = (rex,res, next) =>
{
    res.render('pages/ownerVehicle/form',{ navLocation: 'ownerVehicle' });
}
exports.showOwnerVehicleDetails = (rex,res, next) =>
{
    res.render('pages/ownerVehicle/details',{ navLocation: 'ownerVehicle' });
}
exports.showEditOwnerVehicleForm = (rex,res, next) =>
{
    res.render('pages/ownerVehicle/edit',{ navLocation: 'ownerVehicle' });
}
