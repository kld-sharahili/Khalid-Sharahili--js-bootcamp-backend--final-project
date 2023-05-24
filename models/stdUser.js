const mongoose = require("mongoose")
const schema = mongoose.Schema

const stdUserSchema = schema({
    username: String,
    email: String,
    password: String
},{
    timestamps: true
})

const Student = mongoose.model("student", stdUserSchema)
module.exports = Student