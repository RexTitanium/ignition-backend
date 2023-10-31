const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: 
    {
        type: String,
        required: true,
        unique: true,
    },
    encryptpassword: 
    {
        type: String,
        required: true,
    },
    fname:
    {
        type: String,
        required: true,
    },
    lname:
    {
        type: String,
        required: true,
    },
    type: 
    {
        type: String,
        enum : ['unapproved', 'student', 'teacher', 'admin'],
        default: 'unapproved',
    },
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);
module.exports = User;