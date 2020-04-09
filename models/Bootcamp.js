const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootcampSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Plase add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description:{
        type: String,
        required: [true, 'Plase add a description'],
        unique: true,
        trim: true,
        maxlength: [500, 'Description can not be more than 50 characters']
    },
    website:{
        type: String,
        match:[
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    phone:{
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    email:{
        type: String,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    address: {
        type: String,
        required: [true, 'Plase add a address']
    },
    location: {
        //GeoJSON Point
        type: {
            type: String,
            enum: ['Point']
            //required: true
          },
          coordinates: {
            type: [Number],
            //required: true,
            index: '2dsphere'
          },
          formattedAddress: String,
          street: String,
          city: String,
          state: String,
          zipcode: String,
          country: String
    },
    careers: {
        //Array of strings
        type: [String],
        required: true,
        enum:[
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ]
    },
    averageRating:{
        type: Number,
        min: [1, 'Rating must me at least 1'],
        max: [10, 'Rating must can not be more than 10']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing:{
        type: Boolean,
        default: false
    },
    jobAssistance:{
        type: Boolean,
        default: false
    },
    jobGuarantee:{
        type: Boolean,
        default: false
    },
    acceptGi:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

   
},{
    toJSON: { virtuals: true},
    toObject: { virtuals: true}
});

//Create bootcamp slug from the name
BootcampSchema.pre('save', function(next){
    //console.log('Slugify ran', this.name);
    this.slug = slugify(this.name, {lower: true})
    next();
});

//Geocode & create location field
BootcampSchema.pre('save', async function(next){
    const loc = await geocoder.geocode(this.address);
   // console.log(loc);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    }

    //Do not save address in DB
    this.address = undefined;
    next();
});

//Cascade delete courses when a bootcamp is deleted
BootcampSchema.pre('remove', async function(next){ //pre middleware
    console.log(`Courses being removed from bootcamp ${this._id}`);
    await this.model('Course').deleteMany({ bootcamp: this._id}); //Delete course that have the same id in the bootcamp object
    next();
})

//Reverse populate with virtuals
BootcampSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'bootcamp',   //bootcamp from Courses model
    justOne: false   
} )

module.exports = mongoose.model('Bootcamp', BootcampSchema);