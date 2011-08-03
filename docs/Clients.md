
FirePHP is designed to support multiple different clients via open [protocols](Protocols). The open source
[Insight](Insight) system is used to collect data on the server and any client that integrates *Insight* can
display this data using common JavaScript/HTML/CSS UI components.

The intent is to eventually have [Insight](Insight) support baked right into *IDE*s and developer tools.


Status
======

While the underlying design and implementation, in theory, already supports multiple clients, it needs to settle a bit more 
and must be better organized and documented to make this a reality. For now the __[Insight](Insight) system is being incubated as
part of [DeveloperCompanion](http://developercompanion.com/)__ and will be released as a first-class open source ecosystem
of tools and libraries for multiple programming languages in future.


Fully Featured Clients
======================

DeveloperCompanion
------------------
{: id="devcomp"}

[DeveloperCompanion](http://developercompanion.com/) is the **preferred client** for *FirePHP 1.0* on **Firefox 4+** and **implements the full
_[Insight](Insight)_ and thus _FirePHP 1.0_ feature set**.

All **core features** as previously provided by the *FirePHP Firefox Extension* are free to be used.

![DeveloperCompanion Install Button](http://developercompanion.com/resources/images/devcomp-install_v2.png){: href="http://developercompanion.com/do-install" resize="false" align="center"}

INFO: **If [Firebug 1.5+](http://getfirebug.com/) is installed, messages may be routed to the *Firebug* [Console](http://getfirebug.com/commandline).
Make sure *Firebug* is open and the *Console* and *Net* panels are enabled!**

*DeveloperCompanion* includes additional opt-in features aimed at making developers highly efficient. Licensing
proceeds support the further development of *FirePHP* and [related technologies](http://www.christophdorn.com/OpenSource/) as well as
the [development of a new kind of toolchain](http://www.christophdorn.com/Research/) by [Christoph Dorn](http://www.christophdorn.com/), 
author of FirePHP.


Partial Featured Clients
========================

FirePHP Firefox Extension
-------------------------
{: id="firephp"}

NOTICE: The *FirePHP Firefox Extension* hosted at [https://addons.mozilla.org/en-US/firefox/addon/firephp/](https://addons.mozilla.org/en-US/firefox/addon/firephp/) 
is **deprecated**. Use *DeveloperCompanion* instead if you can.

The *FirePHP Firefox Extension* is the client to the *FirePHP Server Library* originally written in 2007. Since then, the code has gotten out of hand after 
numerous compatibility adjustments as *FirePHP*, *Firebug* and *Firefox* evolved over the years. Now that the *FirePHP* project is shifting its focus 100%
to the server library only and multiple clients are desired it has been decided to phase out the extension. That being said there will continue to
be maintenance releases for the *FirePHP Firefox Extension* to keep it compatible with *Firefox* and *Firebug*.

In the interest of supporting [Insight](Insight) and the stack of technologies being developed (see *FireConsole* below) it has been decided to direct existing 
users of the *FirePHP Firefox Extension* to upgrade to [DeveloperCompanion](http://developercompanion.com/) which implements the
same core features and is free to use with *FirePHP 1.0*.

Any user who dislikes the fact that *DeveloperCompanion* is closed source will be happy to know that *FireConsole* (see below)
will take the place of the *FirePHP Firefox Extension* in future.


Planned Clients
===============

FireConsole
-----------
{: id="fireconsole"}

[http://fireconsole.org/](http://fireconsole.org/) is a [FirePHP Extension](https://addons.mozilla.org/en-US/firefox/addon/firephp/) 
replacement project that was originally intended to be used to incubate the [Insight](Insight) system in a collaborative fashion.
While working on the project it was discovered that things were changing too much too often for a group of people to stay in sync
and the [underlying technologies](http://www.christophdorn.com/Research/) were not mature enough to support a wider audience.

It was thus decided that [development of Insight and related projects](https://github.com/cadorn) would happen much more quickly
if it was worked on more privately and integrated into a product that can provide a testbed, gain awareness and provide funding for *Insight*. This 
product is [DeveloperCompanion](http://developercompanion.com/) with the aim to provide the toolset needed to integrate
*Insight* into any codebase. Any *Insight* and thus *FirePHP* and more generally *PHP* user can become more efficient by licensing
*DeveloperCompanion* and in turn support the development of all underlying technologies as *DeveloperCompanion* is a slim application
on top of a [state-of-the-art 100% open source stack](http://www.christophdorn.com/OpenSource/).

PLANNED: The FireConsole project will be rebooted when *Insight* is ready to be integrated into other clients and provide an
MIT licensed reference implementation on how to do so.
