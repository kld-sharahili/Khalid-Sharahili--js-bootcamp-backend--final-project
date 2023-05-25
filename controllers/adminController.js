const Admin = require("../models/admin") 
const Instructor = require("../models/instUser")
const Student = require("../models/stdUser")
const Course = require("../models/course")

const JWT = require("jsonwebtoken")

// BCRYPT REQUIREMENTS
const bcrypt = require('bcrypt');
const saltRound = process.env.Private
const saltRounds = Number(saltRound)
 
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon'; 


module.exports = {
    createOneAdmin: (req, res) => {
        const adminName = "admin"
        const password = "secret"

        
        const createAdmin = async () => {
            
            try {
            const hashedPassword = await bcrypt.hash(password, saltRounds)


            const newAdmin = await new Admin({
                adminName,
                password: hashedPassword
            })

                await newAdmin.save()
                res.send("Admin Created")

            } catch (err) {
                res.send({errorMessage: err})
            }
        }

        // Calling createAdmin
        createAdmin()
    },

    showLoginAdmin: (req, res) => {
        res.render("adminLogin.ejs")
    }
}