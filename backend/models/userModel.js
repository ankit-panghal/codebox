import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true
    },
    imageUrl :{
        type : String
    },
    isVerified : {
       default : false,
       type : Boolean
    },
    arenas : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'arenas',
    }]
})

const userModel = mongoose.model('users',userSchema);
export default userModel;