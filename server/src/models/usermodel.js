const  mongoose  = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
})



userSchema.pre('save',function(next)   {
    if(!this.isModified("password")){return next();}
    var hash = bcrypt.hashSync(this.password, 9)
    this.password=hash;
    return next();
})

userSchema.methods.checkPassword= function (password){
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User;