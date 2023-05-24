const mongoose = require("mongoose")
const schema = mongoose.Schema

const instSchema = schema({
    username: String,
    email: String,
    password: String,

    coursesInfo: [{
        type: schema.Types.ObjectId,
        ref: "course"
    }]

},{
    timestamps: true
})

const Instructor = mongoose.model("instructor", instSchema)
module.exports = Instructor