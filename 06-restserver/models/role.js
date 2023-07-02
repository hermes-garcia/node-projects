const {Schema, model} = require('mongoose');

const RoleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'Role name is required'],
    },

});

module.exports = model( 'Role', RoleSchema )