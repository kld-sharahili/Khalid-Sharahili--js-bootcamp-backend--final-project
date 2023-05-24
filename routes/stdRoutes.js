const router = require("express").Router()
const stdController = require("../controllers/stdController")

// TO GET BODY
const bodyParser = require("body-parser")
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

// REGISTRATION ROUTE
router.post("/register", stdController.register)
// LOGIN ROUTE
router.post("/login", stdController.enteredToSystem)

// LIST ALL COURSES ROUT -- localhost/api/student/listCourses
router.get("/listCourses", stdController.listAllCourses)

// REGISTER IN SPECIFIC COURSE ROUTE -- localhost/api/student/courseRegistration
router.post("/courseRegistration/:id", stdController.registerSpecificCourse)

// LIST COURSES OF SPECIFIC STUDENT ROUT -- localhost/api/student/listStdCourses
router.get("/listStdCourses/:id", stdController.listSpecificCourses)

// CANCEL REGISTRATION FROM COURSE ROUT -- localhost/api/student/cancelRegistration
router.post("/cancelRegistration/:id", stdController.cancelRegistrationCourse)

module.exports = router