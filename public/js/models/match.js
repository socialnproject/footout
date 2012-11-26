window.Match = Backbone.Model.extend({

    urlRoot: "/matches",

    idAttribute: "_id",

    initialize: function () {
      this.set('players', []);
      this.set('conversation', []);
    },

    defaults: {
        _id: null,
        name: "",
        local: "Portugal",
        localDetail: "",
        
        date_day: 12,
        date_month: 2,
        date_year: 2012,
        
        time_hour: 0,
        time_minutes: 30,
        
        maxPlayerNumber: "10",
        description: "",
        pricePerPerson: "10,00",
        players: false,
        conversation: false
    }

    ,
    
    addPlayer: function(player){
        
        var players = this.get('players');
        
        console.log(this.defaults.maxPlayerNumber);

     //   if(players.length < this.get('maxPlayerNumber') && players.indexOf(player) > -1){
            players.push(player);
            this.trigger("change:players", this, players);
      //  }
        
    }
    
    ,
    
    removePlayer: function(player){
        
        var players = this.get('players');
        
        console.log(this.defaults.maxPlayerNumber);

     //   if(players.length < this.get('maxPlayerNumber') && players.indexOf(player) > -1){
            players.splice(players.indexOf(player), 1);
            this.trigger("change:players", this, players);
      //  }
        
    },
    
    
    addComment: function(comment){
        
        var comments = this.get('conversation');

        comments.push(comment);
        this.trigger("change:conversation", this, comments);

    }
    
});

window.MatchCollection = Backbone.Collection.extend({

    model: Match,

    url: "/matches"

});

window.Comment = Backbone.Model.extend({

    initialize: function () {
    },
    
     defaults: {
        _id: null,
        text: "",
        author: "",
        fbid: ""
    }

});
