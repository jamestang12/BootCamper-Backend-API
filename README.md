# BootCamper-Backend-API
Back-end bootcamp API for directory website, allow user to list all bootcamps in the database, search bootcamp and more
* [Link to API](https://jamesyang12.com/)

## Tools

* Javascript(ES6)
* Node.JS
* Express.Js
* MongoDB
* Mongoose Middleware
* Postman
* Geocoder 
* Mapquest
* Nodemailer
* Mailtrap
* Digital Ocean
* PM2


## Functionality

### Bootcamps
- [x] List all bootcamps in the database
- [x] Search bootcamps by radius from zipcode
- [x] Upload a photo for bootcamp
- [x] Update bootcamps
- [x] Delete Bootcamp
- [x] Calculate the average cost of all courses for a bootcamp
- [x] Calculate the average rating from the reviews for a bootcamp

### Courses
- [x] List all courses for bootcamp
- [x] List all courses in general
- [x] Get single course in Bootcamp
- [x] Create new course in Bootcamp
- [x] Delete course in Bootcamp

### Reviews
- [x] List all reviews for a bootcamp
- [x] List all reviews in general
- [x] Get a single review
- [x] Create a review
- [x] Update review
- [x] Delete review

### Users & Authentication
- [x] Authentication will be ton using JWT/cookies
- [x] User registration
- [x] User login
- [x] Get user
- [x] Password reset (lost password)
- [x] Update user info
- [x] User CRUD
- [x] Users can only be made admin by updating the database field manually

### Security
- [x] Encrypt passwords and reset tokens
- [x] Prevent cross site scripting - XSS
- [x] Prevent NoSQL injections
- [x] Add a rate limit for requests of 100 requests per 10 minutes
- [x] Protect against http param polution
- [x] Add headers for security (helmet)
- [x] Use cors to make API public (for now)

