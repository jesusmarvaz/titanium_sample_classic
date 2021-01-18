(function(){
	var WebCtrl = Object;
	var Util = require('lib/Util');
	var uibuilder = require('ui/UiBuilder');
	
	function buildTabletVideoView(moviesListView)
	{
		var controller = 
		{
			play: function(url)
			{
				var play = require('ui/windows/movies/VideoViewer').play;
				play(url);
			}
		};
		
		moviesListView.width = '35%';
		
		var setController = require('ui/windows/movies/ListMovies').setController;
		setController(controller);
		
		var videoPlayerView = require('ui/windows/movies/VideoViewer').self;
		videoPlayerView.width = '65%';
		var videoHeight = Util.getScreenWidthDp() * 0.65 * 9 / 16;
		videoPlayerView.height = videoHeight;
		
		var window = Ti.UI.createWindow({orientation: Ti.UI.LANDSCAPE_LEFT, orientationModes: [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT], fullscreen: false});
		var masterView = uibuilder.viewWithToolbar("horizontal Video View", window, null);
		
		masterView.add(moviesListView);
		masterView.add(videoPlayerView);
		
		window.add(masterView);
		window.open();
	}
	
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
	
	WebCtrl.prototype.launchVideoList = function()
	{
		var moviesListView = require('ui/windows/movies/ListMovies').self;
		if(Util.isTablet())
		{
			console.log("is tablet");
			buildTabletVideoView(moviesListView);
				
		}else
		{
			console.log("is not a tablet");
			var self = Ti.UI.createWindow({
				title: "Lista películas",
				backgroundColor: '#387593'
			});	
			
			var mainView = uibuilder.verticalViewWithToolbar("lista pelis", self, 'assets/images/web@2x.png');
			
			mainView.add(moviesListView);
			self.add(mainView);
			self.open();
		}	
	};
	module.exports = WebCtrl;

}());