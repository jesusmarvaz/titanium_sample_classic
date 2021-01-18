(function(){
	exports.subscribeToChannel = function(){
		// Subscribes the device to the 'news_alerts' channel
    // Specify the push type as either 'android' for Android or 'ios' for iOS
    Cloud.PushNotifications.subscribeToken({
        device_token: deviceToken,
        channel: 'canal_ejemplo',
        type: Ti.Platform.name === 'android' ? 'android' : 'ios'
    }, function (e) {
        if (e.success) {
            alert('Subscribed');
        } else {
            console.log('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
    });
	};
	exports.unsubscribeToChannel = function(){
		// Unsubscribes the device from the 'test' channel
    Cloud.PushNotifications.unsubscribeToken({
        device_token: deviceToken,
        channel: 'canal_ejemplo',
    }, function (e) {
        if (e.success) {
            alert('Unsubscribed');
        } else {
           console.log('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
    });
	};
}());
