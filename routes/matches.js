var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

//mongoose.connect('mongodb://localhost:27017/futdb');

mongoose.connect('mongodb://foot:murro@alex.mongohq.com:10058/footout');


var Match = new Schema({
    name: {type: String, required:true},
    date: {type: String, required:true},
    time: {type: String, required:true},
    local: {type: String, required:true},
    localDetail: {type: String, required:true},
    pricePerPerson: {type: String, required:true},
    description: {type: String},
    players: [Player]
});

var Player = new Schema({
    id: {type: String},
    name: {type: String},
    fbid: {type: String},
    email: {type: String}
});


var MatchModel = mongoose.model('Match', Match);
var PlayerModel = mongoose.model('Player', Player);

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
  match = new MatchModel(req.body);  //change this to descriminate items
  
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
        match.name =  req.body.name;
        match.date =  req.body.date;
        match.time =  req.body.time;
        match.local =  req.body.local;
        match.localDetail =  req.body.localDetail;
        match.pricePerPerson =  req.body.pricePerPerson;
        match.description =  req.body.description;
        match.players = req.body.players;
        
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
        
        var players = match.players();
        
        console.log('players');
        match.players.append(player)
        
        
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

