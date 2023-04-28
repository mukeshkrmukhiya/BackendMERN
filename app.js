const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
// app.use((req, res, next) => {

//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header( 'Access-Control-Allow-Headers',
//     "Origin, X-Reuested-With, Content-Type, Accept"

//     )
   
//     next();
//   });

const dotenv = require('dotenv');
dotenv.config({path: './config.env'})
require("./db/conn")
app.use(express.json())
const User = require('./models/userSchema');
const { default: mongoose } = require('mongoose');
app.use(require('./router/auth'))
const PORT = process.env.PORT || 8000;



const cookieParser = require('cookie-parser')
app.use(cookieParser());

 


app.get('/', (req, res)=>{
    res.send("hello form get method")
})

// const middleware = (req, res, next)=>{
//     console.log("Hello from middleware")
//     next()
// }
// app.get('/about',middleware, (req, res)=>{
//     res.cookie("coooo", "mueksh")
//     res.send("hello from about")

// })





app.listen(PORT, (req, res)=>{
    
    console.log(`Listening AT ${PORT}`)
})
