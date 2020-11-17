const express = require('express')
const userRouter = require('./routers/user.js')
const accountRouter = require('./routers/account.js')
const transactionRouter = require('./routers/transaction.js')
require('./db/mongoose')
const app = express()
const host = 'localhost'
const port = 3000

app.use(express.json())
app.use(userRouter)
app.use(accountRouter)
app.use(transactionRouter)


app.listen(port,console.log(`Listening on ${host}:${port}`))

