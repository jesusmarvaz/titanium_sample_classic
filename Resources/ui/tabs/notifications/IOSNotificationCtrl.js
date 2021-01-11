(function(){
	// Check if the device is running iOS 8 or later, before registering for local notifications
	var Util = require('lib/Util');
	if (Util.isIOS() && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
    Ti.App.iOS.registerUserNotificationSettings({
        types: [
            Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
            Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
            Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
    ]
    });
}
	
	var NotificationCtrl = Object;

	NotificationCtrl.prototype.test = function(){
};

/**
 * 
 * @param {String} alertAction - if value is 'update' it will appear 'slide to update'
 * @param {String} alertBody
 * @param {Integer} badge - counter value
 * @param {Integer} seconds - Time in witch the notification will be sent
 */
NotificationCtrl.prototype.scheduleLocalNotification = function(alertAction, alertBody, badge, seconds){
	var notification = Titanium.App.iOS.scheduleLocalNotification({
		alertAction : alertAction,
		alertBody : alertBody
		//badge : 2,
		//date : new Date(new Date().getTime() + 1000)
		
		//date : new Date(new Date().getTime() + seconds * 1000)
	});
	//notification.fireEvent();
};

exports = NotificationCtrl;
}());
