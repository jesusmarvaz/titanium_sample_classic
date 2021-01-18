(function(){
	var uibuilder = require('ui/UiBuilder');
var Util = require('lib/Util');
//var http = require('lib/HttpService');
var endpoints = require('lib/Endpoints').all;
//var videoModel = require('model/VideoModel');
var Cache = require('lib/Cache');
var getSelectedId = require('ui/windows/ListMovies').getSelectedId;

var self = Ti.UI.createWindow({
	title: "VideoViewer",
	backgroundColor: '#387593',
	orientation : Ti.UI.PORTRAIT,
	orientationModes : [Ti.UI.PORTRAIT]
});

var hostWithToolbar = uibuilder.verticalViewWithToolbar("movie player", self, null);

var videoViewer = Ti.Media.createVideoPlayer(
	{
		width: Ti.UI.FILL, 
		height: Util.getScreenWidthDp()*9/16 + 'dp', 
		autoplay: true,
		mediaControlStyle: Ti.Media.VIDEO_CONTROL_DEFAULT,
		scalingMode : Ti.Media.VIDEO_SCALING_ASPECT_FIT
		});

hostWithToolbar.add(videoViewer);

var urlFetched = fetchVideoUrlById(getSelectedId());

videoViewer.setUrl(urlFetched);

self.add(hostWithToolbar);

/**
 * Gets video url by id
 * @param {String} id - the video Id
 * @return {String}
 */
function fetchVideoUrlById(id)
{
	var videosApi = Cache.get('videos');
	var url = null;
	for(var i = 0; i<videosApi.length; i++)
	{
		var video = videosApi[i];
		if(video['id'] === id)
		{
			url = endpoints.urlMediaBase + video.url;
			console.log("url fetched: " + url);
			return url;
		}
	}
	
	return url;
}

function play()
{
	var urlFetched = fetchVideoUrlById(getSelectedId());
	videoViewer.setUrl(urlFetched);
}

exports.self = self;
exports.play = play;
}());