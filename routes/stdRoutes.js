const router = require("express").Router()
const stdController = require("../controllers/stdController")

// TO GET BODY
const bodyParser = require("body-parser")
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

// REGISTRATION ROUTE -- -- localhost:8888/api/student/register
router.post("/register", stdController.register)
// LOGIN ROUTE -- -- localhost:8888/api/student/login
router.post("/login", stdController.enteredToSystem)

// LIST ALL COURSES ROUT -- localhost:8888/api/student/listCourses
router.get("/listCourses", stdController.listAllCourses)

// REGISTER IN SPECIFIC COURSE ROUTE -- localhost:8888/api/student/courseRegistration
router.post("/courseRegistration/:id", stdController.registerSpecificCourse)

// LIST COURSES OF SPECIFIC STUDENT ROUT -- localhost:8888/api/student/listStdCourses
router.get("/listStdCourses/:id", stdController.listSpecificCourses)

// CANCEL REGISTRATION FROM COURSE ROUT -- localhost:8888/api/student/cancelRegistration
router.post("/cancelRegistration/:id", stdController.cancelRegistrationCourse)

module.exports = router