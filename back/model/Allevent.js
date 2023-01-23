const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const alleventSchema=new Schema({
name:{type:String,required:true},
location:{type:String,required:true},
ownerEmail:{type:String,required:true},
},{timestamps:true})


const Allevent=mongoose.model('Allevent',alleventSchema)

module.exports=Allevent