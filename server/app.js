const express=require('express');
const app=express();
const route=require('./route');
const cors=require('cors');
const errorHandler=require('./middleware/error-handler')

app.use(express.json())
app.use(cors());

app.use(route);
app.use(errorHandler)

module.exports=app;

