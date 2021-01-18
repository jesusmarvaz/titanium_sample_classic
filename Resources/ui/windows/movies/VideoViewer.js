(function(){
	var uibuilder = require('ui/UiBuilder');
var Util = require('lib/Util');
//var http = require('lib/HttpService');
var endpoints = require('lib/Endpoints').all;
//var videoModel = require('model/VideoModel');
var Cache = require('lib/Cache');
var getSelectedId = require('ui/windows/movies/ListMovies').getSelectedId;

/*var self = Ti.UI.createWindow({
	title: "VideoViewer",
	backgroundColor: '#387593',
	orientation : Ti.UI.PORTRAIT,
	orientationModes : [Ti.UI.PORTRAIT]
});*/

//var hostWithToolbar = uibuilder.verticalViewWithToolbar("movie player", self, null);

var videoViewer = Ti.Media.createVideoPlayer(
	{
		width: Ti.UI.FILL, 
		height: Util.getScreenWidthDp()*9/16 + 'dp', 
		autoplay: true,
		mediaControlStyle: Ti.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode : Ti.Media.VIDEO_SCALING_ASPECT_FIT
		});

function play(url)
{
	if(url){ videoViewer.url = url; }
}

exports.self = videoViewer;
exports.play = play;
}());