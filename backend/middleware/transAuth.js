const transAuth = async (req,res,next)=>{
    try{
        await req.user.populate('accounts').execPopulate()
        let canAdd = false;
        req.user.accounts.forEach(account=> {
            if(account._id == req.params.accountID){
               canAdd = true 
            }
        });
        if(!canAdd)
            throw new Error('Unauthorized.') 
        next()
    }
    catch(error){
        res.status(401).send()
    }
}
module.exports = transAuth