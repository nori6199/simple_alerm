var module = ons.bootstrap('app', ['onsen']);
module.controller('AppCtrl', function() {
}).filter('addZero', function() {
	return function(num) {
		return ('0' + num).slice(-2);
	};
}).filter('toMm', function() {
	return function(mm) {
		return parseInt(mm % 3600 / 60, 10);
	};
}).filter('toSs', function() {
	return function(ss) {
		return ss % 60;
	};
});