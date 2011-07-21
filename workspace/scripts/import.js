
var PINF_LOADER = require("pinf/loader"),
	SANDBOX = PINF_LOADER.getSandbox(),
	FILE = require("modules/file"),
	Q = require("modules/q"),
	SYSTEM = require("modules/system");

exports.main = function()
{
	// TODO: Do not allow import if working directory dirty

	var libPath = FILE.dirname(FILE.dirname(FILE.dirname(module.id))) + "/lib",
		testsPath = FILE.dirname(FILE.dirname(FILE.dirname(module.id))) + "/tests/sub";

	var queue = [
	    [SANDBOX.packageForId("github.com/firephp/firephp-core/").path + "/lib", libPath],
	    [SANDBOX.packageForId("github.com/firephp/firephp-core/").path + "/tests", testsPath + "/firephp-core"],
	    [SANDBOX.packageForId("github.com/pinf/wildfire-php/").path + "/lib", libPath],
	    [SANDBOX.packageForId("github.com/pinf/wildfire-php/").path + "/tests", testsPath + "/wildfire-php"],
	    [SANDBOX.packageForId("github.com/pinf/insight-php/").path + "/lib", libPath],
	    [SANDBOX.packageForId("github.com/pinf/insight-php/").path + "/tests", testsPath + "/insight-php"]
	];

	SYSTEM.exec("rm -Rf " + testsPath, function()
	{
		FILE.mkdirs(testsPath, 0775);
		next();
	});

	function next()
	{
		if (queue.length === 0) {
			done();
			return;
		}
		var paths = queue.shift();

		if (!FILE.exists(paths[0])) {
			next();
			return;
		}
		
		if (!FILE.exists(paths[1]))
			FILE.mkdirs(paths[1], 0775);

		Q.when(copy(paths[0], paths[1]), function()
		{
			next();
		});
	}
	
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
