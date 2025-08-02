const express = require('express');
const jwt = require('jsonwebtoken')
const zod = require('zod');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET =process.env.JWT_SECRET
const userModel = require('../models/userModel.js')
const {authMiddleware} = require('../middleware/authMiddleware.js')
const router = express.Router();

const signupBody = zod.object({
    username : zod.string(),
    email: zod.string(),
    password : zod.string(),
})

router.post('/signup',async(req,res)=>{
    const {success}= signupBody.safeParse(req.body);
    if(!success){
        return res.status(401).json({message:"invalid credentials"})
    }

    const existingUser= await userModel.findOne({username:req.body.username,email:req.body.email});

    if(existingUser){
        return res.status(401).json({message:"User Already exist use different username"})
    }

    const user = await userModel.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


const signinBody = zod.object({
    email: zod.string(),
    password : zod.string(),
})
router.post('/signin',async(req,res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(401).json({message:"invalid credentials"})
    }
    const user = await userModel.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(user)
    {
        const userId = user._id;
        const token =jwt.sign({userId},JWT_SECRET);
        res.json({message:"successfully signed in",
            token:token
        })
        return
    }
    res.status(411).json({
        message: "Error while logging in"
    })
})

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; // or req.userId if your middleware attaches userId
    const user = await userModel.findById(userId).select("-_id -password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;