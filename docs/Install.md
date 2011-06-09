
<table class="pivot">
    <tr>
        <th>Server Library Releases</th>
        <th>0.</th>
        <th>1.</th>
    </tr>
    <tr>
        <td>License</td>
        <td class="center">MIT</td>
        <td class="center">MIT</td>
    </tr>
    <tr>
        <td>Stability</td>
        <td class="center">Production</td>
        <td class="center">Beta</td>
    </tr>
    <tr>
        <td>Version</td>
        <td class="center">
            <a href="http://www.firephp.org/HQ/Install.htm" target="_blank">0.3.2</a>
        </td>
        <td class="center">
            <a href="../API/"><?php echo $version; ?></a>
        </td>
    </tr>
    <tr>
        <td>PHP Version</td>
        <td class="center">4 &amp; 5</td>
        <td class="center">5.1+</td>
    </tr>
    <tr class="heading">
        <td>Supported Clients</td>
        <td colspan="2">&nbsp;</td>
    </tr>
    <tr>
        <td><a href="http://www.firephp.org/" target="_blank">FirePHP Extension</a></td>
        <td class="center"><div class="icon-yes"></div></td>
        <td class="center"><a href="../FAQ/#Is FirePHP 1.0 backwards compatible">limited</a></td>
    </tr>
    <tr>
        <td><a href="http://www.developercompanion.com/" target="_blank">DeveloperCompanion</a></td>
        <td class="center"><div class="icon-yes"></div></td>
        <td class="center"><div class="icon-yes"></div></td>
    </tr>
    <tr class="heading">
        <td>Download</td>
        <td colspan="2">&nbsp;</td>
    </tr>
    <tr>
        <td>&nbsp;</td>
        <td class="center">Deprecated</td>
        <td class="center">
            
            <a class="img" href="<?php echo $downloadZipUrl; ?>"><img src="/resources/images/download_zip.png" width="67" height="45" border="0"/></a>
            
            <a class="img" href="<?php echo $downloadPharUrl; ?>"><img src="/resources/images/download_phar.png" width="67" height="45" border="0"/></a>
            
        </td>
    </tr>
</table>

<p class="planned">The <i>1. Release</i> will make it onto the www.firephp.org site once it stabilizes more.</p>
<p class="note">Built-in <i>phar</i> support is available as of PHP 5.3.0 and can be manually installed for prior versions. See: <a target="_blank" href="http://php.net/manual/en/book.phar.php">Phar in the PHP Manual</a>.</p>


<p>Download and include the <i>phar archive</i> <b>or</b> the <i>extracted zip files</i> at the <b>beginning</b> of any PHP script
or at the top of the application <b>bootstrap</b> file. See below for detailed instructions.</p>

<p class="note">In the instructions below, three dots (<i>...</i>) denote a path that needs to be replaced.</p>


<h1>Getting Started</h1>

<p>The information below details all the basic and advanced installation and configuration information for FirePHP 1.0.</p>

<p class="noticable">If this is your <b>first time using FirePHP 1.0</b> you are advised to take a look at the
<a href="../Tutorials/">Tutorials</a> or the <a href="../Quickstart/">Quickstart</a> example first.</p>

<p class="noticable">If you are <b>upgrading from FirePHPCore</b> you are advised to take a look at
<a target="_blank" href="http://upgrade.firephp.org/">upgrade.firephp.org</a> first.</p>


<h1><a name="Inclusion"></a>Inclusion</h1>

<p>The best practices method of including FirePHP involves the creation of two configuration files. One holds configuration options
for FirePHP while the other provides credentials to authorize clients.</p>

<p>If using the <i>phar</i> archive:</p>

<pre><code class="chili-lang-php">define('INSIGHT_CONFIG_PATH', '/.../package.json');
require_once('phar://.../firephp.phar/FirePHP/Init.php');</code></pre>

<p class="info">The <i>INSIGHT_CONFIG_PATH</i> must be an <b>absolute</b> path.</p>

<p>If using the extracted <i>zip</i> archive:</p>

<pre><code class="chili-lang-php">set_include_path('.../&lt;Extracted Zip Archive&gt;/lib/'
             . PATH_SEPARATOR
             . get_include_path());
