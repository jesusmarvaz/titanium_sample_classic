var text = Ti.Locale.getString('ui', '');
var colors = require('styles/colors').all;
var scrollView = require('ui/tabs/ui/UIView');

var window = Ti.UI.createWindow({
	title : text,
	backgroundColor : colors.colorAdvanced
	});
	
window.add(scrollView);
	
//title, icon, window
var tab = Ti.UI.createTab({title:text, icon: 'assets/images/advanced.png', window: window});
	//var tabLocation = new TabLocation();
module.exports = tab;