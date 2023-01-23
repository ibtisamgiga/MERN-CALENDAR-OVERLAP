const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const{isEmail}=require('validator')

const bcrypt=require('bcrypt')


const userSchema=new Schema({

firstName:{type:String,

    required:[true,'Name is mandatory'],
    lowecase:true,
    maxlength:[10,"max lenght can be 10 char"],
    validate:[nameValidator,'Please enter letters only'],
    minlength:[2,'valid name must be 2 char']



},

 lastName:{type:String,

     required:[true,'Name is mandatory'],
     lowecase:true,
     maxlength:[10,"lenght exceed"],
     maxlength:[10,"max lenght can be 10 char"],
    validate:[nameValidator,'Please enter letters only'],
    minlength:[2,'valid name be 2 char']

 },

email:{type:String,

    required:[true,'email is mandatory'],
    unique:true,
    unique:true,
    lowecase:true,
    validate:[isEmail,'Please enter valid email'],
    maxlength:[20,"lenght exceed"]

},

password:{type:String,
    required:true,
    validate:[password_validate,'password must be of * char with specail char and numbers and capital letters'],
    minlength:[8,'valid password must be 8 char']
},



},{timestamps:true});

userSchema.pre('save',async function (next){
    //console.log('new user created about to be created',this);
    //const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,10)
    next()
    })

    function nameValidator(value) {
        console.log( /^[A-Za-z]+$/.test(value))
        return /^[A-Za-z]+$/.test(value);
      }


      function password_validate(value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(value);
      }
// userSchema.pre('save',async function (next){
//     console.log('new user created about to be created',this);
//     const salt=await bcrypt.genSalt();
//     this.password=await bcrypt.hash(this.password,salt)
//     next()
//     })

// // static method to login user
// userSchema.statics.login = async function(email, password) {
//     const user = await this.findOne({ email });
//     if (user) {
//       const auth = await bcrypt.compare(password, user.password);
//       if (auth) {
//         return user;
//       }
//       throw Error('incorrect password');
//     }
//     throw Error('incorrect email');
//   };




const User=mongoose.model('user',userSchema)

module.exports=User