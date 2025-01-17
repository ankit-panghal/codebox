import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function generateToken(user){
const token = jwt.sign({user}, process.env.SECRET_KEY);
return token;
}

export function verifyToken(token){
    return new Promise((resolve,reject) => {
      jwt.verify(token, process.env.SECRET_KEY,(err,decoded) => {
        if(err) reject(err);  
         else resolve(decoded);
    });
})
}

