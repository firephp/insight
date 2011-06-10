
<div class="summary">
    If your question is not covered below you can get support concerning the <i>FirePHP Server Library</i> <a href="../OpenSource/">here</a>
    and the <i>DeveloperCompanion Client Extension</i> <a href="/Companion/Support/">here</a>.</a>
</div>

<div class="body">


<h1>General</h1>


<div class="faq">
<h2>Where do I get Support, report Bugs and send Feedback?</h2>

    <p>There are several channels depending on your needs and whether it involves the server library or client extension.</p>

    <h3>Concerning the <i>FirePHP Server Library</i> specifically</h3>

    <p>Please see the <i>FirePHP</i> <a href="../OpenSource/">Open Source</a> page.</p>

    <h3>Concerning the <i>FirePHP Companion Client Extension</i></h3>

    <p>Please see the <i>Companion</i> <a href="/Companion/Support/">Support</a> page.</p>

    <h3>Private &amp; Confidential</h3>

    <p>Please see the <i>Companion</i> <a href="/Companion/Support/#Private &amp; Confidential Support">Support</a> page.</p>
</div>

<div class="faq">
<h2>Who is behind all this?</h2>

    <p><a target="_blank" href="http://www.christophdorn.com/">Christoph Dorn</a> has been developing <i>FirePHP</i> since 2007 and the <i>Companion Tools</i> are his attempt to
    <a href="/Companion/About/">make things easier for developers</a>.</p>

</div>

<h1>Installing FirePHP</h1>


<div class="faq">
<h2>Do I need to uninstall the FirePHP Extension to use FirePHP Companion?</h2>

    <p>Yes! You need to disable or uninstall it. <a target="_blank" href="http://www.christophdorn.com/Tools/#FirePHP Companion LITE">FirePHP Companion LITE</a> is designed to replace the existing <a href="https://addons.mozilla.org/en-US/firefox/addon/6149/" target="_blank">FirePHP Firefox Extension</a>.</p>
</div>

<div class="faq">
<h2><a name="How do I upgrade to FirePHP 1.0"></a>How do I upgrade to FirePHP 1.0?</h2>
    
    <p>You can find a step-by-step guide here: <a target="_blank" href="http://upgrade.firephp.org/">upgrade.firephp.org</a></p>
</div>


<div class="faq">
<h2><a name="Is FirePHP 1.0 backwards compatible"></a>Is the 1.0 release of the FirePHP Server Library backwards compatible?</h2>
    <p>Yes. It is 100% backwards compatible and existing code should continue to work without modification.</p>
    
    <h3>Traditional Inclusion (DEPRECATED)</h3>
    
    <p>If <i>FirePHP 1.0</i> is included in the following way (i.e. the way it has been included in the past), messages will be directed to the <b><i>Firebug Console</i></b> if the <a href="https://addons.mozilla.org/en-US/firefox/addon/6149/" target="_blank">FirePHP Firefox Extension</a> or <a target="_blank" href="http://www.christophdorn.com/Tools/#FirePHP Companion LITE">FirePHP Companion LITE</a> is installed on the client.

    <pre><code class="chili-lang-php">require_once('FirePHPCore/FirePHP.class.php'); // or
require_once('FirePHPCore/fb.php');</code></pre>

    <p class="warning-security">Please note that if <i>FirePHP 1.0</i> is included in this way the new security features do <b>NOT</b> take effect!
    You are encouraged to upgrade the inclusion method and use <a target="_blank" href="http://www.christophdorn.com/Tools/#FirePHP Companion LITE">FirePHP Companion LITE</a> on the client.</p>

    <h3>New Inclusion (PREFERRED)</h3>

    <p>If <i>FirePHP 1.0</i> is included in the following way, messages will be directed to the <b><i>Firebug Console</i> or <i>FirePHP Companion Window</i></b> if <a target="_blank" href="http://www.christophdorn.com/Tools/#FirePHP Companion LITE">FirePHP Companion LITE</a> is installed on the client.
    This method of inclusion takes full advantage of the new build-in security features. See <a href="../Install/">Install</a> for more information.</p>

    <pre><code class="chili-lang-php">require_once('FirePHP/Init.php'); // or
