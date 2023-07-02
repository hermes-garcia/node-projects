const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('db connected');

    } catch (e) {
        throw new Error(e);
    }
}


module.exports = {
    dbConnection,
}