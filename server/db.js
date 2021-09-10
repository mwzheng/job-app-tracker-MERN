const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`Mongodb Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(`Error ${err.message}`);
        process.exit(1);
    }
}

module.exports = connectDb;