Summary
=======

**FirePHP is an advanced logging system that can display PHP variables in the browser as an application is navigated.** All communication
is out of band to the application meaning that the logging data will not interfere with the normal functioning of the application.


PHP debugging approaches
========================

When talking about debugging PHP code there are primarily four approaches:

  1. **Error Reporting** - PHP native and used to detect syntax errors and API usage violations.
  2. **Print Statements** - Deliberate *var_dump()* or *print()* statements by developer used to track execution flow and variables.
  3. **Logging** - Deliberate logging to a file or other facility used to track events, execution flow and variables.
  4. **Interactive Debugging** - PHP extension used by developer to directly interact with a running script to track live variable state.

Using *Error Reporting*, *Print Statements* and *Logging* for debugging is relatively starightforward
while getting *Interactive Debugging* to work is more involved.

INFO: See [IBM: Debugging techniques for PHP programmers](http://www.ibm.com/developerworks/library/os-debug/) for introduction


Why FirePHP
===========

The goal of *FirePHP* is to combine the best aspects of all four debugging approaches in an easy to install and use package.
    
By having all error and selected internal information about an application readily available a developer may save significant
amounts of time learning, tracking and maintaining program logic.

Traditional PHP debugging solutions have primarily focused on one debugging approach at a time. *FirePHP* combines
*Error Reporting* and *Print Statements* with *Logging* in an open architecture and protocol designed to
support direct integration into debugging clients and integrated development environments.

[DeveloperCompanion](Clients#devcomp) is a new client with full support for *FirePHP* and is being used
to pioneer a combined approach to debugging where relevant information is gathered from many sources, combined and presented in a uniform interface.
    
NOTE: [DeveloperCompanion](Clients#devcomp) replaces the existing [FirePHP Extension](https://addons.mozilla.org/en-US/firefox/addon/6149/) to facilitate logging to the *Firebug Console*.

PLANNED: The addition of [Xdebug](http://xdebug.org/) as a source of internal information is planned.


FirePHP History
===============

*FirePHP* was first developed by [Christoph Dorn](http://www.christophdorn.com/) in 2007 and has since grown to 900,000+ downloads
and ~80,000 active daily users according to [Mozilla Add-ons](https://addons.mozilla.org/en-US/firefox/addon/6149/).

Christoph still develops, maintains and supports *FirePHP* and is the primary sponsor of the project.
    
*FirePHP* was designed to log from server-side PHP code to the *Firebug Console* facilitated by
a *FirePHP Server Library* and *FirePHP Firefox Extension*. *FirePHP* gained popularily on a larger scale
when [Zend Framework 1.6](http://framework.zend.com/) shipped with native *FirePHP* support in September 2008.
Many [frameworks have added FirePHP support](http://www.firephp.org/Wiki/Libraries/FirePHPCore) to make it easier to use *FirePHP* for their users.

With the *1.0 Release* the project brings many new features and is shifting 100% of its focus to further developing the *Server Library* only while allowing
any client that implements the appropriate open protocols to access the data and services the *FirePHP Server Library* provides.

The first client to be fully compatible with the *1.0 Release* is [DeveloperCompanion](Clients#devcomp) which
is designed to replace the *FirePHP Firefox Extension* for all users. An open-source client called [FireConsole](http://www.fireconsole.org/) is planned
and will be released once the underlying open source libraries in *DeveloperCompanion* stabilize.


FirePHP Protocol
================
    
*FirePHP 1.0* does not define its own protocol but rather uses [wildfire](http://github.com/cadorn/wildfire) for server-client communication and
[insight](http://github.com/cadorn/insight) for wrapping data into static, language agnostic, JSON-based object graphs ready for transport and storage.

Client initiated communication for specific resources as well as execution generated data sent via HTTP response headers
is supported. All communication is out-of-band (to the application) meaning it will not interfere with the normal functioning of the application.


Integrating FirePHP
===================
    
*FirePHP* consists of a PHP library that is simply included at the beginning of any PHP script and
configured inline or via a configuration file.
See [Install](Install.md) for detailed instructions. By default *FirePHP* is disabled (to minimize overhead)
and will only be activated if an authorized client is detected. The intent is to integrate *FirePHP* into an application
and deploy it along with the application (leaving all logging statements in place) to all environments. *FirePHP*
supports troubleshooting issues on production systems in a safe and reliable manner.


Example
=======

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Introduction-Example"}    
    
    define('INSIGHT_IPS', '*');
    define('INSIGHT_AUTHKEYS', 'client-auth-key');
    define('INSIGHT_PATHS', dirname(__FILE__));
    define('INSIGHT_SERVER_PATH', '/index.php');
    require_once('phar://firephp.phar/FirePHP/Init.php');
    
    $inspector = FirePHP::to('page');
    $console = $inspector->console();
    
    $console->log('Hello World');

This example logs a *Hello World* message to the [Firebug](http://getfirebug.com/) [Console](http://getfirebug.com/commandline).

NOTE: See [Install](Install.md) for installation instructions.

NOTE: See [API](API/Insight.md) for a complete reference of all API features.


License
=======
    
*FirePHP* is licensed under the [MIT License](http://github.com/cadorn/firephp-libs/blob/master/programs/standalone/LICENSE).


Support
=======

The *FirePHP Project* is supported via the [community forums](http://forum.firephp.org/) and
[developer mailing list](http://groups.google.com/group/firephp-dev).
Commercial support is also available by [Christoph Dorn](http://www.christophdorn.com/).


News
====

You can follow *FirePHP* on twitter: [http://twitter.com/firephplib](http://twitter.com/firephplib)

In-depth *FirePHP* news and tutorials are available on Christoph's blog:
[http://www.christophdorn.com/Blog/category/firephp/](http://www.christophdorn.com/Blog/category/firephp/)
