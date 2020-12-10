exports.showVehicleList = (rex,res,next) => {
    res.render('pages/vehicle/list',{ navLocation: 'vehicle', validation:'none' });
}

exports.showAddVehicleForm = (rex,res, next) =>
{
    res.render('pages/vehicle/form',{ navLocation: 'vehicle',validation:'vehicle' });
}
exports.showVehicleDetails = (rex,res, next) =>
{
    res.render('pages/vehicle/details',{ navLocation: 'vehicle', validation:'none' });
}
exports.showEditVehicleForm = (rex,res, next) =>
{
    res.render('pages/vehicle/edit',{ navLocation: 'vehicle',validation:'vehicle' });
}
