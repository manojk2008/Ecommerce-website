import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './Routes/userRoutes.js'
import productRouter from './Routes/productRoute.js'
import cartRouter from './Routes/cartRoutes.js'
import orderRouter from './Routes/orderRoutes.js'

//App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=> console.log('Sever started on PORT : '+ port))