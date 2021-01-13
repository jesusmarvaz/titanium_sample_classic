(function(){
	var text = Ti.Locale.getString('notifications', '');
	var colors = require('styles/colors').all;
	var Util = require('lib/Util').UTIL;
	var uibuilder = require('ui/UiBuilder');
	var scrollView = require('ui/tabs/notifications/ios/NotificationsIOSView');

	var window = Ti.UI.createWindow({
		title : text,
		backgroundColor : colors.colorNotifications
		});
	
	window.add(scrollView);
	
	var tab = Ti.UI.createTab({title:text, icon: 'assets/images/notifications.png', window: window});

	module.exports = tab;
}());
