(function(){
	var UIBuilder = require('ui/UiBuilder');
	var Util = require('lib/Util');
	var isAndroid = Util.isAndroid();
	var colors = require('styles/colors').all;
	

	
	var LocationCtrl = require('ui/tabs/location/LocationCtrl');
	var locationCtrl = new LocationCtrl();
	var sliderFrequency, sliderAccuracy = null;

	var scrollView = Ti.UI.createScrollView({
		//bottom:'20dp', set by mainView, it depends on actual screen height
  		layout: 'vertical',
  		//bottom: '90dp',
  		//backgroundColor: colors.background
	});
	
	var title1 = UIBuilder.labelCentered(scrollView, '5dp');
	title1.text = Ti.Locale.getString('location','');
	title1.font = {fontSize:22, fontWeight: "bold"};
	
	scrollView.add(title1);
	
	
	var text = Ti.Locale.getString('mylocation', 'error str.');
	
	var button = UIBuilder.buttonRounded(text, locationCtrl.tryGetLocation);
	button.top = '35dp';
	scrollView.add(button);
	
	var listenerFrequency = function(e){
		locationCtrl.setupLocation(sliderAccuracy.value, e.value);
		labelFrequency.text = e.value;
	};
	
	var listenerAccuracy = function(e){
		locationCtrl.setupLocation(e.value, sliderFrequency.value);
		labelAccuracy.text = e.value;
	};
	
	var labelAccuracy = UIBuilder.labelCentered(scrollView, 20);
	sliderAccuracy = UIBuilder.sliderPercentFullWidth(Ti.Locale.getString('accuracy',''), listenerAccuracy, scrollView, 10);
	var labelFrequency = UIBuilder.labelCentered(scrollView, '20dp');
	sliderFrequency = UIBuilder.sliderPercentFullWidth(Ti.Locale.getString('frequency',''), listenerFrequency, scrollView, 10);
	var mapView = UIBuilder.mapView(scrollView);
	var buttonLocate = UIBuilder.buttonRounded("locate", function(){
		locationCtrl.actionIfLocationPermissionGranted(function(){
			mapView.userLocation = true;
			if(Util.isIOS())
			{
				mapIOS.userLocation = true;
				Titanium.Geolocation.getCurrentPosition(function(e) {
	        		if (e.error) { 
	        			//Ti.API.error('Error: ' + e.error); } //it seems to fail this part
	        		}
	        		else {
	  					var MapModule = require('ti.map');
	        			var myLocation = MapModule.createAnnotation({
						    latitude: e.coords.latitude,
						    longitude: e.coords.longitude,
						    //centerOffset: { x: 80, y: 25 },
						    image: 'assets/images/location@3x.png', // 80x80px in this example
						    title: 'My location',
						    subtitle: 'My current location',
						    // For events, use the Map View's click event
						    // and monitor the clicksource property for 'rightButton'.   
						    //rightButton: Ti.UI.iOS.SystemButton.CONTACT_ADD
						});
						//var locations = mapIOS.annotations.push(myLocation);
						mapIOS.annotations = [myLocation];
						
						//create camera and animate to go to the location
						
						var camera = MapModule.createCamera({
							altitude: 2000000,
							centerCoordinate: { longitude: e.coords.longitude, latitude: e.coords.latutude},
							heading: -0,
							pitch: 0
						});
						mapIOS.animateCamera({
								camera: camera, 
								curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
								duration: 2000
							});
							
							//The code below is worth when creating the map, before it is been added to the view/window.
						
						/*function animateCamera(){
							mapIOS.removeEventListener('complete', animateCamera);
							mapIOS.animateCamera({
								camera: camera, 
								curve: Ti.UI.ANIMATION_CURVE_EASE_IN,
								duration: 2000
							});
						};*/
						
						//mapIOS.addEventListener('complete', animateCamera);
	        		}
   				});
			}});
	});
	
	buttonLocate.top = '8dp';
	scrollView.add(buttonLocate);
	
	if(Util.isIOS()){var mapIOS = UIBuilder.iOSMapKit(scrollView);}
	
	module.exports = scrollView;
}());
