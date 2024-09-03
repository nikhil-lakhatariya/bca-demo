const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
    name: { type: String },
    role: { type: String, default: "User", enum: ['User', 'Admin'] },
    email: { type: String },
    password: { type: String }
}, {
    timestamps: true,
    versionKey: false
})

const User = mongoose.model("User", userSchema);

module.exports = { User };