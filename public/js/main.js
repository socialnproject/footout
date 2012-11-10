var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  	: "home",
        "about"             	: "about",
	"friends"	    	: "friendsList",
	"friends/page/:page"	: "friendsList",
	"matches"		: "matchlist",
        "matches/page/:page"	: "matchlist",
        "matches/add"         	: "addMatch",
        "matches/:id"        	: "matchDetails"
    },

    initialize: function () {
      this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
		
        $('.header').hide();
        $('.footer').hide();
        
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    list: function(page) {
	
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({success: function(){
            $("#content").html(new WineListView({model: wineList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },
    
    matchlist: function(page) {
	
	$('.header').show();
	
        var p = page ? parseInt(page, 10) : 1;
        var matchList = new MatchCollection();
        matchList.fetch({success: function(){
            $("#content").html(new MatchListView({model: matchList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },
    
    
    matchDetails: function (id) {
	
	$('.header').show();
	
        var match = new Match({_id: id});
	
	var p = new Player();
	p.fetch();
	
	    match.fetch({success: function(){
		$("#content").html(new MatchView({model: match, player:p}).el);
	    }});
	
        this.headerView.selectMenuItem();
    },

    addMatch: function() {
	
	$('.header').show();
	
        var match = new Match();
        $('#content').html(new MatchView({model: match}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
	
	$('.header').show();
	
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView','HeaderView', 'MatchView','PlayerListItemView',
		    'AboutView', 'MatchListItemView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});