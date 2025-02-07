import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import validateCredentials from '../utils/validateCredentials.js'
import userModel from '../models/userModel.js'
import { decryptPass, encryptPass } from '../utils/encryptDecryptPass.js'
import { generateToken } from '../utils/token.js'

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
        const token = generateToken(email);
        return res.status(201).json({
        message : 'User created successfully',
        token
      })
   }
   catch(error){
     return res.status(500).json({
        message : 'Internal server error',
        error
     })
   }
});

authRouter.post('/login',async (req,res) => {
    const {email,password} = req.body;
    
   try{
        await validateCredentials({email,password,mode : 'login'})
        const userExists = await userModel.findOne({email});
        if(userExists){

            const isMatchedPass = decryptPass(password,userExists.password);
            if(isMatchedPass){
                const token = generateToken(email);
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
