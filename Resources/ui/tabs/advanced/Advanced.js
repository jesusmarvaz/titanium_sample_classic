
var text = Ti.Locale.getString('advanced', '');
var colors = require('styles/colors').all;

var window = Ti.UI.createWindow({
	title : text,
	backgroundColor : colors.colorAdvanced
	});
	
//title, icon, window
var tab = Ti.UI.createTab({title:text, icon: 'assets/images/advanced.png', window: window});
	//var tabLocation = new TabLocation();
module.exports = tab;