require_once('FirePHP/fb.php');</code></pre>

    <p class="note">Make sure you have <i>FirePHP</i> <a href="../Install/">configured</a> and <i>Insight</i> <a href="../Workflow/#Activating Insight">activated</a> and <a href="../Workflow/#Authorizing Insight">authorized</a>.</p>

    <p>You can find an upgrade guide here: <a target="_blank" href="http://upgrade.firephp.org/">upgrade.firephp.org</a></p>
</div>


<div class="faq">
<h2>It is not working! How do I troubleshoot?</h2>

    <p>The best place to start is the <a href="/Tools/FirePHPCompanion/Test/">Test</a> tool. If you need additional help you can get support <a href="../OpenSource/">here</a>.</p>
    
    <p>One of the <b>most common problems</b> is an incorrect setting for the <i>&lt;ServerScript.php&gt;</i> path. This is evidenced by a
    <i>No wildfire messages detected</i> message in the <i>Firebug Console</i>.</p>
    
    <p>The <i>&lt;ServerScript.php&gt;</i> path must be set to the path of a PHP script relative to the hostname that includes FirePHP just like the
    rest of your application does. It typically refers to the homepage of the application. The path is set as follows depending on which configuration
    method is used:</p>
    
    <h3>Minimal Configuration</h3>

    <pre><code class="chili-lang-php">define('INSIGHT_SERVER_PATH', '/&lt;ServerScript.php&gt;');</code></pre>

    <h3>package.json based Configuration</h3>

    <pre><code class="chili-lang-javascript">{
  "implements": {
    "cadorn.org/insight/@meta/config/0": {
      "server": {
        "path": "/&lt;ServerScript.php&gt;"
      }
    }
  }
}</code></pre>
    
    <p>For more information about all configuration options see <a href="../Install/">Install</a>.</p>   
    
</div>

<div class="faq">
<h2>How do I add multiple authorization keys on the server?</h2>

    <p>Multiple authorization keys can be used with any server installation to allow more than one client to access <i>FirePHP</i>.</p>

    <h3>If using constants</h3>

    <pre><code class="chili-lang-php">define('INSIGHT_AUTHKEYS', 'client-auth-key-1,client-auth-key-2,...');</code></pre>

    <h3>If using <i>credentials.json</i></h3>

    <pre><code class="chili-lang-php">{
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
}</code></pre>
    
    <p>See <a href="../Install/">Install</a> for information on the various configuration options.</p>

</div>



<h1>Integrating &amp; Using FirePHP</h1>

<div class="faq">
<h2>How can I set the label/title for a log message? The old way does not work!</h2>

    <div class="code"><pre><code class="chili-lang-php">$console->label('Label')->log('Hello World');</code></pre></div>

</div>

<div class="faq">
<h2>I am using FirePHP with my own logger. How can I get the correct file and line info?</h2>

    <p>You can either determine the file and line info yourself and set it for each message:</p>

    <div class="code"><pre><code class="chili-lang-php">$console->options(array(
    'file' => $file
    'line' => $line
))->...</code></pre></div>

    <p>or you can instruct <i>FirePHP</i> to adjust the stack trace for all messages with:</p>

    <div class="code"><pre><code class="chili-lang-php">$console = $console->option('encoder.trace.offsetAdjustment', 3);</code></pre></div>

    <p>See <a href="../API/#Console API">Console API</a> for more information.</p>
</div>


