import userModel from "../models/userModel.js";
import { verifyToken } from "../utils/token.js";

   async function isAuth(req,res,next){
      try{
      const token=  req.headers.authorization.split(' ')[1];
      const decoded = await verifyToken(token,process.env.LOGIN_SECRET_KEY);
      const userEmail = decoded.user;
       
       const user = await userModel.findOne({email : userEmail});
       if(user){
          req.user = user
         return next();
       }
    }
    catch(error){
      return res.status(400).json({
          message : 'Internal server error',
          error
      })
    }
   }

export default isAuth;