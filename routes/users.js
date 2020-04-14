const express = require('express');
const router = express.Router({mergeParams: true});
const {getUser, getUsers, createtUser, updateUser, deleteUser} = require('../controllers/users');

const User = require('../models/User');
const advancedResults = require('../middleware/advancedResult');
const { protect, authorize } = require('../middleware/auth');


router.use(protect); //Everything below thi swill this middleware
router.use(authorize('admin'));

router.route('/')
    .get(advancedResults(User), getUsers)
    .post(createtUser);

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);



module.exports = router;