define('INSIGHT_CONFIG_PATH', '/.../package.json');
require_once('FirePHP/Init.php');</code></pre>

<p class="info">The <i>INSIGHT_CONFIG_PATH</i> must be an <b>absolute</b> path.</p>

<p>If using one of the above continue with <a href="#Configuration: package.json">Configuration: package.json</a>.</p>

<p>If the default FirePHP configuration is sufficient a minimal inclusion method is also supported:</p>

<p class="note">The key set for the <i>INSIGHT_AUTHKEYS</i> constant below is a <b>NEW Authorization Key</b> ready to be used for a <b>new installation</b>. You can find all your keys for all installations under <a href="/Companion/Keys/">'Companion' -> 'Keys'</a>.</p>

<p class="require-built-in"></p>

<div class="code"><pre><code id="minimal-install-code" class="chili-lang-php">define('INSIGHT_IPS', '*');
define('INSIGHT_AUTHKEYS', 'client-auth-key');
define('INSIGHT_PATHS', dirname(__FILE__));
define('INSIGHT_SERVER_PATH', '/&lt;ServerScript.php&gt;');
// Include phar archive or update include path as above
require_once('FirePHP/Init.php');</code></pre></div>

<p class="info">The <i>INSIGHT_PATHS</i> constant lists all paths accessible by FirePHP that may be sent to the client.</p>
<p class="info">The <i>INSIGHT_SERVER_PATH</i> constant must point to a script (relative to the document root) that includes FirePHP and is used to fetch data from the server. It may point to any existing script in your application as FirePHP will terminate the request after it has responded accordingly.</p>

<p class="note">Multiple <i>ips</i>, <i>authkeys</i> or <i>paths</i> may be separated by comma.</p>

<p>If using this minimal setup you are now ready to <a href="/Tools/FirePHPCompanion/Test/">Test</a> your setup.</p>


<h1><a name="Configuration: package.json"></a>Configuration: package.json</h1>

<p>The <i>package.json</i> configuration file is compatible with the <a href="http://wiki.commonjs.org/wiki/Packages" target="_blank">CommonJS Packages 1.0</a> specification.</p>

<p>Place the file at the root of your application. It is intended to reside in source control with the application package which consists
of all files in the same directory and any subdirectories. To adjust the configuration for a specific environment
see <a href="#Environment specific Configuration">Environment specific Configuration</a>.</p>

<p>At minimum the follwing configuration properties are required. For additional options see <a href="#Configuration Options">Configuration Options</a>.</p>

    <pre><code class="chili-lang-javascript">{
  // REQUIRED - Same URL for all deployments of same package
  "uid": "&lt;Unique URL&gt;"
}</code></pre>
    
    <p>The <i>uid</i> is a unique URL intended to identify your application package. It should be the same URL no matter where your
    package is deployed. Following are some possible examples:
    
    <pre><code class="chili-lang-javascript">// A package hosted on github
"uid": "http://github.com/cadorn/firephp-libs/"

// A package to test some things locally
"uid": "http://test-package.localhost/"</code></pre>


<p>Continue with <a href="#Configuration: credentials.json">Configuration: credentials.json</a>.</p>


<h1><a name="Configuration: credentials.json"></a>Configuration: credentials.json</h1>

<p>Place a file called <i>credentials.local.json</i> next to package.json. This file is intended to be ignored by all version control systems
and should be configured on the deployed server. If you must ship a credentials file with your application source code use <i>credentials.json</i>.</p>

<p>By default <i>FirePHP 1.x</i> is locked down and all clients must be specifically authorized by <i>IP Address</i> <b>and</b> <i>Authorization Key</i>.</p>

<p class="note">The key in <i>authkeys</i> below is a <b>NEW Authorization Key</b> ready to be used for a <b>new installation</b>. You can find all your keys for all installations under <a href="/Companion/Keys/">'Companion' -> 'Keys'</a>.</p>

<p class="require-built-in"></p>

<pre><code id="credentials-code" class="chili-lang-javascript">{
  "cadorn.org/insight/@meta/config/0": {
    "allow": {
      "ips": [
        "192.168.",
        "127. // optional comment"
//      "*"         // Allow ALL ips
      ],
      "authkeys": [
        "client-auth-key"
//      "*"         // Allow ALL authkeys
      ]
    }
  }
}</code></pre>

