import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import validateCredentials from '../utils/validateCredentials.js'
import userModel from '../models/userModel.js'
import { decryptPass, encryptPass } from '../utils/encryptDecryptPass.js'
import { generateToken, verifyToken } from '../utils/token.js'
import { sendMail } from '../utils/nodemailer.js'
import 'dotenv/config'

const authRouter = express.Router()

 authRouter.get('/',isAuth,(req,res) => {
   return res.status(200).json({
        message : 'User found successfully'
    })
})
 
authRouter.post('/signup',async (req,res) => {
    const {name,email,password} = req.body;
    
   try{
        await validateCredentials({name,email,password,mode : 'signup'});
        const userExists = await userModel.findOne({email});
        if(userExists){
        return res.status(400).json({
            message : 'User already exists'
        })
        } 
        const hashedPass = await encryptPass(password);
        await userModel.create({name,email,password : hashedPass}) 
        const token = generateToken(email,process.env.VERIFICATION_SECRET_KEY);
        const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${token}`;
        await sendMail(verificationLink,email,name)
        return res.status(201).json({
        message : 'Please check your email to verify your account',
      })
   }
   catch(error){
     return res.status(500).json({
        message : 'Internal server error',
        error
     })
   }
});

authRouter.get('/verify',async (req,res) => {
    const token = req.query.token
    try{
       const decoded =  await verifyToken(token,process.env.VERIFICATION_SECRET_KEY)
       const userEmail = decoded.user
       await userModel.findOneAndUpdate({email :userEmail},{isVerified : true})
        res.status(200).json({
            message : 'Email verified successfully'
        })
    }
    catch(err){
        res.status(400).json({
            message : 'Invalid token',
            error : err
        })
    }
})

authRouter.post('/login',async (req,res) => {
    const {email,password} = req.body;
    
   try{
        await validateCredentials({email,password,mode : 'login'})
        const userExists = await userModel.findOne({email});
        if(userExists && userExists.isVerified){
            const isMatchedPass = await decryptPass(password,userExists.password);
            if(isMatchedPass){
                const token = generateToken(email,process.env.LOGIN_SECRET_KEY);
                return res.status(200).json({
                    message : 'User logged in successfully',
                    token
                })
            }
            else {
                  return res.status(400).json({
                    message : 'Incorrect email or password'
                   })
            }
        }
        else if(userExists && !userExists.isVerified){
            const token = generateToken(email,process.env.VERIFICATION_SECRET_KEY);
            const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${token}`;
            await sendMail(verificationLink,email,userExists.name)
            return res.status(400).json({
            message : 'Please verify your email'
           })
        }
        else{
            return res.status(400).json({
                message : 'Incorrect email or password'
            })
        }
   }
    catch(error){
        return res.status(500).json({
            message : 'Internal server error',
            error
        })
    }
})

export default authRouter
