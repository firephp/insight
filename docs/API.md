
    <p>The <i>FirePHP API</i> is concerned with providing an interface to interact with <i>FirePHP</i> compatible clients.
    It is implemented as a PHP library and included at the beginning of a script. See <a href="../Install/">Install</a> for setup instructions.</p>
    
    <h1>History</h1>
    
    <p>The same <i>FirePHP API</i> has been around since the beginning (2007) and has established a debugging API modeled after
    the <a href="http://getfirebug.com/wiki/index.php/Console_API" target="_blank">Firebug Console API</a> which had been used to send messages to the <a href="http://getfirebug.com/commandline" target="_blank">Firebug Console</a>. The <a href="../Install/">1. release</a>
    introduces a new, much more flexible API (based on the <a href="http://github.com/cadorn/insight" target="_blank">insight</a> project) that supports the kind of features needed for a more advanced debugging approach.
    In the interest of backwards compatibility the traditional API is still available and will continue to be maintained.</p>


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

    <p class="warning-security">Install the <a href="http://www.developercompanion.com/" target="_blank">DeveloperCompanion</a> Firefox 4 Extension for maximum compatibility and security.</p>


    <h3><a name="Traditional API"></a>Traditional API</h3>
    
    <p>The <i>Traditional API</i> is well <a href="http://www.firephp.org/HQ/Use.htm" target="_blank">documented</a> on the <i>FirePHP</i> website.</p>

    <p>Object Oriented API:</p>
    <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=classic-firebug/snippets/Traditional-ObjectOriented-API" class="chili-lang-php">define('INSIGHT_CONFIG_PATH', '...');
require_once('FirePHP/Init.php');

$firephp = FirePHP::getInstance(true);
$firephp->log('Hello World');</code></pre></div>

    <p>Procedural API:</p>
    <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=classic-firebug/snippets/Traditional-Procedural-API" class="chili-lang-php">define('INSIGHT_CONFIG_PATH', '...');
require_once('FirePHP/fb.php');

FB::log('Hello World');  // or
fb('Hello World');
</code></pre></div>

    <p>The <i>Traditional API</i> <b>always logs to the Firebug Console</b> unless you redirect it:
    
    <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Traditional-RedirectAPI" class="chili-lang-php">$firephp->setLogToInsightConsole('Firebug'); // or
FB::setLogToInsightConsole('Firebug');</code></pre></div>
    <p class="note">This will log to a <b><a href="#FirePHP::to">request console</a></b> called <i>Firebug</i>. You can also pass your own <i>$console</i> to log to.</p>

    <p>The rest of the information on this page pertains to the <i>Insight API</i>.</p>

    <h3><a name="Insight API"></a>Insight API (PREFERRED)</h3>

    <p>The new <i>Insight API</i> takes an object oriented approach and provides many more features than the <i>Traditional API</i>.</p>

    <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/PageConsole-InsightAPI" class="chili-lang-php">define('INSIGHT_CONFIG_PATH', '...');
require_once('FirePHP/Init.php');

$inspector = FirePHP::to('page');
$console = $inspector->console();
$console->log('Hello World');</code></pre></div>

    <p>Many methods in the <i>Insight API</i> may be chained and work by successively cloning and augmenting a <i>message object</i> which is finally
    sent off. In the example above <i>FirePHP::to</i> creates a <i>message object</i> targeting the <i>page</i> context. The context is further
    refined to point to a <i>console</i>. One or more messages can now be sent to this same context.</p>

    <p class="note">While some of the method names in the new <i>Insight API</i> are called the same as in the <i>Traditional API</i> they
    take different arguments.</p>

    <h1>Activation &amp Authorization</h1>

    <p>The <i>Insight API</i> must be activated and authorized to record and send data to the client. It is activated by default and may be deactivated from
    the client. Authorization occurs on a per-hostname basis. See <a href="../Workflow/#Activating Insight">Workflow</a> for more information.</p>
    
    <p class="note">If <i>Insight</i> is deactivated from the client the <i>Traditional API</i> will also be deactivated.</p>


    <h1><a name="FirePHP::to"></a>FirePHP::to('&lt;target&gt;')</h1>

    <p>Initialize a fresh message context by specifying a <i>target</i>. Supported <i>targets</i> are:</p>

    <h3>$controller = FirePHP::to('controller');</h3>
    
    <p class="note">See <a href="#Control API">Control API</a> for how to use this context.</p>

    <h3>$inspector = FirePHP::to('request'); &nbsp;&nbsp;&nbsp; Request Context</h3>

    <p>Obtain a message context that will send messages to a named <i>request console</i>. These messages will show up in
    the <i>Companion Window</i> <b>after an <a href="../Workflow/#Inspecting Requests"><i>inspect</i> has been triggered</a></b>.</p>
    
    <pre><code class="chili-lang-php">$inspector = FirePHP::to('request');
