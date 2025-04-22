import express from 'express'
import dotenv from 'dotenv'
import taskRouter from './routes/task.routes.js'
import managerRouter from './routes/manager.router.js'
import autherRouter from './routes/authenticPage.js'
import adminRouter from './routes/admin.route.js'
import cors from 'cors'
import connection from './config.js'
dotenv.config()


const app=express()

app.use(cors())
app.use(express.json())
app.use('/do',autherRouter)
app.use('/adminblock',adminRouter)
app.use('/userFetch',taskRouter)
app.use('/managerFetch',managerRouter)


app.listen(process.env.PORT,async()=>{
    try {
       await connection 
       console.log(`your server is running at http://localhost:${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }  
})
