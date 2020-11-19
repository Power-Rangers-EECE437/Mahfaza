const mongoose = require('mongoose')
const validator = require('validator') 
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Invalid Email.')
        }
    },
    first_name:{
        type:String,
        required:true,
        maxlength:20,
        trim:true
    },
    last_name:{
        type:String,
        required:true,
        maxlength:30,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:12,
        trim:true
    },
    tokens:[
    {
        token:{
            type:String,
            required:true
        }
    }
]
    
},
{
    timestamps:true
}
)

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password'))
        user.password = await bcrypt.hash(user.password,12)
    next()
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id},'signature')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user)
        throw new Error('Unable to Login.')
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
        throw new  Error('Unable to Login');
    return user
}

userSchema.virtual('accounts',{
    ref:'Account',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    
    return userObject
}
const User = mongoose.model('User',userSchema)
module.exports = User