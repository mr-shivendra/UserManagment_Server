import UserModel from '../models/user.model.js'
import bcrypt from 'bcrypt'

async function authware(req,res,next){
    const {userName,pass}=req.body
    const userData=await UserModel.find({userName:userName})
    bcrypt.compare(pass,userData[0].pass,(err,result)=>{
        err?res.send('you are not match to my credentials'):''
        if(result){
            next()
        }
    })
}

export default authware