
NOTICE: This approach of including FirePHP is **DEPRECATED**!

Overview
========

FirePHP has evolved a lot since its first release in 2007. One major enhancement is built-in security to ensure
only authorized clients are allowed to access application internal information. This addition among other
features has lead to a modified approach in how to configure and include FirePHP. See [../Install](Install#configure) 
for a comparison.

The traditional way of just including and using FirePHP is still supported **BUT** when using this approach
**all new FirePHP 1.0 features will be bypassed**!

NOTICE: You are encouraged to upgrade (see below) to the new way of configuring FirePHP.

Including
=========

NOTE: It is assumed you have FirePHP [downloaded](../Download).

The code below should be placed at the **top** of the [bootstrap](http://devzone.zend.com/article/70) file
before any application code is run.

See [here](../API/FirePHP) for details on the FirePHP Object Oriented and Procedural APIs.

Instead of `ob_start()`, the [output_buffering](http://us.php.net/manual/en/outcontrol.configuration.php#ini.output-buffering) 
[php ini directive](http://us.php.net/manual/en/configuration.changes.php) may be used. Output buffering is needed
as headers are sent while logging to FirePHP throughout the request.

SECURITY: **ANYONE** will be able to receive logged data unless you **specifically disable** *FirePHP*! 
See [FirePHP API](../API/FirePHP#disable).

If using the extracted *zip* archive
------------------------------------

    CODE: {"lang":"php"}

    // Object Oriented API
    require_once('/.../FirePHPCore/FirePHP.class.php');
    // or Procedural API
    require_once('/.../FirePHPCore/FB.php');
    // start output buffering
    ob_start();

NOTE: Three dots (*...*) denotes a path that needs to be replaced.

NOTE: Instead of using an absolute path to the *FirePHPCore* folder it may be placed on the include path.


If using the *phar* archive
---------------------------

    CODE: {"lang":"php"}

    // Object Oriented API
    require_once('phar://.../firephp.phar/FirePHPCore/FirePHP.class.php');
    // or Procedural API
    require_once('phar://.../firephp.phar/FirePHPCore/FB.php');
    // start output buffering
    ob_start();

NOTE: Three dots (*...*) denotes a path that needs to be replaced.


Upgrading to FirePHP 1.0 proper
===============================
{: id="upgrade"}

As mentioned above, when using the traditional way of including FirePHP, all new features are bypassed
and the new built-in security features are **not** utilized.

NOTICE: Upgrading to the new configuration and inclusion approach is recommended for all users. The traditional 
FirePHP Object-Oriented and Procedural APIs will continue to work.

A comparison of the different approaches and detailed instruction links can be found [here](../Install).

Required Changes
----------------

  * Set some constants **prior** to including FirePHP.
  * Change the FirePHP file being included.
  * Remove explicit `ob_start()` call if applicable as output buffering will automatically be enabled.

The constants (and configuration files if applicable) that need to be used for a specific application
are provided when setting up the application in the FirePHP [Client](../Clients). See 
[Configure: constants](Constants) or [Configure: files](Files) (preferred) for detailed instructions.

Upgrade support is provided via the FirePHP mailing list. See [OpenSource](../OpenSource#support).

Example
-------

Before (FirePHP Traditional):

    CODE: {"lang":"php"}

    require_once('/.../FirePHPCore/FirePHP.class.php');
    ob_start();
    $firephp = FirePHP::getInstance(true);
    $firephp->log('Hello World');

After (Configure: files):

    CODE: {"lang":"php"}

    define('INSIGHT_CONFIG_PATH', '/.../package.json');
    require_once('/.../FirePHP/Init.php');
    $firephp = FirePHP::getInstance(true);
    $firephp->log('Hello World');

