import validator from 'validator'

const validateCredentials = ({name,email,password,mode}) => {
   return new Promise((resolve,reject) => {
    if(mode === 'signup'){
        if(!name || !email || !password){
            reject('Missing Credentials');
        }
        if(name.length < 3 || name.length >20){
            reject('Name length should be between 3-20')
        }
        if(typeof name !== 'string'){
            reject('Invalid Name format')
        }
        if(!validator.isEmail(email)){
            reject('Invalid Email format')
        }
        if(typeof password !== 'string'){
            reject('Invalid Password format')
        }
        if(password.length < 6){
            reject('Password length should be greater than 5')
        }
    }
    else {
        if(!email || !password){
            reject('Missing Credentials');
        } 
        if(!validator.isEmail(email)){
            reject('Invalid Email format')
        }
        if(typeof password !== 'string'){
            reject('Invalid Password format')
        }
        if(password.length < 6){
            reject('Password length should be greater than 5')
        }
    }
    resolve();
   })
}

export default validateCredentials;