<div class="faq">
<h2>Why don't I get a new group when I close a group and log to a new one with the same name?</h2>
    
    <p><a href="/Tools/FirePHPCompanion/API/#Console API - Groups">Groups</a> are given <i>names</i> in addition to <i>titles</i> for the express purpose of being able to log to the same group multiple times throughout the request.</p>

    <p>If you want to open a new group every time you can omit the <i>name</i> completely and just call <i>[Console API]->group()->open()</i>.</p>
</div>


<div class="faq">
<h2>How do I share FirePHP between multiple applications on the same server?</h2>

    <p><i>FirePHP</i> is designed to reside with a specific application or in a central place on a server where it is accessible
    to all applications. The <i>FirePHP</i> pahr or extracted zip archive can be placed anywhere on a server as long as all applications
    can include the code with sufficient permissions.</p>
    
    <p>Each <i>hostname</i> (or more specifically <i>application</i>) <b>should</b> have it's own <i>package.json</i> file
    as it describes the specific application. It should reside with the application in a source version control system.</p>
    
    <p>Multiple applications <b>may</b> share the same <i>credentials.json</i> file. This file is typically expected to be found next
    to the <i>package.json</i> file but can be relocated via a configuration option.</p>
    
    <p>For more information see:</p>
    
    <ul>
        <li><a href="../Install/#Environment specific Configuration">Environment specific Configuration</a></li>
        <li><a href="../Install/#Server-wide Inclusion">Server-wide Inclusion</a></li>
        <li><a href="../Install/#Virtual Host based Configuration">Virtual Host based Configuration</a></li>
    </ul>

</div>

<div class="faq">
<h2>Should I follow the $inspector &amp; $console naming conventions?</h2>
    
    <p>Yes, you should follow the naming conventions used in the <a href="../API/">API</a> reference.</p>
    
    <p>The current naming scheme takes into accound planned enhancements to the various APIs and the overall logging, debugging and development
    methodology. It is also useful to use consistent names when communicating verbally, in documentation and on mailing lists.</p>

    <p class="note">The naming scheme may undergo some changes over time as the evolving big-picture is better understood.</p>

</div>


<div class="faq">
<h2>I am getting a PHP Fatal error: Allowed memory size of 25165824 bytes exhausted! What do I do now?</h2>
    
    <p><i>FirePHP</i> works by encoding logged variables into a JSON-based transport format in order to send it to the client.</p>

    <p>The time and resources required to accomplish this are directly proportional to the size of the variables being logged. When thinking
    of the size of a variable and specifically an object one must include all object members and their references as the entire object graph will be
    traversed.</p>
    
    <p>To make this encoding process practical for larger applications there are certain limits enforced by the encoder that restrict the depth
    of traversal in various ways.</p>
    
    <p>There is an article outlining the encoder options <a target="_blank" href="http://www.christophdorn.com/Blog/2010/10/15/tip-firephp-data-volume-filtering/">here</a>
    (see the <i>FirePHP 1.0</i> heading).</p>
    
    <p>The encoder options are documented in the <a href="../API/#Console API">API reference</a> along with a feature to exclude specific class members (see <i>Class Member Filters</i>).</p>

    <p class="planned">There are various optimizations and optional extensions planned to speed up the encoding process and support much larger object graphs.</p>

</div>


<div class="faq">
<h2>Why was fb() changed to p()?</h2>

    <p>The previous <i>fb()</i> and now <a href="../API/#FirePHP declareP">p()</a> functions are designed for temporary development and debugging
    output and are intended to be removed from the code when done. To leave logging statements in the code use the new <a href="../API/">Insight API</a>.</p>
    
    <p>The function name was changed for the following reasons:</p>
    
    <ul>
        <li><i>fb()</i> implies <i>Firebug</i> which is no longer accurate for <i>FirePHP 1.0</i> as other logging targets are supported.</li>
        <li><i>fb()</i> and <i>p()</i> should not be left in code after dev/debug and this way <i>fb()</i> in code will fail and the developer is
        encouraged to convert to using the <a href="../API/">Insight API</a>. This is a necessary step developers should go through.</li>
        <li><i>p()</i> is shorter and closer to the idea of <i>printing</i> a variable.</li>
        <li><i>p()</i> has a different method signature and only supports a variable &amp; label.</li>
    </ul>

    <p>To continue using <i>fb()</i> in <i>FirePHP 1.0</i> you can include:</p>

    <div class="code"><pre><code class="chili-lang-php">require_once('FirePHP/fb.php');</code></pre></div>
    
    <p>See <a href="../API/#Traditional API">API</a> for complete information.</p>

    <p>For information on how to use <i>p()</i> see <a href="../API/#FirePHP declareP">here</a>.</p>

