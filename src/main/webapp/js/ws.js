
var conn;
var connect;

(function($) {

connect = function() {
  if (window["WebSocket"]) {
    conn = new WebSocket("ws://localhost:8000/test");
    conn.onmessage = function(evt) {
      $(window).trigger('WSmessage',evt.data);
    };
  }
};


})(jQuery);
