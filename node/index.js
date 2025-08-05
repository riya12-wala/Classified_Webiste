dotenv.config();

import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import cors from 'cors'
import session from 'express-session';

import userRoute from './route/user.route.js' 
// import categoryRoute from './route/category.route'
import authRoute from './route/auth.route.js'
import categoryFinal from './route/categoryfinal.route.js'
import businessRoute from './route/business.route.js'
import reviewRoute from './route/review.route.js'

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use((cors({  origin: process.env.FRONTEND_URL,credentials:true})));

const PORT = process.env.PORT || 8000

app.use('/node-files', express.static('uploads'));
app.use('/node-files', express.static('business'));
app.use('/node-files', express.static('reviews'));
app.use('/node-files', express.static('category'));

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
    console.log("DB Connected")
})

app.listen(PORT, () => {
    console.log("Server is running on PORT :"+ PORT)
})

app.use(session({
    secret: process.env.your_secret_key,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // true in production with HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 5 // 5 minutes
      }// 5 min session
  }));

app.use('/api', authRoute)
app.use('/api', userRoute)
// app.use('/api', categoryRoute)
app.use('/api', categoryFinal)
app.use('/api', businessRoute)
app.use('/api', reviewRoute)


