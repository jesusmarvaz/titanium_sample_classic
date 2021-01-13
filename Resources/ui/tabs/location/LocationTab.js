(function(){
	var scrollView = require('ui/tabs/location/LocationView');
	var locationText = Ti.Locale.getString('location', 'location str.');
	var colors = require('styles/colors').all;
	var window = Ti.UI.createWindow({
		title : locationText,
		backgroundColor : colors.colorLocation,
		orientationModes : [Ti.UI.PORTRAIT],
		navBarHidden : false
	});
	
	window.add(scrollView);
	
	var tabLocation = Ti.UI.createTab({title: locationText, icon: 'assets/images/location.png', window: window});
		//var tabLocation = new TabLocation();
	module.exports = tabLocation;
}());