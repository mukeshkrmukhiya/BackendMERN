const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
// const validator = require("validator");


const userSchema = mongoose.Schema({
    name: {
        
        type: String,
        required: true,
        // validat(value){
        //     if(!validator.isByteLength(value, { min: 0, max: 30 })){
        //         // throw new Error(res.status(400).send("min max length error"))
        //         res.status(400).json({error: "min max length error"})
        //     }
        // }
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, 
        // validat(value){
        //     if(!validator.isEmail(value)){
        //       return   res.status(404).json({error: "email invalid"})
        //     }
        // }

    },
    phone: {
        type: Number,
        required: true,
        // validat(value){
        //     if(!validator.isNumeric(value)){
        //         throw new Error(res.status(400).send("phone should be in numrik formate"))
        //     }

        //     if(!validator.isMobilePhone(value)){
        //         throw new Error(res.status(401).send("phone invalid formate"))
        //     }
        // }
    },
    work: {
        type: String,
        required: true,
        trim: true, 
        // validat(value){
        //     if(!validator.isByteLength(value, { min: 1, max: 30 })){
        //         throw new Error(res.status(400).send("min max length error"))
        //     }
        // }
    },
    password: {
        type: String,
        required: true,
        // validat(value){
        //     if(!validator.isStrongPassword(value)){
        //         throw new Error(res.status(400).send("Not strong password"))
        //     }
        // }
    },
    cpassword: {
        type: String,
        required: true,
        // validat(value){
        //     if(!validator.isStrongPassword(value)){
        //         throw new Error(res.status(400).send("Not strong password"))
        //     }
           


        // }
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },

    messages:[
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            
            date: {
                type: Date,
                required: true,
                default: Date.now
            },
            subject: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ],
    // tokens:
    //     [{

    //         token: {
    //             type: String,
    //             required: true
    //         }
    //     }
    //     ]

})

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next()
})

// generatin jwt

// userSchema.methods.generateAuthToken = async function () {
//     try {
//         let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
//         this.tokens = this.tokens.concat({ token: token })
//         this.save()
//         return token
//     } catch (error) {
//         console.log(error);
//     }
// }


//store the message

userSchema.methods.addMessage = async function (name , email ,  subject , message){
    try {
        this.messages = this.messages.concat({name , email ,  subject , message})
        await this.save()
        return this.messages;
    } catch (error) {
        console.log('add userSchema error');
        console.log(error);
    }
}

// collection 
const User = mongoose.model('user', userSchema)

module.exports = User