</div>

<div class="faq">
<h2><a name="Redirect Messages"></a>How do I get the log messages for a page that issued a HTTP redirect?</h2>
    
    <p>Log messages for a page that issued a HTTP redirect can be kept in the <i>Firebug Console</i>. The following must be
    true for this to work:</p>

    <ul>
        <li>The <i>Persist</i> toggle must be activated in the <i>Firebug Console</i> panel.</li>
        <li>Messages must be logged to the <i>page</i> context. See <a href="../API/#FirePHP::to">API</a>.</li>
    </ul>

    <p class="planned">Support for logging messages during a redirect to the <i>request</i> context is planned.</p>

</div>



<h1>About FirePHP Companion</h1>


<div class="faq">
<h2>Do I need Firebug installed to use FirePHP Companion?</h2>
    <p>No. FirePHP Companion will work without <a href="http://www.getfirebug.com/" target="_blank">Firebug</a> installed however the two tools are integrated and additional features
    are available if used together. One such feature is the ability to <a href="/Tools/FirePHPCompanion/Workflow/#Inspecting Requests">inspect a request</a> via the <i>Insight</i> tab for a request in the
    <i>Firebug Net</i> or <i>Console</i> panels. Another integration point is a new <i>Insight</i> panel for <i>Firebug</i> used to <a href="/Tools/FirePHPCompanion/Workflow/#Activating Insight">activate and deactivate</a> the new <i>Insight</i> intelligence system.</p>
</div>

<div class="faq">
<h2>Why is FirePHP Companion not hosted on addons.mozilla.org?</h2>
    
    <p>The <i>Mozilla Add-ons</i> policy is at odds with the needs and goals of <i>FirePHP Companion</i>. Among other things, extensions hosted with <i>Mozilla</i>
    may not load and execute external JavaScript code and each update must be manually reviewed which is impractical.</p>
    
    <p>All of <i>Mozilla's</i> extension development and security recommendations and best practices are being followed and taken very seriously where applicable.</p>
</div>

<div class="faq">
<h2>Will there be a standalone version or support for other browsers?</h2>

    <p>Yes, that is definetely a goal. Implementing the initial tool as a Firefox Extension was the easiest way to get around runtime and installation
    issues on various platforms and tight integration with Firebug.</p>
    
    <p>Once the tool stabilizes, the next step is to select an application platform that supportes writing applications in HTML + CSS + JavaScript
    with full system access and can generate installable programs for various operating systems. The initial standalone version will work
    in conjunction with a <i>thin</i> Firefox Extension. Support for other browsers will be added via <i>thin</i> extensions for their respective
    extension systems.</p>
    
    <p>A <i>thin</i> extension refers to a standardized interface used to interact with the browser and extend the native browser tools.
    This interface is needed to obtain the current
    state of the browser, access content and browser-specific developer tools and various other features. Various interfaces of this kind are
    currently being developed by different browser communities that will hopefully result in a common standard over time.</p>

    <p>The runtime platform for the <i>Companion Tool</i> and all protocols and utility libraries are open source and CommonJS based.
    If you are interested in getting involved to expand the support to other browsers please
    <a target="_blank" href="http://groups.google.com/group/devcomp">get in touch</a>.</p>

