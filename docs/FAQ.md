
If your question is not covered below you can get support concerning the *FirePHP Server Library* [here](OpenSource#support) 
and the *DeveloperCompanion Client Extension* [here](http://groups.google.com/group/devcomp).
    
General
=======
{: id="general"}


Where do I get Support, report Bugs and send Feedback?
------------------------------------------------------
{: id="general-1"}

There are several channels depending on your needs and whether it involves the server library or client extension.

### Concerning the *FirePHP Server Library* specifically

Please see the *FirePHP* [Open Source](OpenSource#support) page.

### Concerning the *DeveloperCompanion Client Extension*

Please see the [DeveloperCompanion](Clients#devcomp) mailing list: [http://groups.google.com/group/devcomp](http://groups.google.com/group/devcomp)

### Private & Confidential

Please contact [Christoph Dorn](http://www.christophdorn.com/).


Who is behind all this?
-----------------------
{: id="general-2"}

[Christoph Dorn](http://www.christophdorn.com/) has been developing *FirePHP* since 2007. *FirePHP*, 
[DeveloperCompanion](http://developercompanion.com/) 
and the [underlying technology](http://www.christophdorn.com/OpenSource/) are Christoph's attempt to 
[make things easier for developers](http://www.christophdorn.com/Research/).


Installing FirePHP
==================
{: id="installing-firephp"}


Do I need to uninstall the FirePHP Extension to use the DeveloperCompanion Extension?
-------------------------------------------------------------------------------------
{: id="installing-firephp-1"}

Yes! You need to disable or uninstall it. [DeveloperCompanion](Clients#devcomp) is designed
to replace the existing [FirePHP Firefox Extension](Clients#firephp).


How do I upgrade to FirePHP 1.0?
--------------------------------
{: id="installing-firephp-2"}

See *Upgrading to FirePHP 1.0 proper* at [Configuration/Traditional](Configuration/Traditional#upgrade).


Is the 1.0 release of the FirePHP Server Library backwards compatible?
----------------------------------------------------------------------
{: id="installing-firephp-3"}

Yes. It is 100% backwards compatible and existing code should continue to work without modification.

### Traditional Inclusion (DEPRECATED)

If *FirePHP 1.0* is included using the `FirePHPCore/*` files (i.e. the way it has been included in the past), messages will be directed to the
**Firebug Console** if the [FirePHP Firefox Extension](Clients#firephp) or [DeveloperCompanion](Clients#devcomp) is installed on the client.

    CODE: {"lang":"php"}
    
    require_once('FirePHPCore/FirePHP.class.php'); // or
    require_once('FirePHPCore/fb.php');

SECURITY: Please note that if *FirePHP 1.0* is included in this way the new security features do **NOT** take 
effect! You are encouraged to [upgrade](Configuration/Traditional#upgrade) the inclusion method and use 
[DeveloperCompanion](Clients) on the client.

### New Inclusion (PREFERRED)

If *FirePHP 1.0* is included using the `FirePHP/*` files, messages will be directed to the **Firebug Console** or 
**DeveloperCompanion Console** if [DeveloperCompanion](Clients#devcomp) is installed on the client. 
This method of inclusion takes full advantage of the new build-in security features. See [Install](Install) for more information.

    CODE: {"lang":"php"}
    
    require_once('FirePHP/Init.php'); // or
    require_once('FirePHP/fb.php');

NOTE: Make sure you have *FirePHP* [configured](Install) and *Insight* [authorized](Authorizing).

See *Upgrading to FirePHP 1.0 proper* at [Configuration/Traditional](Configuration/Traditional#upgrade) if you are upgrading
from an older version of FirePHP that uses the `FirePHPCore/*` files.


It is not working! How do I troubleshoot?
-----------------------------------------
{: id="installing-firephp-4"}

SEE: [Troubleshooting](Troubleshooting)


How do I add multiple authorization keys on the server?
-------------------------------------------------------
{: id="installing-firephp-5"}

Multiple authorization keys can be used with any server installation to allow more than one client to access *FirePHP*.

### If using constants

    CODE: {"lang":"php"}
    
    define('INSIGHT_AUTHKEYS', 'client-auth-key-1,client-auth-key-2,...');

### If using *credentials.json*

    CODE: {"lang":"php"}
    
    {
      "cadorn.org/insight/@meta/config/0": {
        "allow": {
          "ips": [
            ...
          ],
          "authkeys": [
            "client-auth-key-1",
            "client-auth-key-2",
            ...
          ]
        }
      }
    }
   
See [Install](Install) and [Advanced Configuration](Configuration/Advanced) for information on the various configuration options.


Integrating & Using FirePHP
===========================
{: id="using-firephp"}


How can I set the label/title for a log message? The old way does not work!
---------------------------------------------------------------------------
{: id="using-firephp-1"}

NOTE: This assumes you are using the [Insight/Console API](API/Insight#console-api).

    CODE: {"lang":"php"}
    
    $console->label('Label')->log('Hello World');


I am using FirePHP with my own logger. How can I get the correct file and line info?
------------------------------------------------------------------------------------
{: id="using-firephp-2"}

You can either determine the file and line info yourself and set it for each message:

    CODE: {"lang":"php"}
    
    $console->options(array(
        'file' => $file
        'line' => $line
    ))->...

or you can instruct *FirePHP* to adjust the stack trace for all messages with:

    CODE: {"lang":"php"}
    
    $console = $console->option('encoder.trace.offsetAdjustment', 3);

See [Insight/Console API](API/Insight#console-api) for more information.


Why don't I get a new group when I close a group and log to a new one with the same name?
-----------------------------------------------------------------------------------------
{: id="using-firephp-3"}

[Groups](API/Insight#console-api-groups) are given *names* in addition to *titles* for the express
purpose of being able to log to the same group multiple times throughout the request.

If you want to open a new group every time you can omit the *name* completely and just call `$console->group()->open()`.


How do I share FirePHP between multiple applications on the same server?
------------------------------------------------------------------------
{: id="using-firephp-4"}

*FirePHP* is designed to reside with a specific application or in a central place on a server where it is accessible to all
applications. The *FirePHP* phar or extracted zip archive can be placed anywhere on a server as long as all applications
can include the code with sufficient permissions.

Each *hostname* (or more specifically *application*) **should** have it's own *package.json* file as it describes the
specific application. It should reside with the application in a source version control system.

Multiple applications **may** share the same *credentials.json* file. This file is typically expected to be found next
to the *package.json* file but can be relocated via a configuration option.

For more information see:

  * [Environment specific Configuration](Configuration/Advanced#environment-specific)
  * [Server-wide Inclusion](Configuration/Advanced#server-wide)
  * [Virtual Host based Configuration](Configuration/Advanced#virtual-host)


Should I follow the `$inspector` & `$console` naming conventions?
-----------------------------------------------------------------
{: id="using-firephp-5"}

Yes, you should follow the naming conventions used in the [Insight API](API/Insight) reference.

The current naming scheme takes into account planned enhancements to the various APIs and the overall logging,
debugging and development methodology. It is also useful to use consistent names when communicating verbally,
in documentation and on mailing lists.

NOTE: The naming scheme may undergo some changes over time as the evolving big-picture is better understood.


I am getting a PHP Fatal error: Allowed memory size of 25165824 bytes exhausted! What do I do now?
--------------------------------------------------------------------------------------------------
{: id="using-firephp-6"}

*FirePHP* works by encoding logged variables into a JSON-based transport format in order to send it to the client.

The time and resources required to accomplish this are directly proportional to the size of the variables being logged.
When thinking of the size of a variable and specifically an object one must include all object members and their references
as the entire object graph will be traversed.
        
To make this encoding process practical for larger applications there are certain limits enforced by the encoder that restrict
the depth of traversal in various ways.
        
There is an article outlining the encoder options [here](http://www.christophdorn.com/Blog/2010/10/15/tip-firephp-data-volume-filtering/)
(see the *FirePHP 1.0* heading).
        
The encoder options are documented in the [Insight API reference](API/Insight) along with a feature to exclude specific class
members (see [Class Member Filters](API/Insight#console-api-class-member-filters)).

PLANNED: There are various optimizations and optional extensions planned to speed up the encoding process and support much
larger object graphs.


Why was `fb()` changed to `p()`?
---------------------------------
{: id="using-firephp-7"}

The previous `fb()` and now [p()](API/Insight#firephp-api-declareP) functions are designed for temporary development and debugging
output and are intended to be removed from the code when done. To leave logging statements in the code use the new
[Insight/Console API](API/Insight#console-api).

The function name was changed for the following reasons:

  * `fb()` implies *Firebug* which is no longer accurate for *FirePHP 1.0* as other logging targets are supported.
  * `fb()` and `p()` should not be left in code after dev/debug and this way `fb()` in code will fail and the developer is
    encouraged to convert to using the [Insight/Console API](API/Insight#console-api). This is a necessary step developers should go through.
  * `p()` is shorter and closer to the idea of *printing* a variable.
  * `p()` has a different method signature and only supports a variable & label.

To continue using `fb()` in *FirePHP 1.0* you can include:

    CODE: {"lang":"php"}
    
    require_once('FirePHP/fb.php');

See [FirePHP API](API/FirePHP) for complete information.

For information on how to use `p()` see [here](API/Insight#firephp-api-declareP).


How do I get the log messages for a page that issued a HTTP redirect?
---------------------------------------------------------------------
{: id="using-firephp-8"}

All requests are tracked in the *Requests Table* for a launched *Workspace* in [DeveloperCompanion](Clients#devcomp).
*Double-clicking* any request will load it into the *Companion Request Inspector*.

Log messages for a page that issued a HTTP redirect can also be kept in the *Firebug Console*. The following must be true for this to work:

  * The *Persist* toggle must be activated in the *Firebug Console* panel.
  * Messages must be logged to the `page` target. See [API/Insight](API/Insight#to).


How do I stop `E_NOTICE` errors from showing up in the console with every request?
----------------------------------------------------------------------------------
{: id="using-firephp-9"}

*FirePHP* by default [captures all errors](Features) configured for [error_reporting](http://www.php.net/manual/en/errorfunc.configuration.php#ini.error-reporting) 
in the [php.ini](http://www.php.net/manual/en/configuration.file.php) file even if 
[display_errors](http://www.php.net/manual/en/errorfunc.configuration.php#ini.display-errors) 
is turned off.

To turn off `E_NOTICE` errors you have several options:

  * Set `error_reporting` in *php.ini* to `E_ALL & ~E_NOTICE`. This will completely disable `E_NOTICE` errors for all applications.
  
  * PLANNED: Disable **application wide** (for the connected client) using: `FirePHP::plugin('firephp')->scope('app')->showErrors(E_NOTICE, false)`;
  
  * PLANNED: Disable **url specific** (for the connected client) using: `FirePHP::plugin('firephp')->scope('url')->showErrors(E_NOTICE, false)`;
  
  * PLANNED: Disable **application wide** using [DeveloperCompanion](Clients#devcomp) *Application Inspector*. Requires license.
  
  * Disable **url specific** using [DeveloperCompanion](Clients#devcomp) *Request Inspector*:
    
    NOTE: A *DeveloperCompanion* license is required.
    
      1. Open *DeveloperCompanion*, launch or select the appropriate *Workspace* and make sure the *Application Inspector* is active.
         
         If you see a *Request* box below the *Application* box exit the *Request Inspector* by clicking on the red *X* to the left.
      
      2. Using the browser make a request to the **URL** you wish to remove the errors for. The request should show up in the *Requests*
         table of the *Application Inspector*. Double-click the request to launch the *Request Inspector*.
      
      3. In the *Request Inspector* locate the *on()* panel (bottom right) and resize it to fit all content.
      
      4. Check *Insight: Show all PHP Errors (except:)* and click *Reload* at the top of the window in the *Request* box. This will reload
         the request and ask the server to list all error types.
      
      5. Check `E_NOTICE`.


About [DeveloperCompanion](Clients#devcomp)
===========================================
{: id="about-devcomp"}

NOTE: These FAQs will move to the *DeveloperCompanion* site in time.


Do I need Firebug installed to use DeveloperCompanion?
-----------------------------------------------------
{: id="about-devcomp-1"}

No. [DeveloperCompanion](Clients#devcomp) will work without [Firebug](http://www.getfirebug.com/) installed however the two tools are integrated
and additional features are available if used together. One such feature is the channeling of log messages to the *Firebug Console*.

PLANNED: A new [Insight](Insight) panel for *Firebug* used to [activate and deactivate](Workflow#activating-insight) the 
new *Insight* intelligence system.

PLANNED: Ability to [inspect requests](Workflow#inspecting-requests) from the *Firebug NET* panel.


Why is DeveloperCompanion not hosted on addons.mozilla.org?
-----------------------------------------------------------
{: id="about-devcomp-2"}

The *Mozilla Add-ons* policy is at odds with the needs and goals of [DeveloperCompanion](Clients#devcomp). Among other things, extensions
hosted with *Mozilla* may not load and execute external JavaScript code and each update must be manually reviewed which 
is impractical.

All of *Mozilla's* extension development and security recommendations and best practices are being followed and taken 
very seriously where applicable.


Will there be a standalone version or support for other browsers?
-----------------------------------------------------------------
{: id="about-devcomp-3"}

Yes, that is definitely a goal. Implementing the initial tool as a Firefox Extension was the easiest way to get around runtime and installation
issues on various platforms and tight integration with Firebug.

Once the tool stabilizes, the next step is to select an application platform that supports writing applications in HTML + CSS + JavaScript
with full system access and can generate installable programs for various operating systems. The initial standalone version will work
in conjunction with a *thin* Firefox Extension. Support for other browsers will be added via *thin* extensions for their respective extension systems.
        
A *thin* extension refers to a standardized interface used to interact with the browser and extend the native browser tools. This interface
is needed to obtain the current state of the browser, access content and browser-specific developer tools and various other features.
Various interfaces of this kind are currently being developed by different browser communities that will hopefully result in a common standard over time.
    
The runtime platform for *DeveloperCompanion* and all protocols and utility libraries are open source and CommonJS based. If you are interested
in getting involved to expand the support to other browsers please [get in touch](http://groups.google.com/group/devcomp).


Will other programming languages (other than PHP) be supported?
---------------------------------------------------------------
{: id="about-devcomp-4"}

Yes, that is definitely a goal. The entire tool and all underlying projects, protocols and technologies have been
designed and implemented to be language agnostic. Once the PHP support stabilizes the first additional language
will be JavaScript in the browser and on the server.
    
There are also plans for Java, Ruby and Python support. The main task in adding support for a language is to implement
two libraries that form the foundation of the logging, encoding and transmission system. These projects are:
    
  * The communication system: [http://github.com/pinf/wildfire](http://github.com/pinf/wildfire)
  * The intelligence system: [http://github.com/pinf/insight](http://github.com/pinf/insight)
       
Once these infrastructure libraries exist for a language one or more convenience libraries can be developed (in the spirit of FirePHP)
that make using the system in various applications easy. The idea behind having a consistent set of libraries is to standardize an API that works
cross-language where developers can expect a certain amount of functionality and conventions no matter what language they program in.
    
An overview of what is involved in building a set of libraries can be found [here](http://groups.google.com/group/fireconsole/browse_thread/thread/9016d98190158233).
If you are interested in working on this feel free to [get in touch](http://groups.google.com/group/devcomp).


What is the difference between the free DeveloperCompanion and the paid version?
--------------------------------------------------------------------------------
{: id="about-devcomp-5"}

You can find a major feature comparison here: [http://developercompanion.com/](http://developercompanion.com/)

The free version will focus on logging to the *Firebug Console* for now as it is designed to replace the deprecated 
*FirePHP Extension* and work with the new *FirePHP 1.0* server library (the sole focus of the *FirePHP* project going forward).

The paid version will focus on an optimum PHP & JavaScript 
[development workflow and toolchain setup](http://www.christophdorn.com/Research/) to make users highly efficient.
The current feature set is [just the beginning](http://www.christophdorn.com/Vision/) for the paid version and many more 
features are on the [way](http://www.christophdorn.com/OpenSource/). Feature prioritization will be based on user feedback 
and perceived need.


How much does the paid version cost?
------------------------------------
{: id="about-devcomp-6"}

The price of the full version is $99 USD. It is a one-time licensing fee with free updates for life. The idea is to develop a tool a developer
purchases once and that stays with them for life. It is always registered to an individual and can be installed on any number of computers used by
that individual throughout their career.


Why is the paid version so cheap given the features it will have?
-----------------------------------------------------------------
{: id="about-devcomp-7"}

[Christoph](http://www.christophdorn.com/) has a [vision](http://www.christophdorn.com/Vision/) that will take several
levels of tools and services to accomplish.

[DeveloperCompanion](Clients#devcomp) is just the beginning of a complete toolchain automation platform and the kind of developer tooling
that will be available for all programming languages. A large userbase is required to achieve this.

*DeveloperCompanion* is the first access point to this open source toolchain automation
platform and priced to achieve a large userbase by keeping the barrier to entry low.

The next level of tooling will be available as a monthly service. It will provide access to a continuous
integration, build, testing and software distribution, monitoring and feedback system that can be used for any PHP and
JavaScript based project. This service will tentatively start at $33 per developer per month + usage fees priced at utility levels.

Beyond this there is a lot more planned in terms of features to enable efficient development at a personal and organizational
level but these aspects are still being formulated.


Using DeveloperCompanion
========================
{: id="using-devcomp"}


I don't see any messages. `FirePHP::to('request')->console()->log()` does not work!
-----------------------------------------------------------------------------------
{: id="using-devcomp-1"}

If you have not authorized the hostname or logged messages to the *Firebug Console* please take a look at
[Authorizing](Authorizing).

If *FirePHP* is setup and the hostname is authorized you need to *trigger* an inspect for the request data to be loaded
into the *Companion Window*. This can be done in [various ways](Workflow#inspecting-requests).

If you are trying to log to the *Firebug Console* you need to change the following:

    CODE: {"lang":"php"}
    
    $inspector = FirePHP::to('request'); // Logs to Companion Window
    // to
    $inspector = FirePHP::to('page'); // Logs to Firebug Console
    
    $inspector->console()->log('Hello World');


How do I stop DeveloperCompanion from modifying my User-Agent request header?
-----------------------------------------------------------------------------
{: id="using-devcomp-2"}

By default [DeveloperCompanion](Clients#devcomp) is backwards compatible with the [FirePHPCore](Configuration/Traditional) server
library. This necessitates modifying the *User-Agent* request header.

If you have upgraded to [FirePHP 1.0](Install) on the server you can switch this backwards compatibility off.

In the Firefox menu go to *Tools* -> *DeveloperCompanion* -> *Options* and uncheck *FirePHPCore Compatibility* and your
*User-Agent* header will no longer be modified.

PLANNED: Automatic disabeling of backwards compatibility if *FirePHP 1.0* is detected on the server.


How do I get messages to show up in the Companion Window instead of the Firebug Console?
----------------------------------------------------------------------------------------
{: id="using-devcomp-3"}

If you are using the [Insight API](API/Insight) all you need to do is to change
the target from `page` to `request`.

    CODE: {"lang":"php"}
    
    $console = FirePHP::to('page')->console();     // Logs to the Firebug Console
    $console = FirePHP::to('request')->console();  // Logs to the DeveloperCompanion Window

INFO: To load the debug data logged for a request into the companion window (i.e. to inspect it) see 
[Workflow](Workflow#inspecting-requests).
    
If you are using the [FirePHP API](API/FirePHP) as opposed to the new 
[Insight API](API/Insight) you can redirect the messages:

    CODE: {"lang":"php"}
    
    $firephp->setLogToInsightConsole('Firebug'); // or
    FB::setLogToInsightConsole('Firebug');

NOTE: Make sure you have FirePHP properly [installed and configured](Install) on the server which
has changed from previous releases.

This will log to a console in [DeveloperCompanion](Clients#devcomp) called *Firebug*. You can also pass a `$console` object to redirect messages to.
    
INFO: To load the debug data logged for a request into the companion window (i.e. to inspect it) see 
[Workflow](Workflow#inspecting-requests).


Why are some of my variables truncated?
---------------------------------------
{: id="using-devcomp-4"}

When variables are sent from the server to the client they must be compacted to limit the amount of data sent. The primary
solution to achieve this is to limit the *length* of *arrays* and *objects* and limit the *depth of traversal*. The default 
limits are set relatively low to ensure the best user experience from the start.

You can increase the limits via the default [configuration options](Configuration/Advanced) or as needed 
via the [Insight/Console API](API/Insight#console-api-options).


How do I use `triggerInspect()` or `show()` and have it not snap the focus to the window? Sometimes I just want it to get the data.
-----------------------------------------------------------------------------------------------------------------------------------
{: id="using-devcomp-5"}

The purpose of `triggerInspect()` and `show()`is to bring the logged data to the user's attention immediately after the request has completed.

To inspect requests manually see [here](/Workflow#inspecting-requests).

NOTE: The data is always sent (even if no inspect is triggered) as long as *Insight* is [activated](Workflow#activating-insight).


About the FirePHP & Related Projects
====================================
{: id="related-projects"}


What is happening to the FirePHP Extension?
-------------------------------------------
{: id="related-projects-1"}

The [FirePHP Extension](https://addons.mozilla.org/en-US/firefox/addon/6149/) is being phased out in favour of
[DeveloperCompanion](http://developercompanion.com/) and later [FireConsole](http://www.fireconsole.org/).
The *FirePHP* project will continue and focus on the server library only.

For a more detailed explanation see [Clients](Clients#firephp).


What is happening to FireConsole?
---------------------------------
{: id="related-projects-2"}

[FireConsole](http://www.fireconsole.org/) is being incubated as part of 
[DeveloperCompanion](http://developercompanion.com/) and will be released once the underlying open source libraries stabilize. 
DeveloperCompanion provides for free all (and more) features *FireConsole* will initially offer.

For a more detailed explanation see [Clients](Clients#fireconsole).
