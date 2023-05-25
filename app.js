const express = require("express")
const app = express()

const mongoose = require("mongoose")
const JWT = require("jsonwebtoken")
const session = require("express-session")
const cookie = require("cookie-parser")
require("dotenv").config()

app.use(cookie())
app.use(session({secret: "js BootCamp"}))

// DB CONNECTION
const dbConnection = async () => {

    try{
        await mongoose.connect(process.env.db)
        console.log("CONNECTION IS SUCCEEDED")
    } catch (err) {
        console.log(err)
        console.log("YOU HAVE AN ERROR, CHECK YOUR CONNECTION")
    }
}

dbConnection()

// MODELS
const Student = require("./models/stdUser")
const Instructor = require("./models/instUser")
const Course = require("./models/course")

// API REQUIREMENTS 
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// ACTIVATE EJS STYLING FILES
app.use(express.static("public"))

// ACTIVATE EJS
app.set("view engin", "ejs") 

// STUDENT ROUTER / API
const stdRouter = require("./routes/stdRoutes")
app.use("/api/student", stdRouter)
// INSTRUCTOR ROUTER / UI
const instRouter = require("./routes/instRoutes")
app.use("/instructor", instRouter)
// =====================================================




// LISTENING TO PORT
app.listen(8888, () => {
    console.log("LISTENING") 
})