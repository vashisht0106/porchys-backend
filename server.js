const app = require('./app')
const express = require('express');
app.use(express.json());
const dotenv=require('dotenv')
// const ErrorHander=require('../utils/errorHander') 
dotenv.config()
const mongoose = require('mongoose')
const product = require('./routes/productRoute')
const user = require('./routes/userRoute');
const order=require('./routes/orderRoute')
const payment=require('./routes/paymentRoute')

//const payment=require(paume)
// const error = require('../middileware/error');
const cookieParser=require('cookie-parser');
// const productRoute = require('./controller/productContoller')

mongoose.connect(process.env.MONGO_URL, {

    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true
})
    .then(() => { console.log('database connected succesfully done') })

// app.use(error)
app.use(cookieParser());
app.use('/api/v1', product)
app.use('/api/v1', user)
app.use('/api/v1',order)
app.use('/api/v1',payment)
app.listen(process.env.PORT||8000, () => {
    console.log('server is workin on', process.env.PORT,'port so check on this server')
})