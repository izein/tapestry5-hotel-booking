var $j = jQuery.noConflict();

(function($) {

	jQuery.fn.log = function(msg) {
		if (window.console != undefined)
			console.log("%s: %o", msg, this);
		return this;
	};

	$(window).load(function() {
		$(window).bind("WSmessage", function(e, data) {
			$("#log").append(data + "<br />");
		});

		if (!conn) {
			connect();
		}
	});

})(jQuery);
