
var PINF_LOADER = require("pinf/loader"),
	SANDBOX = PINF_LOADER.getSandbox(),
	FILE = require("modules/file"),
	Q = require("modules/q"),
	SYSTEM = require("modules/system");

exports.main = function()
{
	var libPath = FILE.dirname(FILE.dirname(FILE.dirname(module.id))) + "/lib";

	Q.when(copy(SANDBOX.packageForId("github.com/firephp/firephp-core/").path + "/lib", libPath), function()
	{
		Q.when(copy(SANDBOX.packageForId("github.com/pinf/wildfire-php/").path + "/lib", libPath), function()
		{
			Q.when(copy(SANDBOX.packageForId("github.com/pinf/insight-php/").path + "/lib", libPath), function()
			{
				done();
			});
		});
	});
	
	function done()
	{
		module.print("\0green(Done\0)\n");
	}
}



function copy(sourcePath, targetPath)
{
	var result = Q.defer();
	
	var command = "cp -Rf " + sourcePath + "/* " + targetPath;
	
	module.print("\0cyan(" + command + "\0)\n");

	SYSTEM.exec(command, function(stdout, stderr)
	{
		if (stderr)
			console.log("ERROR: " + stderr);
		result.resolve();
	});

	return result.promise;
}