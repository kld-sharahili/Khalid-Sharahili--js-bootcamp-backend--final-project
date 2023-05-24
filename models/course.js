const mongoose = require("mongoose")
const schema = mongoose.Schema

const courseSchema = schema({
    courseName: String,
    description: String,
    field: String,

    instructorInfo: {
        type: schema.Types.ObjectId,
        ref: "instructor"
    }

},{
    timestamps: true
})

const Course = mongoose.model("course", courseSchema)
module.exports = Course