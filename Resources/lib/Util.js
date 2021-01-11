var Util = {
	//underscore library
	_ : require('lib/Underscore'),
	isIOS : function(){
		return Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad';
	},
	isAndroid : function(){
		return Ti.Platform.osname === 'android';
	},
	isIPhone : function(){
		return Ti.Platform.osname === 'iphone';
	},
	isTablet : function(){
		var platform = Ti.Platform.osname;
		var isTablet = false;
		switch(platform)
		{
			case 'ipad':
			isTablet = true;
			break;
			case 'android':
			var psc = Ti.Platform.Android.physicalSizeCategory;
			isTablet = psc === Ti.Platform.Android.PHYSICAL_SIZE_CATEGORY_LARGE
			|| psc === Ti.Platform.Android.PHYSICAL_SIZE_CATEGORY_XLARGE;
			break;
			case 'iphone' : break;
			default : break;
		}
		return isTablet;
	},
	formatDate : function(date){
		//if our date is not given then use the current datetime
		date = date || new Date();
		var minutes = date.getMinutes();
		if(parseInt(minutes) < 10){
			minutes = "0"+minutes;
		}
		var datestr = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
		if(date.getHours() >= 12){
			datestr += ' '+(date.getHours() == 12 ? date.getHours() : date.getHours() - 12)+":" + minutes+' PM';
		} else {
			datestr += ' ' + date.getHours() + ":" + minutes + ' AM';
		}
		return datestr;
	}
};

module.exports = Util;
module.exports.UTIL = Util;
