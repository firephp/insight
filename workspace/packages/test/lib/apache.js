
var PINF_LOADER = require("pinf/loader"),
	FILE = require("modules/file"),
	Q = require("modules/q"),
	SYSTEM = require("modules/system"),
	PHP = require("./php"),
	BUILD = require("./build");

const URL = "http://apache.mirror.iweb.ca/httpd/httpd-2.2.19.tar.gz";

var buildBasePath = FILE.dirname(FILE.dirname(module.id)) + "/.build";


if (!FILE.exists(buildBasePath + "/etc")) {
	FILE.mkdirs(buildBasePath + "/etc", 0775);
}

exports.getInstallPath = function()
{
	return BUILD.getInstallPath(URL);
}

exports.start = function()
{
	writeConfigFile();
	
	var command = exports.getInstallPath() + "/bin/apachectl -f " + buildBasePath + "/etc/httpd.conf -k start";
	console.log(command);
	SYSTEM.exec(command, function(stdout, stderr)
	{

		console.log(stdout);
		console.log(stderr);
		
	});

}

exports.stop = function()
{
	var command = exports.getInstallPath() + "/bin/apachectl -f " + buildBasePath + "/etc/httpd.conf -k stop";
	console.log(command);
	SYSTEM.exec(command, function(stdout, stderr)
	{

		console.log(stdout);
		console.log(stderr);
		
	});

}

function writeConfigFile()
{
	var content = FILE.read(FILE.dirname(FILE.dirname(module.id)) + "/etc/httpd.conf.tpl");

	content = content.replace(/%%PORT%%/g, "10089");
	content = content.replace(/%%INSTALL_PATH%%/g, exports.getInstallPath());
	content = content.replace(/%%PHP5_MODULE_PATH%%/g, PHP.getPackagePath() + "/libs/libphp5.so");
	content = content.replace(/%%TESTS_BASE_PATH%%/g, FILE.dirname(FILE.dirname(FILE.dirname(FILE.dirname(FILE.dirname(module.id))))) + "/tests");
	
	FILE.write(buildBasePath + "/etc/httpd.conf", content);
}

exports.ensureInstalled = function()
{
	// @see http://httpd.apache.org/docs/2.0/programs/configure.html
	return BUILD.build(URL, [
	    "--enable-vhost-alias",
	    "--enable-rewrite"
	]);
}

