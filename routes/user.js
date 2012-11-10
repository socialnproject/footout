var matches = require('./matches');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: {type: String, required:true},
    email: {type: String, required:true},
    fbid: {type: String},
    matches: [matches.Match]
});

var UserModel = mongoose.model('User', User);

exports.createUser = function(userName, userEmail, userFbid){
    
  var user; 
  console.log("Name: " + userName);
  console.log("Email: " + userEmail);
  console.log("FaceBook Id: " + userFbid);
  user = new UserModel({
      name: userName,
      email: userEmail,
      fbid: userFbid        
  }); 
  user.save(function (err, user){       
        if(!err){
            console.log("user created");
        }
        else {
            console.log(err);
        } 
    });
  return user;
};


exports.findOrCreate = function(userName, userEmail, userFbid, done){
    
  var user;
  
  UserModel.findOne({fbid: userFbid}, function(err, user){
  
    if(user != null){
        console.log("found user!");
        console.log(user);
        return done(null, user);     
    }
    else{
        
        console.log("Name: " + userName);
        console.log("Email: " + userEmail);
        console.log("FaceBook Id: " + userFbid);
        user = new UserModel({
            name: userName,
            email: userEmail,
            fbid: userFbid        
        }); 
        user.save(function (err, user){       
              if(!err){
                  console.log("user created");               
              }
              else {
                  console.log(err);
              }
              
        });
        return done(err, user);
         
    }
    return done(err, user);
  });

  
};
