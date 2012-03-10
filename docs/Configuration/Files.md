
Configuring *FirePHP* via *files* is the best practices method of including *FirePHP 1.0* and involves the creation 
of two configuration files. One holds configuration options for FirePHP while the other provides credentials to authorize clients.

This approach affords complete configuration freedom and enables all advanced *FirePHP 1.0* + [DeveloperCompanion](../Clients#devcomp) 
features. See [Install](../Install#configure) for a comparison.


Configuring
===========

Configuring *FirePHP* involves two steps for every installation on a different URL and client combination:

  1. Obtain an *Authorization Key* for the *Installation URL* from the client. See [Authorizing](../Authorizing).
  2. Insert the *Authorization Key* into the code below and place the code in the indicated locations.

package.json
------------

The *package.json* configuration file is compatible with the [CommonJS Packages](http://wiki.commonjs.org/wiki/Packages) 
specification.

Place the file at the **root of your application**. It is intended to reside in source control with the application package 
which consists of all files in the same directory and any subdirectories. To adjust the configuration for a specific environment see
[Environment specific Configuration](Advanced#environment-specific).

At minimum the following configuration properties are required. For additional options see [Advanced Configuration](Advanced).

    CODE: {"lang": "js"}
    
    {
      // REQUIRED - Same URL for all deployments of same package
      "uid": "<Unique URL>"
    }

The `uid` is a unique URL intended to permanently and indefinitely identify your application package. It should be the 
**same URL no matter where your package is deployed**. Following are some possible examples:

    CODE: {"lang": "js"}

    // A package hosted on github and deployed in many locations
    "uid": "http://github.com/firephp/quickstart/"
    
    // A package to test some things only deployed locally
    "uid": "http://test-package.localhost/"

The most common adjustment to the default configuration options involves setting the [Insight Server Path](../Insight#server-path).
this path must point to a script (relative to the document root) that includes FirePHP and is used to fetch data from the server. 
It may point to any existing script in your application as FirePHP will terminate the request after it has responded accordingly.

For example, if an application is hosted at **http://example.com/application/**, the *Insight Server Path* 
must be set to **/application/**:

    CODE: {"lang":"js"}
    
    {
      "implements": {
        "cadorn.org/insight/@meta/config/0": {
          "server": {
            "path": "/application/",
          }
        }
      }
    }

credentials.local.json
----------------------

Place a file called *credentials.local.json* next to package.json. This file is intended to be **ignored by all version control systems**
and should be configured on the deployed server. If you must ship a credentials file with your application source code use 
*credentials.json*.

By default *FirePHP 1.0* is locked down and all clients must be specifically authorized by *IP Address* **and** *Authorization Key*.

    CODE: {"lang":"js"}

    {
      "cadorn.org/insight/@meta/config/0": {
        "allow": {
          "ips": [
            "192.168.",
            "127. // optional comment",
    //      "*"         // Allow ALL ips
          ],
          "authkeys": [
            "<Authorization Key>",
            "<Authorization Key> // optional comment",
    //      "*"         // Allow ALL authkeys
          ]
        }
      }
    }

SECURITY: Keep `ips` as specific as possible!

SECURITY: If you allow **ALL** (`*`) for **BOTH** `ips` and `authkeys` **ANYONE** will be able to access your application internals!

INFO: Comments can be added for each `ip` or `authkey` by appending `//` followed by the comment. This is useful to keep
track of who the `ips` and `authkeys` belong to.

NOTE: Only an **IP match** is required for *FirePHP* to **announce** itself to a client.


Including
=========

Place the following at the **top** of the [bootstrap](http://devzone.zend.com/article/70) file before any application code is run.

INFO: The `INSIGHT_CONFIG_PATH` must be an **absolute** path.

INFO: Set `define('INSIGHT_DEBUG', true);` to troubleshoot installation.

SECURITY: Do not keep `INSIGHT_DEBUG` enabled after installation was successful!


If using the *phar* archive
---------------------------

    CODE: {"lang": "php"}
    
    define('INSIGHT_CONFIG_PATH', '/.../package.json');
    require_once('phar://.../firephp.phar/FirePHP/Init.php');

NOTE: Three dots (*...*) denotes a path that needs to be replaced.

If using the extracted *zip* archive
------------------------------------

    CODE: {"lang": "php"}
    
    define('INSIGHT_CONFIG_PATH', '/.../package.json');
    require_once('/<Extracted Zip Archive>/lib/FirePHP/Init.php');

NOTE: Three dots (*...*) denotes a path that needs to be replaced.

NOTE: Instead of using an absolute path to the `/<Extracted Zip Archive>/lib` folder it may be placed on the include path.

FirePHP Procedural API: `FB::*`
-------------------------------

To get access to the [FirePHP Procedural API](../API/FirePHP#procedural) as well as the [Insight API](../Insight) 
replace `FirePHP/Init.php` with `FirePHP/FB.php` above.
