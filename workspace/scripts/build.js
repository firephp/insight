
var FILE = require("modules/file"),
	Q = require("modules/q"),
	SYSTEM = require("modules/system"),
	UTIL = require("modules/util"),
	JSON = require("modules/json");


var pkgPath = FILE.dirname(FILE.dirname(FILE.dirname(module.id))),
	buildPath = pkgPath + "/build",
	tplPath = pkgPath + "/workspace/tpl",
	version = false;

exports.getPackagePath = function()
{
	return pkgPath;
}

exports.getBuildPath = function()
{
	return buildPath;
}

exports.main = function()
{
	SYSTEM.exec("rm -Rf " + buildPath, function()
	{
		FILE.mkdirs(buildPath, 0775);
		
		SYSTEM.exec("git tag", function(stdout)
		{
			version = UTIL.trim(stdout).split("\n").pop().match(/^v(.*)$/)[1];

			// TODO: Compare against version in `../../program.json ~ version` (ensure =)

			module.print("\0cyan(Building version: " + version + "\0)\n");
			
			buildZipArchive(function()
			{
				buildPharArchive(function()
				{
					done();
				});
			});
		});
	});

	function done()
	{
		module.print("\0green(Done\0)\n");
	}
}

function buildZipArchive(callback)
{
	var targetBasePath = buildPath + "/firephp-" + version;

	FILE.mkdirs(targetBasePath, 0775);

	SYSTEM.exec("rsync -r --copy-links --exclude \"- .DS_Store\" --exclude \"- .git/\" --exclude \"- .tmp_*\" " + pkgPath + "/lib " + targetBasePath, function()
	{
		replaceVariablesInFile(targetBasePath + "/lib/FirePHP/Init.php");
		replaceVariablesInFile(targetBasePath + "/lib/FirePHPCore/FirePHP.class.php");
		replaceVariablesInFile(targetBasePath + "/lib/FirePHPCore/FirePHP.class.php4");
		
		next1();
	});		
	
	function next1()
	{
		var content = FILE.read(tplPath + "/readme.tpl.md");
		content = content.replace(/%%VERSION%%/g, version);
		FILE.write(targetBasePath + "/README.md", content);

		var content = FILE.read(tplPath + "/license.tpl.md");
		FILE.write(targetBasePath + "/LICENSE.md", content);

		next2();
	}

	function next2()
	{
		SYSTEM.exec("cd " + buildPath + " ; zip -vr lib.zip firephp-" + version, function(stdout)
		{
			console.log(stdout);

			callback();
		});
	}
}

function buildPharArchive(callback)
{
	var targetBasePath = buildPath + "/phar",
		pharName = "firephp";

	FILE.mkdirs(targetBasePath, 0775);

	SYSTEM.exec("rsync -r --copy-links --exclude \"- .DS_Store\" --exclude \"- .git/\" --exclude \"- .tmp_*\" " + pkgPath + "/lib " + targetBasePath, function()
	{
		replaceVariablesInFile(targetBasePath + "/lib/FirePHP/Init.php");
		replaceVariablesInFile(targetBasePath + "/lib/FirePHPCore/FirePHP.class.php");
		replaceVariablesInFile(targetBasePath + "/lib/FirePHPCore/FirePHP.class.php4");
		
		next1();
	});		

	function next1()
	{
	    // Write phar setup file and packaging script
	    // @see http://blog.calevans.com/2009/07/19/lessons-in-phar/
		
		FILE.write(targetBasePath + "/stub.php", [
	        "<?php",
	        "__HALT_COMPILER();"
	    ].join("\n"));

		FILE.write(targetBasePath + "/create-phar.php", [
	        "<?php",
	        "$phar = new Phar('" + pharName + "-" + version + ".phar" + "', 0, '" + pharName + ".phar" + "');",
	        "$phar->compressFiles(Phar::GZ);",
	        "$phar->setSignatureAlgorithm(Phar::SHA1);",
	        "$phar->buildFromDirectory('" + targetBasePath + "/lib" + "');",
	        "$phar->setStub($phar->createDefaultStub('stub.php'));"
	    ].join("\n"));

		SYSTEM.exec("cd " + targetBasePath + " ; php create-phar.php", function(stdout, stderr)
		{
			console.log(stdout);
			
			console.log(stderr);
			
			SYSTEM.exec("mv " + targetBasePath + "/" + pharName + "-" + version + ".phar " + buildPath + "/lib.phar", function(stdout, stderr)
			{
				callback();
			});
		});		
	}
}

function replaceVariablesInFile(path)
{
	var content = FILE.read(path);

	// @pinf replace '0.3' with '%%VERSION%%'
    var re1  = /\n(.*)\/\/\s*@pinf\s(.*)\n/g;
    var match1;
    while (match1 = re1.exec(content)) {
        var rule = match1[2].match(/^replace (.*?) with (.*)$/);
        if(rule) {
            // replace variables in rule
            var re2  = /%%([^%]*)%%/g;
            var match2;
            while (match2 = re2.exec(rule[2])) {
                var value;
                if(match2[1]=="VERSION") {
                    value = version;
                }
                rule[2] = rule[2].replace(match2[0], value);
            }
            match1[1] = match1[1].replace(rule[1], rule[2]);
            content = content.replace(match1[0], "\n"+match1[1]+"\n");
        }
    }
    
    FILE.write(path, content);
}
