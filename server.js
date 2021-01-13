const express = require('express');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'})
require('./config/db')

const app = express();

//Middleware 
//remplace body-parser
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Routes
app.use('/api/user', userRoutes);

// server
app.listen(process.env.PORT, ()=> {
    console.log(`listening on  port ${process.env.PORT}`)
})