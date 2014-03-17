
var FILE = require("modules/file"),
	Q = require("modules/q"),
	SYSTEM = require("modules/system"),
	UTIL = require("modules/util"),
	JSON = require("modules/json"),
	BUILD = require("./build"),
	SPAWN = require("nodejs/child_process").spawn;

exports.main = function()
{
	var pkgPath = BUILD.getPackagePath();
	
	var queue = [
  	    [pkgPath + "/tests/firephp"],
 	    [pkgPath + "/tests/sub/firephp-core"],
 	    [pkgPath + "/tests/sub/wildfire-php"]
 	];

	next();
 	function next()
 	{
 		if (queue.length === 0) {
 			done();
 			return;
 		}
 		var paths = queue.shift();

 		Q.when(runPHPUnitTest(paths[0]), function()
 		{
 			next();
 		});
 	}	

	function done()
	{
		module.print("\0green(OK\0)\n");
	}
}


function runPHPUnitTest(path)
{
	var result = Q.defer();
	Q.when(exec("phpunit", ["."], {
		cwd: path
	}), function(stdout)
	{
		if (UTIL.trim(stdout).match(/\nOK\s.*\n?$/))
		{
			result.resolve();
		}
		else
		{
			result.reject();
		}
	});
	return result.promise;
}

function exec(command, args, options)
{
	var result = Q.defer();

	options = options || {};
	
	module.print("\n\0cyan(" + " Command: " + command + "\0)\n");
	module.print("\0cyan(" + " CWD: " + options.cwd + "\0)\n");
	module.print("\0cyan(" + " Args: " + args.join(" ") + "\0)\n");

	var child = SPAWN(command, args, {
		cwd: options.cwd || undefined
	});
	
	var stdout = [],
		stderr = [];

	child.stdout.on("data", function(data)
	{
		module.print("" + data);
		stdout.push("" + data);
	});

	child.stderr.on("data", function(data)
	{
		module.print("\0red(" + data + "\0)");
		stderr.push("" + data);
	});

	child.on("exit", function(code)
	{
		if (code === 0) {
			result.resolve(stdout.join(""), stderr.join(""));
		} else {
			result.reject(stdout.join(""), stderr.join(""));
		}
	});

	return result.promise;
}
