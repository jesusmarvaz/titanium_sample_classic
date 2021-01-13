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
	
	
	var text = Ti.Locale.getString('mylocation', 'error str.');
	
	var button = UIBuilder.buttonRounded(text, locationCtrl.tryGetLocation);
	button.top = '20dp';
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
	//locationCtrl.locateOnMap(mapView);
	
	var buttonLocate = UIBuilder.buttonRounded("locate", function(){
		locationCtrl.actionIfLocationPermissionGranted(function(){mapView.userLocation = true;
			if(Util.isIOS())
			{
				mapIOS.userLocation = true;
			}});
	});
	buttonLocate.top = '8dp';
	scrollView.add(buttonLocate);
	
	if(Util.isIOS()){
		console.log("pasa");
		var mapIOS = UIBuilder.iOSMapKit(scrollView);
		
	}
	module.exports = scrollView;
}());
