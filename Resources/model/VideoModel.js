var Base = require('model/BaseModel');
var http = require('lib/HttpService');
var endpoints = require('lib/Endpoints').all;
var VideoModel = new Base('videos'); 
var Cache = require('lib/Cache');

/**
 * Gets a list of mock video data to fill a list example
 * @param {Function} callback - Function to be invoked
 */
VideoModel.getVideos = function(callback){
	if(callback)
	{
		this.GET({}, function(result){
			//if(result){ Cache.set('videos', JSON.parse(result)); callback(result); }
			if(result)
			{
				var videos = [];
				var videosApi = JSON.parse(result);
				if(Array.isArray(videosApi)){console.log("is array");}
				else { console.log("it is not an array"); }
				/*for(var video in videosApi)
				{
					console.log("item stringified: "+JSON.stringify(video));
					var movie = {};
					movie.id = video.id;
					movie.title = video.title;
					movie.description = video.description;
					movie.url_background = video.url_background;
					videos.push(movie);
				}*/
				
				for(var i = 0; i < videosApi.length; i++)
				{
					var video = videosApi[i];
					var movie = {};
					movie.id = video['id'];
					movie.title = video['title'];
					movie.description = video['description'];
					movie.url_background = video['url_background'];
					movie.url = video['url_hi_res'];
					videos.push(movie);
				}
				Cache.set('videos', videos);
				callback(videos);
			}
			else{ alert('no result in call'); }
	});
	}else{alert('no valid callback');}
	
	/*if (callback) {
        this.GET({},function(result) {
            Ti.App.Properties.setObject(_keyword, result);
            callback(result); 
        });
        return;
    }   
    return Ti.App.Properties.getObject(_keyword, null); */
};



module.exports = VideoModel;
