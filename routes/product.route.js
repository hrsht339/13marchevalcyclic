const express = require("express")
const {productModel} = require("../models/product.model")
const {authorization} = require("../middlewares/authorization")
const productRouter = express.Router()

productRouter.get("/products",async(req,res)=>{
    let data = await productModel.find()
    res.status(200).send(data)
})


productRouter.post("/addproducts",authorization(["seller"]),async(req,res)=>{
    let {product,type} = req.body
    try{
        let data = new userModel({product,type})
        await data.save()
        res.status(200).send({
            "msg":"product added",
             data
        })
    }
    catch(err){
        console.log(err)
    }
})

productRouter.delete("/deleteproducts",authorization(["seller"]),async(req,res)=>{
    let id=req.params.id
     try{
        await productModel.findByIdAndDelete({"_id":id})
        res.status(200).send({
            "msg":"product deleted"
        })
    }
    catch(err){
        console.log(err)
    }
})

module.exports = {
    productRouter
}