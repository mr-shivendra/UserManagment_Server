import mongoose from 'mongoose'

const blockSchema=mongoose.Schema({
    userNames:{type:[String],required:true}
})

const BlockModel=mongoose.model('BlockUser',blockSchema)        

export default BlockModel