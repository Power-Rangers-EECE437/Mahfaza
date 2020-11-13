const express = require('express')
const User = require('../db/models/user.js')
const userRouter = new express.Router()
userRouter.post('/users',async(req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.status(200).send(user)
    }
    catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})
userRouter.post('/users/login',async(req,res)=>{
    try {
       const user = await User.findByCredentials(req.body.email,req.body.password) 
       const token = await user.generateAuthToken()
       res.send({user,token})
    } catch (error) {
       console.log(error) 
    }
})
module.exports = userRouter