import express from 'express'
import TaskModel from '../models/task.model.js'
import jwt from 'jsonwebtoken'
import roleware from '../middlewares/roleware.js'
import blockware from '../middlewares/blockware.js'
//import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const taskRouter=express.Router()


taskRouter.get('/task',[roleware(['user','manager','admin']),blockware],async(req,res)=>{
    try {
        const token=req.get('token')
        const tokenData=  jwt.verify(token,process.env.JWT_KEY)
        const userTasks=await TaskModel.find({userName:tokenData.userName})
        userTasks.length?res.send(`${JSON.stringify({userTask:userTasks})}`):res.send('there is no record')
    } catch (error) {
        return res.send(`${error}`)
    }
    
})

taskRouter.get('/task/:id',[roleware(['user','manager','admin']),blockware],async(req,res)=>{
    try {
        const index=req.params.id
        const userTasks=await TaskModel.find({_id:index})
        userTasks.length?res.send(`${JSON.stringify({userTask:userTasks})}`):res.send('there is no record')
    } catch (error) {
        return res.send(`${error}`)
    }
    
})

taskRouter.post('/task',[roleware(['user','admin']),blockware],async(req,res)=>{
    try {
        const token=req.get('token')
        const {title,description,status}=req.body
        const tokenData= jwt.verify(token,process.env.JWT_KEY)
        const userTasks=new TaskModel({
            title,description,status,
            userName:tokenData.userName
        })
        userTasks.save()
        const userwork=await TaskModel.find({userName:tokenData.userName})
        userwork.length?res.send(`${JSON.stringify({userTask:userwork})}`):res.send('there is no record')
    } catch (error) {
        return res.send(`${error}`)
    }
    
})

taskRouter.put('/task/:id',[roleware(['user','admin']),blockware],async(req,res)=>{
    try {
        const token=req.get('token')
        const tokenData= jwt.verify(token,process.env.JWT_KEY)
        const bodyData=req.body
        const index=req.params.id
        await TaskModel.findByIdAndUpdate({_id:index},bodyData)
        const userTasks=await TaskModel.find({userName:tokenData.userName})
        userTasks.length?res.send(`${JSON.stringify({userTask:userTasks})}`):res.send('there is no record')
    } catch (error) {
        return res.send(`${error}`)
    }
    
})

taskRouter.delete('/task/:id',[roleware(['user','admin']),blockware],async(req,res)=>{
    try {
        const token=req.get('token')
        const tokenData= jwt.verify(token,process.env.JWT_KEY)
        const index=req.params.id
        await TaskModel.findByIdAndDelete({_id:index})
        const userTasks=await TaskModel.find({userName:tokenData.userName})
        userTasks.length?res.send(`${JSON.stringify({userTask:userTasks})}`):res.send('there is no record')
    } catch (error) {
        return res.send(`${error}`)
    }
    
})

export default taskRouter