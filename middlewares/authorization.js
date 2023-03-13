let authorization = (role)=>{
    return (req,res,next)=>{
        let userr = req.body.role

        if(role.includes(userr)){
            next()
        }

        else{
            res.send("not authorised")
        }
    }
}

module.exports={
    authorization
}