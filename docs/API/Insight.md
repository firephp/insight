
NOTE: The *Insight API* is **not supported** by the [FirePHP Firefox Extension](../Clients#firephp).

The new *Insight API* takes an object oriented approach and provides many more features than the traditional [FirePHP API](FirePHP). See 
[Overview](Overview) for a comparison:

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/PageConsole-InsightAPI"}
    
    define('INSIGHT_CONFIG_PATH', '...');
    require_once('FirePHP/Init.php');
    
    $inspector = FirePHP::to('page');
    $console = $inspector->console();
    $console->log('Hello World');

Many methods in the *Insight API* may be chained and work by successively cloning and augmenting a *message object* which is finally
sent off. In the example above `FirePHP::to()` creates a *message object* targeting the *page* context. The context is further
refined to point to a *console*. One or more messages can now be sent to this same context.

NOTE: While some of the method names in the new *Insight API* are called the same as in the *FirePHP API* they take different arguments.


Activation & Authorization
==========================

The *Insight API* must be activated and authorized to record and send data to the client. It is activated by default and may be deactivated from the
client. Authorization occurs on a per-hostname basis. See [Authorizing](../Authorizing) for more information.

NOTE: If *Insight* is deactivated from the client the [FirePHP API](FirePHP) will also be deactivated but only if [including](Install#Configure) 
*FirePHP* using the `/FirePHP/*.php` files.


Contexts: `FirePHP::to('<target>')`
===================================
{: id="to"}

To record/log any data a *context* must be initialized by specifying a *target*:

  * `page` - Obtain a *message context* that will send messages to the *page* target. These messages will show up in the
    [Firebug](http://getfirebug.com/) or [DeveloperCompanion](../Clients#devcomp) consoles.
    
        CODE: {"lang": "php", "run": "http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/PageConsole"}
        $inspector = FirePHP::to('page');
        $console = $inspector->console();
        $console->log('Hello World');
    
    INFO: See [Insight/Console API](Insight#console-api) below for how to send different kinds of messages to this target.

  * `request` - Obtain a *message context* that will send messages to the *request* target. These messages will show up in the *Companion Window*
    **after an [*inspect* has been triggered](Workflow#inspecting-requests)**.
        
        CODE: {"lang": "php"}
        $inspector = FirePHP::to('request');
        $console = $inspector->console('<Tab Label>');
        $console->log('Hello World');
    
    NOTE: The `<Tab Label>` is optional and defaults to *Console*.
    
    INFO: See [Insight/Console API](Insight#console-api) below for how to send different kinds of messages to this target.

  * `package` - Obtain a *message context* that will record information about the application package. This info is used in the 
    *Companion Window* when displaying information about a request.
    
    INFO: See [Package API](Insight#package-api) below for how to use this target.

  * `controller` - Obtain a *message context* that is used to control the client.
    
    INFO: See [Insight/Control API](Insight#control-api) below for how to use this target.


Plugins: `FirePHP::plugin('<name>')`
====================================
{: id="plugin"}
    
Get a plugin by specifying a *name*. Supported *plugins* are:

  * `firephp` - The *firephp* plugin provides utility functions to make development and monitoring easier.
    
    INFO: See [Insight/FirePHP API](Insight#firephp-api) for how to use this plugin.

    
Insight/Console API
===================
{: id="console-api"}

The *Insight/Console API* is used to send messages to a given target.

    CODE: {"lang":"php"}
    $console = FirePHP::to('<target>')->console('<Tab Label>');

NOTE: The `<Tab Label>` is optional and defaults to `Console`.

NOTE: The `<target>` defines where the messages will show up. See [FirePHP::to('<target>')](Insight#to) above.


Variable Truncation
-------------------

NOTE: Large variables are *truncated* when traversing (nested arrays and object members) by preventing the transmission of data, beyond certain limits,
to the client.

By default variables are truncated according to the [encoder options](Insight#console-api-options). To avoid truncating variables use:
    
    CODE: {"lang":"php"}
    $console = $console->nolimit();

NOTE: Calling `nolimit(false)` will reset the option and cause variables to be truncated again.


String Trimming
---------------

NOTE: Large strings are *trimmed* when displayed in the client console.
    
By default pure string variables are trimmed to 500 characters and string values as part of arrays or objects to 50 characters. To prevent string
trimming use:

    CODE: {"lang":"php"}
    $console = $console->notrim();
        
NOTE: Calling `notrim(false)` will reset the option and cause strings to be trimmed again.


Message Expansion
-----------------
        
By default logged messages are contracted when displayed in the console. To expand any message use:

    CODE: {"lang":"php"}
    $console = $console->expand();

NOTE: Use this to log expanded tables, groups, traces and general log messages.


Showing the Console
-------------------
        
By default logged messages are tracked by the client but not shown to the user unless they already have the console open. To force the console to
show use:
    
    CODE: {"lang":"php"}
    $console->show();

NOTE: If logging to the *Firebug Console* you must have *Firebug* open and the *Firebug Console* and *Net* panels enabled.


Options
-------
{: id="console-api-options"}

Individual encoder (and other) options can be set as needed:
    
    CODE: {"lang":"php"}
    $console = $console->option('<Name>', <Value>); // or
    $console = $console->options(array(
        '<Name>' => <Value>
    ));

NOTE: Calling `option()` or `options()` without a value argument will return the current value.

Possible options are as follows (default values are shown):

    CODE: {"lang":"php"}
    encoder.depthNoLimit : false
    encoder.lengthNoLimit : false
    encoder.maxDepth : 5
    encoder.maxStringLength : 5000
    encoder.maxArrayDepth : 3
    encoder.maxArrayLength : 25
    encoder.maxObjectDepth : 3
    encoder.maxObjectLength : 25
    encoder.trace.offsetAdjustment : 0  // affects file/line logic
    encoder.trace.maxLength : -1  // no maximum
    encoder.exception.traceMaxLength : -1  // no maximum
    string.trim.enabled : <undefined>  // force/prevent string trimming in UI
    string.trim.length : 50  // string trim length
    string.trim.newlines : true  // force/prevent string newline expansion
    file : <automatic>  // sets file for message
    line : <automatic>  // sets line for message

INFO: *Encoder* option defaults may be set by configuration. See [Advanced Configuration](../Configuration/Advanced).


Class Member Filters
--------------------
{: id="console-api-class-member-filters"}

Manually setting a class member filter:

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/ManualClassFilter"}
    
    $filter = array(
        'classes' => array(
            '<ClassName>' => array('<MemberName>')
        )
    );
    $console->filter($filter)-> [Console API]

Annotation-based class member filter:

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/AnnotationClassFilter"}
    class <Name> {
        /**
         * @insight filter=on
         */
        public $var;
    }


Logging Variables
-----------------

    CODE: {"lang":"php"}
    $console->log($Variable);


Message Priorities
------------------

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Priorities"}
    $console->log($Variable);
    $console->info($Variable);
    $console->warn($Variable);
    $console->error($Variable);


Message Labels
--------------

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Labels"}
    $console->label('<Label>')-> [Console API]


Tables
------

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Tables"}
    $header = array('Column 1 Heading', 'Column 2 Heading');
    $table = array(
        array('Row 1 Column 1 Value', 'Row 1 Column 2 Value'),
        array($Variable_r2c1, $Variable_r2c2)
    );
    $console->table('<Title>', $table);
    $console->table('<Title>', $table, $header);


Stack Traces
------------

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Traces"}
    $console->trace('<Label>');


Groups
------
{: id="console-api-groups"}

Logging to a group by name:

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/LogToGroup"}
    $console->group('<Name>', '<Title>')-> [Console API]

Directing multiple messages to a group context:

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/GroupContext"}
    $group = $console->group('<Name>', '<Title>')->open();
    $console-> [Console API]
    $group->close();

INFO: Specifying a `<Name>` is optional.

INFO: If the `<Title>` argument is not provided the first message logged to the group becomes the title.

NOTE: When opening groups they must be closed in the same order!

NOTE: You can log to the same group in different parts of an application without keeping track of the `$group` variable as long as the group name is the
same. The group will appear in the group hierarchy (if multiple nested groups) depending on where a group is first logged.


Conditional Logging
-------------------

NOTE: Conditional logging is currently **only supported by [DeveloperCompanion](Clients#devcomp) when logging to the `request` target and inspecting via the
_Companion Window_**!

By default all logged messages are sent to the client. To conditionally send specific messages, only if requested by client, one or multiple messages
may be wrapped in an `on()` handler.

Conditional logging by name:

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/ConditionalByName"}
    $console->on('<Name>')-> [Console API]

Directing multiple messages to a conditional context:

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/ConditionalContext"}
    $on = $console->on('<Name>')->open();
    $console-> [Console API]
    $on->close();

NOTE: When opening contexts they must be closed in the same order!

Declared conditions may be used for flow control:

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/ConditionalFlowControl"}
    if($console->on('<Name>')->is(true)) {
        // conditionally execute
    }

INFO: It is **imperative** that this feature is only used for **debugging and development related purposes**. It will only ever evaluate to `TRUE` if
an authorized client is detected and the condition is enabled on the client.


Insight/Package API
===================
{: id="package-api"}

The *Insight/Package API* is used to record information about the application package.

    CODE: {"lang":"php"}
    $package = FirePHP::to('package');


Quick Links
-----------

To add links for a package that will be displayed as buttons in the *Companion Window* use:

    
    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?x-insight=inspect&action=run&snippet=insight-devcomp/snippets/Package-QuickLinks"}
    $package->addQuickLink('Link 1', 'http://www.firephp.org/');
    // or
    $package->addQuickLink('Link 2', array(
        'target' => 'window',  // tab (default), window or hidden
        'url' => 'http://www.firephp.org/'
    ));

NOTE: Links added this way will augment links already added via the `package.json` config file. See [here](Configuration/Advanced) for more info.


Insight/Control API
===================
{: id="control-api"}

The *Insight/Control API* is used to control the client in the context of the request.

    CODE: {"lang":"php"}
    $controller = FirePHP::to('controller');


Triggers
--------

Schedule an *inspect* event for the current request which will be executed by the client once the entire response is received by the browser.
This will cause the client to focus on the data sent while the request executed.

    CODE: {"lang":"php"}
    $controller->triggerInspect();

NOTE: This is equivalent to `$console->show();`

INFO: There are [several ways](../Workflow#inspecting-requests) to inspect a given request.


Insight/FirePHP API
===================
    
The *Insight/FirePHP API* provides utility functions to make development and monitoring easier.

    CODE: {"lang":"php"}
    $firephp = FirePHP::plugin('firephp');


Convenience Logging for Ad-hock Debugging
-----------------------------------------
{: id="firephp-api-declareP"}

Fumbling with `$console` objects can become tedious if you just want to quickly log a variable during development. A `p()` shortcut function can be made
available to easily *print* variables to a console.

    
    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/FirePHP-declareP"}
    // Log p() messages to the Firebug Console
    $firephp->declareP();
    
    // Log p() messages to a request console called Ad-hock
    $firephp->declareP('Ad-hock', true);
    
    // Log p() messages to the provided $console
    $console = FirePHP::to('request')->console('Debug');
    $firephp->declareP($console, true);

INFO: The second argument to `declareP()` specifies whether an *inspect* for the request should be [triggered](Insight#control-api). This will automatically open
the *Companion Window* and load the request data as soon as the `p()` function is used.

Once declared, to *print* variables simply use:

    CODE: {"lang":"php"}
    p($variable); // or
    p($variable, 'Label');

NOTE: The `p()` calls **should not stay in your code** and are intended for use during development only!


Information
-----------

Log the current *FirePHP* version to a *FirePHP* console.

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/FirePHP-LogVersion"}
    $firephp->logVersion(); // or
    $firephp->logVersion($console);


Recording Environment
---------------------

Send information about the PHP environment to an *Environment* console.

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/FirePHP-RecordEnvironment"}
    $firephp->recordEnvironment(); // or
    $firephp->recordEnvironment($console);


Constants
=========
{: id="constants"}

Insight Constants
-----------------

    CODE: {"lang":"php"}
    define('INSIGHT_CONFIG_PATH', <string>);
    define('INSIGHT_IPS', <string>);
    define('INSIGHT_AUTHKEYS', <string>);
    define('INSIGHT_PATHS', <string>);
    define('INSIGHT_SERVER_PATH', <string>);

See [Install](Install) for more information.


FirePHP Constants
-----------------

    CODE: {"lang":"php"}
    define('FIREPHP_ACTIVATED', <boolean>);
    
May be set to `FALSE` **prior** to [including FirePHP](Install) to force-deactivate *FirePHP*. This will cause all logging
calls to be ignored on the server and no data will be sent to the client as if *FirePHP* was never installed on the server.

If the constant is not set prior to including *FirePHP* it will be automatically set to `TRUE` (if client detected, `FALSE` otherwise) when *FirePHP*
loads and can be used in application code to enable logging and debugging facilities as needed if applicable.

    CODE: {"lang":"php"}
    if(FIREPHP_ACTIVATED) ...

If set to `TRUE` **prior** to [including FirePHP](Install), *FirePHP* will be force-activated even if no authorized client is detected.
If no authorized client is detected, data will be collected but not exposed. This is useful when using a payload listener to write the data to disk
(or alternate storage) for later access. See [Advanced Features](Insight#advanced-features) below for more information.


Advanced Features
=================
{: id="advanced-features"}


Payload Listener
----------------

A payload listener may be registered that will fire at the end of the request. The listener will be provided with all the data collected during the request.
This is useful in cases where the data should be written to disk or alternate storage for later debugging purposes.

NOTES: Typically data will only be collected if an authorized client is detected. To force-activate data collection use the `FIREPHP_ACTIVATED` constant.
See [Constants](Insight#constants).

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/PayloadListener"}
    define('FIREPHP_ACTIVATED', true);
    require_once('FirePHP/Init.php');        
    class PayloadListener {
        public function onPayload($request, $payload) {
            echo($payload);
        }
    }
    Insight_Helper::getInstance()->registerListener('payload', new PayloadListener());

To send the collected payload to a client (at a later point in time) see *Send Raw Payload* below.


Send Raw Payload
----------------

Previously collected payload data (see *Payload Listener* above) may be relayed to a client as follows:

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/RelayPayload"}
    require_once('FirePHP/Init.php');
    Insight_Helper::getInstance()->relayPayload($payload)
