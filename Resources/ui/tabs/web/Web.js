var text = Ti.Locale.getString('web', '');
var colors = require('styles/colors').all;
var uibuilder = require('ui/UiBuilder');
var WebCtrl = require('ui/tabs/web/WebCtrl');
var webCtrl = new WebCtrl();

var window = Ti.UI.createWindow({
	title : text,
	backgroundColor : colors.colorWeb
	});
	
var title1 = uibuilder.labelCentered(window, '5dp');
title1.text = "Web View Samples";
title1.font = {fontSize:22, fontWeight: "bold"};

var buttonLocal = uibuilder.buttonRounded("local web", function(){
	webCtrl.launchWebViewWindow('assets/webs/tutorial/tutorial.html');
});

var buttonRemote = uibuilder.buttonRounded("remote web", function(){
	webCtrl.launchWebViewWindow('https://www.google.com/');
});
//var buttonLocal = uibuilder.buttonRounded("local web", function(){});
buttonLocal.top = "40dp";
buttonRemote.top = "100dp";

window.add(buttonLocal);
window.add(buttonRemote);

	
//title, icon, window
var tab = Ti.UI.createTab({title:text, icon: 'assets/images/web.png', window: window});
	//var tabLocation = new TabLocation();


module.exports = tab;