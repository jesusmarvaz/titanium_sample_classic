var Cache = Object;

Cache.prototype.init = function()
{
	if(typeof(this.data) == 'undefined')
	{
		this.data = {};
	}
};

Cache.prototype.set = function(key, value)
{
	Cache.init();
	this.data[key] = value;
};
/**
 * gets object from cache
 * @param {String} key - dicctionary key to fetch the related data
 * @return {Object} returned value
 */
Cache.prototype.get = function(key)
{
	Cache.init();
	return this.data[key] || {};
};



Cache.prototype.clear = function(){
	Cache.data = {};	
};

module.exports = Cache;