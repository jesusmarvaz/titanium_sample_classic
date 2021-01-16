var colors = require('styles/colors').all;
var Util = require('lib/Util');
console.log("screen height: " + Titanium.Platform.displayCaps.platformHeight);
console.log("screen width: " + Titanium.Platform.displayCaps.platformWidth);
console.log("screen height from Util: " + Util.getScreenHeightDp());
console.log("screen width from Util: " + Util.getScreenWidthDp());
console.log("screen tab screen height from Util: " + Util.getScreenTabHeightDp());

function buildTabGroupForIOS()
{
	var tabGroup = Ti.UI.createTabGroup();
	tabGroup.addTab(require('ui/tabs/location/LocationTab'));
	tabGroup.addTab(require('ui/tabs/notifications/NotificationsTab'));
	tabGroup.addTab(require('ui/tabs/web/WebTab'));
	tabGroup.addTab(require('ui/tabs/ui/UITab'));
	tabGroup.addTab(require('ui/tabs/crud/CrudTab'));
	
	tabGroup.open();
	module.exports = tabGroup; 
}

function setViewParams(view)
{
	console.log("system xdpi: " + Ti.Platform.displayCaps.xdpi);
	console.log("system xdpi: " + Ti.Platform.displayCaps.ydpi); 
	
	var height = Util.getScreenTabHeightDp();
	console.log("height: " + height);
	var tabGroupHeight = Util.getTabGroupHeightDp();
	console.log("tabGroupHeight: " + tabGroupHeight);
	
	view.height = height;
	view.top = 0; view.width = Ti.UI.FILL;	
}

