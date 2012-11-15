window.MatchView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        
        $('#playerslist', this.el).append('<ul class="thumbnails"></ul>');
        
        var players = this.model.get('players');
         
        var len = players.length;
        
        console.log("Owner Id: "+this.model.get('owner'));
        console.log("Player Id: "+this.options.player.get('_id'));
        if(1==1/*this.model.get('owner')==this.options.player.get('_id')*/){
            $('#match-buttons', this.el).append('<a href="#" class="btn btn-primary save">Save</a>');
            $('#match-buttons', this.el).append('<a href="#" class="btn delete">Delete</a>');
        }
        
        if(len < this.model.get('maxPlayerNumber') && players.indexOf(this.options.player) > -1){
            $('#match-buttons', this.el).append('<a href="#" class="btn join">Join</a>');
        }
        
        for (var i = 0; i < len; i++) {
            $('.thumbnails', this.el).append(new PlayerListItemView({model: new Player(players[i])}).render().el);
        }
        
        return this;
    },
    
    events: {
        "change"        : "change",
        "click .save"   : "beforeSave",
        "click .delete" : "deleteMatch",
        "click .join"   : "beforeJoin"
    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
    },

    beforeSave: function () {
        var self = this;
        this.saveMatch();
        return false;
    },

    saveMatch: function () {
        var self = this;
        console.log('before save');
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('match/' + model.id, false);
                utils.showAlert('Success!', 'Match saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },
    
    beforeJoin: function () {
        var self = this;
        this.joinMatch();
        return false;
    },
    
    joinMatch: function () {
        var self = this;
        console.log('before join');

        this.model.addPlayer(this.options.player);
   
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('match/' + model.id, false);
                utils.showAlert('Success!', 'Player Added successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },

    deleteMatch: function () {
        this.model.destroy({
            success: function () {
                alert('Wine deleted successfully');
                window.history.back();
            }
        });
        return false;
    }
    
});


window.PlayerListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});