</div>

<div class="faq">
<h2>Will other programming languages (other than PHP) be supported?</h2>

    <p>Yes, that is definetely a goal. The entire tool and all underlying projects, protocols and technologies have been designed and implemented
    to be language agnostic. Once the PHP support stabilizes the first additional language will be JavaScript in the browser and on the server.</p>

    <p>There are also plans for Java, Ruby and Python support. The main task in adding support for a language is to implement two libraries
    that form the foundation of the logging, encoding and transmission system. These projects are:</p>

    <ul>
        <li>The communication system: <a target="_blank" href="http://github.com/cadorn/wildfire">http://github.com/cadorn/wildfire</a></li>
        <li>The intelligence system: <a target="_blank" href="http://github.com/cadorn/insight">http://github.com/cadorn/insight</a></li>
    </ul>

    <p>Once these infrastructure libraries exist for a language one or more convenience libraries can be developed
    (in the spirit of FirePHP) that make using the system in various applications easy. The idea behind having a consistent set of
    libraries is to standardize an API that works cross-language where developers can expect a certain amount
    of functionality and conventions no matter what language they program in.</p>

    <p>An overview of what is involved in building a set of libraries can be found
    <a target="_blank" href="http://groups.google.com/group/fireconsole/browse_thread/thread/9016d98190158233">here</a>. If you are interested in working on this
    feel free to <a target="_blank" href="http://groups.google.com/group/devcomp">get in touch</a>.</p>

</div>


<div class="faq">
<h2>What is the difference between FirePHP Companion LITE and the FULL version?</h2>

    <p>You can find a major feature comparison here: <a target="_blank" href="http://www.christophdorn.com/Tools/#FirePHP Companion">http://www.christophdorn.com/Tools/</a></p>

    <p>The LITE version will focus on logging to the <i>Firebug Console</i> for now as it is designed to replace the old <i>FirePHP Extension</i> and work with the new <a href="../Introduction/">FirePHP 1.0</a> server library (the sole focus of the <i>FirePHP</i> project going forward).</p>
    
    <p>The FULL version will focus on an optimum PHP &amp JavaScript <a target="_blank" href="http://www.christophdorn.com/Research/">development workflow and toolchain setup</a> to make users highly efficient. The current feature set is <a target="_blank" href="http://www.christophdorn.com/Vision/">just the beginning</a> for the FULL version and many more features are on the <a target="_blank" href="http://www.christophdorn.com/OpenSource/">way</a>. Feature prioritization will be based on user feedback and perceived need.</p>
</div>


<div class="faq">
<h2>How much does the FULL version cost?</h2>

    <p>The price of the full version is $99 USD. It is a one-time licensing fee with free updates for life. The idea is to develop a tool a
    developer purchases once and that stays with them for life. It is always registered to an individual and can be installed on any number of computers
    used by that individual throughout their career.</p>

</div>

<div class="faq">
<h2>Why is the FULL version so cheap given the features it will have?</h2>

<p><a target="_blank" href="http://www.christophdorn.com/">Christoph</a> has a <a target="_blank" href="http://www.christophdorn.com/Vision/">vision</a> that will take several levels of tools and services to accomplish.</p>

<p>FirePHP Companion is just the beginning of a complete toolchain automation platform and the kind of developer tooling that will be available
for all programming languages. A large userbase is required to achieve this.</p>

<p>Developer Companion (known as FirePHP Companion for now) is the first access point to this open source toolchain automation platform and priced to achieve
a large userbase by keeping the barrier to entry low.</p>

<p>The next level of tooling will be available as a monthly service to be released in 2011.
It will provide access to a continuous integration, build, testing and software distribution, monitoring and feedback system that can be
used for any PHP and JavaScript based project. This service will tentatively start at $33 per developer per month + usage fees priced at utility levels.</p>

