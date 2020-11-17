const jwt = require('jsonwebtoken')
const User = require('../db/models/user')
const auth = async (req,res,next) => {
    try {
       const token = req.header('Authorization') .replace('Bearer ','')
       const decodedToken = jwt.verify(token,'signature')
       const user = await User.findOne({_id:decodedToken._id,'tokens.token':token})
       if(!user)
            throw new Error()
       req.token = token 
       req.user = user 
       next()
    } catch (error) {
        res.status(401).send({'Error':'Please Authenticate.'})
    }
}
module.exports = auth
