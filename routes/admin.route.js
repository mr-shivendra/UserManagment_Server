import express from 'express'
import BlockModel from '../models/block.model.js'

const adminRouter=express.Router()

adminRouter.put('/add',async(req,res)=>{
    try {
        const {userName}=req.body
        const blockList=await BlockModel.find()
        if(blockList.length==0){
           const data= new BlockModel({userNames:[userName]})
           await data.save()
        }else{
            const index=blockList[0]._id.toString()
            await BlockModel.findByIdAndUpdate({_id:index},{$push:{userNames:userName}})
        }
        return res.send(`${userName} is Blocklisted`)
    } catch (error) {
        console.log(error)
    }
})

adminRouter.put('/remove',async(req,res)=>{
    try {
        const {userName}=req.body
        const blockList=await BlockModel.find()
        if(blockList[0].userNames.length==0){
            return res.send('Your Blocklist is empty')
        }
        const index=blockList[0]._id.toString()
        await BlockModel.findByIdAndUpdate({_id:index},{$pull:{userNames:userName}})
        return res.send(`${userName} is Removed From Restrictions`)
    } catch (error) {
        console.log(error)
    }
})

export default adminRouter