<p>Beyond this there is a lot more planned in terms of features to enable efficient development at a personal and organizational level but these aspects
are still being formulated.</p>

</div>


<h1>Using FirePHP Companion</h1>

<div class="faq">
<h2>All I see is a bunch of empty boxes in the Companion Window. What do I do now?</h2>
    
    <p>At this time the <i>Companion Window</i> will only show information when a request is being inspected
    so the empty boxes you are seeing are expected when the window first launches.</p>
    
    <p>To see some data you can run the examples in the reference. On the <a href="../API/">API</a> page, when you scroll down,
    there is a drop-down to select where you want the examples to show up. By default they go to the <i>Firebug Console</i>. You can change
    that to the <i>Companion Window</i>. When you now run the API examples they will show up in the window.</p>
    
    <p>To get started with FirePHP 1.0 using your own app you can take a
    look at <a target="_blank" href="http://www.christophdorn.com/Blog/2010/08/20/introducing-firephp-companion/">this tutorial</a>.
    It will run you through how to log a message and inspect it in the <i>Companion Window</i>.</p>
    
    <p>Alternative ways to <i>trigger</i> an inspect for a request are documented <a href="../Workflow/#Inspecting Requests">here</a>.</p>
    
    <p>Future version of <i>Companion</i> will have facilities to select requests to inspect right from within the <i>Companion Window</i>.</p>
    
    <p>To log to the <i>Firebug Console</i> instead of the <i>Companion Window</i> all you need to do is change:</p>
    
    <div class="code"><pre><code class="chili-lang-php">$inspector = FirePHP::to('request'); // Logs to Companion Window
// to
$inspector = FirePHP::to('page'); // Logs to Firebug Console</code></pre></div>
</div>

<div class="faq">
<h2>I don't see any messages. FirePHP::to('request')->console()->log() does not work!</h2>
    
    <p>If you have not authorized the hostname or logged messages to the <i>Firebug Console</i> please take a look
    at <a target="_blank" href="http://www.christophdorn.com/Blog/2010/08/20/introducing-firephp-companion/">this tutorial</a> which
    explains the entire process from the beginning.</p>
    
    <p>If FirePHP is setup and the hostname authorized you need to <i>trigger</i> an inspect for the request data to be loaded into
    the <i>Companion Window</i>. This can be done in <a href="../Workflow/#Inspecting Requests">various ways</a>.</p>
    
    <p>If you are trying to log to the <i>Firebug Console</i> you need to change the following:</p>

    <div class="code"><pre><code class="chili-lang-php">$inspector = FirePHP::to('request'); // Logs to Companion Window
// to
$inspector = FirePHP::to('page'); // Logs to Firebug Console

$inspector->console()->log('Hello World');</code></pre></div>
</div>


<div class="faq">
<h2>How do I stop FirePHP Companion from modifying my User-Agent request header?</h2>

    <p>By default <i>FirePHP Companion</i> is backwards compatible with the <a target="_blank" href="http://www.firephp.org/HQ/Install.htm">FirePHPCore</a> server library. This necessitates modifying the <i>User-Agent</i> request header.</p>
    <p>If you have upgraded to <a href="../Install/">FirePHP 1.0</a> on the server you can switch this backwards compatibility off.</p>
    <p>In the Firefox menu go to <i>Tools</i> -> <i>DeveloperCompanion</i> -> <i>Options</i> and uncheck <i>FirePHPCore Compatibility</i> and your <i>User-Agent</i> header will no longer be modified.</p>
</div>


<div class="faq">
<h2><a name="Redirect Traditional to Companion Window"></a>How do I get messages to show up in the Companion Window instead of the Firebug Console?</h2>

    <p>If you are using the <a href="/Tools/FirePHPCompanion/API/#Insight API">Insight API</a> all you need to do is to change the target from <i>page</i> to <i>request</i>.</p>

    <div class="code"><pre><code class="chili-lang-php">$console = FirePHP::to('page')->console();  // Logs to the Firebug Console
