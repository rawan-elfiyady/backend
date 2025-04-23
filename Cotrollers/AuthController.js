const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const authMiddleware = require("./Middleware/authMiddleware");
const supabase = require("./supabaseClient");

const router = express.Router();

const users = [];

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    if(!username || !password || !role){
        return res.status(400).send({
            message: 'Username, password, and role are required'
        })
    }

    if(role == "Patient"){
    const  existingPatient = users.find(user => username.username === username);
    if (existingUser){
        return res.status(400).send({
            message: 'User is already registered!'
        })
    }

    const hashedPassword= await bcrypt.hash(password, 10);
     users.push({
        username: username,
        password: hashedPassword
     })
    }
     res.status(201).send({
        message: 'User registered successfully!'
     });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).send({
            message: 'Username and password is required'
        })
    }

    const existingUser = users.find( user => user.username === username);
    if (!existingUser){
        return res.status(400).send({
            message: 'User is not registered!'
        })
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
        return res.status(400).send({
            message: 'Password is invalid'
        })
    }

    const token = jwt.sign({
        username: existingUser.username
    },
        config.secret, 
    {
        expiresIn: '1h'
    });
    res.send({token});
});

router.get('/test', authMiddleware, async (req, res) => {
    res.send({
        message: 'this api endpoint is protected by jwt'
    })

})
module.exports = router;