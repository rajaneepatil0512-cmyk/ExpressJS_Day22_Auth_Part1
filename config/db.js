const mongoose=require('mongoose')

const connection=async()=>{
    try{

        await mongoose.connect('mongodb+srv://rajaneepatil0512_db_user:rajanee@cluster0.ojegwma.mongodb.net/UserDB')
        console.log(mongoose.connection.readyState)
        console.log("DB Connection Successfully Done...")
    
    }catch(err)
    {
        console.log(mongoose.connection.readyState)
        console.log("DB Connection Failed..."+err)
    
    }
}

connection()
module.exports=connection;