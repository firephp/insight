
var PINF_LOADER = require("pinf/loader"),
	FILE = require("modules/file"),
	Q = require("modules/q"),
	SYSTEM = require("modules/system"),
	APACHE = require("./apache"),
	BUILD = require("./build");

const URL = "http://www.php.net/distributions/php-5.3.6.tar.gz";


exports.getInstallPath = function()
{
	return BUILD.getInstallPath(URL);
}

exports.getPackagePath = function()
{
	return BUILD.getPackagePath(URL);
}

exports.ensureInstalled = function()
{
	return BUILD.build(URL, [
	    "--with-apxs2=" + APACHE.getInstallPath() + "/bin/apxs",
	    "--with-iconv=shared,/opt/local"	// OSX - see http://php.net/manual/en/configure.php
	]);
}

			// Patch file to fix build
			// @see http://www.huement.com/blog/?p=389
			// To create local patch:
			//  1) cd php-5.3.6.tar.gz~pkg/php-5.3.6/ext/iconv
			//  2) cp iconv.c iconv.c.new
			//  3) EDIT iconv.c.new
			//  4) diff -u iconv.c iconv.c.new > ../patches/PHP_5_3_ext_iconv_iconv.c.patch
/*
			SYSTEM.exec("patch " + sourcePath + "/ext/iconv/iconv.c " + FILE.dirname(FILE.dirname(module.id)) + "/patches/PHP_5_3_ext_iconv_iconv.c.patch", function(stdout, stderr)
  			{
				
				console.error(stderr);

				console.error(stdout);
*/				
