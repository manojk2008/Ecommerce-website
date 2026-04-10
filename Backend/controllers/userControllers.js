import validator from "validator"
import bycrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";



const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req,res) =>{
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false, message:"user doesn't exists"})
        }

        const isMatch = await bycrypt.compare(password,user.password)

        if (isMatch) {
            const token = createToken(user._id)
           return res.json({success:true, token})
        }
        else{
          return  res.json({success:false, message: 'Invalid Credentials'})
        }
    } catch (error) {
        console.log(error);
       return res.json({success:false,message:error.message})
    }

}

//Route for user registration
const registerUser = async (req,res)=>{

    try {
        const {name, email, password} = req.body;

        //checking user existed
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"user already exists"})
        }

        //validating email & password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"please enter a valid email"})
        }
        if (password.length < 8) {
            return res.json({success:false, message:"please enter a strong password"})
        }

        // hahsing user password
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)
       return res.json({success:true,token})

    } catch (error) {
        console.log(error);
       return res.json({success:false,message:error.message})
    }
}

//Route for Admin login
const adminLogin = async(req,res)=>{
    try {
        const {email,password} = req.body

        if (email === process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            return res.json({success: true, token})
        } else {
            return res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
    }
}

export {loginUser, registerUser, adminLogin}