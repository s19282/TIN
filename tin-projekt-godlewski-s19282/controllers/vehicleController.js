exports.showVehicleList = (rex,res,next) => {
    res.render('pages/vehicle/list',{ navLocation: 'vehicle' });
}

exports.showAddVehicleForm = (rex,res, next) =>
{
    res.render('pages/vehicle/form',{ navLocation: 'vehicle' });
}
exports.showVehicleDetails = (rex,res, next) =>
{
    res.render('pages/vehicle/details',{ navLocation: 'vehicle' });
}
exports.showEditVehicleForm = (rex,res, next) =>
{
    res.render('pages/vehicle/edit',{ navLocation: 'vehicle' });
}
