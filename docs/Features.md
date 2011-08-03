
FirePHP includes a number of core features and an extension API to add new functionality.

PLANNED: The extension API is not yet complete

Many of the listed features require a server and client component. FirePHP provides the server component while
relying on the open source [insight system](Insight) integrated into a [client](Clients) to provide the client component.


Core Features
=============

Built-In Security & Seamless Deployment
---------------------------------------

FirePHP 1.0 is secure by default requiring you to configure access by *IP address* and client *authorization key*.
This makes it possible to seamlessly deploy code with logging statements and only activate these for authorized clients.

All configuration can happen via several overlaying configuration files allowing for environment-specific overrides.


Error & Assertion Capturing
---------------------------

By default, when FirePHP is included, it captures all errors according to the 
[error_reporting](http://www.php.net/manual/en/errorfunc.configuration.php#ini.error-reporting)
[ini](http://www.php.net/manual/en/configuration.file.php) option and sends these to the client even if 
[display_errors](http://www.php.net/manual/en/errorfunc.configuration.php#ini.display-errors) 
is turned off. Assertions errors are also captured and sent to the client.

TIP: To capture **all** errors irrespective of the *error_reporting* ini option use the [DeveloperCompanion client](Clients#devcomp) and 
enable the *Insight: Show all PHP Errors* conditional logging option.

NOTE: The following errors are currently **not captured**: *E\_ERROR*, *E\_PARSE*, *E\_CORE_ERROR*, *E\_CORE_WARNING*, *E\_COMPILE\_ERROR*, *E\_COMPILE\_WARNING*, *E\_STRICT*


Variable Logging
----------------

Log *any PHP variable* including complex circular object graphs and inspect these on the client. Class names, class member visibility, file
and line information among other details are automatically displayed.

Variables can be logged to the [Firebug](http://getfirebug.com/) [Console](http://getfirebug.com/commandline) or other viewers depending
on the [client](Clients) used. Variables may be assigned labels and directed into nested groups to provide context.

TIP: If using the [DeveloperCompanion client](Clients#devcomp), logging detail may be switched on and off via *conditional logging* options
set by the client.


Planned Features
================

Some planned features among many others:

  * PHP configuration viewer
  * Server log viewer
  * Capturing of *all* errors
  * Project file explorer, viewer and editor
  * Documentation viewer
  * Dynamic class file patching
  * [Xdebug](http://xdebug.org/) integration
  * [XHProf](http://mirror.facebook.net/facebook/xhprof/doc.html) integration
  * [PHP_CodeSniffer](http://pear.php.net/package/PHP_CodeSniffer) integration
  * [PHP_Beautifier](http://pear.php.net/package/PHP_Beautifier) integration
  * IO Profiling


Contributed Features
====================

INFO: If you have extended FirePHP in a way that may be useful to others, please [let us know](OpenSource#support) so we may link to it here.
