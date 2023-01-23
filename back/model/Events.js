const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const eventSchema=new Schema({
name:{type:String,required:true},
location:{type:String,required:true},
stime:{type:String,required:true},//validate:[timeValidator,'Please enter valid time']



etime:{type:String,required:true},
ownerEmail:{type:String,required:true},
},{timestamps:true})

const Event=mongoose.model('Event',eventSchema)


// function timeValidator(val) {
//     console.log('inside')
//     let check;
//     // `this` is the mongoose document

//     if(parseInt(val.slice(0,4).split(":")[0])>parseInt(this.etime.slice(0,4).split(":")[0])){
//         check=true;
//     }else if( (val.slice(0,4).split(":")[0])==parseInt(this.etime.slice(0,4).split(":")[0])){
//        if((val.slice(0,4).split(":")[1])<parseInt(etime.slice(0,4).split(":")[1])){
//         check=false;

//        }
//     }
//     console.log(check,'check')
//     return check
//    // return this.stime <= ;

//   }

function timeValidator(val) {
    console.log('inside')
    let check=true;
    // `this` is the mongoose document

    if(parseInt(this.stime.slice(0,4).split(":")[0])>parseInt(this.etime.slice(0,4).split(":")[0])){
        check=false;
        
    }
    
    else if( parseInt(this.stime.slice(0,4).split(":")[0])==parseInt(this.etime.slice(0,4).split(":")[0])){
        console.log('inside')
       if(parseInt(this.stime.slice(0,4).split(":")[1])>parseInt(this.etime.slice(0,4).split(":")[1])){
             console.log('inside2')
        check=false;

       }
       else{
           check=true
       }
    }
    console.log(check,'check')
    return check
   // return this.stime <= ;
  }





module.exports=Event