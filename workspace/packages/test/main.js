
var PINF_LOADER = require("pinf/loader"),
	FILE = require("modules/file"),
	Q = require("modules/q"),
	SYSTEM = require("modules/system"),
	MD5 = require("modules/md5"),
	FS = require("nodejs/fs"),
	UTIL = require("modules/util"),
	JSON = require("modules/json");

const VERSIONS = JSON.decode(FILE.read(FILE.dirname(module.id) + "/etc/versions.json"));
const URLS = JSON.decode(FILE.read(FILE.dirname(module.id) + "/etc/urls.json"));

var downloader = new (PINF_LOADER.getAPI().DOWNLOADER).Downloader({
		basePath: FILE.dirname(FILE.dirname(FILE.dirname(module.id))) + "/.pinf-packages"
	});

exports.main = function()
{
	var testConfig = PINF_LOADER.getSandbox().program.descriptor.json["implements"]["github.com/firephp/firephp/workspace/packages/test/0.1"],
		profilePath = PINF_LOADER.getSandbox().options.mainModuleDir + ".profile-firefox",
		profileKey = MD5.hash_md5(profilePath);

	var url,
		command;

	var browserBinPath = false;

	var extensions = {};

	if (testConfig.dependencies)
	{
		Q.when(ensureFirefox(), function()
		{
			Q.when(ensureZendFramework(), function()
			{
				Q.when(ensureFirePHPCore(), function()
				{
					run();
				});
			});
		});
		
		
		function ensureFirefox()
		{
			var result = Q.defer();

			if (testConfig.dependencies["Firefox"])
			{
				url = URLS["Firefox"].replace(/%%VERSION%%/g, VERSIONS["Firefox"][testConfig.dependencies["Firefox"]]);
				Q.when(download(url, "dmg"), function(sourcePath)
				{
					browserBinPath = sourcePath + "/Firefox.app/Contents/MacOS/firefox-bin"

					var ci = 0;
					[
					    "Firebug",
					    "FirePHPExtension"
					].forEach(function(name)
					{
						if (testConfig.dependencies[name])
						{
							if (name === "Firebug")
							{
								ci++;
								url = URLS[name].replace(/%%VERSION%%/g, VERSIONS[name][testConfig.dependencies[name]]);
								Q.when(download(url), function(sourcePath)
								{
									extensions["firebug@software.joehewitt.com"] = sourcePath;
									ci--; if (ci==0) result.resolve();
								});
							}
							else
							if (name === "FirePHPExtension")
							{
								ci++;
								url = URLS[name].replace(/%%VERSION%%/g, VERSIONS[name][testConfig.dependencies[name]]);
								Q.when(download(url), function(sourcePath)
								{
									extensions["FirePHPExtension-Build@firephp.org"] = sourcePath;
									ci--; if (ci==0) result.resolve();
								});
							}
						}
					});
					if (ci==0) result.resolve();					
				});
			} else {
				result.resolve();
			}
			return result;
		}

		function ensureZendFramework()
		{
			var result = Q.defer();

			if (testConfig.dependencies["ZendFramework"])
			{
				url = URLS["ZendFramework"].replace(/%%VERSION%%/g, VERSIONS["ZendFramework"][testConfig.dependencies["ZendFramework"]]);
				Q.when(download(url), function(sourcePath)
				{
					result.resolve();
				});
			} else {
				result.resolve();
			}
			return result;
		}
		
		function ensureFirePHPCore()
		{
			var result = Q.defer();

			if (testConfig.dependencies["FirePHPCore"])
			{
				url = URLS["FirePHPCore"].replace(/%%VERSION%%/g, VERSIONS["FirePHPCore"][testConfig.dependencies["FirePHPCore"]]);
				Q.when(download(url), function(sourcePath)
				{
					result.resolve();
				});
			} else {
				result.resolve();
			}
			return result;
		}
	}

	function run()
	{
		function launch()
		{
			command = browserBinPath + " -no-remote -P " + profileKey;
			SYSTEM.exec(command, function(stdout, stderr, error)
			{
				
				// TODO: Run tests

console.log("done");			
			});
		}

		if (FILE.exists(profilePath)) {
			launch();
		} else {
			
			command = browserBinPath + " -CreateProfile '" + profileKey + " " + profilePath + "'";

			SYSTEM.exec(command, function(stdout, stderr, error)
			{
				if (!FILE.exists(profilePath + "/extensions")) {
					FILE.mkdirs(profilePath + "/extensions", 0775);
				}

				UTIL.forEach(extensions, function(extension)
				{
					FS.symlinkSync(extension[1], profilePath + "/extensions/" + extension[0]);
				});

				launch();
			});
		}
	}
}



function download(url, type)
{
	var result = Q.defer();

	var options = {
			verifyPackageDescriptor: false,
		};
		
	if (type === "dmg")
	{
		options.extract = function(archivePath, targetPath, callback)
		{
			console.log("archivePath", archivePath);			
			console.log("targetPath", targetPath);			
			
			SYSTEM.exec("hdiutil attach " + archivePath, function(stdout, stderr, error)
			{
				var m = stdout.match(/\n\/dev\/disk[\d\w]*\s*Apple_HFS\s*(.*)\n/);
				
				if (m[1]) {

					FILE.mkdirs(targetPath, 0775);

					SYSTEM.exec("cp -Rf " + m[1] + "/* " + targetPath, function(stdout, stderr, error)
					{
						if(stderr || error) {
							console.error(stdout);				
							console.error(stderr);				
							console.error(error);				
							throw new Error("Error copying contents of DMG archive: " + archivePath);
						}

						SYSTEM.exec("hdiutil detach " + m[1], function(stdout, stderr, error)
						{
							if(stderr || error) {
								console.error(stdout);				
								console.error(stderr);				
								console.error(error);				
								throw new Error("Error detaching DMG archive: " + m[1]);
							}

							callback();
						});
					});
					
				} else {
					console.error(stdout);				
					console.error(stderr);				
					console.error(error);				
					throw new Error("Error mounting DMG archive: " + archivePath);
				}
			});
		}
	}

	downloader.getForArchive(url, function(sourcePath)
	{
		result.resolve(sourcePath);
	}, options);

	return result.promise;
}
