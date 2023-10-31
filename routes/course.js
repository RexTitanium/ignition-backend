const express = require('express');
const router = express.Router();
const Course = require('../models/course.model');
const { ObjectId } = require('mongodb');

router.post('/course/createCourse',async(req,res)=>{
    try{
        const {courseName}=req.body;
        const course=new Course({courseName});
        await course.save();
        res.status(200).json({ message: 'Course created successfully' });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
});

router.get('/course/courseInfo/:id',async(req,res)=>{
    // const collection=await db.collection("courses");
    try{
        const course=await Course.findById(req.params.id);
        res.status(200).json({ message: 'Course found',course });
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
});



router.delete('/course/:id',async(req,res)=>{
    try {
        const course = await Course.findOneAndDelete(req.params.id);

        if (!course) {
            return res.status(401).json({ message: 'Course Not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully',course});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/course/:id',async(req,res)=>{
    const {courseName}=req.body;
    try{
        const course = await Course.findByIdAndUpdate(req.params.id,{courseName})
        if (!course) {
            return res.status(401).json({ message: 'Course Not Found' });
        }
        res.status(200).json({ message: 'Course updated successfully', course });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;