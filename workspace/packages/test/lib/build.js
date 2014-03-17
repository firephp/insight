
var PINF_LOADER = require("pinf/loader"),
	FILE = require("modules/file"),
	Q = require("modules/q"),
	SPAWN = require("nodejs/child_process").spawn;

var downloader = new (PINF_LOADER.getAPI().DOWNLOADER).Downloader({
		basePath: FILE.dirname(FILE.dirname(FILE.dirname(FILE.dirname(module.id)))) + "/.pinf-packages"
	});


exports.getInstallPath = function(url)
{
	return downloader.pathForURL(url, "install");
}

exports.getPackagePath = function(url)
{
	return downloader.pathForURL(url, "source");
}

exports.build = function(url, configOptions)
{
	var result = Q.defer();

	downloader.getForArchive(url, function(sourcePath)
	{
		var installBasePath = exports.getInstallPath(url);

		if (FILE.exists(installBasePath))
		{
			result.resolve(installBasePath);
		}
		else
		{
			module.print("\0magenta(" + " Installing: " + url + "\0)\n\n");

			Q.when(exec("/bin/sh", [
			    "configure",
			    "--prefix=" + installBasePath
			].concat(configOptions), {
				cwd: sourcePath
			}), function()
			{
				Q.when(exec("make", [], {
					cwd: sourcePath
				}), function()
				{
					Q.when(exec("make", [
					    "install"
					], {
						cwd: sourcePath
					}), result.resolve, result.reject);
					
				}, result.reject);
			}, result.reject);
		}
	}, {
		verifyPackageDescriptor: false,
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

	child.stdout.on("data", function(data)
	{
		module.print("" + data);
	});

	child.stderr.on("data", function(data)
	{
		module.print("\0red(" + data + "\0)");
	});

	child.on("exit", function(code)
	{
		if (code === 0) {
			result.resolve();
		} else {
			result.reject();
		}
	});

	return result.promise;
}
