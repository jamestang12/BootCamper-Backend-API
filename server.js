const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');


const app = express();


//Load env vars
dotenv.config({path: './config/config.env'});

//Route files
const bootcapms = require('./routes/bootcamps.js');


//Connect to database
connectDB();



//Body parser
app.use(express.json());



//Dev loggin middleware
//if(process.env.NODE_ENV === 'development'){
  //  app.use(morgan('dev'));
//}

//Mount routes
app.use('/api/v1/bootcamps' , bootcapms);


//Error handler middleware
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}.red`);
    //Close server & exit process
    server.close(() => process.exit(1));
    
})


