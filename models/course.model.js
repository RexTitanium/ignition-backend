const { default: mongoose } = require("mongoose");
const Schema=mongoose.Schema;

const courseSchema=new Schema({
    courseName:
    {
        type:String,
        required: true,
        unique: true
    }
},{versionKey:false});
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;