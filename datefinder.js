var http = require('http')
var mongo = require('mongoskin');

http.createServer(function (req, res) {
    
  var conn = mongo.db('mongodb://foot:murro@alex.mongohq.com:10058/footout');
  conn.collection('ladies').find({area_codes:503}).toArray(function(err, items){
    if(err) throw err;

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify(items));
  });

}).listen(process.env.IP, process.env.PORT);

console.log('Server running...');