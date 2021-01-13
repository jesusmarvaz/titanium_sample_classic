var text = Ti.Locale.getString('web', '');
var colors = require('styles/colors').all;

var window = Ti.UI.createWindow({
	title : text,
	backgroundColor : colors.colorWeb
	});
	
var scrollView = require('ui/tabs/web/WebView');
window.add(scrollView);
	
//title, icon, window
var tab = Ti.UI.createTab({title:text, icon: 'assets/images/web.png', window: window});
	//var tabLocation = new TabLocation();

module.exports = tab;