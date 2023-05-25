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

    // REGISTRATION PAGE
    showingInstRegister: (req, res) => {
        res.render("registerInstForm.ejs")
    },

    sendInstForRegister: (req, res) => {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password

        
        const createInst = async () => {
            
            try {
            const hashedPassword = await bcrypt.hash(password, saltRounds)


            const newInstructor = await new Instructor({
                username,
                email,
                password: hashedPassword
            })

                const foundNewInst = await newInstructor.save()


                res.redirect("/instructor/login")

            } catch (err) {
                res.send({errorMessage: err})
            }
        }

        // Calling createStd
        createInst()
    },

    // LOGIN PAGE
    showingInstLogin: (req, res) => {
        res.render("loginInstForm.ejs")
    },

    sendInstForLogin: (req, res) => {
        const username = req.body.userName
        const password = req.body.password

        const enteringInstToSys = async () => {

            const findInstUser = await Instructor.findOne({username})

            if(!findInstUser){
                res.send("not found this user")
                return
            }

            const pwdHashed = findInstUser.password
            const response = await bcrypt.compare(password, pwdHashed)
            if(response == true){
                req.session.currentInstructor = findInstUser._id
                res.redirect("/instructor/instructorDashboard")
            }else{
                res.send("username or password is not correct")
            }
        }

        // calling enteringInstToSys
        enteringInstToSys()
    },

    // INSTRUCTOR DASHBOARD PAGE
    instructorDashboard: (req, res) => {
        if(req.session.currentInstructor){
            const id = req.session.currentInstructor
            const findInstructor = async () => {
                const findInst = await Instructor.findById(id)
                const instructor = findInst.username
                res.render("instructorDashboard.ejs", {instructor})
            }
            findInstructor()
            
        } else {
            res.send("NOT AUTHORIZED")
        }
    },

    // CREATE COURSE PAGE 
    showingCourseForm: (req, res) => {
        if(req.session.currentInstructor){
            res.render("newCourse.ejs")
        }else {
            res.send("NOT AUTHORIZED")
        }
        
    },

    addNewCourse: (req, res) => {
        const courseName = req.body.courseName
        const description = req.body.description
        const field = req.body.CourseField


        
        const newCourse = async () => {
            
            if(req.session.currentInstructor){
                const findInstructor = await Instructor.findById(req.session.currentInstructor)
                    const newCourse = await new Course({
                        courseName,
                        description,
                        field,
                        instructorInfo: findInstructor
                    })
                    
                    const courseCreated =  await newCourse.save()
                    findInstructor.coursesInfo.push(courseCreated)
                    await findInstructor.save()
                    courseCreated.instructorInfo = findInstructor._id
                    await courseCreated.save()

                    const populate = await findInstructor.populate("coursesInfo")
                    const allCourses =  populate.coursesInfo
                    res.render("allCourses.ejs", {allCourses})

            } else {
                res.send("NOT AUTHORIZED")
            }
            
        }

        // calling newCourse
        newCourse()
    },

    // READ ALL COURSES PAGE
    showingAllCourses: (req, res) => {
        
        const findCourse = async () => {
            
            if(req.session.currentInstructor) {
                const foundCourses = await Instructor.findById(req.session.currentInstructor)
                const populate = await foundCourses.populate("coursesInfo")
                const allCourses =  populate.coursesInfo
                res.render("allCourses.ejs", {allCourses})
                // res.render("allCourses.ejs", {allCourses: foundCourses})

            } else {
                res.send("NOT AUTHORIZED")
            }
            
        }

        // calling newCourse
        findCourse()
    },

    // READ SPECIFIC COURSE PAGE :DONE
    showingCourseInfo: (req, res) => {
        if(req.session.currentInstructor){

            const courseInformation = async () => {
                const courseId = req.params.id
                const foundCourse = await Course.findById(courseId)
                const populate = await foundCourse.populate("instructorInfo")
                const instInfo = populate.instructorInfo
                res.render("courseInfo.ejs", {foundCourse, instInfo})
            }
            
            // calling courseInformation
            courseInformation()
        }else{
            res.send("NOT AUTHORIZED")
        }
        
    },

    // SHOWING SPECIFIC COURSE PAGE :DONE
    showingUpdateInfo: (req, res) => {
        if(req.session.currentInstructor){
            
            const updateCourse = async () => {
                const courseId = req.params.id
                const foundCourse = await Course.findById(courseId)
                const populate = await foundCourse.populate("instructorInfo")
                const instInfo = populate.instructorInfo
                res.render("updateCourseInfo.ejs", {foundCourse, instInfo})
            }

            // calling updateCourse
            updateCourse()
        }else {
            res.send("NOT AUTHORIZED")
        }
        
    },

    // SENDING UPDATED INFORMATION  :DONE
    sendUpdatedCourseInfo: (req, res) => {
        if(req.session.currentInstructor){
            const courseId = req.params.id

            const courseName = req.body.courseName
            const field = req.body.field
            const description = req.body.description
            const instructorOf =req.body.instructor
            
            const courseUpdated = async () => {
                const findCourse = await Course.findById(courseId)
                findCourse.courseName = courseName
                findCourse.field = field
                findCourse.description = description
                
                const courseUpdated = await findCourse.save()
                res.redirect("/instructor/listCourses")
            }

            // calling updateCourse
            courseUpdated()
        } else {
            res.send("NOT AUTHORIZED")
        }

    },

    // DELETE SPECIFIC COURSE PAGE :DONE
    deleteCourse: (req, res) => {
        
        if(req.session.currentInstructor){
            const deleteCourse = async () => {
                const Id = req.params.id
                await Course.findByIdAndDelete(Id)
                
                const instructor = await Instructor.findById(req.session.currentInstructor)
                const coursesInformation = await instructor.coursesInfo

                const index = coursesInformation.indexOf(Id);
                coursesInformation.splice(index, 1);
                await instructor.save()
                res.redirect("/instructor/listCourses")
            }
            // calling deleteCourse
        deleteCourse()
        
        } else {
            res.send("NOT AUTHORIZED")
        }
        
    },

    // LOGOUT / DESTROY SESSION :DONE
    destroySession: (req, res) => {
        req.session.destroy()
        res.redirect("/instructor/login")
    }
}


// https://lmsfinalproject.onrender.com