$console = FirePHP::to('request')->console();  // Logs to the FirePHP Companion Window</code></pre></div>

    <p class="info">To load the debug data logged for a request into the companion window (i.e. to inspect it) see <a href="../Workflow/#Inspecting Requests">Workflow</a>.</p>

    <p>If you are using the <a href="/Tools/FirePHPCompanion/API/#Traditional API">Traditional API</a> as opposed to the new <a href="/Tools/FirePHPCompanion/API/#Insight API">Insight API</a> you can redirect the messages:</p>

    <div class="code"><pre><code class="chili-lang-php">$firephp->setLogToInsightConsole('Firebug'); // or
FB::setLogToInsightConsole('Firebug');</code></pre></div>
    
    <p class="note">Make sure you have FirePHP properly <a href="/Tools/FirePHPCompanion/Install/">installed and configured</a> on the server which has changed from previous releases.</p>

    <p>This will log to a console in FirePHP Companion called <i>Firebug</i>. You can also pass a <i>$console</i> object to redirect messges to.</p>

    <p class="info">To load the debug data logged for a request into the companion window (i.e. to inspect it) see <a href="../Workflow/#Inspecting Requests">Workflow</a>.</p>
</div>


<div class="faq">
<h2>Why are some of my variables truncated?</h2>

    <p>When variables are sent from the server to the client they must be compacted to limit the amount of data sent. The primary solution
    to achieve this is to limit the <i>length</i> of <i>arrays</i> and <i>objects</i> and limit the <i>depth of traversal</i>. The default limits are
    set relatively low to ensure the best user experience from the start.</p>
    <p>You can increase the limits via the default <a href="../Install/#Configuration Options">configuration options</a> or as needed via the <a href="../API/#Console API">Console API</a>.</p>
</div>





<div class="faq">
<h2>How do I use <i>triggerInspect()</i> and have it not snap the focus to the window? Sometimes I just want it to get the data.</h2>
    
    <p>The purpose of <i>triggerInspect()</i> is to pop-up the window. Alternatively you can go to the <i>Firebug Net</i> tab, locate the request, expand it, click on the <i>Insight</i> tab and trigger the inspect there manually. The data is always sent (even if no inspect is triggered).</p>
    <p>You can find more information about all possible ways to trigger an inspect <a href="/Tools/FirePHPCompanion/Workflow/#Inspecting Requests">here</a>.</p>
</div>


<div class="faq">
<h2>Where did the pop-up used to view variables in the FirePHP Extension go?</h2>

    <p>The pop-up based <i>Variable Viewer</i> has been reimplemented but does not yet consistently work on all operating systems based on bugs
    in the Firefox codebase. Once these bugs are fixed it will be added again. In the meantime variables are displayed in the Firebug Insight panel.</p>

</div>



<h1>About the FirePHP &amp; Related Projects</h1>


<div class="faq">
<h2>What is happening to the FirePHP Extension?</h2>

    <p>The <a target="_blank" href="https://addons.mozilla.org/en-US/firefox/addon/6149/">FirePHP Extension</a> is being phased out in favor of <a target="_blank" href="http://www.christophdorn.com/Tools/#FirePHP Companion LITE">FirePHP Companion LITE</a>
    and later <a target="_blank" href="http://www.fireconsole.org/">FireConsole</a>. The FirePHP project will continue and focus on the server library only.</p>
</div>


<div class="faq">
<h2>What is happening to FireConsole?</h2>

    <p><a target="_blank" href="http://www.fireconsole.org/">FireConsole</a> is being incubated as part of <a target="_blank" href="http://www.christophdorn.com/Tools/#FirePHP Companion">FirePHP Companion</a>
    and will be released once the underlying open source libraries stabilize. FirePHP Companion LITE provides for free
    all (and more) features FireConsole will initially offer.</p>
</div>

