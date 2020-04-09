const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');
const geocoder = require('../utils/geocoder');
const asyncHandler = require('../middleware/async');


//@desc    Get all bootcamps
//@route   GET /api/v1/bootcamps
//@access  Public
exports.getBootcamps = asyncHandler (async (req, res, next) => {
    let query;

    //Copy req.query
    const reqQuery = {...req.query}

    //Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit']

    //Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    console.log(reqQuery);

    //Create query string
    let queryStr = JSON.stringify(reqQuery);

    //console.log(queryStr);

    //Create operators($gt, $gte, etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    //console.log(queryStr);

   

    //Finding resource
    query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');


     //Select Fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');  //This is for the select documentation
        query = query.select(fields);
        
    }

     //Sort
     if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy)
    }else{
        query = query.sort('-createdAt');
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1)*limit;
    const endIndex = page*limit
    const total = await Bootcamp.countDocuments();

    query = query.skip(startIndex).limit(limit);
   
    //Pafination result
    const pagination = {};

    if(endIndex < total){
        pagination.next ={
            page: page + 1,
            limit
        }
    }
    
    if(startIndex > 0){
        pagination.prev={
            page: page - 1,
            limit
        }
    }


    
    //Executing query
    const bootcamps = await query;

    res.status(200).json({success: true, count: bootcamps.length, pagination, data:bootcamps});

   
   
});

//@desc    Get single bootcamps
//@route   GET /api/v1/bootcamps/:id
//@access  Public
exports.getBootcamp = asyncHandler( async (req, res, next) => {
     
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp){
        return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));

    }

    res.status(200).json({success: true, data: bootcamp})


});

//@desc     Create new bootcamp
//@route    POST /api/v1/bootcamps/:id
//@access   Private
exports.createBootcamp = asyncHandler( async (req, res, next) => {
    
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
        success: true,
        data: bootcamp
    });
    
    
});

//@desc     Update new bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = asyncHandler( async (req, res, next) => {
  
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!bootcamp){
        return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({success: true, data: bootcamp});
   
   
});


//@desc     Delete new bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = asyncHandler( async(req, res, next) => {
    
    const bootcamp = await Bootcamp.findById(req.params.id);
    
    if(!bootcamp){
        return next(new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404));
    }

    bootcamp.remove();
    
    res.status(200).json({success: true, data: {}});
       
});


//@desc     Get new bootcamps within a radius
//@route    GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access   Public
exports.getBootcampsInRadius = asyncHandler( async(req, res, next) => {
    const{ zipcode, distance } = req.params;

    //Get /lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
    
    //Calc radius using radians
    //Dicide distance by radius of Earth
    //Earth Radius = 3963 mi / 6378 km 
    const radius = distance / 3963;
    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius]}}
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
});