<p class="warning-security">Keep <i>ips</i> as specific as possible!</p>

<p class="warning-security">If you allow <b>ALL</b> (*) for <b>BOTH</b> <i>ips</i> and <i>authkeys</i> <b>ANYONE</b> will be able to access your application internals!</p>

<p class="info">Comments can be added for each <i>ip</i> or <i>authkey</i> by appending <i>//</i> followed by the comment. This is useful to keep
track of who the <i>ips</i> and <i>authkeys</i> belong to.</p>

<p class="note">Only an <b><i>IP</i> match</b> is required for <i>FirePHP</i> to <b>announce</b> itself to a client.</p>

<p>You are now ready to <a href="../Test/">Test</a> your setup.</p>


<h1><a name="Configuration Options"></a>Configuration Options</h1>

<p>Additional configuration options for <i>package.json</i>.</p>

<pre><code class="chili-lang-javascript">{
  // REQUIRED - Same URL for all deployments of same package
  "uid": "&lt;Unique URL&gt;",
  // OPTIONAL - First sentence (until first .) becomes a title
  "description": "&lt;Package short description&gt;",
  // OPTIONAL
  "homepage": "&lt;Homepage URL&gt;",
  // OPTIONAL
  "bugs": "&lt;Bug tracker URL or email address&gt;",
  "implements": {
    "cadorn.org/insight/@meta/package/0": {
      // OPTIONAL
      "links": {
        // Shortcuts to important information
        "quick": {
          "&lt;Label&gt;": "&lt;URL&gt;",
          "&lt;Label&gt;": {
            "target": "&lt;Target&gt;",  // tab (default), window or hidden
            "url": "&lt;URL&gt;"
          }
        }
      }
    },
    "cadorn.org/insight/@meta/config/0": {
      // OPTIONAL - Defaults to ./credentials.json
      "credentialsPath": "/.../credentials.json",
      "cache": {
        // OPTIONAL - Defaults to sys_get_temp_dir()
        "path": "&lt;CachePath&gt;",
      },
      "server": {
        // OPTIONAL - Defaults to "/"
        "path": "/&lt;ServerScript.php&gt;",
        // OPTIONAL - Defaults to same as browser request
        "host": "&lt;Hostname&gt;",
        // OPTIONAL - Defaults to same as browser request
        "port": "&lt;Port&gt;",
        // OPTIONAL - Defaults to same as browser request
        "secure": &lt;[true|false]&gt;
      },
      // OPTIONAL - Accessible paths (absolute or relative)
      "paths": {
        "./": "allow",
        "./credentials.json": "deny"
      },
      // OPTIONAL - Encoder options
      "encoder": {
        "depthNoLimit": false,
        "lengthNoLimit": false,
        "maxDepth": 5,
        "maxStringLength": 5000,
        "maxArrayDepth": 3,
        "maxArrayLength": 25,
        "maxObjectDepth": 3,
        "maxObjectLength": 25,
        "exception.traceMaxLength": -1,  // no maximum
        "trace.maxLength": -1  // no maximum
      }
    }
  }
}</code></pre>
             
<p class="note">Any relative paths are relaive to the <i>package.json</i> file and may point outside of the package root.</p>

<h3>implements['cadorn.org/insight/@meta/config/0'].credentialsPath</h3>

<p>The <i>credentialsPath</i> property optionally sets an alternate path to a <i>credentials.json</i> file. If set the <i>credentials.json</i>
file next to <i>package.json</i> is ignored while the <i>credentials.local.json</i> file will still be loaded.</p>

<h3>implements['cadorn.org/insight/@meta/config/0'].cache.path</h3>

<p>The <i>cache path</i> property optionally sets an alternate cache path. By default the value returned by <i>sys_get_temp_dir()</i>
is used. The path may be relative to the config file or an absolute path.</p>

<p class="note">If <i>sys_get_temp_dir()</i> is not available <i>dirname(constant('INSIGHT_CONFIG_PATH'))</i> is used and if <i>INSIGHT_CONFIG_PATH</i>
is not set <i>dirname($_SERVER['SCRIPT_FILENAME'])</i> is used. In the latter cases <i>.cache</i> is appended.

