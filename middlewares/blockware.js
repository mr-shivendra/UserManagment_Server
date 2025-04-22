import BlockModel from '../models/block.model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


async function blockware(req,res,next){
        try {
            const token=req.get('token')
            const tokenData= jwt.verify(token ,process.env.JWT_KEY)
            const blocklist=await BlockModel.find()
        if(blocklist.length==1){
           return blocklist[0].userNames.includes(tokenData.userName)? res.send('your are restricted by admin'):next()
        }
          return next()
       } catch (error) {
          return res.send(`${error}`)
       }
    
}

export default blockware