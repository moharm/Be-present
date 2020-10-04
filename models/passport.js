var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {

 passport.serializeUser(function(user, done){
  done(null, user);
 });

 passport.deserializeUser(function(user, done){
  //  console.log(id)
   if(user.isAdmin){
  connection.query("SELECT * FROM admin WHERE id = ? ", [user.id],
   function(err, rows){
    done(err, rows[0]);
   });
   }else{
  connection.query("SELECT * FROM professeur WHERE id = ? ", [user.id],
   function(err, rows){
    done(err, rows[0]);
   });
   }
 });

 passport.use(
  'local-signup',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
   connection.query("SELECT * FROM admin WHERE username = ? ", 
   [username], function(err, rows){
    if(err)
     return done(err);
    if(rows.length){
     return done(null, false, req.flash('signupMessage', 'That is already taken'));
    }else{
     var newUserMysql = {
      username: username,
      password: bcrypt.hashSync(password, null, null)
     };

     var insertQuery = "INSERT INTO admin (username, password) values (?, ?)";

     connection.query(insertQuery, [newUserMysql.username, newUserMysql.password],
      function(err, rows){
       newUserMysql.id = rows.insertId;

       return done(null, newUserMysql);
      });
    }
   });
  })
 );

 passport.use(
  'local-login',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){

    function isAdmin(){
      console.log("test")
    req.session.isAdmin = true

      connection.query("SELECT * FROM admin WHERE username = ? ", [username],
      function(err, rows){
       if(err)
        return done(err);
       if(!rows.length){
        return done(null, false, req.flash('loginMessage', 'No User Found'));
       }
       if(password != rows[0].password){
        return done(null, false, req.flash('loginMessage', 'Wrong Password'));
       }
       rows[0].isAdmin = true
       return done(null, rows[0]);
      });
    }

   connection.query("SELECT * FROM professeur WHERE username = ? ", [username],
   function(err, rows){

    if(err)
     return done(err);
    if(!rows.length){
      isAdmin()
      return false
    }
    if(password != rows[0].password){
      isAdmin()
      return done(null, false, req.flash('loginMessage', 'Wrong Password'));
    }

    rows[0].isAdmin = false
    req.session.isAdmin = false

    return done(null, rows[0]);
   });
   console.log(req.session.isAdmin)

  })
 );
};