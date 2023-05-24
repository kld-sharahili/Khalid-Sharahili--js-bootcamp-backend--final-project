const Student = require("../models/stdUser")
const JWT = require("jsonwebtoken")

// BCRYPT REQUIREMENTS
const bcrypt = require('bcrypt');
const saltRound = process.env.Private
const saltRounds = Number(saltRound)

const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


module.exports = {
    register: (req, res) => {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        
        const createStd = async () => {
            
            try {
            const hashedPassword = await bcrypt.hash(password, saltRounds)


            const newStudent = await new Student({
                username,
                email,
                password: hashedPassword
            })

                const foundUser = await newStudent.save()
                const token = JWT.sign({user: {
                    id: foundUser._id,
                    username: foundUser.username
                }}, process.env.private ,{expiresIn: "12h"})

                res.json({userInfo: {
                    id: foundUser._id, 
                    username: foundUser.username, 
                    email: foundUser.email
                }, token})

            } catch (err) {
                user.status(400).json({errorMessage: err})
            }
        }

        // Calling createStd
        createStd()
    },

    enteredToSystem: (req, res) => {
        const username = req.body.username
        const password = req.body.password

        const loginStd = async () => {
            
            const foundStd = await Student.findOne({username})
            
            if(!foundStd) {
                res.status(401).json({errorMessage: "not found user"})
                return
            }

            const pwdHashed = foundStd.password
            const response = await bcrypt.compare(password, pwdHashed)

            if(response == true){
                const token = JWT.sign({user: {
                    id: foundStd._id,
                    username: foundStd.username
                }}, process.env.private ,{expiresIn: "12h"})

                res.json({userInfo: {
                    id: foundStd._id, 
                    username: foundStd.username, 
                    email: foundStd.email
                }, token})
            } else {
                res.status(401).json({alertMessage: "incorrect password"})
            }
        }

        // calling loginStd
        loginStd()
    }
}
