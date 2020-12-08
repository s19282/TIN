exports.showVehicleList = (rex,res,next) => {
    res.render('pages/vehicle/list',{});
}

exports.showAddVehicleForm = (rex,res, next) =>
{
    res.render('pages/vehicle/form',{});
}
exports.showVehicleDetails = (rex,res, next) =>
{
    res.render('pages/vehicle/details',{});
}
exports.showEditVehicleForm = (rex,res, next) =>
{
    res.render('pages/vehicle/edit',{});
}
