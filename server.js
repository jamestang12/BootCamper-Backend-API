const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const path = require('path');
const cookieParaer = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');



const app = express();


//Load env vars
dotenv.config({path: './config/config.env'});

//Route files
const bootcapms = require('./routes/bootcamps.js');
const courses = require('./routes/courses.js');
const auth = require('./routes/auth.js');
const user = require('./routes/users');
const review = require('./routes/reviews');




//Connect to database
connectDB();



//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParaer());

//Prevent XSS attack
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 100
});

app.use(limiter);

//Prevent hpp param pollution
app.use(hpp());

//Enable CORS 
app.use(cors());


//Dev loggin middleware
//if(process.env.NODE_ENV === 'development'){
  //  app.use(morgan('dev'));
//}

//File uploading
app.use(fileupload());

//Sanitize data
app.use(mongoSanitize());


//Set security header
app.use(helmet());

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routes
app.use('/api/v1/bootcamps' , bootcapms);
app.use('/api/v1/courses' , courses);
app.use('/api/v1/auth',auth);
app.use('/api/v1/users',user);
app.use('/api/v1/reviews', review);




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


