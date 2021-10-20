const mongoose = require('mongoose')

//создаем mongo - схему
const taskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    status: {type: String, required: true, default: "new"},
    _isDeleted: {type: Boolean, required: true, default: false},
    _createdAt: {type: Boolean, required: true, default: false},

}, {timestamps: true})

const taskModel = mongoose.model("tasks", taskSchema)

module.exports = taskModel