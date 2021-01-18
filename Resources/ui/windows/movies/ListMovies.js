var uibuilder = require('ui/UiBuilder');
var http = require('lib/HttpService');
var endpoints = require('lib/Endpoints').all;
var videoModel = require('model/VideoModel');
var Cache = require('lib/Cache');
var Util = require('lib/Util');
var controller = null;

function setController(contr)
{
	controller = contr;
}

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

videoModel.getVideos(function(result){ hello(backgroundView, result);} );
	
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


function hello(view, result)
{
	//alert("hello: " + JSON.stringify(Cache.get('videos')[1]));
	var movieTemplate = 
	{
		childTemplates: [
        {                            // Image justified left
            type: 'Ti.UI.ImageView', // Use an image view for the image
            bindId: 'pic',           // Maps to a custom pic property of the item data
            properties: {            // Sets the image view  properties
                width: '50dp', height: '50dp', left: 0
            }
        },
        {                            // Title
            type: 'Ti.UI.Label',     // Use a label for the title
            bindId: 'info',          // Maps to a custom info property of the item data
            properties: {            // Sets the label properties
                color: 'black',
                font: { fontFamily:'Arial', fontSize: '20dp', fontWeight:'bold' },
                left: '60dp', top: 0,
            }
        },
        {                            // Subtitle
            type: 'Ti.UI.Label',     // Use a label for the subtitle
            bindId: 'es_info',       // Maps to a custom es_info property of the item data
            properties: {            // Sets the label properties
                color: 'gray',
                font: { fontFamily:'Arial', fontSize: '14dp' },
                left: '60dp', top: '25dp',
            }
        }
    ]
	};
	var moviesDataSet = [];
	var videosApi = Cache.get('videos');
	//var videosApi = result;
	
	for(var i = 0; i<videosApi.length; i++)
	{
		var video = videosApi[i];
		var item = 
		{
			pic: {image: endpoints.urlMediaBase + video.url_background},
			info: {text: video.title},
			es_info: {text: video.description}	
		};
	
		moviesDataSet.push(item);
	}
	
	var listSection = Ti.UI.createListSection({headerTitle: 'todos los videos', items: moviesDataSet } );
	var listView = Ti.UI.createListView({top: 15, 
		// Maps myTemplate dictionary to 'template' string
    	templates: { 'template': movieTemplate },
    	// Use 'template', that is, the myTemplate dict created earlier
    	// for all items as long as the template property is not defined for an item.
    	defaultItemTemplate: 'template',
		sections: [listSection]});
		
	function launchPlayer(evt){
		var videosApi = Cache.get('videos');
		var id = videosApi[evt.itemIndex]['id'];
		var viewPlayer = require('ui/windows/movies/VideoViewer').self;
		var play = require('ui/windows/movies/VideoViewer').play;
		var window = Ti.UI.createWindow({
			title: "VideoViewer",
			backgroundColor: '#387593',
			orientation : Ti.UI.PORTRAIT,
			orientationModes : [Ti.UI.PORTRAIT]
		});
		var mainView = uibuilder.verticalViewWithToolbar("PELIS", window, null);
		mainView.add(viewPlayer);
		window.add(mainView);
		window.open();
		play(fetchVideoUrlById(id));
	}
		
	listView.addEventListener('itemclick', function(evt)
		{
			if(Util.isTablet())
			{
				if(controller)
				{ 
					var videosApi = Cache.get('videos');
					controller.play(fetchVideoUrlById(videosApi[evt.itemIndex]['id'])); 
				}
			}else
			{
				launchPlayer(evt);
			}
		}
	);
	view.add(listView);
}

exports.self = backgroundView;
exports.setController = setController;
