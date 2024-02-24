require('dotenv').config();

const { app } = require('./server');
require('./logger/logger');


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));