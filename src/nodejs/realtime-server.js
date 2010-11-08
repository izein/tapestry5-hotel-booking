var sys = require("sys"),
 	fs = require("fs"),
 	path = require("path"),
 	http = require("http"),
 	ws = require('./lib/ws'),
	redis = require("./lib/redis-client");;

var pubsub = redis.createClient();

var connect;

pubsub.stream.addListener('connect', function() {
	pubsub.subscribeTo('booking:*:hotel', function(channel, data) {
		var bid = channel.toString().split(':')[1];
		sys.debug("Publishing new booking : " + bid);
		
		if (connect) {
			connect.write(data);
		}
		
	});
});

/*-----------------------------------------------
  logging:
-----------------------------------------------*/
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

function timestamp() {
  var d = new Date();
  return [
    d.getDate(),
    months[d.getMonth()],
    [ pad(d.getHours())
    , pad(d.getMinutes())
    , pad(d.getSeconds())
    , (d.getTime() + "").substr( - 4, 4)
    ].join(':')
  ].join(' ');
};

function log(msg) {
  sys.puts(timestamp() + ' - ' + msg.toString());
};

function serveFile(req, res){};

/*-----------------------------------------------
  Spin up our server:
-----------------------------------------------*/
var httpServer = http.createServer(serveFile);


var server = ws.createServer({
  debug: true
}, httpServer);

server.addListener("listening", function(){
  log("Listening for connections.");
});

// Handle WebSocket Requests
server.addListener("connection", function(conn){
  log("opened connection: "+conn.id);

  connect = conn;
  
  conn.broadcast("<"+conn.id+"> connected");
  
  conn.addListener("message", function(message){
    log("<"+conn.id+"> "+message);
    conn.broadcast(message);
  });
});

server.addListener("close", function(conn){
  log("closed connection: "+conn.id);
  conn.broadcast("<"+conn.id+"> disconnected");
});

server.listen(8000);