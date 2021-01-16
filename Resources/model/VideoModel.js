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
			if(result){ Cache.set('videos', JSON.parse(result)); callback(result); }
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
