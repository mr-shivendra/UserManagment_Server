import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    userName:{type:String,required:true,unique:true},
    pass:{type:String,required:true},
    role:{type:String,required:true,enum:['user','manager'],default:'user'}
})

const UserModel=mongoose.model('AssociatesDetail',userSchema)

export default UserModel