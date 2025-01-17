import express from 'express'
import isAuth from '../middlewares/isAuth.js';
import arenaModel from '../models/arenaModel.js'
import userModel from '../models/userModel.js';
const dashboardRouter = express.Router()

dashboardRouter.get('/',isAuth,async (req,res) => {
    const user = req.user;
    return res.status(200).json({
        message : 'Welcome to your Dashboard',
        data : {
            name : user.name,
            _id : user._id,
            imageUrl : user.imageUrl
        }
    })
})

dashboardRouter.post('/create-arena',isAuth,async (req,res) => {
    const {arenaName} = req.body;
    const user = req.user;
    try{  
        const arenaExists = await arenaModel.findOne({$and : [{arenaName},{userId : user._id}]});
        if(arenaExists){
           return res.status(400).json({
                message : 'Arena name already exists'
            })
        }
        const arena =  await arenaModel.create({arenaName,userId : user._id});
        return res.status(201).json({
            message : 'Arena created successfully',
            data : arena
        })
    }
    catch(error){
        return res.status(400).json({
            message : error
        })
    }
})

dashboardRouter.post('/delete-account',isAuth,async (req,res) => {
    const {id} = req.body;
    try{
        await userModel.findByIdAndDelete({_id : id});
        await arenaModel.deleteMany({userId : id})
        res.cookie('token','')
        return res.status(200).json({
            message : 'User account deleted successfully'
        })
    }
    catch(error){
        return res.status(500).json({
            message : 'Internal server error'
        })
    }
})

dashboardRouter.get('/recent-arenas',isAuth,async(req,res) => {
    const SKIP = parseInt(req.query.skip);
    const LIMIT = parseInt(req.query.limit);
 try{
    const user = req.user
    const totalArenas = await arenaModel.find({userId : user._id});
    const recentArenasPortion = await arenaModel.find({userId : user._id}).skip(SKIP).limit(LIMIT).exec();
    // console.log(recentArenasPortion)
     if(recentArenasPortion.length === 0){
        return res.status(204).json({
            message : 'No arenas developed'
        })
     }
     else{
        return res.status(200).json({
            message : 'Found arenas',
            portion : recentArenasPortion,
             total : totalArenas
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

dashboardRouter.get('/get-arena/:id',async (req,res) => {
    const id= req.params.id;
    try{
    const arena = await arenaModel.findOne({_id : id});
    return res.status(200).json({
        message : 'Arena found successfully',
        data : arena
    })
    }
    catch(error){
        return res.status(500).json({
            message : 'Internal server error',
            error
        })
    }

})


dashboardRouter.post('/delete-arena',async (req,res) => {
    const {id} = req.body;
    try{
    await arenaModel.findOneAndDelete({_id : id});
    return res.status(200).json({
        message : 'Arena deleted successfully',
    })
    }
    catch(error){
        return res.status(500).json({
            message : 'Internal server error',
            error
        })
    }
})

dashboardRouter.post('/save-files',async (req,res) => {
    const {id,html,css,js} = req.body;
    try{
     await arenaModel.findByIdAndUpdate({_id : id},{
         html,css,js
      });
      return res.status(201).json({
         message : 'Saved successfully'
      })
    }
    catch(error){
     return res.status(500).json({
         message : 'Internal server error'
     })
    }
 })
 
export default dashboardRouter