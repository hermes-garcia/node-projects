const validateFields = require('./validate-fields');
const validateJwt = require('./validate-jwt');
const validateRoles = require('./validate-roles');

module.exports = {
    ...validateFields,
    ...validateJwt,
    ...validateRoles,
}