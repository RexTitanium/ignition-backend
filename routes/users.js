const express = require('express');
const router = require("express").Router();
const User = require('../models/user.model');
const bcrypt=require('bcrypt')
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Middleware for parsing JSON requests
router.use(express.json());

//Test API Connection
router.get('/api/users/test', async (req, res) => {
    res.status(200).json({ message: 'Request recieved successfully' });
});

async function hashPassword(password){
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)
    return hash
}

//Create
router.post("/api/users/register", async (req, res) => {
    try {
        const { email, password, fname, lname, type} = req.body;
        if(!isValidEmail(email))
            res.status(400).json({ message: 'Invalid Email Format' })
        const encryptpassword=await hashPassword(password)
        const user = new User({ email, encryptpassword, fname, lname, type});
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Read
router.post('/api/users/find', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email Not Found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function comparePassword(password,passwordsaved){
    const isSame=bcrypt.compare(password,passwordsaved)
    return isSame
}

//Read
router.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email Not Found' });
        }
        decryptcompare=await comparePassword(password,user.password)
        if (user.password === decryptcompare)
            res.status(200).json({ user });
        else
            res.status(401).json({ message: 'Invalid Password' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update Type
router.patch('/api/users/update/type', async (req, res) => {
    const { email, type } = req.body;
    try {
        const user = await User.findOneAndUpdate({ email }, { type }, { new: true });

        if (!user) {
            return res.status(401).json({ message: 'Email Not Found' });
        }

        res.status(204).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update Password
router.patch('/api/users/update/password', async (req, res) => {
    const { email, password } = req.body;
    const encryptpassword=hashPassword(password)
    try {
        const user = await User.findOneAndUpdate({ email }, { encryptpassword }, { new: true });

        if (!user) {
            return res.status(401).json({ message: 'Email Not Found' });
        }

        res.status(204).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Delete
router.delete('/api/users', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOneAndDelete({ email });

        if (!user) {
            return res.status(401).json({ message: 'Email Not Found' });
        }

        res.status(204).json({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;