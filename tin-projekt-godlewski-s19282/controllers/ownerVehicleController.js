exports.showOwnerVehicleList = (rex,res,next) => {
    res.render('pages/ownerVehicle/list',{ navLocation: 'ownerVehicle', validation:'none' });
}

exports.showAddOwnerVehicleForm = (rex,res, next) =>
{
    res.render('pages/ownerVehicle/form',{ navLocation: 'ownerVehicle',validation:'ownerVehicle' });
}
exports.showOwnerVehicleDetails = (rex,res, next) =>
{
    res.render('pages/ownerVehicle/details',{ navLocation: 'ownerVehicle', validation:'none' });
}
exports.showEditOwnerVehicleForm = (rex,res, next) =>
{
    res.render('pages/ownerVehicle/edit',{ navLocation: 'ownerVehicle',validation:'ownerVehicle' });
}
