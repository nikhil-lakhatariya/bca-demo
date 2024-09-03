const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const taskSchema = new Schema({
    task: { type: String },
    assign: { type: ObjectId },
    status: { type: String, default: "Assign", enum: ['Assign', 'Ongoing', 'Complete'] }
}, {
    timestamps: true,
    versionKey: false
})

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };