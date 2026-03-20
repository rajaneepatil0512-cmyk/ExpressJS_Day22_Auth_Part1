const express=require('express')
const app=express()

const HOST='127.0.0.1'
const PORT=3000

// import for password hashing
const bcrypt=require('bcryptjs')

app.use(express.static('public/'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// db config
const connection=require('./config/db')

// model
const userSchema=require('./model/userSchema')

app.get('/',(req,res)=>{
    res.render('login.ejs')
})

app.post('/login',async(req,res)=>{
   try{

     // user data
     const{username,password}=req.body
    //  res.send(`
    //     username=${username}
    //     password=${password}
    //     `)

    // fetch userName from db and check wheather user is exist or not and 
    // if not then send response that user is not found
    // database ka user data check karna
  const isUserExists=await userSchema.findOne({username:username})
  // res.send(isUserExists)

  if(!isUserExists){
    return res.send(`<script>alert('User Not Found'); window.location.href='/'</script>`)
  }
    
  // ********************************************
   // check password using bcrypt.compare function

   // Password to test
   const isPasswordMatch=await bcrypt.compare(password,isUserExists.password)
  
   // return true or false
   console.log(isPasswordMatch)

   if(!isPasswordMatch)
   {
     return res.send(`<script>alert('Invalid Password'); window.location.href='/'</script>`)
   }

   // if both username and password match

   if(isUserExists && isPasswordMatch)
   {
    // res.send('<h1>Login Successfully....</h1>')

    res.redirect('/dashboard')
     console.log("Login Successfully...")
    }

    }catch(err)
   {
    console.log("Internal Server Error"+err)
   }
})


app.get('/dashboard',(req,res)=>{
    res.render('dashboard.ejs')
})

app.get('/signup',(req,res)=>{
    res.render('signup.ejs')
})

app.post('/signup',async(req,res)=>{
    try{
        const {username,useremail,password,phone}=req.body
        
        if(!username || !useremail || !password || !phone)
        {
            return res.send(`alert('All Fields Are Required)
            window.location.href='/signup'
            `)
        }       
        // hashed password
        // Asynchronously generates a hash for the given password
        const hashpassword=await bcrypt.hash(password,10)

        //res.send(hashpassword)
        
        const result=new userSchema({username,useremail,password:hashpassword,phone})
        await result.save()

        console.log("User Register...")

        return res.send(`<script>
            alert("Profile Created..")
            window.location.href="/"
            </script>`)


      
    }catch(error)
    {
        console.log("Internal Server Error"+error)
    }
})

app.listen(PORT,HOST,()=>{
    console.log(`http://${HOST}:${PORT}`)
})