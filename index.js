import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import userRoutes from './routes/user-routes.js'
import adminRoutes from './routes/admin-routes.js'
import cors from 'cors';
import bodyParser from 'body-parser';
dotenv.config()
const app=express()
// Connect to database
connectDB()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())

app.get('/',(req,res)=>{
    res.json({message:'API is running...'})
})

app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
console.log(`server is running on port ${PORT}`)
})