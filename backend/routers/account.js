const express = require('express')
const accountRouter = new express.Router()
const Account = require('../db/models/account.js')
const auth = require('../middleware/auth.js')

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
        res.status(200).send(account)
    } catch (error) {
       res.status(401).send()
    }
})
//TODO::write get routes for retrieving account (remember must be authorized to view the account)

module.exports = accountRouter
