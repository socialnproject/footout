window.Match = Backbone.Model.extend({

    urlRoot: "/matches",

    idAttribute: "_id",

    initialize: function () {
      this.set('players', []);
    },

    defaults: {
        _id: null,
        name: "",
        local: "Portugal",
        localDetail: "",
        date: "",
        time: "",
        description: "",
        pricePerPerson: "10,00",
        owner: "Pedro Vala",
        players: false

    }
    
    ,
    
    addPlayer: function(player){
        
        var players = this.get('players'), alreadyexists = false;
        console.log(player);
        
        for (var key in players)
            if (player == key){
                alreadyexists = true;
                break;
            }
            
        if(alreadyexists === false)
            players.push(player);
        
        
        this.trigger("change:players", this, players);
    }
    
});

window.MatchCollection = Backbone.Collection.extend({

    model: Match,

    url: "/matches"

});