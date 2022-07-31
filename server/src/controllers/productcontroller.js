const express = require("express")

const Product = require("../models/productmodel")

const authenticate = require("../middleware/authenticate")

const router= express.Router();

router.post("", authenticate ,async(req,res)=>{
    try{
         req.body.user_id = req.user._id
        const product = await Product.create(req.body)

        return res.send(product)
    }
    catch(e){
        return res.status(500).send({message: e.message})
    }
})

router.get("" ,async(req,res)=>{
    try{
        const products = await Product.find().lean().exec()

        return res.send(products)
    }
    catch(e){
        return res.status(500).send({message: e.message})
    }
})

module.exports=router