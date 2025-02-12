import mongoose from 'mongoose';

const arenaSchema = new mongoose.Schema({
    arenaName : {
        type : String,
        require : true
    },
    html : {
        type : String,
        require : true,
        default : ''
    },
    css : {
        type : String,
        require : true,
        default : ''
    },
    js : {
        type : String,
        require : true,
        default : ''
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        require : true
    }
})

const arenaModel =  mongoose.model('arenas',arenaSchema);
export default arenaModel