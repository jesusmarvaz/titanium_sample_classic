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
	tabGroup.addTab(require('ui/tabs//advanced/AdvancedTab'));
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
	setViewParams(locationView);
	
	var notificationsView = require('ui/tabs/notifications/NotificationsView'); 
	setViewParams(notificationsView);
	
	var webView = require('ui/tabs/web/WebView'); 
	setViewParams(webView);
	
	var advancedView = require('ui/tabs/advanced/AdvancedView'); 
	setViewParams(advancedView);
	
	var crudView = require('ui/tabs/crud/CrudView'); 
	setViewParams(crudView);
	
	//Optional: create tabs that describe each window content
	//var labelView = Ti.UI.createLabel({text: 'I am view ...', textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, font: {fontSize:54}, color: 'white'});
	//locationView.add(labelView);
	
	var customTabGroup = Ti.UI.createView({
		bottom:0,
		height: Util.getTabGroupHeightDp(),
		width: Ti.UI.FILL,
		backgroundColor: colors.colorWeb,
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
	
		//TAB ADVANCED
	var tabAdvanced = Ti.UI.createView(
		{
			id: 'advanced', 
			layout: 'vertical',
			width: '20%',
			left: 0,
			height: Ti.UI.FILL
			});
	var imageViewAdvanced = Ti.UI.createImageView({image: 'assets/images/advanced@3x.png', intColor: colors.text, top: "4dp",width: "28dp", height: "28dp"});
	var labelAdvanced = Ti.UI.createLabel(
		{
			text:Ti.Locale.getString('advanced', 'advanced str.'), 
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER, 
			font: {fontSize: 12}, 
			color: 'black', 
			width: Ti.UI.FILL, 
			bottom: 0
		});
	tabAdvanced.add(imageViewAdvanced);
	tabAdvanced.add(labelAdvanced);
	
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
	customTabGroup.add(tabAdvanced);
	customTabGroup.add(tabCrud);
	
	window.add(customTabGroup);
	
	//ADDS VIEWS AND HIDES ALL EXCEPT ONE
	window.add(locationView);

	window.add(notificationsView);
	notificationsView.hide();
	
	window.add(webView);
	webView.hide();
	
	window.add(advancedView);
	advancedView.hide();
	
	window.add(crudView);
	crudView.hide();
	
	//FUNCTIONS TO SHOW EACH TAB CONTENT
	
	function showLocation(e)
	{
		notificationsView.hide();
		webView.hide();
		advancedView.hide();
		crudView.hide();
		locationView.show();
		console.log("mensaje adjunto: " + e.message);
		
		imageViewCrud.tintColor = colors.text;
		imageViewLocation.tintColor = colors.accent;
		imageViewNotifications.tintColor = colors.text;
		imageViewWeb.tintColor = colors.text;
		imageViewAdvanced.tintColor = colors.text;
	}
	function showNotifications(e)
	{
		webView.hide();
		advancedView.hide();
		crudView.hide();
		locationView.hide();
		notificationsView.show();
		console.log("mensaje adjunto: " + e.message);
		
		imageViewCrud.tintColor = colors.text;
		imageViewLocation.tintColor = colors.text;
		imageViewNotifications.tintColor = colors.accent;
		imageViewWeb.tintColor = colors.text;
		imageViewAdvanced.tintColor = colors.text;
	}
	function showWeb(e)
	{
		notificationsView.hide();
		advancedView.hide();
		crudView.hide();
		locationView.hide();
		webView.show();
		console.log("mensaje adjunto: " + e.message);
		
		imageViewCrud.tintColor = colors.text;
		imageViewLocation.tintColor = colors.text;
		imageViewNotifications.tintColor = colors.text;
		imageViewWeb.tintColor = colors.accent;
		imageViewAdvanced.tintColor = colors.text;
		
	}
	function showAdvanced(e)
	{
		notificationsView.hide();
		webView.hide();
		crudView.hide();
		locationView.hide();
		advancedView.show();
		console.log("mensaje adjunto: " + e.message);
		
		imageViewCrud.tintColor = colors.text;
		imageViewLocation.tintColor = colors.text;
		imageViewNotifications.tintColor = colors.text;
		imageViewWeb.tintColor = colors.text;
		imageViewAdvanced.tintColor = colors.accent;
	}
	function showCrud(e)
	{
		notificationsView.hide();
		webView.hide();
		advancedView.hide();
		locationView.hide();
		crudView.show();
		console.log("mensaje adjunto: " + e.message);
		imageViewCrud.tintColor = colors.accent;
		imageViewLocation.tintColor = colors.text;
		imageViewNotifications.tintColor = colors.text;
		imageViewWeb.tintColor = colors.text;
		imageViewAdvanced.tintColor = colors.text;
	}
	
	var tabRouter = 
	{
		goLocation : showLocation,
		goNotifications : showNotifications,
		goWeb: showWeb,
		goAdvanced: showAdvanced,
		goCrud: showCrud
	};
	
	//TAB EVENT LISTENERS
	
	tabLocation.addEventListener("click", showLocation);
	tabNotifications.addEventListener("click", showNotifications);
	tabWeb.addEventListener("click", showWeb);
	tabAdvanced.addEventListener("click", showAdvanced);
	tabCrud.addEventListener("click", showCrud);
	
	window.open();
		
	module.exports = tabRouter;
}

if(Util.isAndroid()){ buildCustomTabGroupForAndroid(); }
else{ buildTabGroupForIOS(); }