<h3>implements['cadorn.org/insight/@meta/config/0'].server.path</h3>

<p>The <i>server path</i> property must be set to a PHP script relative to the document root and the <i>&lt;ServerScript&gt;.php</i> file must simply include <i>FirePHP</i> with the same configuration file set as
for the application and may indeed be pointed to <b>any</b> application PHP script that includes <i>FirePHP</i>. In these cases
<i>FirePHP</i> will intercept all client requests and respond accordingly denying the application script from ever running
where appropriate.</p>

<p class="note">The path is <b>typically</b> an absolute path including a forward slash. If a relative path is provided (<i>./...</i>) the <i>&lt;ServerScript&gt;.php</i> is expected to be found relative to the same directory the original request pointed to.</p>

<h3>implements['cadorn.org/insight/@meta/config/0'].server.secure</h3>

<p>If the <i>server secure</i> property is set to <i>true</i> a secure <i>HTTPS</i> request will be made to the <i>&lt;ServerScript&gt;.php</i> instead of using the same protocol as the browser request.</p>

<h3>implements['cadorn.org/insight/@meta/config/0'].paths</h3>

<p>The <i>paths</i> property holds access rules for which paths are accessible to the <i>FirePHP</i> client. This is used
to load source files for display on the client for example.</p>

<h3>implements['cadorn.org/insight/@meta/config/0'].encoder</h3>

<p>The <i>encoder</i> property holds options for the variable encoder.</p>


<h1><a name="Environment specific Configuration"></a>Environment specific Configuration</h1>

<p>It is useful to adjust the configuration for a specific deployment environment to allow additional paths or set a central
credentials file for example.</p>

<p>Place a file called <i>package.local.json</i> next to <i>package.json</i>. All configuration directives
will be merged on top of the defaults provided by <i>package.json</i>. It is intended that <i>package.local.json</i>
be ignored by all version control systems.</p>

<p>If you have a central <i>credentials.json</i> file to be used for all applications in an environment you can set the following
in the <i>package.local.json</i> file:</p>

<pre><code class="chili-lang-javascript">{
  "implements": {
    "cadorn.org/insight/@meta/config/0": {
      "credentialsPath": "/.../credentials.json"
    }
  }
}</code></pre>

<p class="note">If this custom path is set any <i>credentials.json</i> file residing next to <i>package.json</i> will be ignored
 while the <i>credentials.local.json</i> file will still be loaded.</p>

<p>To add more application-specific credentials use a <i>credentials.local.json</i> file next to <i>package.json</i>.</p>

<h1><a name="Server-wide Inclusion"></a>Server-wide Inclusion</h1>

<p>To include <i>FirePHP</i> for all virtual hosts on a webserver set the <a href="http://php.net/manual/en/ini.core.php#ini.auto-prepend-file" target="_blank">auto_prepend_file</a> <i>php.ini</i> directive:</p>

<pre><code class="chili-lang-php">// Apache
php_value auto_prepend_file phar://.../firephp.phar/FirePHP/Init.php</code></pre>

<p class="note"><i>FirePHP</i> will only be enabled if a configuration file is also set <b>before</b> PHP executes (see <a href="#Virtual Host based Configuration">Virtual Host based Configuration</a>).</p>
<p class="note"><i>FirePHP</i> will only be loaded if <i>x-wf-*</i> or <i>x-insight*</i> request headers are found. This means there will be negligible
performance degradation if FirePHP is not needed as is the case for most visitors to your application.</p>


<h1><a name="Virtual Host based Configuration"></a>Virtual Host based Configuration</h1>

<p>Instead of setting the configuration file in PHP:</p>

<pre><code class="chili-lang-php">define('INSIGHT_CONFIG_PATH', '/.../package.json');</code></pre>

<p>Set it in the virtual host configuration of the webserver:</p>

<pre><code class="chili-lang-php">// Apache
SetEnv INSIGHT_CONFIG_PATH /.../package.json</code></pre>

<p>To force the use of a specific credentials file use:</p>

<pre><code class="chili-lang-php">// Apache
SetEnv INSIGHT_CONFIG_PATH /.../package.json,/.../credentials.json</code></pre>
