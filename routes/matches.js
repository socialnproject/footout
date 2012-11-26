var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

//mongoose.connect('mongodb://localhost:27017/futdb');

mongoose.connect('mongodb://foot:murro@alex.mongohq.com:10058/footout');


var Match = new Schema( {
    name:               {type: String, required:true, trim: true},
    date:               {type: Date, required:true},
    local:              {type: String, required:true, trim: true},
    localDetail:        {type: String, required:true, trim: true},
    maxPlayerNumber:    {type: String, required:true},
    pricePerPerson:     {type: String, required:true},
    description:        {type: String, required:false, trim: true },
    owner:              {type: String, required:true},
    players:            [Player],
    lastUpdate:         {type: Date, default: Date.now},
    creation:           {type: Date, required:true},
    conversation:       [Comment]
});


var Player = new Schema({
    id: {type: String},
    name: {type: String},
    fbid: {type: String},
    email: {type: String}
});

var Comment = new Schema({
    author: {type: String},
    fbid: {type: String},
    text: {type: String}
});


var MatchModel = mongoose.model('Match', Match);
var PlayerModel = mongoose.model('Player', Player);
var CommentModel = mongoose.model('Comment', Comment);

exports.findById = function(req, res) {
    MatchModel.findById(req.params.id, function (err, match){       
        if(!err){
            res.send(match);
        }
        else {
            console.log(err);
        } 
    });
};

exports.findAll = function(req, res) { 
   MatchModel.find(function (err, matches){       
        if(!err){
            res.send(matches);
        }
        else {
            console.log(err);
        } 
    });
};

exports.addMatch = function(req, res) {

  var match; 
  console.log(req.body);
  match = new MatchModel();  //change this to descriminate items
  match.name =            req.body.name;
  match.date =            new Date(req.body.date_year, req.body.date_month+1, req.body.date_day, req.body.time_hour, req.body.time_minutes, 0, 0);
  match.local =           req.body.local;
  match.localDetail =     req.body.localDetail;
  match.pricePerPerson =  req.body.pricePerPerson;
  match.maxPlayerNumber = req.body.maxPlayerNumber; 
  match.description =     req.body.description;
  match.owner = req.user._id;
  match.creation = new Date();
  match.players = [{ id: req.user._id, name: req.user.name, fbid: req.user.fbid }];
  
  match.save(function (err, matches){       
        if(!err){
            console.log("match created");
        }
        else {
            console.log(err);
        } 
    });
  return res.send(match);
}

exports.updateMatch = function(req, res) {
    MatchModel.findById(req.params.id, function(err, match){
        match.name =            req.body.name;
        match.date =            new Date(req.body.date_year, req.body.date_month+1, req.body.date_day, req.body.time_hour, req.body.time_minutes, 0, 0);
        match.local =           req.body.local;
        match.localDetail =     req.body.localDetail;
        match.pricePerPerson =  req.body.pricePerPerson;
        match.maxPlayerNumber = req.body.maxPlayerNumber; 
        match.description =     req.body.description;
        match.players =         req.body.players;
        match.conversation =    req.body.conversation;
        
        match.save(function(err){
            if(!err){
                console.log("match updated");
            }
            else {
                console.log(err);
            }
        });
        
        return res.send(match);
    });
}



exports.deleteMatch = function(req, res) {
   
   MatchModel.findById(req.params.id, function(err, match){
        match.remove(function(err){          
            if(!err){
                console.log("match removed");
                res.send('');
            }
            else {
                console.log('err');
            }
        });
   });

}


exports.addPlayer = function(req, res) {
   
   console.log("add player");
   
        MatchModel.findById(req.params.id, function(err, match){
    
        var player = new PlayerModel({ id: req.user._id });
        
        match.players.append(player);
        
        
        match.save(function(err){          
            if(!err){
                console.log("player join match");
            }
            else {
                console.log('err');
            }
        });
        
        return res.send(match);
   });

}

exports.removePlayer = function(req, res) {
   
   console.log("remove player");
   
   MatchModel.findById(req.params.id, function(err, match){
    
        var player = new PlayerModel({ id: req.user._id });
        
        match.players.splice(match.players.indexOf(player), 1);        
        
        match.save(function(err){          
            if(!err){
                console.log("player join match");
            }
            else {
                console.log('err');
            }
        });
        
        return res.send(match);
   });

}

