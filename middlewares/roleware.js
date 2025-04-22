import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

function roleware(arr){
    
    return async (req,res,next)=>{
    const token=req.get('token')
    const userData= jwt.verify(token,process.env.JWT_KEY)
    const data= await userModel.find({userName:userData.userName})
    if(arr.includes(data[0].role)){
        next()
    }else{
        res.send('your are not authorize')
    }
}
}


export default roleware