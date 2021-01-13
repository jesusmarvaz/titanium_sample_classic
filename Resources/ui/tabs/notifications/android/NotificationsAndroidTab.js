(function(){
	var text = Ti.Locale.getString('notifications', '');
	var colors = require('styles/colors').all;
	
	var scrollView = require('ui/tabs/notifications/android/NotificationsAndroidView');

	var window = Ti.UI.createWindow({
		title : text,
		backgroundColor : colors.colorNotifications
		});
		
	window.add(scrollView);
		
	var tab = Ti.UI.createTab({title:text, icon: 'assets/images/notifications.png', window: window});

	module.exports = tab;
}());

