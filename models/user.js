var bcrypt = require("bcrypt-nodejs");
var mangoose = require("mongoose");

var SALT_FACTOR = 10;

//Defining the user Schema
var userSchema = mongoose.Schema({
  username: {type:String , required : true ,unique : true} ,
  password : {type:String , required : true } ,
  createdAt : {type:Date, default :Date.now} ,
  displayName: String,
  bio :String,
}) ;

//presave action to hash password
var noop = function () {};

 userSchema.pre("save", function(done) {

   var user = this;

   if (!user.isModified("password")) {
     return done();
   }

   bcrypt.genSalt(SALT_FACTOR,function(err,salt)  {
     if (err) { return done(err); }
     bcrypt.hash(user.password, salt, noop,function(err,hashedPassword){
       if (err) { return done(err);}
       user.password = hashedPassword;
       done();
     });
   });
 });

//check password 
userSchema.methods.checkPassword = function(guess,done) {
  bcrypt.compare(guess,this.password,function(err, isMatch) {
    done(err, isMatch);
  });
};

userSchema.methods.name = function() {
  reuturn this.displayName || this.username;
};

var User = mongoose.model("User", userSchema);

module.exports = User;
