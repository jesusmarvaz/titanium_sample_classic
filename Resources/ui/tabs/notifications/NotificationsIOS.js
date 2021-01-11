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
	
	Ctrl = require('ui/tabs/notifications/IOSNotificationCtrl');
	var ctrl = new Ctrl();

	var top = 35;
	//var title2 = uibuilder.labelCentered(window, top);
	//title2.text = Ti.Locale.getString('enter_notification_text','enter_notification_text');
	//var editText = uibuilder.editText();
	//editText.top = top + 30;
	//window.add(editText);
	/**
 * 
 * @param {String} alertAction - if value is 'update' it will appear 'slide to update'
 * @param {String} alertBody
 * @param {Integer} badge - counter value
 * @param {Integer} seconds - Time in witch the notification will be sent
 */
	//var actionNow = function(){ctrl.scheduleLocalNotification("alert action", "alertBody", 2, 2);};
	var actionNow = function(){
		var noti = Ti.App.iOS.scheduleLocalNotification({
    		// Create an ID for the notification 
		    //userInfo: {"id": "foo"},
		    alertBody: "Test? Test?",
		    date: new Date()
		}); 
	};
	var action5Sec = function(){alert("ejemplo");};
	var actionOpen = function(){alert("ejemplo");};

	var buttonNow = uibuilder.buttonRounded("ahora", actionNow);
	var button5Sec = uibuilder.buttonRounded("5 segundos", action5Sec);
	var buttonOpen = uibuilder.buttonRounded("abrir app", actionOpen);

	buttonNow.top = top + 80;
	button5Sec.top = top + 140;
	buttonOpen.top = top + 200;
	window.add(buttonNow);
	window.add(button5Sec);
	window.add(buttonOpen);
	
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
	/*var switchSubscribeChannel = uibuilder.switchWithLabel("Suscribirse a canal 'canal_ejemplo'", window, top + 300, function(e){
		if(e.value === true){ alert("suscrito a canal_ejemplo");}
		else { alert("suscripción anulada");}
	});*/
	
	var tab = Ti.UI.createTab({title:text, icon: 'assets/images/notifications.png', window: window});

	module.exports = tab;
}());
