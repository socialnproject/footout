window.User = Backbone.Model.extend({

    urlRoot: "/users",

    idAttribute: "_id",

    initialize: function () {
      
    },

    defaults: {
        _id: null,
        name: "",
        local: "Portugal",
        localdetails: "",
        date: "",
        time: "",
        description: "",
        pricePerPerson: "10,00",
        owner: "Pedro Vala"
    }
});