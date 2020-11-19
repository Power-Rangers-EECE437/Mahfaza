const express = require('express')
const User = require('../db/models/user.js')
const userRouter = new express.Router()
const auth = require('../middleware/auth.js')

userRouter.post('/users/signup',async(req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        res.status(200).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

userRouter.post('/users/signin',async(req,res)=>{
    try {
       const user = await User.findByCredentials(req.body.email,req.body.password) 
       const token = await user.generateAuthToken()
       res.status(200).send({user,token})
    } catch (e) {
        res.status(404).send()
    }
})

userRouter.get('/user/profile',auth,async(req,res)=>{
    try {
       res.status(200).send(req.user) 
    } catch (error) {
       res.status(400).send()
    }
})

userRouter.post('/users/signout',auth,async(req,res)=>{
    try {
       req.user.tokens  = req.user.tokens.filter(token=>{
           return token.token != req.token
       }) 
       await req.user.save()
       res.status(200).send()
    } catch (error) {
        res.status(500).send()
        console.log(error)
    }
})

userRouter.patch('/user/profile',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['first_name','last_name','email']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation)
        return res.status(400).send({error:"Invalid Updates"})
    try {
        const user = req.user 
        if(!user)
            res.status(404).send()

        updates.forEach(update=>user[update] = req.body[update])    
        await user.save()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send()
        console.log(error)
    }
})
module.exports = userRouter