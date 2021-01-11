
var text = Ti.Locale.getString('crud', '');
var colors = require('styles/colors').all;

var window = Ti.UI.createWindow({
	title : text,
	backgroundColor : colors.colorSettings
	});
	
//title, icon, window
var tab = Ti.UI.createTab({title:text, icon: 'assets/images/settings.png', window: window});
	//var tabLocation = new TabLocation();
module.exports = tab;