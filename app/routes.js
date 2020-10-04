module.exports = function(app, passport) {
 app.get('/', function(req, res){
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });

 app.get('/login', function(req, res){
  res.render('login.ejs', {message:req.flash('loginMessage')});
 });


  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/login'); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        if(user.isAdmin){
            return res.redirect('/admin');
        }else{console.log(user)
          console.log("user")
            return res.redirect('/professeur/home');
        }
      });
    })(req, res, next);
  });

 app.get('/signup', function(req, res){
  res.render('signup.ejs', {message: req.flash('signupMessage')});
 });

 app.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
 }));

 app.get('/admin', isLoggedIn, function(req, res){
  if(req.session.isAdmin){
  res.render('admin/AdminAcceuil.ejs', {
   user:req.user
  });
}else{
  res.render('500.ejs', {})
}
});
app.get('/admin/Analysis', isLoggedIn, function(req, res){
  console.log(req.user)
  if(req.session.isAdmin){
  res.render('admin/Face Analysis.ejs', {
    user:req.user
  });
}else{
  res.render('500.ejs', {})
}
});

 app.get('/professeur/home', isLoggedIn, function(req, res){
  res.render('professeur/home.ejs', {
   user:req.user
  });
 });
 app.get('/professeur/seance/start', isLoggedIn, function(req, res){
  res.render('professeur/seance-start.ejs', {
   user:req.user
  });
 });
  app.get('/professeur/seance/remplir', isLoggedIn, function(req, res){
  res.render('professeur/seance-remplir.ejs', {
   user:req.user
  });
 });
 app.get('/professeur/seance/remplirByClasseCamera', isLoggedIn, function(req, res){
  res.render('professeur/seance-remplirByClasseCamera.ejs', {
   user:req.user
  });
 });
 app.get('/professeur/seance/upload', isLoggedIn, function(req, res){
  res.render('professeur/seance-upload.ejs', {
   user:req.user
  });
 });
 app.get('/professeur/seance/result', isLoggedIn, function(req, res){
  res.render('professeur/seance-result.ejs', {
   user:req.user
  });
 });
 app.get('/professeur/raports', isLoggedIn, function(req, res){
  res.render('professeur/raports.ejs', {
   user:req.user
  });
 });
 app.post('/GetCurrentUser', isLoggedIn, function(req, res){
  res.send(req.user);
 });
 app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
 })
}; 

function isLoggedIn(req, res, next){
 if(req.isAuthenticated())
  return next();

 res.redirect('/');
}