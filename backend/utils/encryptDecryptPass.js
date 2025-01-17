import bcrypt from 'bcryptjs';
import 'dotenv/config'

const saltRounds = parseInt(process.env.SALT_ROUNDS);

export async function encryptPass(password){
     const hashedPass = await bcrypt.hash(password, saltRounds);
     return hashedPass;
}

export async function decryptPass(password,hashedPass){
    const isMatchedPass = await bcrypt.compare(password, hashedPass);
    return isMatchedPass
}


