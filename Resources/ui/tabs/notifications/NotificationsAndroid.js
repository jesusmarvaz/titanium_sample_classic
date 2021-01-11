(function(){
	var text = Ti.Locale.getString('notifications', '');
	var colors = require('styles/colors').all;
	var Util = require('lib/Util').UTIL;
	var uibuilder = require('ui/UiBuilder');

	var window = Ti.UI.createWindow({
		title : text,
		backgroundColor : colors.colorNotifications
		});
		
	var title1 = uibuilder.labelCentered(window, '5dp');
	title1.text = Ti.Locale.getString('notifications','');
	title1.font = {fontSize:22, fontWeight: "bold"};
	
	if(Util.isIOS() == false){
		Ctrl = require('ui/tabs/notifications/NotificationCtrl');
		var ctrl = new Ctrl();
	} 

	var top = 35;
	var title2 = uibuilder.labelCentered(window, top);
	title2.text = Ti.Locale.getString('enter_notification_text','enter_notification_text');
	var editText = uibuilder.editText();
	editText.top = top + 30;
	window.add(editText);
	
	var actionNow, action5Sec, actionOpen = null;
	if(Util.isIOS())
	{
		var notificationNow, notification5Sec = null;
		/*actionNow = function(){
			notificationNow = Titanium.App.iOS.scheduleLocalNotification({
				alertAction : "alert action text",
				alertBody : editText.value
				//,badge : 2
				//,date : new Date(new Date().getTime() + 1000)
				});
		};
		action5Sec = function(){
			notification5Sec = Titanium.App.iOS.scheduleLocalNotification({
				alertAction : "alert action text",
				alertBody : editText.value
				//,badge : 2
				,date : new Date(new Date().getTime() + 5000)
				});
		};*/
		actionNow = function(){};
		action5Sec = function(){};
	}else
	{
		actionNow = function(){ctrl.notifyNow("Ejemplo de notificación", editText.value, Ti.App.Android.R.drawable.appicon);};
		action5Sec = function(){
			var intent = Titanium.Android.createServiceIntent({
				url: 'lib/AndroidNotiService.js'
			});
			console.log('test 5 sec');
			intent.putExtra('title', 'Ejemplo notificación diferida');
			intent.putExtra('message', editText.value);
			var date = new Date(new Date().getTime() + 5000);
			intent.putExtra('timestamp', date.toString());
			intent.putExtra('interval', 1000);
			
			Titanium.Android.startService(intent);
		};
		actionOpen = function(){
			var intent = Titanium.Android.createIntent({
				action : Ti.Android.ACTION_MAIN
				,className : 'com.kiteris.TitaniumSampleClassic.TitaniumsampleclassicActivity' //Find it in android built generated code
				,packageName : 'com.kiteris.TitaniumSampleClassic'
			});
			
			intent.flags |= Ti.Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED | Ti.Android.FLAG_ACTIVITY_SINGLE_TOP;
			intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
			
			var notificationOpen = Titanium.Android.createNotification({
				contentTitle : "Esto abrirá la app",
				contentText : editText.value,
				icon : Ti.App.Android.R.drawable.appicon
				,number: 5,
    			when: new Date(new Date().getTime() + 30000)
			});
			notificationOpen.contentIntent = Titanium.Android.createPendingIntent({intent: intent});
			Ti.Android.NotificationManager.notify(1, notificationOpen);
			
		};
	}
	var buttonNow = uibuilder.buttonRounded("ahora", actionNow);
	var button5Sec = uibuilder.buttonRounded("5 segundos", action5Sec);
	var buttonOpen = uibuilder.buttonRounded("abrir app", actionOpen);

	buttonNow.top = top + 80;
	button5Sec.top = top + 140;
	buttonOpen.top = top + 200;
	window.add(buttonNow);
	window.add(button5Sec);
	window.add(buttonOpen);
	
	//TODO custom layout
	
	//Channel subscription (push notifications)
	
	var title3 = uibuilder.labelCentered(window, top + 260);
	title3.text = "Push";
	title3.font = {fontSize:22, fontWeight: "bold"};
		/**
	 * @param {String} titleLabel - Text of the left label of the switch
	 * @param {Object} mainView
	 * @param {Integer} top - Top margin
	 * @param {Function} listener - action to respond to switch changes 
	 */
	var switchSubscribeChannel = uibuilder.switchWithLabel("Suscribirse a canal 'canal_ejemplo'", window, top + 300, function(e){
		if(e.value === true){ alert("suscrito a canal_ejemplo");}
		else { alert("suscripción anulada");}
	});	
	
	var tab = Ti.UI.createTab({title:text, icon: 'assets/images/notifications.png', window: window});

	module.exports = tab;
}());

