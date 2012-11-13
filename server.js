var express = require('express'),
    path = require('path'),
    http = require('http'),
    match = require('./routes/matches'),
    graph = require('fbgraph'),
    UserManager = require('./routes/user');
    
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'keyboard cat' }));
    // Initialize Passport! Also use passport.session() middleware, to support
    // persistent login sessions (recommended).
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: '381159648625726',
    clientSecret: '9feeaf42979e3bee005d49fc2bf3c4b7',
    //callbackURL: "http://footout.diogofscmariano.c9.io/auth/facebook/callback"
    callbackURL: "http://footout.herokuapp.com/auth/facebook/callback"
  },
  
  function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      
      UserManager.findOrCreate(profile.displayName, 'teste@teste.com', profile.id, function(err, user){
        return done(err, user);
      });
    
  }
));


app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so
    // this function will not be called.
  });

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/#matches');
  });


app.get('/matches', ensureAuthenticated, match.findAll);
app.get('/matches/:id', ensureAuthenticated, match.findById);
app.post('/matches', ensureAuthenticated, match.addMatch);
app.put('/matches/:id', ensureAuthenticated, match.updateMatch);
app.delete('/matches/:id', ensureAuthenticated, match.deleteMatch);

app.get('/matches/:id/players', ensureAuthenticated, match.findPlayers);
app.put('/matches/:id/players', ensureAuthenticated, match.addPlayer);

app.get('/player', ensureAuthenticated, function(req, res){
    console.log('get player');
    res.send({ _id: null, id: req.user._id});
});

app.get('/user', ensureAuthenticated, function(req, res){
    console.log('get user');
    res.send(req.user);
});


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});


// Simple route middleware to ensure user is authenticated.
// Use this route middleware on any resource that needs to be protected. If
// the request is authenticated (typically via a persistent login session),
// the request will proceed. Otherwise, the user will be redirected to the
// login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  return res.redirect('/');
}
