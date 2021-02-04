const sequelize = require('./sequelize');
const faker = require('faker/locale/pl');
const authUtil = require('../../util/authUtils');

const Owner = require('../../model/sequelize/Owner');
const Vehicle = require('../../model/sequelize/Vehicle_');
const Registration = require('../../model/sequelize/Registration');
const Announcement = require('../../model/sequelize/Announcement');
const Role = require('../../model/sequelize/Role');

module.exports = () => {
    Owner.hasMany(Registration, {as: 'registrations', foreignKey: {name: 'owner_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Registration.belongsTo(Owner, {as: 'owner', foreignKey: {name: 'owner_id', allowNull: false} } );
    Vehicle.hasMany(Registration, {as: 'registrations', foreignKey: {name: 'vehicle_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Registration.belongsTo(Vehicle, {as: 'vehicle', foreignKey: {name: 'vehicle_id', allowNull: false} });
    Role.hasMany(Owner, {as: 'user', foreignKey: {name: 'role_id', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Owner.belongsTo(Role, {as: 'role', foreignKey: {name: 'role_id', allowNull: false} } );

    let allOwners, allVehicles;
    let registrations;
    return sequelize
        .sync({force: true})
        .then( () => {
            return Role.findAll();
        })
        .then(role => {
            if( !role || role.length === 0 ) {
                return Role.bulkCreate([
                    {name:'admin'},
                    {name:'user'}
                ])
                    .then( () => {
                        return Role.findAll();
                    });
            } else {
                return role;
            }
        })
        .then( () => {
            return Owner.findAll();
        })
        .then(owners => {
            if( !owners || owners.length === 0 ) {
                return Owner.bulkCreate([{
                    "id": 1,
                    "firstName": "Lew",
                    "lastName": "Plowright",
                    "email": "aa@bb.cc",
                    "phoneNumber": "6895595807",
                    "password": authUtil.hashPassword("admin"),
                    "role_id" : "1"
                }, {
                    "id": 2,
                    "firstName": "Shandeigh",
                    "lastName": "Robbins",
                    "email": "srobbins1@zimbio.com",
                    "phoneNumber": "9379136704",
                    "password": authUtil.hashPassword("password"),
                    "role_id" : "1"
                }, {
                    "id": 3,
                    "firstName": "Elena",
                    "lastName": "Mycroft",
                    "email": "ab@cd.ef",
                    "phoneNumber": "5544290679",
                    "password": authUtil.hashPassword("zaq1@WSX")
                }, {
                    "id": 4,
                    "firstName": "Eb",
                    "lastName": "Sutch",
                    "email": "esutch3@webmd.com",
                    "phoneNumber": "3183413073",
                    "password": authUtil.hashPassword("abc123")
                }, {
                    "id": 5,
                    "firstName": "Niki",
                    "lastName": "Blackly",
                    "email": "nblackly4@cnbc.com",
                    "phoneNumber": "8967016503",
                    "password": authUtil.hashPassword("qwertyuiop")
                }])
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
                return Vehicle.bulkCreate([{
                    "id": 1,
                    "vin": "WDDHF2EB3CA724146",
                    "make": "Dodge",
                    "model": "Avenger",
                    "firstRegistrationDate": "1994-03-20",
                    "engineCapacity": 1028
                }, {
                    "id": 2,
                    "vin": "WBAUC73508V792199",
                    "make": "Mitsubishi",
                    "model": "Eclipse",
                    "firstRegistrationDate": "1967-02-14",
                    "engineCapacity": 3536
                }, {
                    "id": 3,
                    "vin": "5FNYF3H41EB460593",
                    "make": "Saab",
                    "model": "9-5",
                    "firstRegistrationDate": "1997-08-12",
                    "engineCapacity": 5197
                }, {
                    "id": 4,
                    "vin": "1G6DC5EG2A0969170",
                    "make": "Lincoln",
                    "model": "Continental",
                    "firstRegistrationDate": "1999-04-18",
                    "engineCapacity": 10938
                }, {
                    "id": 5,
                    "vin": "SCBLF34FX4C519088",
                    "make": "Hummer",
                    "model": "H2",
                    "firstRegistrationDate": "1972-11-06",
                    "engineCapacity": 10504
                }])
                    .then( () => {
                        return Owner.findAll();
                    });
            } else {
                return vehicles;
            }
        })
        .then( vehicles => {
            allVehicles = vehicles;
            return Registration.findAll();
        })
        .then( registration => {
            if( !registration || registration.length === 0 ) {
            //     for(let i=0; i<300; i++)
            //     {
            //         let dateFrom=faker.date.between('1960-01-01',new Date());
            //         let dateTo = new Date();
            //         dateTo.setDate(dateFrom+Math.random()*30000);
            //
            //         registrations[i]={dateFrom:dateFrom
            //             ,dateTo:dateTo<=new Date()?dateTo:null
            //             ,registrationNumber: faker.regexpStyleStringParse('[A-Z]{2,3} \\d{4,5}')
            //             ,insuranceNumber: faker.regexpStyleStringParse('\\d{9}')
            //             ,owner_id: faker.numberBetween(0,100)
            //             ,vehicle_id: faker.numberBetween(0,100)};
            //     }
                return Registration.bulkCreate([{
                    "id": 1,
                    "dateFrom": "1965-09-30",
                    "dateTo": "2007-06-17",
                    "registrationNumber": "POP 5793",
                    "insuranceNumber": "561674060",
                    "owner_id": 1,
                    "vehicle_id": 2
                }, {
                    "id": 2,
                    "dateFrom": "1971-05-20",
                    "dateTo": "1977-12-23",
                    "registrationNumber": "PI 3512",
                    "insuranceNumber": "744075984",
                    "owner_id": 1,
                    "vehicle_id": 1
                }, {
                    "id": 3,
                    "dateFrom": "1981-06-15",
                    "dateTo": "2009-07-10",
                    "registrationNumber": "IF 95028",
                    "insuranceNumber": "275415841",
                    "owner_id": 2,
                    "vehicle_id": 3
                }, {
                    "id": 4,
                    "dateFrom": "2001-04-17",
                    "dateTo": "2003-11-10",
                    "registrationNumber": "CS 8409",
                    "insuranceNumber": "517115683",
                    "owner_id": 5,
                    "vehicle_id": 4
                }, {
                    "id": 5,
                    "dateFrom": "1980-06-06",
                    "dateTo": "2000-06-18",
                    "registrationNumber": "THE 5847",
                    "insuranceNumber": "625687190",
                    "owner_id": 2,
                    "vehicle_id": 2
                }, {
                    "id": 6,
                    "dateFrom": "1976-10-07",
                    "dateTo": "2006-11-05",
                    "registrationNumber": "CS 12949",
                    "insuranceNumber": "662932677",
                    "owner_id": 1,
                    "vehicle_id": 4
                }, {
                    "id": 7,
                    "dateFrom": "1972-10-16",
                    "dateTo": "2020-03-17",
                    "registrationNumber": "ES 44722",
                    "insuranceNumber": "012837911",
                    "owner_id": 5,
                    "vehicle_id": 5
                }, {
                    "id": 8,
                    "dateFrom": "1981-04-12",
                    "dateTo": "2004-12-03",
                    "registrationNumber": "HA 07809",
                    "insuranceNumber": "245093711",
                    "owner_id": 1,
                    "vehicle_id": 5
                }, {
                    "id": 9,
                    "dateFrom": "1991-10-15",
                    "dateTo": "2015-10-03",
                    "registrationNumber": "PEW 17643",
                    "insuranceNumber": "547837007",
                    "owner_id": 1,
                    "vehicle_id": 1
                }, {
                    "id": 10,
                    "dateFrom": "1980-03-08",
                    "dateTo": "2015-04-30",
                    "registrationNumber": "JAW 00344",
                    "insuranceNumber": "695179236",
                    "owner_id": 4,
                    "vehicle_id": 5
                }]);
            } else {
                return registration;
            }
        })
        .then( () => {
            return Announcement.findAll();
        })
        .then(announcement => {
            if( !announcement || announcement.length === 0 ) {
                return Announcement.bulkCreate([
                    {dateOfPublication: new Date(),expirationDate: '2021-05-05',text:'Przypominamy, że z powodu obecnej sytuacji epidemiologicznej obsługa interesantów odbywa się wyłącznie telefonicznie lub mailowo.'},
                    {dateOfPublication: new Date(),expirationDate: '2018-05-05',text:'W związku z epidemią czas na rejestrację pojazdu zostaje wydłużony z 30 do 180 dni.'}
                ])
                    .then( () => {
                        return Announcement.findAll();
                    });
            } else {
                return announcement;
            }
        });
};