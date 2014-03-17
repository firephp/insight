
NOTE: It is assumed you have [DeveloperCompanion](Clients#devcomp) installed.

Activating Insight
==================
{: id="activating-insight"}

[Insight](Insight) is the intelligence system used by *FirePHP* to gather and send information to the client. It must be activated for
this to happen.

NOTICE: **NOTE:** [DeveloperCompanion](Clients#devcomp) currently always activates *Insight* no matter the state of *Firebug* or the panels within it.
    
NOTE: You must also authorize *Insight* for each hostname. See [Authorizing](Authorizing).

PLANNED: Activation on a hostname basis is planned.


Authorizing Insight
===================
{: id="authorizing-insight"}

[Insight](Insight) must be authorized for each hostname <-> client pair for the server to send data to the client.

See [Authorizing](Authorizing).


Logging to the Firebug Console
==============================
    
To log messages to the [Firebug Console](http://getfirebug.com/commandline) you must have [Insight](Insight)
[activated](Workflow#activating-insight), [authorized](Authorizing) and *Firebug's Console* and *Net* Panels enabled.

Messages logged to the `page` target will show up in the console. See: [FirePHP::to('<target>')](API/Insight#to) in the API Reference.

NOTE: If *Firebug* is not open or the *Console* or *Net* panels are not enabled, messages will show up in the *Companion Console*.


Inspecting Requests with Companion
==================================
{: id="inspecting-requests"}

To inspect a **request** you need to load it into the *Companion*. There are several ways to do that:

NOTE: The debug data is always tracked (if *Insight* is activated and authorized) but needs to be loaded into the companion to be viewable.

  * **Companion Workspace Request Table**
    
    When the *Workspace* for an application is open in [DeveloperCompanion](Clients#devcomp) all requests are displayed in the
    *Requests Table*. Double-click on a request to load it into the *Request Inspector*.
    
  * **`x-insight` URL Parameter**
    
    Append `x-insight=inspect` to any *GET* or *POST* URL.
    
        CODE: {"lang":"php"}
        
        // GET or POST URL parameter
        ...?x-insight=inspect
        
  * **`x-insight` HTTP Request Header**
    
    Set an `x-insight: inspect` HTTP header on the *request*.
    
        CODE: {"lang":"php"}
        
        // HTTP Request Header
        x-insight: inspect
    
  * **`x-insight` HTTP Response Header**
    
    Set an `x-insight: inspect` HTTP header for the *response*.
    
        CODE: {"lang":"php"}
        
        header('x-insight: inspect');
    
  * **PHP Code Trigger**
    
    Trigger an inspect from the PHP script.
    
        CODE: {"lang":"php"}
        
        $console = FirePHP::to('page')->console();
        $console->show();
        // or
        $controller = FirePHP::to('controller');
        $controller->triggerInspect();
    
    INFO: See [Insight/Control API](API/Insight#control-api) for more information.
