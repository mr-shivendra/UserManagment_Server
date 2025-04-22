import mongoose from 'mongoose'

const taskSchema=mongoose.Schema({
    title:{type:String,required:true},
    description :{type:String,required:true},
    status:{type:String,enum:['To-do','Progress','Completed'],required:true,default:'To-do'},
    userName:{type:String,required:true}
},{
    timestamps:true,
    versionKey:false
})

const TaskModel=mongoose.model('AssociateTask',taskSchema)

export default TaskModel