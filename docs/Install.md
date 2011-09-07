FirePHP requires two components, one on the server and one on the client, which communicate
to transfer application-internal data using open [Protocols](Protocols). See [Concepts](Concepts) for more information.

NOTICE: If you are upgrading from an earlier version of FirePHP (< 1.0) see [here](Configuration/Traditional#upgrade) first.

1) FirePHP-compatible Client
============================

There are big plans to bring FirePHP, or more specifically [Insight](Insight), collected data to all kinds of clients.
See [Clients](Clients) for more information.

Until this goal is reached the only available client that supports all FirePHP 1.0 features is [DeveloperCompanion](Clients#devcomp)
which is incubating the [Insight](Insight) system until it is ready for wider use.

![DeveloperCompanion Install Button](http://developercompanion.com/resources/images/devcomp-install_v2.png){: href="http://developercompanion.com/do-install" resize="false" align="center"}

INFO: If [Firebug](http://getfirebug.com/) is installed, messages may be routed to the *Firebug* [Console](http://getfirebug.com/commandline).

NOTE: All **core features** as previously provided by the *FirePHP Firefox Extension* are free to be used.


2) FirePHP Server Library
=========================

On the server, the FirePHP library is needed. It must be configured and included before any other application code runs.

Download
--------

See [Download](Download) for complete information. This release: **{:inject[pinf://./-info/version]:}**

![FirePHP ZIP Download Button](/resources/images/download_zip.png){: href="%%url[pinf://./-bundles/lib.zip]%%" resize="false"}
![FirePHP PHAR Download Button](/resources/images/download_phar.png){: href="%%url[pinf://./-bundles/lib.phar]%%" resize="false"}

Configure
---------
{: id="configure"}

There are three approaches to configure and include FirePHP:

  1. **[Traditional: FirePHPCore](Configuration/Traditional)** Just include FirePHPCore and you are ready to go. (**DEPRECATED**)
  2. **[Configure: constants](Configuration/Constants)** Configure FirePHP via a few constants before including it.
  3. **[Configure: files](Configuration/Files)** Configure FirePHP via *JSON* files with complete control (**PREFERRED**)

A quick comparison:

<table class="pivot">
    <tr>
        <th></th>
        <th>Traditional: FirePHPCore</th>
        <th>Configure: constants</th>
        <th>Configure: files</th>
    </tr>
    <tr>
        <td>Preference</td>
        <td class="center">DEPRECATED</td>
        <td class="center"></td>
        <td class="center"><b>PREFERRED</b></td>
    </tr>
    <tr>
        <td>Since FirePHP</td>
        <td class="center">0.1</td>
        <td class="center">1.0</td>
        <td class="center">1.0</td>
    </tr>
    <tr class="heading">
        <td>Features</td>
        <td colspan="3">&nbsp;</td>
    </tr>
    <tr>
        <td>Traditional FirePHP API</td>
        <td class="center"><div class="icon-yes"></div></td>
        <td class="center"><div class="icon-yes"></div></td>
        <td class="center"><div class="icon-yes"></div></td>
    </tr>
    <tr>
        <td>Insight API</td>
        <td class="center"><div class="icon-no"></div></td>
        <td class="center"><div class="icon-yes"></div></td>
        <td class="center"><div class="icon-yes"></div></td>
    </tr>
    <tr>
        <td>Proxy support</td>
        <td class="center">limited data</td>
        <td class="center"><div class="icon-yes"></div></td>
        <td class="center"><div class="icon-yes"></div></td>
    </tr>
    <tr>
        <td>Lots of data</td>
        <td class="center"><div class="icon-no"></div></td>
        <td class="center"><div class="icon-yes"></div></td>
        <td class="center"><div class="icon-yes"></div></td>
    </tr>
    <tr>
        <td>Built-in security</td>
        <td class="center"><div class="icon-no"></div></td>
        <td class="center"><div class="icon-yes"></div></td>
        <td class="center"><div class="icon-yes"></div></td>
    </tr>
    <tr>
        <td>Advanced configuration</td>
        <td class="center"><div class="icon-no"></div></td>
        <td class="center"><div class="icon-no"></div></td>
        <td class="center"><div class="icon-yes"></div></td>
    </tr>
    <tr>
        <td>Seamless production deployment</td>
        <td class="center"><div class="icon-no"></div></td>
        <td class="center"><div class="icon-no"></div></td>
        <td class="center"><div class="icon-yes"></div></td>
    </tr>
</table>
