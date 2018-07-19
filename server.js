const express = require('express');
const routes = require('./server/config/routes.js');
const app = express();
const path = require('path');
const server = app.listen(8000);
const io = require('socket.io').listen(server); 
const bodyParser = require('body-parser')
const session = require('express-session')
app.use(express.static(__dirname + "/views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'adhf348738h4f3q49q3fq',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100000 }
  }))
routes(app);
  
  var id = 0;
  var users = {};
  var messages = {};
  var usernames = [];

io.on('connection', function (socket) {

  socket.on("join", function(data, callback){
    if (usernames.indexOf(data) != -1) {
      callback(false);
    } else {
      callback(true);
      socket.name = data;
      usernames.push(socket.name);
      updateUsernames();
    }
    io.emit("display_new_user", {name:socket.name});  
		// io.emit("display_new_user", {name:data.name})
  });
  
  function updateUsernames() {
    io.emit("usernames", usernames);
  }

  socket.on("new_message", function(data){
    messages[id] = {name:socket.name, message:data.message};
    io.emit("update_messages", messages[id]);
    id++;
  });

  socket.on("disconnect", function(data){
    if(!socket.name) return;
    usernames.splice(usernames.indexOf(socket.name), 1);
    updateUsernames();
    io.emit("user_disconnect", socket.name)
  });
    
});