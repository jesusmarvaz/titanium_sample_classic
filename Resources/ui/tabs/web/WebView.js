(function(){
	var WebCtrl = require('ui/tabs/web/WebCtrl');
	var webCtrl = new WebCtrl();
	var uibuilder = require('ui/UiBuilder');
	
	var scrollView = Ti.UI.createScrollView({layout: 'vertical'});
	var top = '20dp';
	var title1 = uibuilder.labelCentered(scrollView, '5dp');
	title1.text = "Web View Samples";
	title1.font = {fontSize:22, fontWeight: "bold"};
	
	var buttonLocal = uibuilder.buttonRounded("local web", function(){
		webCtrl.launchWebViewWindow('assets/webs/tutorial/tutorial.html');
	});
	
	var buttonRemote = uibuilder.buttonRounded("remote web", function(){
		webCtrl.launchWebViewWindow('https://www.google.com/');
	});
	
	var buttonListMovies = uibuilder.buttonRounded("lista películas", function(){
		var window = require('/ui/windows/ListMovies').self;
		window.open();
	});
	//var buttonLocal = uibuilder.buttonRounded("local web", function(){});
	buttonLocal.top = top;
	buttonRemote.top = top;
	buttonListMovies.top = top;
	
	scrollView.add(buttonLocal);
	scrollView.add(buttonRemote);
	scrollView.add(buttonListMovies);
	
	module.exports = scrollView;
}());