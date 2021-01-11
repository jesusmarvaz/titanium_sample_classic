var Util = require('lib/Util');
var builder = 
{
	/**
	 * @param {String} text - button text
	 * @param {Function} action - action that will be triggered when pressing the button
	 * @return {Object} the button
	 */
	buttonRounded : function(text, action){
		var color = require('styles/colors').all;
		var button = Ti.UI.createButton({
			title : text,
			width : '150dp',
			color: '#000000',
			//borderColor : color.accent,
			borderRadius  : '5dp',
			backgroundColor : color.translucent
		});
		
		button.addEventListener('click', action);
		return button;
	},
	buttonDefault : function(text, action){
		var color = require('styles/colors').all;
		var button = Ti.UI.createButton({
			title : text,
			width : '150dp',
			//borderColor : color.accent,
			//borderRadius  : '5dp',
			//backgroundColor : color.translucent
		});
		
		button.addEventListener('click', action);
		return button;
	},
	/**
	 * @param {String} text - slider title
	 * @param {Function} listener - action with the updated value, from 0 to 100
	 * @param {Object} view - window where to add the views.
	 * @param {Integer} top - top margin
	 */
	sliderPercentFullWidth : function(text, listener, view, top){
		var label = Ti.UI.createLabel({
			text: text,
			width : '100%',
			top : top,
			color: '#000000',
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		view.add(label);
		var slider = Ti.UI.createSlider({
			top : 10,
			min : 0,
			max : 100,
			width : Ti.UI.FILL,
			value : 50
		});
		view.add(slider);
		slider.addEventListener('change', listener);
		return slider;
	},
	/**
	 * @param {Object} view - View or window where to add the view
	 * @param {Integer} top - top margin
	 */
	labelCentered : function(view, top){
		var label = Ti.UI.createLabel({
			text: '-',
			width : '100%',
			top : top,
			color : "#000000",
			textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		
		view.add(label);
		return label;
	},
	/**
	 * @param {Object} view - view or window where to add the view
	 */
	scrollViewVertical : function(view){
  		var scrollView = Ti.UI.createScrollView({
  			bottom:'20dp',
  			layout: 'vertical'
  		});
  		
  		view.add(scrollView);
  		return scrollView;
	},
	/**
	 * @param {Object} view - view or window where to add the view
	 */
	mapView : function(view){
		var MapModule = require('lib/maps');
		var Util = require('lib/Util').UTIL;
		
		/**check play services availability**/
		if(!Util.isIOS())
		{
			var rc = MapModule.isGooglePlayServicesAvailable();
			switch (rc) {
	    		case MapModule.SUCCESS:
	        	Ti.API.info('Google Play services is installed.');
	        	break;
	    		case MapModule.SERVICE_MISSING:
	        	alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
	        	break;
	    		case MapModule.SERVICE_VERSION_UPDATE_REQUIRED:
	        	alert('Google Play services is out of date. Please update Google Play services.');
	        	break;
	    		case MapModule.SERVICE_DISABLED:
	        	alert('Google Play services is disabled. Please enable Google Play services.');
	        	break;
	    		case MapModule.SERVICE_INVALID:
	        	alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
	        	break;
	    		default:
	        	alert('Unknown error.');
			}
		}else{MapModule.setAPIKey('AIzaSyBIBTIGWbwAxVjVBS8v0WZ5W5nUP5CqEzg');}
		
		var mapView = MapModule.createView({
			height: '400px', 
			mapType: MapModule.SATELLITE_TYPE,
    		animate: true,
    		region: { latitude: -0.50537, longitude: 38.359, latitudeDelta: 0.2, longitudeDelta: 0.2 },
    		width : Ti.UI.FILL
    		});
		view.add(mapView);
		return mapView;
	},
	/**
	 * @param {Object} view - view or window where to add the view
	 */
	iOSMapKit : function(view){
		var MapModule = require('ti.map');
		var top = Ti.Platform.displayCaps.platformHeight / 3;
		console.log("top: " + top);
		
		var map = MapModule.createView({
			height : '400px',
			userLocation : true,
			mapType : MapModule.SATELLITE_TYPE,
			animate : true,
			region : { latitude: -0.50537, longitude: 38.359, latitudeDelta: 0.2, longitudeDelta: 0.2 },
			width : Ti.UI.FILL
		});
		return map;
	},
	
	editText : function(){
	var editText = Ti.UI.createTextField({
		backgroundColor : "white",
		color: "black",
		width: Ti.UI.FILL,
		height: 40,
		left : 10,
		right : 10,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT
	});
	return editText;
	},
	/**
	 * @param {String} titleLabel - Text of the left label of the switch
	 * @param {Object} mainView
	 * @param {Integer} top - Top margin
	 * @param {Function} listener - action to respond to switch changes 
	 */
	switchWithLabel : function(titleLabel, mainView, top, listener){
		var view = Ti.UI.createView({
			layout : 'horizontal',
			top : top,
			left: 20
		});
	
		var label = Ti.UI.createLabel({text: titleLabel,color : "#000000"});
		var onOffSwitch = Ti.UI.createSwitch({
			left: '10dp',
			value: false,
			title: titleLabel,
			style: Util.isAndroid() === true ? Titanium.UI.Android.SWITCH_STYLE_CHECKBOX : undefined,
			color: '#000'
			
		});
		
		onOffSwitch.addEventListener('change', listener);
		if(Util.isIOS() == true) {view.add(label);}
		view.add(onOffSwitch);
		mainView.add(view);
	},
	/**
	 * 
 	 * @param {String} title - Title to be shown in the toolbar
 	 * @param {Objecy} window - Window to close with backButton
	 */
	toolBarView : function(title, window){
		var mainView = Ti.UI.createView({layout: 'vertical'});
		var backButton = Ti.UI.createButton({backgroundImage: "assets/images/arrow", tintColor: "white"});
		var backButtonText = Ti.UI.createButton({text: "back"});
		backButton.addEventListener("click", function(){window.close();});
		backButtonText.addEventListener("click", function(){window.close();});
		var toolBar1 = Ti.UI.createToolbar({
			extendBackground : true,
			barColor : '#00ffff',
			top: 00,
			title: title,
			homeButtonEnabled: true,
			subtitle: "base toolbar sample"
		});
		
		var toolBar2 = Ti.UI.createToolbar({
			extendBackground : false,
			barColor : '#00ffff',
			top: 100,
			items : [backButtonText, backButton],
			title: title,
			subtitle: "base toolbar sample",
			//homeButtonEnabled: true,
			//displayHomeAsUp: true
		});
		mainView.add(toolBar2);
		return mainView;
	}
};


module.exports = builder;
