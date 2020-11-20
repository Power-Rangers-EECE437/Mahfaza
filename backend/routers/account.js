const express = require('express')
const accountRouter = new express.Router()
const Account = require('../db/models/account.js')
const auth = require('../middleware/auth.js')
const Transaction = require('../db/models/transaction.js')
accountRouter.post('/account',auth,async (req,res) => {
   const account = new Account({
       ...req.body,
        owner:req.user._id
    })

    try {
       await account.save() 
       res.status(201).send(account)
    } catch (error) {
        res.status(401).send()
    }
})

accountRouter.delete('/account/:id',auth,async (req,res) => {
    try {
       const account = await Account.findOneAndDelete({_id:req.params.id,owner:req.user._id}) 
       if(!account)
            res.status(404).send()
       await account.populate('transactions').execPopulate()
       const transIDS= []
       account.transactions.forEach(transaction=>{
           transIDS.push(transaction._id)
       })
       await Transaction.deleteMany({
          _id:{
              $in:transIDS
          } 
       })
       res.status(200).send(account)
    } catch (error) {
       res.status(401).send()
    }
})

accountRouter.get('/accounts',auth,async (req,res)=>{
    try{
        await req.user.populate('accounts').execPopulate()
        res.status(200).send(req.user.accounts)
    }
    catch(error){
        res.status(401).send()
    }
})

accountRouter.get('/account/:id',auth,async(req,res)=>{
    try {
       const account = await Account.findOne({_id:req.params.id,owner:req.user._id}) 
       if(!account)
            res.status(404).send()
       res.status(200).send(account)
    } catch (error) {
       res.status(401).send()
    }
})

accountRouter.patch('/account/:id',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation)
        return res.status(400).send({error:"Invalid Updates"})

    try {
        const account = await Account.findOne({_id:req.params.id,owner:req.user._id}) 

        if(!account)
            res.status(404).send()

        updates.forEach(update=>account[update] = req.body[update])    
        await account.save()
        res.send(account)
    } catch (error) {
        res.status(400).send(e)
    }
})

module.exports = accountRouter
