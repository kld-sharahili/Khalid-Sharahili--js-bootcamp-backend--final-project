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

// LOGIN ROUTE /GET/ localhost:8888/instructor/login
router.get("/login", instController.showingInstLogin)
// LOGIN ROUTE /POST/
router.post("/instructorDashboard", instController.sendInstForLogin)

// ===================================================================

// INSTRUCTOR DASHBOARD ROUT -- localhost:8888/instructor/instructorDashboard
router.get("/instructorDashboard", instController.instructorDashboard) 

// CREATE COURSE ROUTE /GET-POST/ -- localhost:8888/instructor/addCourse
router.get("/addCourse", instController.showingCourseForm)
router.post("/addCourse", instController.addNewCourse)

// READ/LIST COURSES ROUT -- localhost:8888/instructor/listCourses
router.get("/listCourses", instController.showingAllCourses)

// READ SPECIFIC COURSE ROUT -- localhost:8888/instructor/courseInfo/:id
router.get("/courseInfo/:id", instController.showingCourseInfo)

// UPDATE SPECIFIC COURSE ROUT /GET-POST/ -- localhost:8888/instructor/updateCourse/:id
router.get("/updateCourse/:id", instController.showingUpdateInfo)
router.post("/updateCourse/:id", instController.sendUpdatedCourseInfo)

// DELETE SPECIFIC COURSE ROUT -- localhost:8888/instructor/deleteCourse/:id
router.get("/deleteCourse/:id", instController.deleteCourse)

// LOG OUT THE SYSTEM ROUTE -- localhost:8888/instructor/logout/
router.get("/logout", instController.destroySession)
module.exports = router