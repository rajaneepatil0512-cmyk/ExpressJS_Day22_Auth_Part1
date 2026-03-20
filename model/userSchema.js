const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    "username":{
        type:String,
        unique:true,
        require:true,
    },
    "useremail":String,
    "password":String,
    "phone":String,
    "createdAt":{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model("insta_User",userSchema)