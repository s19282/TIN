const sequelize = require('./sequelize');

const Owner = require('../../model/sequelize/Owner');
const Vehicle = require('../../model/sequelize/Vehicle');
const OwnerVehicle = require('../../model/sequelize/OwnerVehicle');

module.exports = () => {
    Owner.hasMany(OwnerVehicle, {as: 'ownerVehicles', foreignKey: {name: 'vehicle_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    OwnerVehicle.belongsTo(Owner, {as: 'owner', foreignKey: {name: 'owner_id', allowNull: false} } );
    Vehicle.hasMany(OwnerVehicle, {as: 'ownerVehicles', foreignKey: {name: 'owner_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    OwnerVehicle.belongsTo(Vehicle, {as: 'vehicle', foreignKey: {name: 'dept_id', allowNull: false} });

    let allOwners, allVehicles;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Owner.findAll();
        })
        .then(owners => {
            if( !owners || owners.length == 0 ) {
                return Owner.bulkCreate([
                    {firstName: 'Jan', lastName: 'Kowalski', email: 'jan.kowalski@acme.com', phoneNumber: '678345925'},
                    {firstName: 'Adam', lastName: 'Zieliński', email: 'adam.zielinski@acme.com', phoneNumber: '653225005'},
                    {firstName: 'Marian', lastName: 'Nowak', email: 'marian.nowak@acme.com', phoneNumber: '625953684'},
                ])
                    .then( () => {
                        return Owner.findAll();
                    });
            } else {
                return owners;
            }
        })
        .then( owners => {
            allOwners = owners;
            return Owner.findAll();
        })
        .then( vehicles => {
            if( !vehicles || vehicles.length == 0 ) {
                return Vehicle.bulkCreate([
                    { vin: 'JMZBA14P201131802', make: 'Mazda', model: '323f', firstRegistrationDate: 1994-12-20, engineCapacity: 1840 },
                    { vin: 'JF1GR8H64BL000001', make: 'Subaru', model: 'Impreza WRX STI', firstRegistrationDate: 2012-11-10, engineCapacity: 2500 },
                    { vin: 'JTHBC96S000000001', make: 'Lexus', model: 'GS450H', firstRegistrationDate: 2007-6-5, engineCapacity: 3500 }
                    ])
                    .then( () => {
                        return Vehicle.findAll();
                    });
            } else {
                return vehicles;
            }
        })
        .then( registration => {
            allVehicles = registration;
            return OwnerVehicle.findAll();
        })
        .then( registration => {
            if( !registration || registration.length == 0 ) {
                return OwnerVehicle.bulkCreate([
                    {dateFrom: '2001-01-01', dateTo: '2009-01-01', ownerId: allOwners[0].id, vehicleId: allVehicles[0].id},
                    {dateFrom: '2000-02-02', dateTo: '2009-01-01', ownerId: allOwners[1]._id, vehicleId: allVehicles[0]._id, salary: 4000, dateFrom: '2001-02-01', dateTo: '2009-02-01'},
                    {dateFrom: '1999-03-03', dateTo: '2009-01-01', ownerId: allOwners[0]._id, vehicleId: allVehicles[1]._id, salary: 3000, dateFrom: '2009-01-02', dateTo: null}
                ]);
            } else {
                return registration;
            }
        });
};