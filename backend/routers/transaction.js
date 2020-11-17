const express = require('express')
const Transaction = require('../db/models/transaction.js')
const transactionRouter = new express.Router()
const auth = require('../middleware/auth.js')

transactionRouter.post('/transaction',auth,async(req,res)=>{
    res.send(503)
})


module.exports = transactionRouter