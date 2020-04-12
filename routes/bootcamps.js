const express = require('express');
const router = express.Router();
const {getBootcamp, 
       getBootcamps, 
       createBootcamp, 
       updateBootcamp, 
       deleteBootcamp,
       getBootcampsInRadius,
       bootcampPhotoUpload} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');

const advancedResults = require('../middleware/advancedResult');

//Include other resource routers
const courseRouter = require('./courses');

const { protect, authorize } = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin') ,bootcampPhotoUpload);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(advancedResults(Bootcamp, 'courses') ,getBootcamps).post(protect,authorize('publisher', 'admin'), createBootcamp);


//router.route('/').get(getBootcamps).post(createBootcamp);


router.route('/:id').get(getBootcamp).put(protect, authorize('publisher', 'admin'),updateBootcamp).delete(protect, authorize('publisher', 'admin'),deleteBootcamp);

module.exports = router;

