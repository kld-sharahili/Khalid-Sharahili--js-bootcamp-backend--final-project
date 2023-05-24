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
    // STUDENT REGISTRATION / API
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

    // STUDENT LOGIN / API :DONE
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
    },

    // LIST ALL COURSES / API :DONE 
    listAllCourses: (req, res) => {

        const listCourses = async () => {

            const allCourses = await Course.find()
            res.json(allCourses)
        }

        // calling listCourses
        listCourses()
    },


    // REGISTER IN SPECIFIC COURSE / API :DONE
    registerSpecificCourse: (req, res) => {
        const courseId = req.params.id
        
        const stdCourseRegister = async () => {

            try {
                const authHeader = req.headers.authorization
                const token = authHeader.split(" ")[1]           
                const verify = JWT.verify(token, process.env.private)
                
                const studentId = verify.user.id
                const findCourse = await Course.findById(courseId)
                const findStd = await Student.findById(studentId)
                
                const studentsRegistered = findCourse.studentInfo
                const index = studentsRegistered.indexOf(studentId)

                if(index == -1){
                    findCourse.studentInfo.push(studentId)                
                    findCourse.save()
                    findStd.coursesInfo.push(findCourse._id)
                    findStd.save()
                    res.json({alertMessage: "Done, you registered in " + findCourse.courseName + " course"})
                }else {
                    res.json({alertMessage: "You already registered in this course"})
                }


            } catch (err) {
                res.status(401).json({errorMessage: "not authorized"})
            }
        }

        // calling stdCourseRegister
        stdCourseRegister()
    },

    // LIST OF COURSES OF SPECIFIC STUDENT THAT REGISTERED IN / API : STOP HERE
    listSpecificCourses:  (req, res) => {
        const stdId = req.params.id

        const authHeader = req.headers.authorization
        const token = authHeader.split(" ")[1]           
        const verify = JWT.verify(token, process.env.private)
        const stdVerifyId = verify.user.id
        
        if(stdVerifyId == stdId){
            const listStdCourses = async () => {

                const findStd = await Student.findById(stdId)
                const populate = await findStd.populate("coursesInfo")
                res.json(populate.coursesInfo)
            }
    
            // calling listStdCourses
            listStdCourses()
        } else {
            res.status(401).json({errorMessage: "NOT AUTHORIZED"})
        }
        
    }
}
