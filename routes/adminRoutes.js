const router = require("express").Router()
const adminController = require("../controllers/adminController")

// TO GET BODY
const bodyParser = require("body-parser")
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())


// CREATE ADMIN FOR ONCE -- localhost:8888/admin/createAdmin
router.get("/createAdmin", adminController.createOneAdmin)

// SHOW ADMIN LOGIN PAGE -- localhost:8888/admin/login
router.get("/login", adminController.showLoginAdmin)

module.exports = router