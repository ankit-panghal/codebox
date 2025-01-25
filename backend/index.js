import express from 'express'
import cors from 'cors'
import './db.js'
import authRouter from './routes/authRoute.js'
import dashboardRouter from './routes/dashboardRoute.js'
import cookieParser from 'cookie-parser';
import cloudinary from './config/cloudinary.js'
import 'dotenv/config'
import isAuth from './middlewares/isAuth.js'
import multer from 'multer'
import userModel from './models/userModel.js'

const app = express();

const storage = multer.memoryStorage()
const upload = multer({storage})

app.use(cors({
    origin : 'https://codebox-01.netlify.app',
    credentials : true
}))

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

app.use('/auth', authRouter)
app.use('/dashboard',dashboardRouter)

app.get('/',(req,res) => {
    res.send('It is woking')
})

app.post('/upload',isAuth,upload.single('image'), (req,res) => {
   const buffer = req.file.buffer;

   cloudinary.uploader.upload_stream({ 
    resource_type: "image", 
    folder : `codebox_profile_photos/${req.user._id}`, 
    width : 500,
    quality : "auto",
     fetch_format: "auto"
    }, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error uploading image' });
    } else {
        (async function(){
            const user =  await userModel.findById(req.user._id);
            if(user.imageUrl){
                const imagePublicId = user.imageUrl.split('/').slice(-3).join('/').split('.')[0]
                await cloudinary.uploader.destroy(imagePublicId)
            }
                user.imageUrl = result.secure_url;
                await user.save();
        })()
    }
  }).end(buffer);

  return res.status(200).json({
    message : 'Uploaded successfully'
})
})

app.listen(PORT,() => {
    console.log(`Server running on port : ${PORT}`);
})

export default app
