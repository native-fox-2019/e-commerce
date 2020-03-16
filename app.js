const express=require('express');
const app=express();
const route=require('./route');

app.use(express.session())
app.use(cors());

app.use(route);

module.exports=app;

