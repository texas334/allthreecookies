const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('welcome to a simple HTTP cookie server ');
});

app.get('/setcookie',(req,res)=>{
    res.cookie(`Cookie token name`,`encrypted cookie string Value`);
    res.send('Cookie have been saved successfully');
});

app.get('/getcookie',(req,res)=>{
    //show the saved cookies
    console.log(req.cookies)
    res.send(req.cookies);
});

app.get('/setcookie',(req,res)=>{
    res.cookie(`Cookie token name`,`encrypted cookie string Value`,{
        maxAge:5000,
        //expires works the same as the maxAge
        expires:new Date('27 09 2022'),
        secure:true,
        httpOnly:true,
        sameSite:'lax'
    });
    res.send('Cookie have been saved successfully');
});

app.listen(8000,()=> console.log('The server is running port 8000...'));