const mongoose = require('mongoose');

module.exports=()=>{
    return mongoose.connect("mongodb+srv://Hari:Hari123@cluster0.rrl89w5.mongodb.net/?retryWrites=true&w=majority")
}