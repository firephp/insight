
<div class="summary">

    <p>It is assumed you have <a target="_blank" href="http://www.developercompanion.com/">DeveloperCompanion</a> installed.</p>

</div>

<div class="body">


    <h1><a name="Activating Insight"></a>Activating Insight</h1>

    <p><i>Insight</i> is the intelligence system used by FirePHP to gather and send information to the client. It must be activated for
    this to happen.</p>

    <p class="noticable"><b>NOTE:</b> <i>DeveloperCompanion</i> currently always enables <i>Insight</i> no matter the state of Firebug or the panels within it.</p>

    <h3>without Firebug</h3>
        
    <p>If you <b>do NOT have <i><a target="_blank" href="http://getfirebug.com/">Firebug</a></i> installed</b>, <i>Insight</i> is automatically activated.</p>

    <h3>with Firebug</h3>
    
    <p>If you <b>DO have <i>Firebug</i> installed</b>, Companion adds a panel to <i>Firebug</i> called <i>Insight</i>. You must have this panel
    <b>enabled</b> for insight to be activated. Use the little drop-down in the panel's tab to enable it or right-click on the <i>Firebug Icon</i>
    in the status bar and select <i>Enable All Panels</i>.</p>
    
    <p class="note">You must also authorize <i>Insight</i> for each hostname. See: <a href="#Authorizing Insight">Authorizing Insight</a></p>
    
    <p>There are situations in which you may want to activate <i>Insight</i> for specific requests only. This can be done by adding the following
    <i>x-insight</i> parameter to a request URL or request headers.</p>

    <pre><code class="chili-lang-php">// GET or POST URL parameter
...?x-insight=activate

// HTTP Request Header
x-insight: activate</code></pre>

    <p class="note">If this does not work, use the <a href="../Test/">Test</a> tool to verify your server installation.</p>
    <p class="planned">Activation on a hostname basis is planned.</p>


    <h1><a name="Authorizing Insight"></a>Authorizing Insight</h1>
    
    <p><i>Insight</i> must be authorized for each hostname for the server to send data to the client. There are two ways to authorize a hostname
    for <i>Insight</i>.</p>

    <p class="note">This assumes you have <i>Insight</i> activated (<a href="#Activating Insight">see above</a>).</p>
    <p class="note">This assumes you are using <a target="_blank" href="http://www.developercompanion.com/">DeveloperCompanion</a> on the client.</p>

    <p>
        <ol>
            <li>Click on the <i>DeveloperCompanion</i> icon at the bottom right of the browser status bar</li>
            <li>Open the <i>home</i> (left most) tab and click on <i>Workspaces</i></li>
            <li>Click on <i>New Workspace</i> and follow the instructions</li>
        </ol>
    </p>

    <p class="info">Once the workspace has been added you can close the <i>Companion Window</i>.</p>


    <h1><a name="Logging to the Firebug Console"></a>Logging to the Firebug Console</h1>
    
    <p>To log messages to the <a href="http://getfirebug.com/commandline" target="_blank">Firebug Console</a> you must have <i>Insight</i>
    <a href="#Activating Insight">activated</a>, <a href="#Authorizing Insight">authorized</a> and <i>Firebug's Console</i> and <i>Net</i> Panels enabled.</p>

    <p>Messages logged to the <i>page context</i> will show up in the console. See: <a href="../API/#FirePHP::to">FirePHP::to('&lt;target&gt;') in the API Reference</a></p>


    <h1><a name="Inspecting Requests"></a>Inspecting Requests with Companion</h1>
    
    <p>To inspect a request you need to load it into the Companion. There are several ways to do that.</p>
    
    <p class="note">The debug data is always tracked (if <a href="#Activating Insight"><i>Insight</i> is activated</a> and authorized) but needs to be loaded into the companion to be viewable.</p>
    <p class="note">You need to log to the <i>request context</i> to have messages to inspect. See: <a href="../API/#FirePHP::to">FirePHP::to('&lt;target&gt;') in the API Reference</a></p>

    <h3>Firebug</h3>
    <p class="note">You must have <a href="http://www.getfirebug.com/" target="_blank">Firebug</a> installed.</p>
    <p>
        <ol>
            <li>Open <i>Firebug</i> and enable the <i>Net</i> panel</li>
            <li>Make the request</li>
            <li>In the <i>Net</i> panel locate the request</li>
            <li>Expand the request information</li>
            <li>Select the <i>Insight</i> tab</li>
            <li>Click <i>Inspect with Companion</i> (this assumes you have previously <a href="#Activating Insight">activated</a> and <a href="#Authorizing Insight">authorized</a> <i>Insight</i>)</li>
        </ol>
    </p>
    <p class="note">If the <i>Insight</i> tab does not show in the request information the server did not respond as expected. Make sure
    you have <i>Insight</i> activated (<a href="#Activating Insight">see above</a>). If you do have <i>Insight</i> activated and have refreshed the request
    it is usually due to a mis-configuration on the server, your client not being authorized on the server or a fatal error on the server.
    Use the <a href="../Test/">Test</a> tool to troubleshoot.</p>


    <h3>x-insight URL Parameter</h3>

    <p>Append <i>x-insight=inspect</i> to any <i>GET</i> or <i>POST</i> URL.</p>

    <pre><code class="chili-lang-php">// GET or POST URL parameter
...?x-insight=inspect</code></pre>

    <p class="note">If this does not work, use the <a href="../Test/">Test</a> tool to verify your server installation.</p>


    <h3>x-insight HTTP Request Header</h3>

    <p>Set an <i>x-insight: inspect</i> HTTP header on the <b>request</b>.</p>

    <pre><code class="chili-lang-php">// HTTP Request Header
x-insight: inspect</code></pre>

    <p class="note">If this does not work, use the <a href="../Test/">Test</a> tool to verify your server installation.</p>


    <h3>x-insight HTTP Response Header</h3>

    <p>Set an <i>x-insight: inspect</i> HTTP header for the <b>response</b>.</p>

    <pre><code class="chili-lang-php">header('x-insight: inspect');</code></pre>

    <p class="note">If this does not work, use the <a href="../Test/">Test</a> tool to verify your server installation.</p>


    <h3>PHP Code Trigger</h3>

    <p>Trigger an inspect from the PHP script.</p>

    <pre><code class="chili-lang-php">$console = FirePHP::to('page')->console();
$console->show();
// or
$controller = FirePHP::to('controller');
$controller->triggerInspect();</code></pre>

    <p class="info">See <a href="../API/#Control API">API</a> for more information.</p>

    <p class="note">If this does not work, use the <a href="../Test/">Test</a> tool to verify your server installation.</p>
