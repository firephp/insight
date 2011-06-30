
When using the [configuration file based approach](Files) of including FirePHP many configuration
options are available. These options make it possible to seamlessly integrate FirePHP into 
toolchains and deployment procedures without needing to add environment detection code to
the application.

Since FirePHP is designed to *wrap* the application with minimal interference (see [Concepts](../Concepts)) the configuration options
presented below are essential in ensuring that the application does not need to be modified when
deploying to different environments.

Package Configuration
=====================

An application is a package and a package is configured via a `package.json` file which is 
called the package descriptor.

The package descriptor follows the [CommonJS Packages](http://wiki.commonjs.org/wiki/Packages) 
specification and the relevant keys are:

    CODE: {"lang":"js"}

    {
      // REQUIRED - Same URL for all deployments of same package
      "uid": "<Unique URL>",
      // OPTIONAL - First sentence (until first .) becomes a title
      "description": "<Package short description>",
      // OPTIONAL
      "homepage": "<Homepage URL>",
      // OPTIONAL
      "bugs": "<Bug tracker URL or email address>",
      "implements": {
        "cadorn.org/insight/@meta/package/0": { ... }
        },
        "cadorn.org/insight/@meta/config/0": { ... }
      }
    }

The `implements` key holds configurations for specific components identified
by URI.

PLANNED: `implements` URIs map to [json-schema](http://json-schema.org/) documents that can be used to validate configurations.

`implements`: `cadorn.org/insight/@meta/package/0`
--------------------------------------------------

    CODE: {"lang":"js"}

    {
      "implements": {
        "cadorn.org/insight/@meta/package/0": {
          // OPTIONAL
          "links": {
            // Shortcuts to important information
            "quick": {
              "<Label>": "<URL>",
              "<Label>": {
                "target": "<Target>",  // 'tab' (default), 'window' or 'hidden'
                "url": "<URL>"
              }
            }
          }
        }
      }
    }


`implements`: `cadorn.org/insight/@meta/config/0`
-------------------------------------------------

    CODE: {"lang":"js"}
    
    {
      "implements": {
        "cadorn.org/insight/@meta/config/0": {
          // OPTIONAL - Defaults to ./credentials.json
          "credentialsPath": "/.../credentials.json",
          "cache": {
            // OPTIONAL - Defaults to sys_get_temp_dir()
            "path": "<CachePath>",
          },
          "server": {
            // OPTIONAL - Defaults to "/"
            "path": "/<ServerScript.php>",
            // OPTIONAL - Defaults to same as browser request
            "host": "<Hostname>",
            // OPTIONAL - Defaults to same as browser request
            "port": "<Port>",
            // OPTIONAL - Defaults to same as browser request
            "secure": <[true|false]>
          },
          // OPTIONAL - Accessible paths (absolute or relative)
          "paths": {
            "./": "allow",
            "./credentials.json": "deny"
          },
          // OPTIONAL - Encoder options
          "encoder": {
            "depthNoLimit": false,
            "lengthNoLimit": false,
            "maxDepth": 5,
            "maxStringLength": 5000,
            "maxArrayDepth": 3,
            "maxArrayLength": 25,
            "maxObjectDepth": 3,
            "maxObjectLength": 25,
            "exception.traceMaxLength": -1,  // no maximum
            "trace.maxLength": -1  // no maximum
          }
        }
      }
    }

NOTE: Any relative paths are relative to the *package.json* file and may point outside of the package root.

  * `credentialsPath` - Optionally set an alternate path to a *credentials.json* file. If set the *credentials.json* 
    file next to *package.json* is ignored while the *credentials.local.json* file will still be loaded.

  * `cache.path` - Optionally set an alternate cache path. By default the value returned by `sys_get_temp_dir()`
    is used. The path may be relative to the config file or an absolute path.
    
    NOTE: If `sys_get_temp_dir()` is not available `dirname(constant('INSIGHT_CONFIG_PATH'))` is used and if 
    `INSIGHT_CONFIG_PATH` is not set `dirname($_SERVER['SCRIPT_FILENAME'])` is used. In the latter cases `.cache` is appended.

  * `server.path` - Must be set to a PHP script relative to the document root and the *<ServerScript.php>* file 
    must simply include *FirePHP* with the same configuration file set as for the application and may indeed be pointed 
    to **any** application PHP script that includes *FirePHP*. In these cases *FirePHP* will intercept all client 
    requests and respond accordingly preventing the application script from ever running where appropriate.
    
    NOTE: The path is **typically** an absolute path including a forward slash. If a relative path is provided 
    (`./...`) the *<ServerScript.php>* is expected to be found relative to the same directory the original request pointed to.

  * `server.secure` - If set to `true` a secure *HTTPS* request will be made to the *<ServerScript.php>* instead of using the
    same protocol as the browser request.

  * `paths` - Holds access rules for which paths are accessible to the *FirePHP* client. This is used to load source files 
    for display on the client for example.

  * `encoder` - Holds options for the variable encoder. See [Insight API](API/Insight#encoder).


Environment specific Configuration
==================================
{: id="environment-specific"}

It is useful to adjust the configuration for a specific deployment environment to allow additional paths or set a central credentials file for example.
    
Place a file called *package.local.json* next to *package.json*. All configuration directives will be merged on top of the defaults provided
by *package.json*. **It is intended that *package.local.json* be ignored by all version control systems.**
    
If you have a central *credentials.json* file to be used for all applications in an environment you can set the following in the
*package.local.json* file:

    CODE: {"lang":"js"}
    
    {
      "implements": {
        "cadorn.org/insight/@meta/config/0": {
          "credentialsPath": "/.../credentials.json"
        }
      }
    }

NOTE: If this custom path is set any *credentials.json* file residing next to *package.json* will be ignored while the
*credentials.local.json* file will still be loaded.

To add more application-specific credentials use a *credentials.local.json* file next to *package.json*.


Server-wide Inclusion
=====================
{: id="server-wide"}

To include *FirePHP* for all virtual hosts on a webserver set the 
[auto_prepend_file](http://php.net/manual/en/ini.core.php#ini.auto-prepend-file) *php.ini* directive:

    CODE: {"lang":"plain"}
    
    // Apache
    php_value auto_prepend_file phar://.../firephp.phar/FirePHP/Init.php

NOTE: *FirePHP* will only be enabled if a configuration file is also set **before** PHP executes (see 
[Virtual Host based Configuration](Advanced#virtual-host)).

NOTE: *FirePHP* will only be loaded if `x-wf-` or `x-insight` request headers are found. This means there will be negligible performance
degradation if FirePHP is not needed as is the case for most visitors to your application.  


Virtual Host based Configuration
================================
{: id="virtual-host"}

Instead of setting the configuration file in PHP:

    CODE: {"lang":"php"}

    define('INSIGHT_CONFIG_PATH', '/.../package.json');

Set it in the virtual host configuration of the webserver:

    CODE: {"lang":"plain"}
    
    // Apache
    SetEnv INSIGHT_CONFIG_PATH /.../package.json

To force the use of a specific credentials file use:

    CODE: {"lang":"plain"}
    
    // Apache
    SetEnv INSIGHT_CONFIG_PATH /.../package.json,/.../credentials.json
