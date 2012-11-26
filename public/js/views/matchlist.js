window.MatchListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var matches = this.model.models;
        var len = matches.length;
        var matchesperpage = 100;
        var startPos = (this.options.page - 1) * matchesperpage;
        var endPos = Math.min(startPos + matchesperpage, len);
        

        $(this.el).html('<ul class="thumbnails"></ul>');

        $('.thumbnails', this.el).append('<a href="#" ><div class="zocial">Data</div></a>');
        $('.thumbnails', this.el).append('<a href="#" ><div class="zocial">Ocupação</div></a>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new MatchListItemView({model: matches[i]}).render().el);
        }

        //$(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.MatchListItemView = Backbone.View.extend({

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