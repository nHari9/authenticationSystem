require("dotenv").config()
const jwt = require("jsonwebtoken")

const  verifyToken = (token)=>{
    return new Promise((resolve, reject) => {
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err, user)=>{
            if(err)return reject(err)
            return(user)
        })
    })
}

module.exports = (req, res, next) => {
  //check if authorization header has been set
  //if not throw an errors
  if (!req.headers.authorization)
    return res
      .status(400)
      .send({
        message: "authorization token was not provided or was not valid",
      });

  //if bearer token is in authorization header
  //if not throw an error
  if (!req.headers.authorization.startswith("Bearer")) {
    return res
      .status(400)
      .send({
        message: "authorization token was not provided or was not valid",
      });
  }

  //split the beare token and get the [1] which is token
  const token = req.headers.authorization.split(" ")[1]
  //then we will call jwt to verify the token
  let user;
    //if token is invalid then we will throw an error
  try{
     user = verifyToken(token)

  }catch(err){
    return res
    .status(400)
    .send({
      message: "authorization token was not provided or was not valid",
    });
  }
  
  req.user = user.user
console.log("user", req.user)

  //if token is valid then we will put the user recieved from the token in the req object

  //return next()

  return next();
};
