const express = require('express')
const Account = require('../db/models/account.js')
const Transaction = require('../db/models/transaction.js')
const transactionRouter = new express.Router()
const auth = require('../middleware/auth.js')

transactionRouter.post('/transaction/:accountID',auth,async(req,res)=>{
    try{
        const account = await Account.findById({_id:req.params.accountID})

        if(!account)
            return res.status(404).send()
        
        if(account.owner.toString() != req.user._id.toString())
            throw new Error("Unauthorized.")

        const transaction = new Transaction(
            {
            ...req.body,
            account:req.params.accountID
            }
        )
        account.balance += transaction.amount
        await account.save()
        await transaction.save()
        res.status(200).send(transaction)
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
    }    
})
transactionRouter.delete('/transaction/:id',auth,async(req,res)=>{
    try {
      const transaction = await Transaction.findById({_id:req.params.id})  

      if(!transaction)
        return res.status(404).send()

      const account = await Account.findById({_id:transaction.account}) 
      if(account.owner.toString() != req.user._id) 
            throw new Error("Unauthorized.j")

      await Transaction.deleteOne({_id:req.params.id}) 
      account.balance -= transaction.amount
      await account.save()

      res.status(200).send(transaction)
    } catch (error) {
       res.status(401).send()
    }
})
transactionRouter.get('/transactions/:accountID',auth,async(req,res)=>{
    try {
        const account = await Account.findById({_id:req.params.accountID})

        if(!account)
            return res.status(404).send()
        
        if(account.owner.toString() != req.user._id.toString())
            throw new Error("Unauthorized.")
        
        await account.populate('transactions').execPopulate()
        res.status(200).send(account.transactions)
    } catch (error) {
       res.status(401).send()
       console.log(error)
    }
})

transactionRouter.get('/transaction/:id',auth,async(req,res)=>{
    try{
        const transaction = await Transaction.findById({_id:req.params.id})
        if(!transaction)
            res.status(404).send()
        const account = await Account.findById({_id:transaction.account})
        if(account.owner.toString()!= req.user._id.toString())
            res.status(401).send()
        res.status(200).send(transaction)
    }
    catch(e){
        res.status(400).send()
    }
})

transactionRouter.patch('/transaction/:id',auth,async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['amount']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
    if(!isValidOperation)
            return res.status(400).send({error:"Invalid Updates"})
    try{
        const transaction = await Transaction.findById({_id:req.params.id})
        if(!transaction)
            res.status(404).send()
        const account = await Account.findById({_id:transaction.account})
        
        if(account.owner.toString()!= req.user._id.toString())
            res.status(401).send()
        account.balance -= transaction.amount
        updates.forEach(update=>transaction[update] = req.body[update])
        account.balance += transaction.amount
        
        await transaction.save()
        await account.save()
        res.status(200).send(transaction)
    }
    catch(e){
        res.status(400).send(e)
    }
})


module.exports = transactionRouter