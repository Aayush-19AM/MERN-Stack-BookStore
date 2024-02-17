

import express, { json } from 'express'
import  mongoose  from 'mongoose';

import { PORT,mongoDBURL } from './config.js';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app=express();

//middleware for parsing the request
app.use(express.json())

//Middleware to handle cors policy
// Option:1 Allow all origin with default of cors
app.use(cors());

// Option2:Allow custom origin
// app.use(cors({
//     origin:'http://localhost:5555/',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }))

app.use('/books',booksRoute)
//here /books is ddefined so no need to define in router.get,post,pust remove from routes

app.get('/',(req,res)=>{
    res.status(201).send("BookStore Project")
})



mongoose.connect(mongoDBURL)
.then(()=>{

    console.log("Database Connected")
    
})
.catch((error)=>{
    console.log(error)
})

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})