function buildCustomTabGroupForAndroid()
{
	var window = Titanium.UI.createWindow({backgroundColor:colors.background, fullscreen:false, tabBarHidden: true});
	
	var locationView = require('ui/tabs/location/LocationView');
	locationView.backgroundColor = colors.colorLocation;
	setViewParams(locationView);
	
	var notificationsView = require('ui/tabs/notifications/NotificationsView'); 
	notificationsView.backgroundColor = colors.colorNotifications;
	setViewParams(notificationsView);
	
	var webView = require('ui/tabs/web/WebView'); 
	webView.backgroundColor = colors.colorWeb;
	setViewParams(webView);
	
	var UIView = require('ui/tabs/ui/UIView'); 
	UIView.backgroundColor = colors.colorAdvanced;
	setViewParams(UIView);
	
	var crudView = require('ui/tabs/crud/CrudView'); 
	crudView.backgroundColor = colors.colorSettings;
	setViewParams(crudView);
	
	//Optional: create tabs that describe each window content
	//var labelView = Ti.UI.createLabel({text: 'I am view ...', textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, font: {fontSize:54}, color: 'white'});
	//locationView.add(labelView);
	
	var customTabGroup = Ti.UI.createView({
		bottom:0,
		height: Util.getTabGroupHeightDp(),
		width: Ti.UI.FILL,
		backgroundColor: colors.background,
		layout: 'horizontal'
	});
	
	//TAB LOCATION
	var tabLocation = Ti.UI.createView(
		{
			id: 'location', 
			layout: 'vertical',
			width: '20%',
			left: 0,
			height: Ti.UI.FILL
		});
	var imageViewLocation = Ti.UI.createImageView({image: 'assets/images/location@3x.png', tintColor: colors.accent, top: "4dp", width: "28dp", height: "28dp"});
	var labelLocation = Ti.UI.createLabel(
		{
			text:Ti.Locale.getString('location', 'location str.'), 
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
			font: {fontSize: 12}, 
			color: 'black', 
			width: Ti.UI.FILL, 
			bottom: 0
		});
	tabLocation.add(imageViewLocation);
	tabLocation.add(labelLocation);
	
		//TAB NOTIFICATIONS
	var tabNotifications = Ti.UI.createView(
		{
			id: 'notifications', 
			layout: 'vertical',
			width: '20%',
			left: 0,
			height: Ti.UI.FILL
			});
	var imageViewNotifications = Ti.UI.createImageView({image: 'assets/images/notifications@3x.png', tintColor: colors.text, top: "4dp", width: "28dp", height: "28dp"});
	var labelNotifications = Ti.UI.createLabel(
		{
			text:Ti.Locale.getString('notifications', 'notifications str.'), 
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
			font: {fontSize: 12}, 
			color: 'black', 
			width: Ti.UI.FILL, 
			bottom: 0
		});
	tabNotifications.add(imageViewNotifications);
	tabNotifications.add(labelNotifications);
	
		//TAB WEB
	var tabWeb = Ti.UI.createView(
		{
			id: 'web', 
			layout: 'vertical',
			width: '20%',
			left: 0,
			height: Ti.UI.FILL
			});
	var imageViewWeb = Ti.UI.createImageView({image: 'assets/images/web@3x.png', top: "4dp", intColor: colors.text, width: "28dp", height: "28dp"});
	var labelWeb = Ti.UI.createLabel(
		{
			text:Ti.Locale.getString('web', 'web str.'), 
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
			font: {fontSize: 12}, 
			color: 'black', 
			width: Ti.UI.FILL, 
			bottom: 0
		});
	tabWeb.add(imageViewWeb);
	tabWeb.add(labelWeb);
	
		//TAB UI
	var tabUI = Ti.UI.createView(
		{
			id: 'ui', 
			layout: 'vertical',
			width: '20%',
			left: 0,
			height: Ti.UI.FILL
			});
	var imageViewUI = Ti.UI.createImageView({image: 'assets/images/advanced@3x.png', intColor: colors.text, top: "4dp",width: "28dp", height: "28dp"});
	var labelUI = Ti.UI.createLabel(
		{
			text:Ti.Locale.getString('ui', 'ui str.'), 
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
			font: {fontSize: 12}, 
			color: 'black', 
			width: Ti.UI.FILL, 
			bottom: 0
		});
	tabUI.add(imageViewUI);
	tabUI.add(labelUI);
	
			//TAB CRUD
	var tabCrud = Ti.UI.createView(
		{
			id: 'crud', 
			layout: 'vertical',
			width: '20%',
			left: 0,
			height: Ti.UI.FILL
			});
	var imageViewCrud = Ti.UI.createImageView({image: 'assets/images/settings@3x.png', intColor: colors.text, top: "4dp", width: "28dp", height: "28dp"});
	var labelCrud = Ti.UI.createLabel(
		{
			text:Ti.Locale.getString('crud', 'crud str.'), 
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
			font: {fontSize: 12}, 
			color: 'black', 
			width: Ti.UI.FILL, 
			bottom: 0
		});
	tabCrud.add(imageViewCrud);
	tabCrud.add(labelCrud);
	
	//ADDS TABS TO THE CONTAINER
	customTabGroup.add(tabLocation);
	customTabGroup.add(tabNotifications);
	customTabGroup.add(tabWeb);
	customTabGroup.add(tabUI);
	customTabGroup.add(tabCrud);
	
	window.add(customTabGroup);
	
	//ADDS VIEWS AND HIDES ALL EXCEPT ONE
	window.add(locationView);

	window.add(notificationsView);
	notificationsView.hide();
	
	window.add(webView);
	webView.hide();
	
	window.add(UIView);
	UIView.hide();
	
	window.add(crudView);
	crudView.hide();
	
	//FUNCTIONS TO SHOW EACH TAB CONTENT
	
	function showLocation(e)
	{
		notificationsView.hide();
		webView.hide();
		UIView.hide();
		crudView.hide();
		locationView.show();
		console.log("mensaje adjunto: " + e.message);
		
		imageViewCrud.tintColor = colors.text;
		imageViewLocation.tintColor = colors.accent;
		imageViewNotifications.tintColor = colors.text;
		imageViewWeb.tintColor = colors.text;
		imageViewUI.tintColor = colors.text;
	}
	function showNotifications(e)
	{
		webView.hide();
		UIView.hide();
		crudView.hide();
		locationView.hide();
		notificationsView.show();
		console.log("mensaje adjunto: " + e.message);
		
		imageViewCrud.tintColor = colors.text;
		imageViewLocation.tintColor = colors.text;
		imageViewNotifications.tintColor = colors.accent;
		imageViewWeb.tintColor = colors.text;
		imageViewUI.tintColor = colors.text;
	}
	function showWeb(e)
	{
		notificationsView.hide();
		UIView.hide();
		crudView.hide();
		locationView.hide();
		webView.show();
		console.log("mensaje adjunto: " + e.message);
		
		imageViewCrud.tintColor = colors.text;
		imageViewLocation.tintColor = colors.text;
		imageViewNotifications.tintColor = colors.text;
		imageViewWeb.tintColor = colors.accent;
		imageViewUI.tintColor = colors.text;
		
	}
	function showUI(e)
	{
		notificationsView.hide();
		webView.hide();
		crudView.hide();
		locationView.hide();
		UIView.show();
		console.log("mensaje adjunto: " + e.message);
		
		imageViewCrud.tintColor = colors.text;
		imageViewLocation.tintColor = colors.text;
		imageViewNotifications.tintColor = colors.text;
		imageViewWeb.tintColor = colors.text;
		imageViewUI.tintColor = colors.accent;
	}
	function showCrud(e)
	{
		notificationsView.hide();
		webView.hide();
		UIView.hide();
		locationView.hide();
		crudView.show();
		console.log("mensaje adjunto: " + e.message);
		imageViewCrud.tintColor = colors.accent;
		imageViewLocation.tintColor = colors.text;
		imageViewNotifications.tintColor = colors.text;
		imageViewWeb.tintColor = colors.text;
		imageViewUI.tintColor = colors.text;
	}
	
	var tabRouter = 
	{
		goLocation : showLocation,
		goNotifications : showNotifications,
		goWeb: showWeb,
		goUI: showUI,
		goCrud: showCrud
	};
	
	//TAB EVENT LISTENERS
	
	tabLocation.addEventListener("click", showLocation);
	tabNotifications.addEventListener("click", showNotifications);
	tabWeb.addEventListener("click", showWeb);
	tabUI.addEventListener("click", showUI);
	tabCrud.addEventListener("click", showCrud);
	
	window.open();
		
	module.exports = tabRouter;
}

if(Util.isAndroid()){ buildCustomTabGroupForAndroid(); }
else{ buildTabGroupForIOS(); }