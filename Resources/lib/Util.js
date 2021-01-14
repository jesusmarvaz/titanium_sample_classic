const Util = {
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
	},
	getDpi : function()
	{
		var dpi;
		if(Util.isAndroid()){dpi = Titanium.Platform.displayCaps.xdpi;}
		else {dpi = Ti.Platform.displayCaps.dpi;}
		return dpi;
	},
	getTabGroupHeightDp : function(){return 65.0;},
	getScreenHeightDp : function() { return Util.convertPxToDp(Ti.Platform.displayCaps.platformHeight); },
	getScreenWidthDp : function() { return Util.convertPxToDp(Ti.Platform.displayCaps.platformWidth); },
	getScreenTabHeightDp : function(){ return Util.getScreenHeightDp() - Util.getTabGroupHeightDp() - 25; },
	/**
	 * Converts px magnitude to dp condirering screen dpi automatically
 	 * @param {Integer} px - dimension in px to convert
 	 * @return {Float}
	 */
	convertPxToDp: function(px){ return px * 160 / Util.getDpi(); },
	/**
	 * Converts dp magnitude into px rounded to the larger integer less or equal than the number converted
 	 * @param {Float} dp
 	 * @return {Integer} 
	 */
	convertDpToPx: function(dp){ return Math.floor(dp * Util.getDpi() / 160);}
};

module.exports = Util;
module.exports.UTIL = Util;
