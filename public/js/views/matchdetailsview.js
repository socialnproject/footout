window.MatchView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        
        $('#playerslist', this.el).append('<ul class="thumbnails"></ul>');
        
        var players = this.model.get('players');
        var len = players.length;
        var player_index = -1;
        
        for (var i = 0; i < len; i++)
            if(players[i]._id == this.options.player.get('_id')){
                player_index = i;
                break;
            }
            
       
        //console.log("Owner Id: "+this.model.get('owner'));
        
        console.log(this.model);
         
        if(this.model.get('owner')==this.options.player.get('_id')){
            var matchUrl = "#matches/edit/" + this.model.get('_id');
            $('#match-buttons', this.el).append('<a href="' + matchUrl +'" class="btn">Edit</a>');
        }
        
        if(this.model.get('owner')!=this.options.player.get('_id') && len < this.model.get('maxPlayerNumber') && player_index < 0){
            $('#match-paticipation-buttons', this.el).append('<a href="#" class="btn join">Join</a>');
        }
            
        if(player_index > -1){
            $('#match-paticipation-buttons', this.el).append('<a href="#" class="btn leave">Leave</a>');
        }   
            

        
        for (var i = 0; i < len; i++) {
            $('.thumbnails', this.el).append(new PlayerListItemView({model: new Player(players[i])}).render().el);
        }
        
        
        // render de comments list
        
        $('#commentslist', this.el).append('<ul class="comments-box"></ul>');
        
        var comments = this.model.get('comments');
        len = comments.length;
        
        for (var i = 0; i < len; i++) {
            $('.comments-box', this.el).append(new SingleCommentListItemView({model: new Comment(comments[i])}).render().el);
        }
        
        return this;
    },
    
    events: {
        "change"        : "change",
        "click .edit"   : "beforeEdit",
        "click .join"   : "beforeJoin",
        "click .leave"  : "beforeLeave"
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

    beforeEdit: function () {
        this.editMatch();
        return false;
    },
    
    editMatch: function () {
        console.log('before edit');/*
        this.model.save(null, {
            success: function (model) {
                app.navigate('match/' + model.id, false);
                utils.showAlert('Success!', 'Match created successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to create this item', 'alert-error');
            }
        });*/
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
                app.navigate('matches/' + model.id, false);
                utils.showAlert('Success!', 'Player Added successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },

    beforeLeave: function () {
        var self = this;
        this.leaveMatch();
        return false;
    },
    
    leaveMatch: function () {
        var self = this;
        console.log('before leave');

        this.model.removePlayer(this.options.player);
   
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('matches/' + model.id, false);
                utils.showAlert('Success!', 'Player left successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to leave this item', 'alert-error');
            }
        });
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