const User=require('../model/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const jwt_secret=process.env.SECRET
//'123abc'


const signup_post=async(req,res)=>{
    // console.log(req.body)
    const{email,password} =req.body
   
    try{
        // req.body.password=await bcrypt.hash(password,10)
      
     
        const user=new User(req.body)
    //    const oldUser=await User.findOne({email})
    //      if(oldUser){
    //          return res.send({error:"user already exisit"})
    //      }
        const result=await user.save()
        // console.log(req.body)
        //res.send({status:"ok"})
        return res.status(201).json({user:result._id,status:"ok"})
         console.log(result)
    }
    catch(err){
        const{email,password} =req.body
        console.log(email)
        // const errors = handleErrors(err);
        // res.status(400).json({ errors });
    
        const errors = err.message;
         console.log(errors,'inisde sign upcontroller')
        return res.status(400).json({ errors });
        // res.send({ status:"errors" });
    
    }
      
    }


    const login_post=async(req,res)=>{
        const{email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
           return  res.json({error:"user not found"})
        }
        if(await bcrypt.compare(password,user.password)){
            const token=jwt.sign({email:user.email},jwt_secret)
            if(res.status(201)){
                return res.json({status:"ok",data:token})
            }else{
               return res.json({error:"error"})
            }
        }
        res.json({error:"invalid password"})

    }


    const user_details=async(req,res)=>{
        const {token}=req.body;
        try{
            const user=jwt.verify(token,jwt_secret);
            const userEmail=user.email
            User.findOne({email:userEmail}).then((data)=>{
                res.send({status:"ok",data:data})
            }).catch((err)=>{
                res.send({status:"error",data:err})
            })
        }
        catch(err){

        }

    }

    module.exports={
        signup_post,
        login_post,
        user_details
    }