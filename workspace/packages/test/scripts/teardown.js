
var PINF_LOADER = require("pinf/loader"),
	FILE = require("modules/file"),
	Q = require("modules/q"),
	SYSTEM = require("modules/system"),
	APACHE = require("../lib/apache");

exports.main = function()
{
	
	Q.when(APACHE.ensureInstalled(), function(apachePath)
	{

		APACHE.stop();

	});
}

