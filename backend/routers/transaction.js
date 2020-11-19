const express = require('express')
const Transaction = require('../db/models/transaction.js')
const transactionRouter = new express.Router()
const auth = require('../middleware/auth.js')
const accountRouter = require('./account.js')

transactionRouter.post('/transaction/:accountID',auth,async(req,res)=>{
    try{
        await req.user.populate('accounts').execPopulate()
        let canAdd = false;
        req.user.accounts.forEach(account=> {
            if(account._id == req.params.accountID){
               canAdd = true 
            }
        });
        const transaction = new Transaction(
            {
            ...req.body,
            account:req.params.accountID
            }
        )
        await transaction.save()
        res.status(200).send(transaction)
    }
    catch(e){
        res.status(400).send(e)
    }    
})

transactionRouter.get('/transaction/:id',auth,async(req,res)=>{
    const transaction = await Transaction.findById({_id:req.params.id})
    if(!transaction)
        res.status(404).send()
    const account = transaction.populate('account').execPopulate()
    console.log(account)
    try{
        const transaction = await Transaction.findById({_id:req.params.id,authot})
        res.status(200).send(transaction)
    }
    catch(e){
        res.status(400).send(e)
    }
})

transactionRouter.put('/transaction/:id',auth,async(req,res)=>{
    const transaction = new Transaction(req.body)
    
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