var text = Ti.Locale.getString('crud', '');
var colors = require('styles/colors').all;
var scrollView = require('ui/tabs/crud/CrudView');
var window = Ti.UI.createWindow({
	title : text,
	backgroundColor : colors.colorSettings
	});

window.add(scrollView);
	
//title, icon, window
var tab = Ti.UI.createTab({title:text, icon: 'assets/images/settings.png', window: window});
	//var tabLocation = new TabLocation();
module.exports = tab;