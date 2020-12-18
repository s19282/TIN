const Owner = require("../../model/sequelize/Owner");
const Registration = require("../../model/sequelize/OwnerVehicle");
const Vehicle = require("../../model/sequelize/Vehicle_");

exports.getOwners = () =>
{
    return Owner.findAll();
}

exports.getEmployeeById = (empId) => {
    return Owner.findByPk(empId,
        {
            include: [{
                model: Employment,
                as: 'employments',
                include: [{
                    model: Department,
                    as: 'department'
                }]
            }]
        });
};

exports.createEmployee = (newEmpData) => {
    return Employee.create({
        firstName: newEmpData.firstName,
        lastName: newEmpData.lastName,
        email: newEmpData.email
    });
};

exports.updateEmployee = (empId, empData) => {
    const firstName = empData.firstName;
    const lastName = empData.lastName;
    const email = empData.email;
    return Employee.update(empData, {where: {_id: empId }});
};

exports.deleteEmployee = (empId) => {
    return Employee.destroy({
        where: { _id: empId }
    });

};