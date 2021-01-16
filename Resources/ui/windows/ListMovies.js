var uibuilder = require('ui/UiBuilder');
var http = require('lib/HttpService');
var endpoints = require('lib/Endpoints').all;
var videoModel = require('model/VideoModel');
var Cache = require('lib/Cache');

var self = Ti.UI.createWindow({
	title: "Lista películas",
	backgroundColor: '#387593'
});
var mainView = uibuilder.verticalViewWithToolbar("lista pelis", self, 'assets/images/web@2x.png');
var label = Ti.UI.createLabel({ 
	font: {fontSize: 16}, 
	top: 10,
	text: 'Lista de películas',
	width : '100%',
	color : "#cacaca",
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
var backgroundView = Ti.UI.createView({layout:'vertical', backgroundColor: 'gray', top: 0, width: '100%', height: '100%'});

backgroundView.add(label);
mainView.add(backgroundView);
self.add(mainView);

/*videoModel.getVideos(function(result){
	console.log("parsed data: " + JSON.stringify(Cache.get('videos')[1]));
	hello(backgroundView);
});*/

function hello(view)
{
	//alert("hello: " + JSON.stringify(Cache.get('videos')[1]));
	var listSection = Ti.UI.createListSection( {items: Cache.get('videos')} );
	var listView = Ti.UI.createListView({top: 15, sections: [listSection]});
	view.add(listView);
}

module.exports = self;
