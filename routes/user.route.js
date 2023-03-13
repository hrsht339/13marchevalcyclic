const express = require("express")
const {userModel} = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const userRouter = express.Router()

userRouter.post("/signup",(req,res)=>{
    let {name,email,pass,role} = req.body
    try{
        bcrypt.hash(pass,2,async(err,hash)=>{
            let user = new userModel({name,email,pass:hash,role})
            await user.save()
            res.status(200).send({
                "msg":"signup success",
                 user
            })
        })
    }
    catch(err){
        console.log(err)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body
    let user = await userModel.findOne({email})
    if(user){
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                let token = jwt.sign({role:user.role},"normal",{expiresIn:60})
                let refresh = jwt.sign({role:user.role},"refresh",{expiresIn:300})
                res.status(200).send({
                    "msg":"login success",
                    token,refresh
                })
            }
            else{
                res.status(401).send("wrong email/pass")
            }
        })
    }
    else{
        res.status(401).send("account doesnt exist")
    }
})

userRouter.post("/logout",(req,res)=>{
    let token = req.headers.authorization
    let black = JSON.parse(fs.readFileSync("./blacklist.json","utf-8"))
    black.push(token)
    fs.writeFileSync("./blacklist.json",JSON.stringify(black))
    res.status(200).send("logged out")
})

module.exports = {
    userRouter
}