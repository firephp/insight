
<div class="summary">

    <p><i>FirePHP</i> is an open source project available under the <a target="_blank" href="http://github.com/cadorn/firephp-libs/blob/master/programs/standalone/LICENSE">MIT License</a>. Your contributions are welcome.</p>

</div>


<h1>General Support &amp; Discussions</h1>

<p class="info">For support &amp; discussions concerning the <i>DeveloperCompanion Client Extension</i> see <a href="/Companion/Support/">here</a>.</p>

<p>You can find a bunch of frequently asked questions <a href="../FAQ/">here</a>; otherwise use the <i>FirePHP</i> developer mailing list: <a target="_blank" href="http://groups.google.com/group/firephp-dev">http://groups.google.com/group/firephp-dev</a></p>


<h1>Bug Reports &amp; Feature Requests</h1>

<p class="info">For bug reports &amp; feature requests concerning the <i>DeveloperCompanion Client Extension</i> see <a href="/Companion/Support/">here</a>.</p>

<p>Report bugs using the issue tracker on github: <a href="http://github.com/cadorn/firephp-libs/issues" target="_blank">http://github.com/cadorn/firephp-libs/issues</a></p>

<p class="note">All open tickets from the old issue tracker at <a target="_blank" href="http://code.google.com/p/firephp/issues/list">http://code.google.com/p/firephp/issues/list</a> will be gradually migrated to github.</p>

<p>Make new feature requests via the <a target="_blank" href="http://groups.google.com/group/firephp-dev">developer mailing list</a>.</p>


<h1>Sub-Projects</h1>

<p>The <i>FirePHP Server Library</i> takes components from several projects and combines these into a single cohesive library <a href="../Install/">available</a>
as a <i>zip</i> or <i>phar</i> archive.</p>


<h3>firephp-libs</h3>

<p>The home of the <i>FirePHP Server Library</i> that wraps all components.</p>

<p>Project: <a href="http://github.com/cadorn/firephp-libs" target="_blank">http://github.com/cadorn/firephp-libs</a></p>
<p>Mailing List: <a target="_blank" href="http://groups.google.com/group/firephp-dev">http://groups.google.com/group/firephp-dev</a></p>


<h3>wildfire</h3>

<p>The communication system.</p>

<p>Project: <a href="http://github.com/cadorn/wildfire" target="_blank">http://github.com/cadorn/wildfire</a></p>
<p>Mailing List: <a target="_blank" href="http://groups.google.com/group/wildfire-project">http://groups.google.com/group/wildfire-project</a></p>


<h3>insight</h3>

<p>The intelligence system.</p>

<p><a href="http://github.com/cadorn/insight" target="_blank">http://github.com/cadorn/insight</a></p>
<p>Mailing List: <a target="_blank" href="http://groups.google.com/group/insight-dev">http://groups.google.com/group/insight-dev</a></p>


<h3>Zend Framework</h3>

<p>Several components are used.</p>

<p>See: <a href="http://framework.zend.com/" target="_blank">http://framework.zend.com/</a></p>


<h1><a name="Distribution Structure"></a>Distribution Structure</h1>

<p>The <i>FirePHP</i> distribution is structured as follows:</p>

<ul class="plain">
    <li><b>examples/</b></li>
    <ul>
        <li><b>FeedCache/</b> &nbsp;&nbsp; See <a target="_blank" href="http://www.christophdorn.com/Blog/2010/08/24/gain-insight-into-your-cache-interaction-with-firephp-companion/">Tutorial</a></li>
        <li><b>Quickstart/</b> &nbsp;&nbsp; See <a href="../Quickstart">Quickstart</a></li>
        <li><b>TestRunner/</b> &nbsp;&nbsp; See <a target="_blank" href="http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/">here</a> under <i>TestRunner</i></li>
    </ul>
    <li><b>lib/</b></li>
    <ul>
        <li><b>FirePHP/</b> &nbsp;&nbsp; Collected from <a target="_blank" href="http://github.com/cadorn/firephp-libs/tree/master/packages/insight/lib/FirePHP/">github: firephp-libs -> /packages/insight/lib/FirePHP/</a></li>
        <li><b>FirePHPCore/</b> &nbsp;&nbsp; Collected from <a target="_blank" href="http://github.com/cadorn/firephp-libs/tree/master/packages/core/lib/FirePHPCore/">github: firephp-libs -> /packages/core/lib/FirePHPCore/</a></li>
        <li><b>Insight/</b> &nbsp;&nbsp; Collected from <a target="_blank" href="http://github.com/cadorn/insight/tree/master/packages/lib-php/lib/Insight/">github: insight -> /packages/lib-php/lib/Insight/</a></li>
        <li><b>Wildfire/</b> &nbsp;&nbsp; Collected from <a target="_blank" href="http://github.com/cadorn/wildfire/tree/master/packages/lib-php/lib/Wildfire/">github: wildfire -> /packages/lib-php/lib/Wildfire/</a></li>
        <li><b>Zend/</b> &nbsp;&nbsp; Collected from <a target="_blank" href="http://github.com/cadorn/insight/tree/master/packages/lib-php/lib/Zend/">github: insight -> /packages/lib-php/lib/Zend/</a></li>
    </ul>
    <li><b>tests/</b> &nbsp;&nbsp; Unit tests (work in progress)</li>
    <li><b>CHANGELOG.md</b></li>
    <li><b>LICENSE</b></li>
</ul>

<h1>Contributing</h1>

<p>The development of <i>FirePHP</i> is discussed on the developer mailing list: <a target="_blank" href="http://groups.google.com/group/firephp-dev">http://groups.google.com/group/firephp-dev</a></p>

<p>The documentation for the sub-projects is still sparse. If you have any questions please do not hesitate to inquire on the mailing list.</p>

<p>To make changes to <i>FirePHP</i> or any of it's sub-projects and contribute your modifications you are encouraged to follow these steps:</p>

<ol>
    <li><b>Fork the appropriate project on github.</b></li>
    <li>Clone the forked repository to your development system.</li>
    <li>Add the appropriate path up to <i>lib</i> (see <i>Distribution Structure</i> above) to your include path <b>before</b> adding the path to the <a href="../Install/">distribution package</a>. This will cause PHP to load the cloned source instead of the files from the distribution package.</li>
    <li>Make and test your changes.</li>
    <li>Commit changes to git and push them to github.</li>
    <li>Send a pull-request on github and post a message to the mailing list regarding your changes.</li>
</ol>

<h1>Supporting FirePHP</h1>

<p>You can support <i>FirePHP</i> by <a target="_blank" href="http://www.firephp.org/HQ/Contribute.htm?Trigger=Donate">donating</a> or using all <a target="_blank" href="http://www.developercompanion.com/">DeveloperCompanion</a> features to improve your development workflow.
The maker of <i>DeveloperCompanion</i>, <a target="_blank" href="http://www.christophdorn.com/">Christoph Dorn</a>, is the primary sponsor of <i>FirePHP</i>.</p>

<p>Another great way to support <i>FirePHP</i> is by promoting it's adoption. You can blog, tweet, link to or speak about <i>FirePHP</i> and recommend it to your colleagues.</p>
