    
    <table class="pivot">
        <tr>
            <th>Server Library Releases</th>
            <th>0.</th>
            <th>1.</th>
        </tr>
        <tr>
            <td>License</td>
            <td class="center">MIT</td>
            <td class="center">MIT</td>
        </tr>
        <tr>
            <td>Stability</td>
            <td class="center">Production</td>
            <td class="center">Beta</td>
        </tr>
        <tr>
            <td>Version</td>
            <td class="center">
                <a href="http://www.firephp.org/HQ/Install.htm" target="_blank">0.3.2</a>
            </td>
            <td class="center">
                <a href="../API/"><?php echo $version; ?></a>
            </td>
        </tr>
        <tr>
            <td>PHP Version</td>
            <td class="center">4 &amp; 5</td>
            <td class="center">5.1+</td>
        </tr>
        <tr class="heading">
            <td>Supported Clients</td>
            <td colspan="2">&nbsp;</td>
        </tr>
        <tr>
            <td><a href="http://www.firephp.org/" target="_blank">FirePHP Extension</a></td>
            <td class="center"><div class="icon-yes"></div></td>
            <td class="center"><a href="../FAQ/#Is FirePHP 1.0 backwards compatible">limited</a></td>
        </tr>
        <tr>
            <td><a href="http://www.developercompanion.com/" target="_blank">DeveloperCompanion</a></td>
            <td class="center"><div class="icon-yes"></div></td>
            <td class="center"><div class="icon-yes"></div></td>
        </tr>
        <tr class="heading">
            <td>Download</td>
            <td colspan="2">&nbsp;</td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td class="center">Deprecated</td>
            <td class="center">
                
                <a class="img" href="<?php echo $downloadZipUrl; ?>"><img src="/resources/images/download_zip.png" width="67" height="45" border="0"/></a>
                
                <a class="img" href="<?php echo $downloadPharUrl; ?>"><img src="/resources/images/download_phar.png" width="67" height="45" border="0"/></a>
                
            </td>
        </tr>
    </table>
    
PLANNED: The *1. Release* will make it onto the www.firephp.org site once it stabilizes more.

