exports.findAll = function(req, res) {
    
    graph = require('fbgraph');
    
    graph.get("me/friends", function(err, items){     
        var flist = items['data'];
        
        console.log(flist);
        res.send(flist);
    });
};