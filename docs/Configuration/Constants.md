

    
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

