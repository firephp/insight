
Configuring *FirePHP* via *constants* is the easiest and fastest way to get setup with much of what *FirePHP 1.0*
has to offer. If more configuration freedom or all advanced *FirePHP 1.0* + [DeveloperCompanion](../Clients#devcomp) 
features are needed [configuration via files](Files) should be used. See [Install](../Install#configure) for a comparison.

Configuring
===========

Configuring *FirePHP* involves two steps for every installation on a different URL and client combination:

  1. Obtain an *Authorization Key* for the *Installation URL* from the client. See [Authorizing](../Authorizing).
  2. Insert the *Authorization Key* into the code below and place the code at the **top** of the 
     [bootstrap](http://devzone.zend.com/article/70) file before any application code is run.

The [Insight](../Insight) configuration constants:

    CODE: {"lang": "php"}
    
    // define('INSIGHT_DEBUG', true);  // Optional to troubleshoot install
    define('INSIGHT_IPS', '*');
    define('INSIGHT_AUTHKEYS', '<Authorization Key>');
    define('INSIGHT_PATHS', dirname(__FILE__));
    define('INSIGHT_SERVER_PATH', '/<ServerScript.php>');

  * The `INSIGHT_DEBUG` constant enables debug mode used to troubleshoot installation.

  * The `INSIGHT_IPS` constant lists all client *IP Addresses* (or prefixes) that are allowed to access *FirePHP*.

  * The `INSIGHT_AUTHKEYS` constant lists all client *Authorization Keys* that are allowed to access *FirePHP*. See 
    [Authorizing](../Authorizing) for how to obtain an *Authorization Key* from the client.

  * The `INSIGHT_PATHS` constant lists all root paths accessible by *FirePHP* that may be sent to the client.
  
  * The `INSIGHT_SERVER_PATH` constant must point to a script (relative to the document root) that includes
    FirePHP and is used to fetch data from the server. It may point to any existing script in your application
    as FirePHP will terminate the request after it has responded accordingly.
    
    For example, if an application is hosted at **http://example.com/application/**, the `INSIGHT_SERVER_PATH` constant
    must be set to **/application/**.

SECURITY: Do not keep `INSIGHT_DEBUG` enabled after installation was successful!

SECURITY: Keep `INSIGHT_IPS` as specific as possible!

SECURITY: If you allow **ALL** (`*`) for **BOTH** `INSIGHT_IPS` and `INSIGHT_AUTHKEYS` **ANYONE** will be able to access your application internals!

NOTE: Multiple *ips*, *authkeys* or *paths* may be separated by comma.


Including
=========

Include *FirePHP* right after configuring it.

If using the *phar* archive
---------------------------

    CODE: {"lang": "php"}
    
    require_once('phar://.../firephp.phar/FirePHP/Init.php');

NOTE: Three dots (*...*) denotes a path that needs to be replaced.

If using the extracted *zip* archive
------------------------------------

    CODE: {"lang": "php"}
    
    require_once('/<Extracted Zip Archive>/lib/FirePHP/Init.php');

NOTE: Instead of using an absolute path to the `/<Extracted Zip Archive>/lib` folder it may be placed on the include path.

FirePHP Procedural API: `FB::*`
-------------------------------

To get access to the [FirePHP Procedural API](../API/FirePHP#procedural) as well as the [Insight API](../Insight) 
replace `FirePHP/Init.php` with `FirePHP/FB.php` above.
