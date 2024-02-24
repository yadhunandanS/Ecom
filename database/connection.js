const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

async function createConnection() {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB CONNECTED');
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = createConnection;