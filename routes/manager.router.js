import express from 'express'
import roleware from '../middlewares/roleware.js'
import TaskModel from '../models/task.model.js'

const managerRouter=express.Router()

managerRouter.get('/task',roleware(['manager','admin']),async(req,res)=>{
    try {
        const {date,userName}=req.query
        const filterData={}
        userName?filterData.userName=userName:''
        if(date){
            const dates=new Date(date)
            filterData.createdAt={
                $gte:new Date(dates.setHours(0,0,0)),
                $lte:new Date(dates.setHours(23,59,59))
            }
        }
        let userTasks
        Object.keys(filterData).length>0? userTasks=await TaskModel.find(filterData):userTasks=await TaskModel.find()
        userTasks.length?res.send(`${JSON.stringify({userTask:userTasks})}`):res.send("there is no data")
    } catch (error) {
        return res.send(`${error}`)
    }
})

export default managerRouter