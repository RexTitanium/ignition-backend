express = require('express');
const announcementFunctions=require('../functions/announcement.functions')
const courseFunctions=require('../functions/course.functions')
const router = express.Router();
const Announcement = require('../models/announcement.model.js');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

router.post('/announcements',async(req,res)=>{
    try{
        const {courseName,title,message, email,name,date}=req.body;
        console.log(req.body)
        const courseID=await courseFunctions.getCourseIdByName(courseName)
        console.log(courseID)
        const announcement=new Announcement({courseID,courseName,title,message,email,name,date});
        await announcement.save();
        res.status(200).json({ message: 'Course created successfully' });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
});

router.get('/announcements/:id',async(req,res)=>{
    try{
        const announcement=await announcementFunctions.getAnnouncementsById(req.params.id);
        // const announcement=await Announcement.findById(req.params.id);
        res.status(200).json({message:"Announcement Found",announcement})
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});


router.get('/announcements/',async(req,res)=>{
    try {
        const announcements = await Announcement.find();
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

