(function(){
	var WebCtrl = Object;
	var Util = require('lib/Util');
	var uibuilder = require('ui/UiBuilder');
	
	WebCtrl.prototype.launchWebViewWindow = function(url){
		var window = Ti.UI.createWindow({title: "web"});
		var view = uibuilder.verticalViewWithToolbar("toolbar web title", window);
		var webView = Ti.UI.createWebView({url : url, top: '0dp'});
		if(Util.isAndroid())
		{
			if(Ti.Android.hasPermission("android.permission.WRITE_EXTERNAL_STORAGE"))
			{
				view.add(webView);
				window.add(view);
				window.open();
			}else{
				//Ti.Filesystem.requestStoragePermissions();
				Ti.Android.requestPermissions("android.permission.WRITE_EXTERNAL_STORAGE", function(e) {
					if (e.success) {
						alert("ok, permission granted");
					}
				});
			}
		}else{ 
				view.add(webView);
				window.add(view);
				window.open();
		}
	};
	
	module.exports = WebCtrl;

}());