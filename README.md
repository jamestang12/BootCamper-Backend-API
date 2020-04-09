# BootCamper-Backend-API (In Progress)
Back-end bootcamp API for directory website, allow user to list all bootcamps in the database, search bootcamp and more

## Tools

* Javascript(ES6)
* Node.JS
* Express.Js
* MongoDB
* Mongoose Middleware
* Postman
* Geocoder 
* Mapquest

## Functionality

### Bootcamps
- [x] List all bootcamps in the database
- [x] Search bootcamps by radius from zipcode
- [x] Upload a photo for bootcamp
- [x] Update bootcamps
- [x] Delete Bootcamp
- [ ] Calculate the average cost of all courses for a bootcamp
- [ ] Calculate the average rating from the reviews for a bootcamp

### Courses
- [x] List all courses for bootcamp
- [x] List all courses in general
- [x] Get single course in Bootcamp
- [x] Create new course in Bootcamp
- [x] Delete course in Bootcamp

### Reviews
- [ ] List all reviews for a bootcamp
- [ ] List all reviews in general
- [ ] Get a single review
- [ ] Create a review
- [ ] Update review
- [ ] Delete review

### Users & Authentication
- [ ] Authentication will be ton using JWT/cookies
- [ ] User registration
- [ ] User login
- [ ] Get user
- [ ] Password reset (lost password)
- [ ] Update user info
- [ ] User CRUD
- [ ] Users can only be made admin by updating the database field manually

### Security
- [ ] Encrypt passwords and reset tokens
- [ ] Prevent cross site scripting - XSS
- [ ] Prevent NoSQL injections
- [ ] Add a rate limit for requests of 100 requests per 10 minutes
- [ ] Protect against http param polution
- [ ] Add headers for security (helmet)
- [ ] Use cors to make API public (for now)