$console = $inspector->console('&lt;Tab Label&gt;');</code></pre>
    
    <p class="note">The <i>&lt;Tab Label&gt;</i> is optional and defaults to <i>Console</i>.</p>
    <p class="info">See <a href="#Console API">Console API</a> for how to send different kinds of messages to this target.</p>


    <h3>$inspector = FirePHP::to('page'); &nbsp;&nbsp;&nbsp; Page Context</h3>

    <p>Obtain a message context that will send messages to the <i>page console</i>. These messages will show up in the <i><a target="_blank" href="http://getfirebug.com/">Firebug</a> <a target="_blank" href="http://getfirebug.com/commandline">Console</a></i>.</p>
    
    <pre><code class="chili-lang-php">$inspector = FirePHP::to('page'); 
$console = $inspector->console();</code></pre>
    
    <p class="info">See <a href="#Console API">Console API</a> for how to send different kinds of messages to this target.</p>
    <p class="note">You must have <a target="_blank" href="http://getfirebug.com/">Firebug</a> installed.</p>
    
    <p>Example:</p>

    <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/PageConsole" class="chili-lang-php">$inspector = FirePHP::to('page');
$console = $inspector->console();
$console->log('Hello World');
</code></pre></div>

    <h3>$inspector = FirePHP::to('package'); &nbsp;&nbsp;&nbsp; Package Context</h3>

    <p>Obtain a message context that will record information about the application package. This info is used in the
    <i>Companion Window</i> when displaying information about a request.</p>

    <pre><code class="chili-lang-php">$package = FirePHP::to('package');</code></pre>

    <p class="info">See <a href="#Package API">Package API</a>.</p>



    <h1>FirePHP::plugin('&lt;name&gt;')</h1>

    <p>Get a plugin by specifying a <i>name</i>. Supported <i>plugins</i> are:</p>

    <h3>$firephp = FirePHP::plugin('firephp');</h3>

    <p>The <i>firephp</i> plugin provides utility functions to make development and monitoring easier.</p>

    <p class="note">See <a href="#FirePHP API">FirePHP API</a> for how to use this plugin.</p>


    <h1><a name="Control API"></a>Control API</h1>

    <p>The <i>Control API</i> is used to control the client in the context of the request.</p>

    <div class="code"><pre><code class="chili-lang-php">$controller = FirePHP::to('controller');</code></pre></div>

    <h3>Triggers</h3>

    <p>Schedule an <i>inspect</i> event for the current request which will be executed by the client once the entire response is received
    by the browser. This will cause the client to focus on the data sent while the request executed.</p>

    <pre><code class="chili-lang-php">$controller->triggerInspect();</code></pre>

    <p class="note">There are <a href="../Workflow/#Inspecting Requests">several ways</a> to inspect a given request</p>


    <h1><a name="Console API"></a>Console API</h1>
    
    <p class="info">Use the following drop-down to set where the examples should appear.</p>

    <select id="console-api-code-run-target-selector" class="monospaced">
      <option value="page">$console = FirePHP::to('page')->console(); &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> Firebug Console</option>
      <option value="request">$console = FirePHP::to('request')->console(); &nbsp;&nbsp; -> Companion Window</option>
    </select>    

    <p class="note">If logging to <i>Firebug</i> make sure you have the <i>Console</i>, <i>Net</i> and <i>Insight</i> panels enabled.</p>

    <p>The <i>Console API</i> is used to send messages to a given target.</p>

    <div class="code"><pre><code class="chili-lang-php">$console = FirePHP::to('&lt;target&gt;')->console('&lt;Tab Label&gt;');</code></pre></div>

    <p class="note">The <i>&lt;Tab Label&gt;</i> is optional and defaults to <i>Console</i>.</p>
    <p class="note">The <i>&lt;target&gt;</i> defines where the messages will show up. See <a href="#FirePHP::to">FirePHP::to('&lt;target&gt;')</a> above.</p>

    <h3>Variable Truncation</h3>
    
    <p class="note">Large variables are <i>truncated</i> when traversing (nested arrays and object members) by preventing the transmission of data,
    beyond certain limits, to the client.</p>

    <p>By default variables are truncated according to the <a href="../Install/#Configuration Options">encoder options</a>. To avoid
    truncating variables use:</p>

    <div class="code"><pre><code class="chili-lang-php">$console = $console->nolimit();</code></pre></div>
    
    <p class="note">Calling <i>nolimit(false)</i> will reset the option and cause variables to be truncated again.</p>

    <h3>String Trimming</h3>

    <p class="note">Large strings are <i>trimmed</i> when displayed in the client console.</p>

    <p>By default pure string variables are trimmed to 500 characters and string values as part of arrays or objects to 50 characters. To avoid
    trimming strings use:</p>

    <div class="code"><pre><code class="chili-lang-php">$console = $console->notrim();</code></pre></div>
    
    <p class="note">Calling <i>notrim(false)</i> will reset the option and cause strings to be trimmed again.</p>

    <h3>Message Expansion</h3>
    
    <p>By default logged messages are contracted when displayed in the console. To expand any message use:</p>

    <div class="code"><pre><code class="chili-lang-php">$console = $console->expand();</code></pre></div>

    <p class="note">Use this to log expanded tables, groups, traces and general log messages.</p>


    <h3>Showing the Console</h3>
    
    <p>By default logged messages are tracked by the client but not shown to the user unless they already have the console open.
    To force the console to show use:</p>

    <div class="code"><pre><code class="chili-lang-php">$console->show();</code></pre></div>

    <p class="note">If logging to the <i>Firebug Console</i> you must have <i>Firebug</i> open and the <i>Firebug Console</i> and <i>Net</i> panels enabled.</p>


    <h3>Options</h3>

    <p>Individual encoder (and other) options can be set as needed:</p>

    <div class="code"><pre><code class="chili-lang-php">$console = $console->option('&lt;Name&gt;', &lt;Value&gt;); // or
