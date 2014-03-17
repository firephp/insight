
*FirePHP* is an open source project hosted on [github.com/firephp/firephp](https://github.com/firephp/firephp) 
and is available under the [MIT License](http://github.com/cadorn/firephp-libs/blob/master/programs/standalone/LICENSE).
Your contributions are welcome and very much appreciated.

Support
=======
{: id="support"}

General Support & Discussions
-----------------------------

INFO: For *DeveloperCompanion Client* support see [http://groups.google.com/group/devcomp](http://groups.google.com/group/devcomp).

Start with the [Frequently Asked Questions](FAQ) then consult the mailing list 
[http://groups.google.com/group/firephp-dev](http://groups.google.com/group/firephp-dev).


Bug Reports & Feature Requests
------------------------------

INFO: For *DeveloperCompanion Client* bug reports & feature requests please post to [http://groups.google.com/group/devcomp](http://groups.google.com/group/devcomp).

Report bugs using the issue tracker on github: [https://github.com/firephp/firephp/issues](https://github.com/firephp/firephp/issues)

NOTE: All open tickets from the old issue tracker at 
[http://code.google.com/p/firephp/issues/list](http://code.google.com/p/firephp/issues/list) will be
gradually migrated to github.

Make new feature requests via the developer mailing list [http://groups.google.com/group/firephp-dev](http://groups.google.com/group/firephp-dev).


Contribute
==========
{: id="contribute"}

The *FirePHP* project is hosted on [github.com/firephp/firephp](https://github.com/firephp/firephp) and discussed
at [http://groups.google.com/group/firephp-dev](http://groups.google.com/group/firephp-dev).

Contributions of all kind are welcome. You do not need to contribute code. Some suggestions are:

  * Tweet about your FirePHP use-cases
  * Blog about your FirePHP use-cases
  * Link to FirePHP from your site
  * Speak about FirePHP and recommend it to your colleagues
  * Improve the documentation
  * Report bugs
  * Participate in mailing list discussions
  * Fix bugs
  * Write extensions
  * Contribute new features

Process
-------

To make changes to the *FirePHP* codebase and contribute your modifications you are encouraged to follow these steps:

  1. Introduce yourself and the change you wish to make on the [mailing list](https://github.com/firephp/firephp)
  1. Fork the project from [github.com/firephp/firephp](https://github.com/firephp/firephp)
  2. Clone the forked repository to your development environment
  4. Make and test your changes.
  5. Commit changes to git and push them to github.
  6. Send a pull-request on github and post a message to the mailing list regarding your changes.

You must explicitly license your patch by adding the following to the top of any file you modify in order for your patch to be accepted:

    //  - <GithubUsername>, First Last <Email> (URL), Copyright YYYY, MIT License

Testing
-------

REQUIRE: You must have [phpunit](https://github.com/sebastianbergmann/phpunit/) installed on your system.

    git clone git://github.com/firephp/firephp.git
    cd firephp
    phpunit tests


Project Structure
=================

The *FirePHP Server Library* takes components from several projects and combines these into a single 
cohesive library [available](Install) as a *zip* or *phar* archive. See [here](Download#content) for what is included in the archive.

Repository Structure
--------------------

  * `docs/` - The official *FirePHP 1.0* documentation available at: [http://docs.sourcemint.org/firephp.org/firephp/1/-docs/](http://docs.sourcemint.org/firephp.org/firephp/1/-docs/)
  * `lib/`
    * `FirePHP/` - The new *FirePHP 1.0* implementation.
    * `FirePHPCore/` - The original (pre 1.0) implementation synced with [https://github.com/firephp/firephp-core](https://github.com/firephp/firephp-core).
    * `Insight/` - The [Insight](Insight) intelligence system implementation synced with [https://github.com/pinf/insight-php](https://github.com/pinf/insight-php)
    * `Wildfire/` - The communication system. See [Protocols](Protocols). Synced with [https://github.com/pinf/wildfire-php](https://github.com/pinf/wildfire-php)
    * `Zend/` - Various [Zend Framework](http://framework.zend.com/) components.
  * `workspace/` - A [PINF JavaScript Loader](https://github.com/pinf/loader-js) based workspace to provide a development environment and package releases for the *FirePHP 1.0* project.
  * `CHANGELOG.md`
  * `LICENSE.md`
  * `README.md`

NOTE: Changes to the synced projects should be made in the [github.com/firephp/firephp](https://github.com/firephp/firephp) 
repository. Once approved they will be merged to the respective projects.


Community
=========
{: id="community"}

You can follow *FirePHP* on:

  * Twitter: [http://twitter.com/firephplib](http://twitter.com/firephplib)
  * Blog: [http://www.christophdorn.com/Blog/category/firephp/](http://www.christophdorn.com/Blog/category/firephp/)

A list of contributors can be found here:

  * [https://github.com/firephp/firephp/blob/master/package.json](https://github.com/firephp/firephp/blob/master/package.json)
  * [https://github.com/firephp/firephp-core/blob/master/package.json](https://github.com/firephp/firephp-core/blob/master/package.json)
