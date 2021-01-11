(function(){
	var WebCtrl = Object;
	var Util = require('lib/Util');
	var uibuilder = require('ui/UiBuilder');
	
	WebCtrl.prototype.launchWebViewWindow = function(url){
		var window = Ti.UI.createWindow();
		var mainViewWithToolbar = uibuilder.toolBarView("toolbar web title", window);
		var webView = Ti.UI.createWebView({url : url});
		if(Util.isAndroid())
		{
			if(Ti.Android.hasPermission("android.permission.WRITE_EXTERNAL_STORAGE"))
			{
				mainViewWithToolbar.add(webView);
				window.add(mainViewWithToolbar);
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
				mainViewWithToolbar.add(webView);
				window.add(mainViewWithToolbar);
				window.open();
		}
	};
	
	module.exports = WebCtrl;

}());