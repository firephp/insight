    
    <div class="summary">
    
*FirePHP* is an open source project available under the [MIT License](http://github.com/cadorn/firephp-libs/blob/master/programs/standalone/LICENSE).
Your contributions are welcome.
    
    </div>
    
    
General Support &amp; Discussions
=================================

INFO: For support &amp; discussions concerning the *DeveloperCompanion Client Extension* see [here](/Companion/Support/).
    
You can find a bunch of frequently asked questions [here](../FAQ/); otherwise use the *FirePHP* developer mailing list:
[http://groups.google.com/group/firephp-dev](http://groups.google.com/group/firephp-dev)
    
    
Bug Reports &amp; Feature Requests
==================================

INFO: For bug reports &amp; feature requests concerning the *DeveloperCompanion Client Extension* see [here](/Companion/Support/).
    
Report bugs using the issue tracker on github: [http://github.com/cadorn/firephp-libs/issues](http://github.com/cadorn/firephp-libs/issues)
    
NOTE: All open tickets from the old issue tracker at [http://code.google.com/p/firephp/issues/list](http://code.google.com/p/firephp/issues/list) will be
gradually migrated to github.
    
Make new feature requests via the [developer mailing list](http://groups.google.com/group/firephp-dev).
    
    
Sub-Projects
============

The *FirePHP Server Library* takes components from several projects and combines these into a single cohesive library [available](../Install/)
as a *zip* or *phar* archive.
    
    
firephp-libs
============

The home of the *FirePHP Server Library* that wraps all components.
    
Project: [http://github.com/cadorn/firephp-libs](http://github.com/cadorn/firephp-libs)

Mailing List: [http://groups.google.com/group/firephp-dev](http://groups.google.com/group/firephp-dev)
    
    
wildfire
--------

The communication system.
    
Project: [http://github.com/cadorn/wildfire](http://github.com/cadorn/wildfire)

Mailing List: [http://groups.google.com/group/wildfire-project](http://groups.google.com/group/wildfire-project)


Insight
-------

The intelligence system.
    
[http://github.com/cadorn/insight](http://github.com/cadorn/insight)

Mailing List: [http://groups.google.com/group/insight-dev](http://groups.google.com/group/insight-dev)
    
    
Zend Framework
--------------

Several components are used.
    
See: [http://framework.zend.com/](http://framework.zend.com/)
    
    
Distribution Structure
======================

The *FirePHP* distribution is structured as follows:
    
    <ul class="plain">
  * **examples/**
  * **FeedCache/** &nbsp;&nbsp; See [Tutorial](http://www.christophdorn.com/Blog/2010/08/24/gain-insight-into-your-cache-interaction-with-firephp-companion/)
  * **Quickstart/** &nbsp;&nbsp; See [Quickstart](../Quickstart)
  * **TestRunner/** &nbsp;&nbsp; See [here](http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/) under *TestRunner*        
  * **lib/**
  * **FirePHP/** &nbsp;&nbsp; Collected from [github: firephp-libs -> /packages/insight/lib/FirePHP/](http://github.com/cadorn/firephp-libs/tree/master/packages/insight/lib/FirePHP/)
  * **FirePHPCore/** &nbsp;&nbsp; Collected from [github: firephp-libs -> /packages/core/lib/FirePHPCore/](http://github.com/cadorn/firephp-libs/tree/master/packages/core/lib/FirePHPCore/)
  * **Insight/** &nbsp;&nbsp; Collected from [github: insight -> /packages/lib-php/lib/Insight/](http://github.com/cadorn/insight/tree/master/packages/lib-php/lib/Insight/)
  * **Wildfire/** &nbsp;&nbsp; Collected from [ithub: wildfire -> /packages/lib-php/lib/Wildfire/](http://github.com/cadorn/wildfire/tree/master/packages/lib-php/lib/Wildfire/)
  * **Zend/** &nbsp;&nbsp; Collected from [github: insight -> /packages/lib-php/lib/Zend/](http://github.com/cadorn/insight/tree/master/packages/lib-php/lib/Zend/)
  * **tests/** &nbsp;&nbsp; Unit tests (work in progress)
  * **CHANGELOG.md**
  * **LICENSE**
    
    
Contributing
============
    
The development of *FirePHP* is discussed on the developer mailing list: [http://groups.google.com/group/firephp-dev](http://groups.google.com/group/firephp-dev)
    
The documentation for the sub-projects is still sparse. If you have any questions please do not hesitate to inquire on the mailing list.
    
To make changes to *FirePHP* or any of it's sub-projects and contribute your modifications you are encouraged to follow these steps:
    
  1. **Fork the appropriate project on github.**
  2. Clone the forked repository to your development system.
  3. Add the appropriate path up to *lib* (see *Distribution Structure* above) to your include path **before** adding the path to the
[distribution package](../Install/). This will cause PHP to load the cloned source instead of the files from the distribution package.
  4. Make and test your changes.
  5. Commit changes to git and push them to github.
  6. Send a pull-request on github and post a message to the mailing list regarding your changes.
   
    
Supporting FirePHP
==================

You can support *FirePHP* by [donating](http://www.firephp.org/HQ/Contribute.htm?Trigger=Donate) or using all
[DeveloperCompanion](http://www.developercompanion.com/) features to improve your development workflow. The maker of *DeveloperCompanion*,
[Christoph Dorn](http://www.christophdorn.com), is the primary sponsor of *FirePHP*.
    
Another great way to support *FirePHP* is by promoting it's adoption. You can blog, tweet, link to or speak about *FirePHP* and recommend
it to your colleagues.
