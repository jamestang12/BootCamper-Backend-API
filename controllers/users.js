const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');

//@desc    Get all users
//@route   GET /api/v1/users
//@access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

//@desc    Get single users
//@route   GET /api/v1/users/:id
//@access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
        sucess: true,
        data: user
    })
});

//@desc    Create user
//@route   POST /api/v1/users
//@access  Private/Admin
exports.createtUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);
    
    res.status(200).json({
        sucess: true,
        data: user
    })
});


//@desc    Update user
//@route   PUT /api/v1/users/:id
//@access  Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    
    res.status(200).json({
        sucess: true,
        data: user
    })
});

//@desc    Delete user
//@route   DELETE /api/v1/users/:id
//@access  Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)
    
    res.status(200).json({
        sucess: true,
        data: {}
    })
});




