const express = require('express')
const Transaction = require('../db/models/transaction.js')
const transactionRouter = new express.Router()
const auth = require('../middleware/auth.js')

transactionRouter.post('/transaction',auth,async(req,res)=>{
    const transaction = new Transaction(req.body)
    try{
        await transaction.save()
        res.status(200).send(transaction)
    }
    catch(e){
        res.status(400).send(e)
    }    
})

transactionRouter.get('/transaction/:id',auth,async(req,res)=>{
    try{
        const transaction = await Transaction.findById(req.params.id)
        res.status(200).send(transaction)
    }
    catch(e){
        res.status(400).send(e)
    }
})

transactionRouter.put('/transaction/:id',auth,async(req,res)=>{
    const transaction = new Transaction(req.body)
    //if we need to update we need to check the user has access to the account
    
    //get the user the account
    // const transaction = new Transaction({
    //     ...req.body,
    //      owner:req.user._id //this won't work
    //  })
    try{
        await Transaction.findByIdAndUpdate(req.params.id,transaction)
        await transaction.save()
        res.status(200).send(transaction)
    }
    catch(e){
        res.status(400).send(e)
    }
})


module.exports = transactionRouter