const mongoose = require("mongoose")
const schema = mongoose.Schema

const adminSchema = schema({
    adminName: String,
    password: String,

},{
    timestamps: true
})

const Admin = mongoose.model("admin", adminSchema)
module.exports = Admin