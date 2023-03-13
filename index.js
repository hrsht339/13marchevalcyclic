const express = require("express")
const {connection} = require("./configs/db")
const {userRouter} = require("./routes/user.route")
const {productRouter} = require("./routes/product.route")
const app = express()

app.use(express.json())
app.use("/",userRouter)
app.use("/",productRouter)

app.listen(4500,async()=>{
    try{
        await connection
        console.log("db connected")
    }

    catch(err){
        console.log(err)
    }
    console.log("server is connected")
})