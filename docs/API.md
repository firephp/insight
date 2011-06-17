    
The *FirePHP API* is concerned with providing an interface to interact with *FirePHP* compatible clients. It is implemented as a PHP library
and included at the beginning of a script. See [Install](Install) for setup instructions.


History
=======
   
The same *FirePHP API* has been around since the beginning (2007) and has established a debugging API modeled after the
[Firebug Console API](http://getfirebug.com/wiki/index.php/Console_API) which had been used to send messages to the
[Firebug Console](http://getfirebug.com/commandline). The [1. release](Install) introduces a new, much more flexible API
(based on the [insight](http://github.com/cadorn/insight)project) that supports the kind of features needed for a more advanced debugging approach.
In the interest of backwards compatibility the traditional API is still available and will continue to be maintained.
    
        <table class="pivot">
            <tr>
                <th>Supported Clients</th>
                <th>Traditional API</th>
                <th>Insight API</th>
            </tr>
            <tr>
                <td><a href="http://getfirebug.com/commandline" target="_blank">Firebug Console</a></td>
                <td class="center">
                    via <a href="http://www.firephp.org/" target="_blank">FirePHP Extension</a> or<br/>
                    via <a href="http://www.developercompanion.com/" target="_blank">DeveloperCompanion</a>
                </td>
                <td class="center">
                    <strike>via <a href="http://www.fireconsole.org/" target="_blank">FireConsole</a></strike> <span style="color: red">PLANNED</span> or<br/>
                    via <a href="http://www.developercompanion.com/" target="_blank">DeveloperCompanion</a>
                </td>
            </tr>
            <tr>
                <td><a href="http://www.developercompanion.com/" target="_blank">DeveloperCompanion</a></td>
                <td class="center"><div class="icon-yes"></div></td>
                <td class="center"><div class="icon-yes"></div></td>
            </tr>
        </table>
    
WARNING-SECURITY: Install the [DeveloperCompanion](http://www.developercompanion.com/) Firefox 4 Extension for maximum compatibility and security.

   
Traditional API
---------------
        
The *Traditional API* is well [documented](http://www.firephp.org/HQ/Use.htm) on the *FirePHP* website.
    
Object Oriented API:

        <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=classic-firebug/snippets/Traditional-ObjectOriented-API" class="chili-lang-php">define('INSIGHT_CONFIG_PATH', '...');
    require_once('FirePHP/Init.php');
    
    $firephp = FirePHP::getInstance(true);
    $firephp->log('Hello World');</code></pre></div>
    
Procedural API:

        <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=classic-firebug/snippets/Traditional-Procedural-API" class="chili-lang-php">define('INSIGHT_CONFIG_PATH', '...');
    require_once('FirePHP/fb.php');
    
    FB::log('Hello World');  // or
    fb('Hello World');
    </code></pre></div>
    
The *Traditional API* **always logs to the Firebug Console** unless you redirect it:
        
        <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Traditional-RedirectAPI" class="chili-lang-php">$firephp->setLogToInsightConsole('Firebug'); // or
    FB::setLogToInsightConsole('Firebug');</code></pre></div>

NOTE: This will log to a **[equest console](#FirePHP::to) called *Firebug*. You can also pass your own *$console* to log to.
    
The rest of the information on this page pertains to the *Insight API*.
    

Insight API
-----------
    
The new *Insight API* takes an object oriented approach and provides many more features than the *Traditional API*.
    
        <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/PageConsole-InsightAPI" class="chili-lang-php">define('INSIGHT_CONFIG_PATH', '...');
    require_once('FirePHP/Init.php');
    
    $inspector = FirePHP::to('page');
    $console = $inspector->console();
    $console->log('Hello World');</code></pre></div>
    
Many methods in the *Insight API* may be chained and work by successively cloning and augmenting a *message object* which is finally
sent off. In the example above *FirePHP::to* creates a *message object* targeting the *page* context. The context is further
refined to point to a *console*. One or more messages can now be sent to this same context.
    
NOTE: While some of the method names in the new *Insight API* are called the same as in the *Traditional API* they take different arguments.
    

Activation &amp Authorization
=============================
    
The *Insight API* must be activated and authorized to record and send data to the client. It is activated by default and may be deactivated from the
client. Authorization occurs on a per-hostname basis. See [Workflow](Workflow/#Activating Insight) for more information.
        
NOTE: If *Insight* is deactivated from the client the *Traditional API* will also be deactivated.


FirePHP:: to('&lt;target&gt;')
==============================

Initialize a fresh message context by specifying a *target*. Supported *targets* are:


controller = FirePHP::to('controller');
---------------------------------------
       
NOTE: See [Control API](#Control API) for how to use this context.

    
$inspector = FirePHP::to('request'); &nbsp;&nbsp;&nbsp; Request Context
-----------------------------------------------------------------------
    
Obtain a message context that will send messages to a named *request console*. These messages will show up in the *Companion Window*
**after an [*inspect* has been triggered](/Workflow/#Inspecting Requests)**.
        
        <pre><code class="chili-lang-php">$inspector = FirePHP::to('request');
    $console = $inspector->console('&lt;Tab Label&gt;');</code></pre>
        
NOTE: The *&lt;Tab Label&gt;* is optional and defaults to *Console*.

INFO: See [Console API](#Console API) for how to send different kinds of messages to this target.

    
$inspector = FirePHP::to('page'); &nbsp;&nbsp;&nbsp; Page Context
-----------------------------------------------------------------
    
Obtain a message context that will send messages to the *page console*. These messages will show up in the [Firebug](http://getfirebug.com/)
[Console](http://getfirebug.com/commandline).

        
        <pre><code class="chili-lang-php">$inspector = FirePHP::to('page'); 
    $console = $inspector->console();</code></pre>
        
INFO: See [Console API](#Console API) for how to send different kinds of messages to this target.

NOTE: You must have [Firebug](http://getfirebug.com/) installed.

Example:
    
        <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/PageConsole" class="chili-lang-php">$inspector = FirePHP::to('page');
    $console = $inspector->console();
    $console->log('Hello World');
    </code></pre></div>
    

$inspector = FirePHP::to('package'); &nbsp;&nbsp;&nbsp; Package Context
-----------------------------------------------------------------------
   
Obtain a message context that will record information about the application package. This info is used in the *Companion Window* when displaying
information about a request.
    
        <pre><code class="chili-lang-php">$package = FirePHP::to('package');</code></pre>
    
INFO: See [Package API](#Package API).

    
FirePHP::plugin('&lt;name&gt;')
===============================
    
Get a plugin by specifying a *name*. Supported *plugins* are:
    

$firephp = FirePHP::plugin('firephp');
--------------------------------------
    
The *firephp* plugin provides utility functions to make development and monitoring easier.
    
NOTE: See [FirePHP API](#FirePHP API) for how to use this plugin.

    
Control API
===========

The *Control API* is used to control the client in the context of the request.
    
        <div class="code"><pre><code class="chili-lang-php">$controller = FirePHP::to('controller');</code></pre></div>

    
Triggers
--------
    
Schedule an *inspect* event for the current request which will be executed by the client once the entire response is received by the browser.
This will cause the client to focus on the data sent while the request executed.

        <pre><code class="chili-lang-php">$controller->triggerInspect();</code></pre>
    
NOTE: There are [several ways](/Workflow/#Inspecting Requests) to inspect a given request.

    
Console API
===========
        
INFO: Use the following drop-down to set where the examples should appear.
    
        <select id="console-api-code-run-target-selector" class="monospaced">
          <option value="page">$console = FirePHP::to('page')->console(); &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> Firebug Console</option>
          <option value="request">$console = FirePHP::to('request')->console(); &nbsp;&nbsp; -> Companion Window</option>
        </select>    
    
NOTE: If logging to *Firebug* make sure you have the *Console*, *Net* and *Insight* panels enabled.
    
The *Console API* is used to send messages to a given target.
    
        <div class="code"><pre><code class="chili-lang-php">$console = FirePHP::to('&lt;target&gt;')->console('&lt;Tab Label&gt;');</code></pre></div>
    
NOTE: The *&lt;Tab Label&gt;* is optional and defaults to *Console*.

NOTE: The *&lt;target&gt;* defines where the messages will show up. See [FirePHP::to('&lt;target&gt;')](#FirePHP::to) above.
    

Variable Truncation
-------------------
        
NOTE: Large variables are *truncated* when traversing (nested arrays and object members) by preventing the transmission of data, beyond certain limits,
to the client.
    
By default variables are truncated according to the [encoder options](/Install/#Configuration Options). To avoid truncating variables use:
    
        <div class="code"><pre><code class="chili-lang-php">$console = $console->nolimit();</code></pre></div>
        
NOTE: Calling *nolimit(false)* will reset the option and cause variables to be truncated again.
    

String Trimming
---------------

NOTE: Large strings are *trimmed* when displayed in the client console.
    
By default pure string variables are trimmed to 500 characters and string values as part of arrays or objects to 50 characters. To avoid trimming
strings use:
    
        <div class="code"><pre><code class="chili-lang-php">$console = $console->notrim();</code></pre></div>
        
NOTE: Calling *notrim(false)* will reset the option and cause strings to be trimmed again.


Message Expansion
-----------------
        
By default logged messages are contracted when displayed in the console. To expand any message use:

        <div class="code"><pre><code class="chili-lang-php">$console = $console->expand();</code></pre></div>
    
NOTE: Use this to log expanded tables, groups, traces and general log messages.

    
Showing the Console
-------------------
        
By default logged messages are tracked by the client but not shown to the user unless they already have the console open. To force the console to
show use:
    
        <div class="code"><pre><code class="chili-lang-php">$console->show();</code></pre></div>
    
NOTE: If logging to the *Firebug Console* you must have *Firebug* open and the *Firebug Console* and *Net* panels enabled.

    
Options
-------
    
Individual encoder (and other) options can be set as needed:
    
        <div class="code"><pre><code class="chili-lang-php">$console = $console->option('&lt;Name&gt;', &lt;Value&gt;); // or
    $console = $console->options(array(
        '&lt;Name&gt;' => &lt;Value&gt;
    );</code></pre></div>
    
NOTE: Calling *option()* or *options()* without a value argument will return the current value.
    
Possible options are as follows (default values are shown):
    
        <div class="code"><pre><code class="chili-lang-php">encoder.depthNoLimit : false
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
    string.trim.enabled : &lt;undefined&gt;  // force/prevent string trimming in UI
    string.trim.length : 50  // string trim length
    string.trim.newlines : true  // force/prevent string newline expansion
    file : &lt;automatic&gt;  // sets file for message
    line : &lt;automatic&gt;  // sets line for message
    </code></pre></div>


Class Member Filters
--------------------

Manually setting a class member filter:

        <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/ManualClassFilter" class="chili-lang-php">$filter = array(
        'classes' => array(
            '&lt;ClassName&gt;' => array('&lt;MemberName&gt;')
        )
    );
    $console->filter($filter)-> [Console API]</code></pre></div>
    
        <p>Annotation-based class member filter:</p>
        <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/AnnotationClassFilter" class="chili-lang-php">class &lt;Name&gt; {
        /**
         * @insight filter=on
         */
        public $var;
    }</code></pre></div>


Logging Variables
-----------------
        
        <pre><code class="chili-lang-php">$console->log($Variable);</code></pre>


Message Priorities
------------------
    
        <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Priorities" class="chili-lang-php">$console->log($Variable);
    $console->info($Variable);
    $console->warn($Variable);
    $console->error($Variable);
    </code></pre></div>


Message Labels
--------------

	<div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Labels" class="chili-lang-php">$console->label('&lt;Label&gt;')-> [Console API]</code></pre></div>


Tables
------

        <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Tables" class="chili-lang-php">$header = array('Column 1 Heading', 'Column 2 Heading');
    $table = array(
        array('Row 1 Column 1 Value', 'Row 1 Column 2 Value'),
        array($Variable_r2c1, $Variable_r2c2)
    );
    $console->table('&lt;Title&gt;', $table);
    $console->table('&lt;Title&gt;', $table, $header);</code></pre></div>


Stack Traces
------------

        <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Traces" class="chili-lang-php">$console->trace('&lt;Label&gt;');</code></pre></div>


Console API - Groups
--------------------

Logging to a group by name:
        <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/LogToGroup" class="chili-lang-php">$console->group('&lt;Name&gt;', '&lt;Title&gt;')-> [Console API]</code></pre></div>
    
Directing multiple messages to a group context:
        <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/GroupContext" class="chili-lang-php">$group = $console->group('&lt;Name&gt;', '&lt;Title&gt;')->open();
    $console-> [Console API]
    $group->close();</code></pre></div>
    
INFO: Specifying a *Name* is optional.

INFO: If the *Title* argument is not provided the first message logged to the group becomes the title.

NOTE: When opening groups they must be closed in the same order!

NOTE: You can log to the same group in different parts of an application without keeping track of the $group variable as long as the group name is the
same. The group will appear in the group hierarchy (if multiple nested groups) depending on where a group is first logged.


Conditional Logging
-------------------

NOTE: Conditional logging is currently **only supported by DeveloperCompanion when logging to a *request context* and inspecting via the
*Companion Window***!
    
By default all logged messages are sent to the client. To conditionally send specific messages, only if requested by client, one or multiple messages
may be wrapped in an *on()* handler.
    
Conditional logging by name:

        <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/ConditionalByName" class="chili-lang-php">$console->on('&lt;Name&gt;')-> [Console API]</code></pre></div>

Directing multiple messages to a conditional context:

        <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/ConditionalContext" class="chili-lang-php">$on = $console->on('&lt;Name&gt;')->open();
    $console-> [Console API]
    $on->close();</code></pre></div>
    
NOTE: When opening contexts they must be closed in the same order!
        
Declared conditions may be used for flow control:
    
        <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/ConditionalFlowControl" class="chili-lang-php">if($console->on('&lt;Name&gt;')->is(true)) {
        // conditionally execute
    }</code></pre></div>
    
INFO: It is **imperative** that this feature is only used for **debugging and development related purposes**. It will only ever evaluate to *TRUE* if
an authorized client is detected and the condition is enabled on the client.


Package API
===========

The *Package API* is used to record information about the application package.
    
        <div class="code"><pre><code class="chili-lang-php">$package = FirePHP::to('package');</code></pre></div>


Quick Links
-----------

To add links for a package that will be displayed as buttons in the *Companion Window* use:
    
        <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?x-insight=inspect&action=run&snippet=insight-devcomp/snippets/Package-QuickLinks" class="chili-lang-php">$package->addQuickLink('Link 1', 'http://www.firephp.org/');
    // or
    $package->addQuickLink('Link 2', array(
        'target' => 'window',  // tab (default), window or hidden
        'url' => 'http://www.firephp.org/'
    ));</code></pre></div>
        
NOTE: Links added this way will augment links already added via the *package.json* config file. See [here](/Install/#Configuration Options) for more info.


FirePHP API
===========

INFO: Use the following drop-down to set where the examples should appear.

        <select id="firephp-api-code-run-target-selector" class="monospaced">
          <option value="page">$console = FirePHP::to('page')->console(); &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> Firebug Console</option>
          <option value="request">$console = FirePHP::to('request')->console(); &nbsp;&nbsp; -> Companion Window</option>
        </select>    
    
NOTE: If logging to *Firebug* make sure you have the *Console*, *Net* and *Insight* panels enabled.
    
The *FirePHP API* provides utility functions to make development and monitoring easier.
    
        <div class="code"><pre><code class="chili-lang-php">$firephp = FirePHP::plugin('firephp');</code></pre></div>


FirePHP declareP"></a>Convenience Logging for Ad-hock Debugging
---------------------------------------------------------------

Fumbling with *$console* objects can become tedious if you just want to quickly log a variable during development. A *p()* shortcut function can be made
available to easily *print* variables to a console.
    
        <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/FirePHP-declareP" class="chili-lang-php">// Log p() messages to the Firebug Console
    $firephp->declareP();
    
    // Log p() messages to a request console called Ad-hock
    $firephp->declareP('Ad-hock', true);
    
    // Log p() messages to the provided $console
    $console = FirePHP::to('request')->console('Debug');
    $firephp->declareP($console, true);</code></pre></div>
        
INFO: The second argument to *declareP()* specifies that an *inspect* for the request should be [triggered](#Control API). This will automatically open
the companion window and load the request data as soon as the *p()* function is used.

Once declared, to *print* variables simply use:

        <div class="code"><pre><code class="chili-lang-php">p($variable); // or
     p($variable, 'Label');</code></pre></div>
        
NOTE: The *p()* calls **should not stay in your code** and are intended for use during development only!


Information
-----------

Log the current FirePHP version to a *FirePHP* console.
    
        <div class="code"><pre><code selector="firephp-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/FirePHP-LogVersion" class="chili-lang-php">$firephp->logVersion(); // or
    $firephp->logVersion($console);</code></pre></div>


Recording Environment
---------------------

Send information about the PHP environment to an *Environment* console.
    
        <div class="code"><pre><code selector="firephp-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/FirePHP-RecordEnvironment" class="chili-lang-php">$firephp->recordEnvironment(); // or
    $firephp->recordEnvironment($console);</code></pre></div>


Constants
=========


Insight Constants
-----------------
        
        <div class="code"><pre><code class="chili-lang-php">define('INSIGHT_CONFIG_PATH', &lt;string&gt;);
    define('INSIGHT_IPS', &lt;string&gt;);
    define('INSIGHT_AUTHKEYS', &lt;string&gt;);
    define('INSIGHT_PATHS', &lt;string&gt;);
    define('INSIGHT_SERVER_PATH', &lt;string&gt;);</code></pre></div>
        
See [Install](Install/#Inclusion) for more information.


FirePHP Constants
-----------------
        
        <div class="code"><pre><code class="chili-lang-php">define('FIREPHP_ACTIVATED', &lt;boolean&gt;);</code></pre></div>
        
May be set to *FALSE* **prior** to <a href="../Install/#Inclusion">including FirePHP</a> to force-deactivate FirePHP. This will cause all logging
calls to be ignored on the server and no data will be sent to the client as if FirePHP was never installed on the server.
        
If the constant is not set prior to including FirePHP it will be automatically set to *TRUE* (if client detected, *FALSE* otherwise) when FirePHP
loads and can be used in application code to enable logging and debugging facilities as needed if applicable.
   
        <div class="code"><pre><code class="chili-lang-php">if(FIREPHP_ACTIVATED) ...</code></pre></div>
    
If set to *TRUE* **prior** to [including FirePHP](/Install/#Inclusion), FirePHP will be force-activated even if no authorized client is detected.
if no authorized client is detected, data will be collected but not exposed. This is useful when using a payload listener to write the data to disk
(or alternate storage) for later access. See [Advanced Features](#Advanced Features) for more information.


Advanced Features
=================

INFO: Use the following drop-down to set where the examples should appear.
    
        <select id="advanced-features-code-run-target-selector" class="monospaced">
          <option value="page">$console = FirePHP::to('page')->console(); &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> Firebug Console</option>
          <option value="request">$console = FirePHP::to('request')->console(); &nbsp;&nbsp; -> Companion Window</option>
        </select>    
    
NOTE: If logging to *Firebug* make sure you have the *Console*, *Net* and *Insight* panels enabled.


Payload Listener
----------------

A payload listener may be registered that will fire at the end of the request. The listener will be provided with all the data collected during the request.
This is useful in cases where the data should be written to disk or alternate storage for later debugging purposes.
    
NOTES: Typically data will only be collected if an authorized client is detected. To force-activate data collection use the *FIREPHP_ACTIVATED* constant.
See [Constants](#Constants).
        
        <div class="code"><pre><code selector="advanced-features-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/PayloadListener" class="chili-lang-php">define('FIREPHP_ACTIVATED', true);
    require_once('FirePHP/Init.php');        
    class PayloadListener {
        public function onPayload($request, $payload) {
            echo($payload);
        }
    }
    Insight_Helper::getInstance()->registerListener('payload', new PayloadListener());</code></pre></div>
   
To send the collected payload to a client (at a later point in time) see *Send Raw Payload* below.


Send Raw Payload
----------------

Previously collected payload data (see *Payload Listener* above) may be relayed to a client as follows:

        <div class="code"><pre><code selector="advanced-features-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/RelayPayload" class="chili-lang-php">require_once('FirePHP/Init.php');
    Insight_Helper::getInstance()->relayPayload($payload)</code></pre></div>