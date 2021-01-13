var LocationCtrl = function(){
	var self = this;
	this.tryGetLocation = function(){
		var getLocation = function(){
			Titanium.Geolocation.getCurrentPosition(function(e) {
        		if (e.error) { 
        			//Ti.API.error('Error: ' + e.error); } //it seems to fail this part
        		}
        		else {
        			//Ti.API.info(e.coords); //it seems to fail this part
        			alert(self.getStringCoord(e.coords));
        		}
   });
			
		};
		self.actionIfLocationPermissionGranted(getLocation); 
	};
};

LocationCtrl.prototype.hasLocationPermission = function(){
	return Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE);
};

LocationCtrl.prototype.actionIfLocationPermissionGranted = function(action)
{
	var Util = require('lib/Util');
	Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function(e) 
	{
	    if (e.success && Ti.Geolocation.locationServicesEnabled && Util._.isFunction(action)){ action(); }
	    else
	    {
	    	if(!Util._.isFunction(action)){ alert("action not performed (argument is not a function)"); return;}
	    	if(!Ti.Geolocation.locationServicesEnabled){alert("no GPS"); return;}
	    	if(!e.success || e.success == null){ alert(Ti.Locale.getString('location_permission_denied', 'location permission denied!')); return;}
	    }
    });
};

LocationCtrl.prototype.getStringCoord = function(e){
		var coor = Ti.Locale.getString('latitude','') + ":" + e.latitude + ", " 
		+ Ti.Locale.getString('longitude', '') + ":" + e.longitude;
		return coor;
};

LocationCtrl.prototype.setupLocation = function(accuracy, updateTime){
	var Util = require('lib/Util');
	
	if(Util.isAndroid() == true){ 
		// demonstrates manual mode:
		//this fails...
		if(Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE))
		{
			var providerGps = Ti.Geolocation.Android.createLocationProvider({
	    		//name: Ti.Geolocation.PROVIDER_GPS,
	    		name : "gps",
	    		minUpdateDistance: accuracy,
	    		minUpdateTime:  0
			});
		Ti.Geolocation.Android.addLocationProvider(providerGps);
		Ti.Geolocation.Android.manualMode = true; 
		console.log("location setup ANDROID: " + JSON.stringify(providerGps));
		}
	}
		
	else if(Util.isIOS() == true){
		if (Ti.Geolocation.locationServicesEnabled) {
			if(accuracy < 50){Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_HUNDRED_METERS;}
			if(accuracy > 50){Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;}
    		Ti.Geolocation.purpose = 'Get Current Location';
    		Ti.Geolocation.distanceFilter = 10;
    		Ti.Geolocation.preferredProvider = Ti.Geolocation.PROVIDER_GPS;
 			console.log("location setup IOS: accuracy: " + Titanium.Geolocation.accuracy);

	} else {
    alert('Please enable location services');
	}
	}
	else { alert('no valid platform found!'); }
};

module.exports = LocationCtrl;