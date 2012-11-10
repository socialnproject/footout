window.Player = Backbone.Model.extend({

    urlRoot: "/user",

    initialize: function () {
      
    },

    default: {        
        _id:null,
        fbid:"",
        name:"ze",
        email: "",
        matches : false
    }
    
});
