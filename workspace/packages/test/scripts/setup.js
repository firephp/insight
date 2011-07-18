
var PINF_LOADER = require("pinf/loader"),
	FILE = require("modules/file"),
	Q = require("modules/q"),
	SYSTEM = require("modules/system"),
	PHP = require("../lib/php"),
	APACHE = require("../lib/apache");

exports.main = function()
{
	
	Q.when(APACHE.ensureInstalled(), function()
	{
		Q.when(PHP.ensureInstalled(), function()
		{

			APACHE.start();
			
		});
	});
}

