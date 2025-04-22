import express from 'express'
import bcrypt from 'bcrypt'
import UserModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import authware from '../middlewares/authware.js'
import dotenv from 'dotenv'
dotenv.config()

const autherRouter=express.Router()

autherRouter.post('/registration',async(req,res)=>{
     try {
        const {name,userName,pass,role}=req.body
        const hashPass=await bcrypt.hash(pass,5)
        const userData=new UserModel({
            name,
            userName,
            pass:hashPass,
            role
        })
        await userData.save()
        return res.send('your registration successful')
    } catch (error) {
        return res.send(`${error}`)
    }  
})

autherRouter.post('/login',authware,async(req,res)=>{
    try {
        const {userName,pass}=req.body
        const token=jwt.sign({userName:userName},process.env.JWT_KEY)
        return res.send(`${token}`)
    } catch (error) {
        return res.send(`${error}`)
    }
})

export default autherRouter