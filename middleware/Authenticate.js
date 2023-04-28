const jwt = require('jsonwebtoken');
// const { Mongoose } = require('mongoose');
const User = require('../models/userSchema')



const Authenticate = async  (req, res, next)=>{
    try {
        // console.log("token : " + process.env.SECRET_KEY)

        
        // console.log("token preload: " + token)

        // if(typeof token !== "undefined"){}else{
        //     return  res.status(401).send('unothorized: Not token proveded')}

        
        // console.log('after' + veryfytoken)
        // console.log("rootUser"+ rootUser);


        
        // const token = req.header.LoginCookies;
        // const token = req.header("auth-token")
        const token = req.header("auth-token") || req.body("auth-token") || req.body.token;
        console.log(token);
        const veryfytoken = jwt.verify(token, process.env.SECRET_KEY)
        console.log("veryfytoken", veryfytoken);
        const rootUser = await User.findById( veryfytoken.id )
        console.log("rootUser", rootUser);
        if(!rootUser){
            throw new Error("user not found")
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
        
    } catch (error) {
        res.status(401).send('unauthorized: Not token proveded')
        console.log(error);
        // throw new Error(res.error)
    }
}

module.exports = Authenticate;