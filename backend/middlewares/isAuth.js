import userModel from "../models/userModel.js";
import { verifyToken } from "../utils/token.js";

   async function isAuth(req,res,next){
      try{
      const token=  req.headers?.cookie?.split('=')[1];
      const decoded = await verifyToken(token);
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