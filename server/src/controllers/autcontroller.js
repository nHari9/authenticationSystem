require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require('../models/usermodel')

const newToken=(user)=>{
    // console.log(process.env)
    return jwt.sign({user}, process.env.JWT_SECRET_KEY)
}

const register = async(req,res)=>{
    try{
        //find user with email provided

        let user  = await User.findOne({email:req.body.email}).lean().exec()

        //if found error

        if(user){return res.status(400).send({message:"This email already exists"})}


        //not found then create user with email and password provided

        user = await User.create(req.body)

        //hash the password to make it secure 
        //hashing :- you can hash and cant get back the original
        // or encrypting:- you can encrypt and decrypt again
        //we need hashing so that we wont get the original password again




        //then make tooken for the user

        const token = newToken(user)
        //then return user and token
        res.send("REgister")
    }
    catch(e){
        res.status(500).send(e.message)
    }
}

const login = async(req,res)=>{
    try{
 //find user with email provided

 const user  = await User.findOne({email:req.body.email})
 // if user not found error
if(!user) return res.status(400).send({message :"email not found"})
 //if user found match password

 const match = user.checkPassword(req.body.password)

 if(! match)return res.status(400).send({message: "wrong password"})

 // if password matched , create token 

 const token = newToken(user);

 //return user and token

        res.send({user, token})
    }
    catch(e){
        res.status(500).send(e.message)
    }
}


module.exports ={register,login}