NOTE: Built-in *phar* support is available as of PHP 5.3.0 and can be manually installed for prior versions. See: [Phar in the PHP Manual](http://php.net/manual/en/book.phar.php)

        
Download and include the *phar archive* **or** the *extracted zip files* at the **beginning** of any PHP script
or at the top of the application **bootstrap** file. See below for detailed instructions.

NOTE: In the instructions below, three dots (*...*) denote a path that needs to be replaced.

    
Getting Started
===============
    
The information below details all the basic and advanced installation and configuration information for FirePHP 1.0.
    
NOTICABLE: If this is your **first time using FirePHP 1.0** you are advised to take a look at the [Tutorials](Tutorials)
or the [Quickstart](Quickstart) example first.
    
NOTICABLE: If you are **upgrading from FirePHPCore** you are advised to take a look at [upgrade.firephp.org](http://upgrade.firephp.org) first.
 
       
Inclusion
=========

The best practices method of including FirePHP involves the creation of two configuration files. One holds configuration options
for FirePHP while the other provides credentials to authorize clients.

    
If using the *phar* archive:
    
    <pre><code class="chili-lang-php">define('INSIGHT_CONFIG_PATH', '/.../package.json');
    require_once('phar://.../firephp.phar/FirePHP/Init.php');</code></pre>
    
INFO: The *INSIGHT_CONFIG_PATH* must be an **absolute** path.
    
If using the extracted *zip* archive:
    
    <pre><code class="chili-lang-php">set_include_path('.../&lt;Extracted Zip Archive&gt;/lib/'
                 . PATH_SEPARATOR
                 . get_include_path());
    define('INSIGHT_CONFIG_PATH', '/.../package.json');
    require_once('FirePHP/Init.php');</code></pre>
    
INFO: The *INSIGHT_CONFIG_PATH* must be an **absolute** path.
    
If using one of the above continue with [Configuration: package.json](#Configuration: package.json).

If the default FirePHP configuration is sufficient a minimal inclusion method is also supported.
    
NOTE: The key set for the *INSIGHT_AUTHKEYS* constant below is a **NEW Authorization Key** ready to be used for a **new installation**.
You can find all your keys for all installations under ['Companion' -> 'Keys](Companion/Keys).
    
REQUIRE-BUILT-IN:
    
    <div class="code"><pre><code id="minimal-install-code" class="chili-lang-php">define('INSIGHT_IPS', '*');
    define('INSIGHT_AUTHKEYS', 'client-auth-key');
    define('INSIGHT_PATHS', dirname(__FILE__));
    define('INSIGHT_SERVER_PATH', '/&lt;ServerScript.php&gt;');
    // Include phar archive or update include path as above
    require_once('FirePHP/Init.php');</code></pre></div>
    
INFO: The *INSIGHT_PATHS* constant lists all paths accessible by FirePHP that may be sent to the client.

INFO: The *INSIGHT_SERVER_PATH* constant must point to a script (relative to the document root) that includes
FirePHP and is used to fetch data from the server. It may point to any existing script in your application
as FirePHP will terminate the request after it has responded accordingly.
    
NOTE: Multiple *ips*, *authkeys* or *paths* may be separated by comma.
  
If using this minimal setup you are now ready to [Test](/Tools/FirePHPCompanion/Test/) your setup.
    
    
Configuration: package.json
===========================
    
The *package.json* configuration file is compatible with the [CommonJS Packages 1.0](http://wiki.commonjs.org/wiki/Packages) specification.
    
Place the file at the root of your application. It is intended to reside in source control with the application package which consists
of all files in the same directory and any subdirectories. To adjust the configuration for a specific environment see
[Environment specific Configuration](#Environment specific Configuration).
    
At minimum the follwing configuration properties are required. For additional options see [Configuration Options](#Configuration Option).
    
        <pre><code class="chili-lang-javascript">{
      // REQUIRED - Same URL for all deployments of same package
      "uid": "&lt;Unique URL&gt;"
    }</code></pre>
        
The *uid* is a unique URL intended to identify your application package. It should be the same URL no matter where your package is deployed.
Following are some possible examples:
        
        <pre><code class="chili-lang-javascript">// A package hosted on github
    "uid": "http://github.com/cadorn/firephp-libs/"
    
    // A package to test some things locally
    "uid": "http://test-package.localhost/"</code></pre>
    
Continue with [Configuration: credentials.json](#Configuration: credentials.json).
    
    
Configuration: credentials.json
===============================
    
Place a file called *credentials.local.json* next to package.json. This file is intended to be ignored by all version control systems
and should be configured on the deployed server. If you must ship a credentials file with your application source code use *credentials.json*.
    
By default *FirePHP 1.x* is locked down and all clients must be specifically authorized by *IP Address* **and** *Authorization Key*.
    
NOTE: The key in *authkeys* below is a **NEW Authorization Key** ready to be used for a **new installation**. You can find all your keys
for all installations under ['Companion' -> 'Keys'](/Companion/Keys/).
    
REQUIRE-BUILT-IN: 
    
    <pre><code id="credentials-code" class="chili-lang-javascript">{
      "cadorn.org/insight/@meta/config/0": {
        "allow": {
          "ips": [
            "192.168.",
            "127. // optional comment"
    //      "*"         // Allow ALL ips
          ],
          "authkeys": [
            "client-auth-key"
    //      "*"         // Allow ALL authkeys
          ]
        }
      }
    }</code></pre>
    
WARNING-SECURITY: Keep *ips* as specific as possible!
    
WARNING-SECURITY: If you allow **ALL** (*) for **BOTH** *ips* and *authkeys* **ANYONE** will be able to access your application internals!
    
INFO: Comments can be added for each *ip* or *authkey* by appending *//* followed by the comment. This is useful to keep
track of who the *ips* and *authkeys* belong to.
    
NOTE: Only an ***IP* match** is required for *FirePHP* to **announce** itself to a client.
    
You are now ready to [Test](Test) your setup.


Configuration Options
=====================

Additional configuration options for *package.json*.
    
    <pre><code class="chili-lang-javascript">{
      // REQUIRED - Same URL for all deployments of same package
      "uid": "&lt;Unique URL&gt;",
      // OPTIONAL - First sentence (until first .) becomes a title
      "description": "&lt;Package short description&gt;",
      // OPTIONAL
      "homepage": "&lt;Homepage URL&gt;",
      // OPTIONAL
      "bugs": "&lt;Bug tracker URL or email address&gt;",
      "implements": {
        "cadorn.org/insight/@meta/package/0": {
          // OPTIONAL
          "links": {
            // Shortcuts to important information
            "quick": {
              "&lt;Label&gt;": "&lt;URL&gt;",
              "&lt;Label&gt;": {
                "target": "&lt;Target&gt;",  // tab (default), window or hidden
                "url": "&lt;URL&gt;"
              }
            }
          }
        },
        "cadorn.org/insight/@meta/config/0": {
          // OPTIONAL - Defaults to ./credentials.json
          "credentialsPath": "/.../credentials.json",
          "cache": {
            // OPTIONAL - Defaults to sys_get_temp_dir()
            "path": "&lt;CachePath&gt;",
          },
          "server": {
            // OPTIONAL - Defaults to "/"
            "path": "/&lt;ServerScript.php&gt;",
            // OPTIONAL - Defaults to same as browser request
            "host": "&lt;Hostname&gt;",
            // OPTIONAL - Defaults to same as browser request
            "port": "&lt;Port&gt;",
            // OPTIONAL - Defaults to same as browser request
            "secure": &lt;[true|false]&gt;
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
    }</code></pre>
                 
NOTE: Any relative paths are relative to the *package.json* file and may point outside of the package root.


implements['cadorn.org/insight/@meta/config/0'].credentialsPath
---------------------------------------------------------------
   
The *credentialsPath* property optionally sets an alternate path to a *credentials.json* file. If set the *credentials.json* file next to *package.json*
is ignored while the *credentials.local.json* file will still be loaded.
 

implements['cadorn.org/insight/@meta/config/0'].cache.path
----------------------------------------------------------

The *cache path* property optionally sets an alternate cache path. By default the value returned by *sys_get_temp_dir()*
is used. The path may be relative to the config file or an absolute path.
    
NOTE: If *sys_get_temp_dir()* is not available *dirname(constant('INSIGHT_CONFIG_PATH'))* is used and if *INSIGHT_CONFIG_PATH* is not set
*dirname($_SERVER['SCRIPT_FILENAME'])* is used. In the latter cases *.cache* is appended.


implements['cadorn.org/insight/@meta/config/0'].server.path
-----------------------------------------------------------
    
The *server path* property must be set to a PHP script relative to the document root and the *&lt;ServerScript&gt;.php* file must simply include
*FirePHP* with the same configuration file set as for the application and may indeed be pointed to **any** application PHP script that includes 
*FirePHP*. In these cases *FirePHP* will intercept all client requests and respond accordingly denying the application script from ever running
where appropriate.
    
NOTE: The path is **typically** an absolute path including a forward slash. If a relative path is provided (*./...*) the *&lt;ServerScript&gt;.php*
is expected to be found relative to the same directory the original request pointed to.


implements['cadorn.org/insight/@meta/config/0'].server.secure
-------------------------------------------------------------

If the *server secure* property is set to *true* a secure *HTTPS* request will be made to the *&lt;ServerScript&gt;.php* instead of using the
same protocol as the browser request.
  
  
implements['cadorn.org/insight/@meta/config/0'].paths
-----------------------------------------------------
    
The *paths* property holds access rules for which paths are accessible to the *FirePHP* client. This is used to load source files for display on the
client for example.
  

implements['cadorn.org/insight/@meta/config/0'].encoder
-------------------------------------------------------

The *encoder* property holds options for the variable encoder.
 
 
Environment specific Configuration
==================================
 
It is useful to adjust the configuration for a specific deployment environment to allow additional paths or set a central credentials file for example.
    
Place a file called *package.local.json* next to *package.json*. All configuration directives will be merged on top of the defaults provided
by *package.json*. It is intended that *package.local.json* be ignored by all version control systems.
    
If you have a central *credentials.json* file to be used for all applications in an environment you can set the following in the
*package.local.json* file:</p>
    
    <pre><code class="chili-lang-javascript">{
      "implements": {
        "cadorn.org/insight/@meta/config/0": {
          "credentialsPath": "/.../credentials.json"
        }
      }
    }</code></pre>
    
NOTE: If this custom path is set any *credentials.json* file residing next to *package.json* will be ignored while the
*credentials.local.json* file will still be loaded.
    
To add more application-specific credentials use a *credentials.local.json* file next to *package.json*.
    

Server-wide Inclusion
=====================
  
To include *FirePHP* for all virtual hosts on a webserver set the [auto_prepend_file](http://php.net/manual/en/ini.core.php#ini.auto-prepend-file)
*php.ini* directive:
    
    <pre><code class="chili-lang-php">// Apache
    php_value auto_prepend_file phar://.../firephp.phar/FirePHP/Init.php</code></pre>
    
NOTE: *FirePHP* will only be enabled if a configuration file is also set **before** PHP executes (see [Virtual Host based Configuration]
(#Virtual Host based Configuration).

NOTE: *FirePHP* will only be loaded if *x-wf-** or *x-insight** request headers are found. This means there will be negligible performance
degradation if FirePHP is not needed as is the case for most visitors to your application.  


Virtual Host based Configuration
================================

Instead of setting the configuration file in PHP:
    
    <pre><code class="chili-lang-php">define('INSIGHT_CONFIG_PATH', '/.../package.json');</code></pre>
    
Set it in the virtual host configuration of the webserver:
    
    <pre><code class="chili-lang-php">// Apache
    SetEnv INSIGHT_CONFIG_PATH /.../package.json</code></pre>
    
To force the use of a specific credentials file use:
    
    <pre><code class="chili-lang-php">// Apache
    SetEnv INSIGHT_CONFIG_PATH /.../package.json,/.../credentials.json</code></pre>