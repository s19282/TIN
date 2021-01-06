const sequelize = require('./sequelize');

const Owner = require('../../model/sequelize/Owner');
const Vehicle = require('../../model/sequelize/Vehicle_');
const OwnerVehicle = require('../../model/sequelize/OwnerVehicle');

module.exports = () => {
    Owner.hasMany(OwnerVehicle, {as: 'ownerVehicles', foreignKey: {name: 'owner_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    OwnerVehicle.belongsTo(Owner, {as: 'owner', foreignKey: {name: 'owner_id', allowNull: false} } );
    Vehicle.hasMany(OwnerVehicle, {as: 'ownerVehicles', foreignKey: {name: 'vehicle_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    OwnerVehicle.belongsTo(Vehicle, {as: 'vehicle', foreignKey: {name: 'vehicle_id', allowNull: false} });

    let allOwners, allVehicles;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Owner.findAll();
        })
        .then(owners => {
            if( !owners || owners.length === 0 ) {
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
            return Vehicle.findAll();
        })
        .then( vehicles => {
            if( !vehicles || vehicles.length === 0 ) {
                return Vehicle.bulkCreate([
                    { vin: 'JMZBA14P201131802', make: 'Mazda', model: '323f', firstRegistrationDate: '1994-12-20', engineCapacity: 1840 },
                    { vin: 'JF1GR8H64BL000001', make: 'Subaru', model: 'Impreza WRX STI', firstRegistrationDate: '2012-11-10', engineCapacity: 2500 },
                    { vin: 'JTHBC96S000000001', make: 'Lexus', model: 'GS450H', firstRegistrationDate: '2007-06-05', engineCapacity: 3500 }
                    ])
                    .then( () => {
                        return Owner.findAll();
                    });
            } else {
                return vehicles;
            }
        })
        .then( vehicles => {
            allVehicles = vehicles;
            return OwnerVehicle.findAll();
        })
        .then( registration => {
            if( !registration || registration.length === 0 ) {
                return OwnerVehicle.bulkCreate([
                    {dateFrom: '2001-01-01', dateTo: '2009-01-01', registrationNumber: 'ABC 1234', insuranceNumber: 123456789, owner_id: 1, vehicle_id: 1},
                    {dateFrom: '2000-02-02', dateTo: '2009-01-01', registrationNumber: 'BAC 5555', insuranceNumber: 435345435, owner_id: 2, vehicle_id: 2},
                    {dateFrom: '1999-03-03', dateTo: '2009-01-01', registrationNumber: 'CBA 7432', insuranceNumber: 878636544, owner_id: 1, vehicle_id: 2}
                ]);
            } else {
                return registration;
            }
        });
};