const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');




//@desc    Get courses
//@route   GET /api/v1/courses
//@route   GET /api/v1/bootcamps/:bootcampId/courses
//@access  Public
exports.getCourses = asyncHandler(async(req, res, next) => {
    if(req.params.bootcampId){
        const courses = await Course.find({bootcamp: req.params.bootcampId})//Course.find().populate() will return all the data in bootcamp
        
        return res.status(200).json({success: true, count: course.length, data: courses});
    }else{
        res.status(200).json(res.advancedResults);
    }

    
});

//@desc    Get single course
//@route   GET /api/v1/courses/:id
//@access  Public
exports.getCourse = asyncHandler(async(req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    })

    if(!course){        
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: course
    })
});




//@desc    Add course
//@route   POST /api/v1/bootcamps/:bootcampId/courses
//@access  Private
exports.addCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId; //Pulling out the bootcamp id and put it in the req body
    
    
    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if(!bootcamp){        
        return next(new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`, 404));
    }

    const course = await Course.create(req.body);

    res.status(200).json({
        success: true,
        data: course
    })
});



//@desc    Add course
//@route   PUT /api/v1/courses/:id
//@access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {    
    let bootcamp = await Course.findById(req.params.id);

    if(!Course){        
        return next(new ErrorResponse(`No course with the id of ${req.params.bootcampId}`, 404));
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: course
    })
});


//@desc    Delete course
//@route   Delete /api/v1/courses/:id
//@access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {    
    const course = await Course.findById(req.params.id);

    if(!Course){        
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404));
    }

   await course.remove();

    res.status(200).json({
        success: true,
        data: {}
    })
});


