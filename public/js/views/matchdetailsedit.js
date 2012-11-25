window.MatchEdit = Backbone.View.extend({


initialize: function () {

this.render();

},


render: function () {

$(this.el).html(this.template(this.model.toJSON()));


   

//Match creation
if(window.location.hash=="#matches/add"){

$('#match-buttons', this.el).append('<a href="#" class="btn btn-primary create">Create</a>');

}


//Match Edit

else{

   $('#playerslist', this.el).append('<ul class="thumbnails"></ul>');


var players = this.model.get('players');

var len = players.length;

var player_index = -1;


for (var i = 0; i < len; i++)

if(players[i]._id == this.options.player.get('_id')){

player_index = i;

break;

}


console.log(this.model);

 
if(this.model.get('owner')==this.options.player.get('_id')){

$('#match-buttons', this.el).append('<a href="#" class="btn save">Save</a>');

$('#match-buttons', this.el).append('<a href="#matches/'+ this.model.get('_id') +'" class="btn">Cancel</a>');

$('#match-buttons', this.el).append('<a href="#" class="btn delete">Delete</a>');

}


}

return this;

},


events: {

"change": "change",

"click .save"   : "beforeSave",

"click .create" : "beforeCreate",

"click .delete" : "deleteWine"

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


beforeCreate: function () {

this.createMatch();

return false;

},


createMatch: function () {

console.log('before create');

this.model.save(null, {

success: function (model){

app.navigate('matches/' + model.id, true);

utils.showAlert('Success!', 'Match created successfully', 'alert-success');

},

error: function () {

utils.showAlert('Error', 'An error occurred while trying to create this item', 'alert-error');

}

});
},


beforeSave: function () {

this.saveMatch();

return false;

},


saveMatch: function () {

console.log('before edit');

this.model.save(null, {

success: function (model) {

  //  self.render();

app.navigate('matches/' + model.id, true);

utils.showAlert('Success!', 'Match saved successfully', 'alert-success');

},

error: function () {

utils.showAlert('Error', 'An error occurred while trying to save this item', 'alert-error');

}

});
},


deleteWine: function () {

this.model.destroy({

success: function () {

alert('Wine deleted successfully');

app.navigate('matches', true);

}

});
return false;

}


});