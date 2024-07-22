const { mongoose } = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide name"],
        maxlength: [50, "Name can not be more than 50 characters"],
        minlength: [4, "Name can not be less than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please provide password"],    
        minlength:[5, "Password can not be less than 6 characters"]
    },
    customerID: {
        type: String,
        default: ""
    }

})
//hashing password
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) {
        return next()}
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

//match password
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

//sign token
userSchema.methods.getSignedToken = function(res){
    const accessToken = jwt.sign({id: this._id}, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIREIN
    })
    const refreshToken = jwt.sign({id: this._id}, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIREIN

    })
    res.cookie("refreshToken", `${refreshToken}`, {maxAge: 86400 * 7000, httpOnly: true}) 
}



const User = mongoose.model("User", userSchema)
module.exports = User