const express = require('express');
const dotenv = require('dotenv');

//Route files
const bootcapms = require('./routes/bootcamps.js');

//Load env vars
dotenv.config({path: './config/config.env'});

const app = express();

//Mount routes
app.use('/api/v1/bootcamps' , bootcapms);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));


