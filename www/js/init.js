var module = ons.bootstrap('app', ['onsen']);
module.controller('AppCtrl', function() {
}).filter('addZero', function() {
	return function(num) {
		return ('0' + num).slice(-2);
	};
});