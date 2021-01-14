(function(){
	var uibuilder = require('ui/UiBuilder');
	var scrollView = Ti.UI.createScrollView({
		//bottom:'20dp', set by mainView, it depends on actual screen height
  		layout: 'vertical'
	});
	var title1 = uibuilder.labelCentered(scrollView, '5dp');
	title1.text = Ti.Locale.getString('notifications','');
	title1.font = {fontSize:22, fontWeight: "bold"};

	var top = 20;

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
	//TODO implement proper notifications below
	var action5Sec = function(){alert("ejemplo");};
	var actionOpen = function(){alert("ejemplo");};

	var buttonNow = uibuilder.buttonRounded("ahora", actionNow);
	var button5Sec = uibuilder.buttonRounded("5 segundos", action5Sec);
	var buttonOpen = uibuilder.buttonRounded("abrir app", actionOpen);

	buttonNow.top = top;
	button5Sec.top = top;
	buttonOpen.top = top;
	scrollView.add(buttonNow);
	scrollView.add(button5Sec);
	scrollView.add(buttonOpen);
	
	//Channel subscription (push notifications)
	
	var title3 = uibuilder.labelCentered(scrollView, top);
	title3.text = "Push";
	title3.font = {fontSize:22, fontWeight: "bold"};
		/**
	 * @param {String} titleLabel - Text of the left label of the switch
	 * @param {Object} mainView
	 * @param {Integer} top - Top margin
	 * @param {Function} listener - action to respond to switch changes 
	 */
	//titleLabel, mainView, top, listener
	var switchSubscribeChannel = uibuilder.switchWithLabel("Suscribirse a canal 'canal_ejemplo'", scrollView, top, function(e){
		if(e.value === true){ alert("suscrito a canal_ejemplo");}
		else { alert("suscripción anulada");}
	});
	
	module.exports = scrollView;
}());