$console = $console->options(array(
    '&lt;Name&gt;' => &lt;Value&gt;
);</code></pre></div>

    <p class="note">Calling <i>option()</i> or <i>options()</i> without a value argument will return the current value.</p>

    <p>Possible options are as follows (default values are shown):</p>

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

    <h3>Class Member Filters</h3>
    <p>Manually setting a class member filter:</p>
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



    <h3>Logging Variables</h3>
    
    <pre><code class="chili-lang-php">$console->log($Variable);</code></pre>

    <h3>Message Priorities</h3>

    <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Priorities" class="chili-lang-php">$console->log($Variable);
$console->info($Variable);
$console->warn($Variable);
$console->error($Variable);
</code></pre></div>

    <h3>Message Labels</h3>
    <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Labels" class="chili-lang-php">$console->label('&lt;Label&gt;')-> [Console API]</code></pre></div>


    <h3>Tables</h3>
    <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Tables" class="chili-lang-php">$header = array('Column 1 Heading', 'Column 2 Heading');
$table = array(
    array('Row 1 Column 1 Value', 'Row 1 Column 2 Value'),
    array($Variable_r2c1, $Variable_r2c2)
);
$console->table('&lt;Title&gt;', $table);
$console->table('&lt;Title&gt;', $table, $header);</code></pre></div>

    <h3>Stack Traces</h3>
    <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Traces" class="chili-lang-php">$console->trace('&lt;Label&gt;');</code></pre></div>

    <h3><a name="Console API - Groups"></a>Groups</h3>
    <p>Logging to a group by name:</p>
    <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/LogToGroup" class="chili-lang-php">$console->group('&lt;Name&gt;', '&lt;Title&gt;')-> [Console API]</code></pre></div>

    <p>Directing multiple messages to a group context:</p>
    <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/GroupContext" class="chili-lang-php">$group = $console->group('&lt;Name&gt;', '&lt;Title&gt;')->open();
$console-> [Console API]
$group->close();</code></pre></div>

    <p class="info">Specifying a <i>Name</i> is optional.</p>
    <p class="info">If the <i>Title</i> argument is not provided the first message logged to the group becomes the title.</p>
    <p class="note">When opening groups they must be closed in the same order!</p>
    <p class="note">You can log to the same group in different parts of an application without keeping track of the $group variable as long as the group name is the same. The group will appear in the group hierarchy (if multipel nested groups) depending on where a group is first logged.</p>

    <h3>Conditional Logging</h3>

    <p class="note">Conditional logging is currently <b>only supported by DeveloperCompanion when logging to a <i>request context</i> and inspecting via the <i>Companion Window</i></b>!</p>

    <p>By default all logged messages are sent to the client. To conditionally send specific messages, only if requested by client,
    one or multiple messages may be wrapped in an <i>on()</i> handler.</p>

    <p>Conditional logging by name:</p>
    <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/ConditionalByName" class="chili-lang-php">$console->on('&lt;Name&gt;')-> [Console API]</code></pre></div>

    <p>Directing multiple messages to a conditional context:</p>
    <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/ConditionalContext" class="chili-lang-php">$on = $console->on('&lt;Name&gt;')->open();
$console-> [Console API]
$on->close();</code></pre></div>

    <p class="note">When opening contexts they must be closed in the same order!</p>
    
    <p>Declared conditions may be used for flow control:</p>

    <div class="code"><pre><code selector="console-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/ConditionalFlowControl" class="chili-lang-php">if($console->on('&lt;Name&gt;')->is(true)) {
    // conditionally execute
}</code></pre></div>

    <p class="info">It is <b>imperative</b> that this feature is only used for <b>debugging and development related purposes</b>. It will only ever evaluate to
    <i>TRUE</i> if an authorized client is detected and the condition is enabled on the client.</p>


    <h1><a name="Package API"></a>Package API</h1>

    <p>The <i>Package API</i> is used to record information about the application package.</p>

    <div class="code"><pre><code class="chili-lang-php">$package = FirePHP::to('package');</code></pre></div>

    <h3>Quick Links</h3>

    <p>To add links for a package that will be displayed as buttons in the <i>Companion Window</i> use:</p>

    <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?x-insight=inspect&action=run&snippet=insight-devcomp/snippets/Package-QuickLinks" class="chili-lang-php">$package->addQuickLink('Link 1', 'http://www.firephp.org/');
// or
$package->addQuickLink('Link 2', array(
    'target' => 'window',  // tab (default), window or hidden
    'url' => 'http://www.firephp.org/'
));</code></pre></div>
    
    <p class="note">Links added this way will augment links already added via the <i>package.json</i> config file. See <a href="../Install/#Configuration Options">here</a> for more info.</p>


    <h1><a name="FirePHP API"></a>FirePHP API</h1>

    <p class="info">Use the following drop-down to set where the examples should appear.</p>

    <select id="firephp-api-code-run-target-selector" class="monospaced">
      <option value="page">$console = FirePHP::to('page')->console(); &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> Firebug Console</option>
      <option value="request">$console = FirePHP::to('request')->console(); &nbsp;&nbsp; -> Companion Window</option>
    </select>    

    <p class="note">If logging to <i>Firebug</i> make sure you have the <i>Console</i>, <i>Net</i> and <i>Insight</i> panels enabled.</p>

    <p>The <i>FirePHP API</i> provides utility functions to make development and monitoring easier.</p>

    <div class="code"><pre><code class="chili-lang-php">$firephp = FirePHP::plugin('firephp');</code></pre></div>

    <h3><a name="FirePHP declareP"></a>Convenience Logging for Ad-hock Debugging</h3>

    <p>Fumbling with <i>$console</i> objects can become tedious if you just want to quickly log a variable during development.
    A <i>p()</i> shortcut function can be made available to easily <i>print</i> variables to a console.</p>

    <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/FirePHP-declareP" class="chili-lang-php">// Log p() messages to the Firebug Console
$firephp->declareP();

// Log p() messages to a request console called Ad-hock
$firephp->declareP('Ad-hock', true);

// Log p() messages to the provided $console
$console = FirePHP::to('request')->console('Debug');
$firephp->declareP($console, true);</code></pre></div>
    
    <p class="info">The second argument to <i>declareP()</i> specifies that an <i>inspect</i> for the request should be
    <a href="#Control API">triggered</a>. This will automatically open the companion window and load the request data
    as soon as the <i>p()</i> function is used.</p>
    
    <p>Once declared, to <i>print</i> variables simply use:</p>

    <div class="code"><pre><code class="chili-lang-php">p($variable); // or
p($variable, 'Label');</code></pre></div>
    
    <p class="note">The <i>p()</i> calls <b>should not stay in your code</b> and are intended for use during development only!</p>


    <h3>Information</h3>
    
    <p>Log the current FirePHP version to a <i>FirePHP</i> console.</p>

    <div class="code"><pre><code selector="firephp-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/FirePHP-LogVersion" class="chili-lang-php">$firephp->logVersion(); // or
$firephp->logVersion($console);</code></pre></div>


    <h3>Recording Environment</h3>
    <p>Send information about the PHP environment to an <i>Environment</i> console.</p>

    <div class="code"><pre><code selector="firephp-api-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/FirePHP-RecordEnvironment" class="chili-lang-php">$firephp->recordEnvironment(); // or
$firephp->recordEnvironment($console);</code></pre></div>


    <h1><a name="Constants"></a>Constants</h1>
    
    <h3>Insight Constants</h3>
    
    <div class="code"><pre><code class="chili-lang-php">define('INSIGHT_CONFIG_PATH', &lt;string&gt;);
define('INSIGHT_IPS', &lt;string&gt;);
define('INSIGHT_AUTHKEYS', &lt;string&gt;);
define('INSIGHT_PATHS', &lt;string&gt;);
define('INSIGHT_SERVER_PATH', &lt;string&gt;);</code></pre></div>
    
    <p>See <a href="../Install/#Inclusion">Install</a> for more information.</p>

    <h3>FirePHP Constants</h3>
    
    <div class="code"><pre><code class="chili-lang-php">define('FIREPHP_ACTIVATED', &lt;boolean&gt;);</code></pre></div>
    
    <p>May be set to <i>FALSE</i> <b>prior</b> to <a href="../Install/#Inclusion">including FirePHP</a> to force-deactivate FirePHP. This will
    cause all logging calls to be ignored on the server and no data will be sent to the client as if FirePHP was never installed on the server.</p>
    
    <p>If the constant is not set prior to including FirePHP it will be automatically set to <i>TRUE</i> (if client detected, <i>FALSE</i> otherwise)
    when FirePHP loads and can be used in application code to enable logging and debugging facilities as needed if applicable.</p>

    <div class="code"><pre><code class="chili-lang-php">if(FIREPHP_ACTIVATED) ...</code></pre></div>

    <p>If set to <i>TRUE</i> <b>prior</b> to <a href="../Install/#Inclusion">including FirePHP</a>, FirePHP will be force-activated even if no
    authorized client is detected. If no authorized client is detected, data will be collected but not exposed. This is useful when using
    a payload listener to write the data to disk (or alternate storage) for later access. See <a href="#Advanced Features">Advanced Features</a> for more information.</p>

    <h1><a name="Advanced Features"></a>Advanced Features</h1>

    <p class="info">Use the following drop-down to set where the examples should appear.</p>

    <select id="advanced-features-code-run-target-selector" class="monospaced">
      <option value="page">$console = FirePHP::to('page')->console(); &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> Firebug Console</option>
      <option value="request">$console = FirePHP::to('request')->console(); &nbsp;&nbsp; -> Companion Window</option>
    </select>    

    <p class="note">If logging to <i>Firebug</i> make sure you have the <i>Console</i>, <i>Net</i> and <i>Insight</i> panels enabled.</p>

    <h3>Payload Listener</h3>

    <p>A payload listener may be registered that will fire at the end of the request. The listener will be provided with all the data collected during the request.
    This is useful in cases where the data should be written to disk or alternate storage for later debugging purposes.</p>

    <p class="note">Typically data will only be collected if an authorized client is detected. To force-activate data collection use the
    <i>FIREPHP_ACTIVATED</i> constant. See <a href="#Constants">Constants</a>.</p>
    
    <div class="code"><pre><code selector="advanced-features-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/PayloadListener" class="chili-lang-php">define('FIREPHP_ACTIVATED', true);
require_once('FirePHP/Init.php');        
class PayloadListener {
    public function onPayload($request, $payload) {
        echo($payload);
    }
}
Insight_Helper::getInstance()->registerListener('payload', new PayloadListener());</code></pre></div>

    <p>To send the collected payload to a client (at a later point in time) see <i>Send Raw Payload</i> below.</p>

    <h3>Send Raw Payload</h3>

    <p>Previously collected payload data (see <i>Payload Listener</i> above) may be relayed to a client as follows:</p>

    <div class="code"><pre><code selector="advanced-features-code-run-target-selector" run="/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/RelayPayload" class="chili-lang-php">require_once('FirePHP/Init.php');
Insight_Helper::getInstance()->relayPayload($payload)</code></pre></div>