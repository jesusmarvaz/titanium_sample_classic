(function(){
	var NotificationCtrl = Object;
	// Require the module
	var CloudPush = require('ti.cloudpush');
	var deviceToken = null;
	  
	// Initialize the module
	CloudPush.retrieveDeviceToken({
	    success: deviceTokenSuccess,
	    error: deviceTokenError
	});
	 
	// Enable push notifications for this device
	// Save the device token for subsequent API calls
	function deviceTokenSuccess(e) {
	    deviceToken = e.deviceToken;
	}
	function deviceTokenError(e) {
	    alert('Failed to register for push notifications! ' + e.error);
	}
  
	// Process incoming push notifications
	CloudPush.addEventListener('callback', function (evt) {
	    alert("Notification received: " + evt.payload);
	});
	
	/**
	 * @param {String} contentTitle - main text o title of the notification
	 * @param {String} contentText - subtitle of the notification
	 * @param {Object} icon - icon of the notification (Ti.App.Android.R.drawable.warn - Image file located at /platform/android/res/drawable/warn.png)
	 */
	NotificationCtrl.prototype.notifyNow = function(contentTitle, contentText, icon){
			var noti = NotificationCtrl.createNotificationObject(contentTitle, contentText, icon);
			Titanium.Android.NotificationManager.notify(1, noti);	
	};
	
	NotificationCtrl.prototype.createNotificationObject = function(contentTitle, contentText, icon){
		var notification = Titanium.Android.createNotification({
			contentTitle : contentTitle,
			contentText : contentText,
			icon : icon //Ti.App.Android.R.drawable.warn (Image file located at /platform/android/res/drawable/warn.png)
			//,number: 5,
	    	//when: new Date()
		});
		return notification;
	};
	
	module.exports = NotificationCtrl;
}());
