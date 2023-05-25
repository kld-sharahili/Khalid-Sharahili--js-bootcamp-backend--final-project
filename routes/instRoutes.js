const router = require("express").Router()
const instController = require("../controllers/instController")

// TO GET BODY
const bodyParser = require("body-parser")
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


// REGISTRATION ROUTE /GET/
router.get("/register", instController.showingInstRegister)
// REGISTRATION ROUTE /POST/
router.post("/register", instController.sendInstForRegister)

//===================================================================

// LOGIN ROUTE /GET/
router.get("/login", instController.showingInstLogin)
// LOGIN ROUTE /POST/
router.post("/instructorDashboard", instController.sendInstForLogin)

// ===================================================================

// INSTRUCTOR DASHBOARD ROUT -- localhost/instructor/instructorDashboard
router.get("/instructorDashboard", instController.instructorDashboard) 

// CREATE COURSE ROUTE /GET-POST/
router.get("/addCourse", instController.showingCourseForm)
router.post("/addCourse", instController.addNewCourse)

// READ/LIST COURSES ROUT
router.get("/listCourses", instController.showingAllCourses)

// READ SPECIFIC COURSE ROUT
router.get("/courseInfo/:id", instController.showingCourseInfo)

// UPDATE SPECIFIC COURSE ROUT /GET-POST/
router.get("/updateCourse/:id", instController.showingUpdateInfo)
router.post("/updateCourse/:id", instController.sendUpdatedCourseInfo)

// DELETE SPECIFIC COURSE ROUT
router.get("/deleteCourse/:id", instController.deleteCourse)

// LOG OUT THE SYSTEM ROUTE
router.get("/logout", instController.destroySession)
module.exports = router