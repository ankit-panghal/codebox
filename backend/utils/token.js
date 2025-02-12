import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function generateToken(user,key){
const token = jwt.sign({user}, key);
return token;
}

export function verifyToken(token,key){
    return new Promise((resolve,reject) => {
      jwt.verify(token, key,(err,decoded) => {
        if(err) reject(err);  
         else resolve(decoded);
    });
})
}

