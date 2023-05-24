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


module.exports = router