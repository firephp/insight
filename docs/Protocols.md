
*FirePHP 1.0* uses [Insight](Insight) to collect application internal data and 
[Wildfire](http://www.christophdorn.com/Research/#wildfire) to send this data to the client without interfering with the
application. Both these projects are open source and intended to be ported to many programming languages.

PLANNED: More documentation on *Wildfire* will be available in time.

*FirePHP* uses a different *wildfire* mode to transfer data based on the [configuration](Install#configure) approach used:

  1. If the [Traditional: FirePHPCore](Configuration/Traditional) approach is used **ALL** data is sent in the response headers.
  2. If the [Configure: constants](Configuration/Constants) or [Configure: files](Configuration/Files) approach is used only 
     a small *pointer* is sent in the response headers
     and the client makes a secondary request to fetch the data. See [Concepts](Concepts) for more information.

Wildfire Implementations
------------------------

Official:

  * PHP implementation (1 & 2): [http://github.com/pinf/wildfire-php](http://github.com/pinf/wildfire-php)
  * JavaScript implementation (1 & 2): [http://github.com/pinf/wildfire-js](http://github.com/pinf/wildfire-js)

PLANNED: Java, Perl, Ruby and other language implementations are planned.

Third party:

  * [https://github.com/Seldaek/monolog/blob/master/src/Monolog/Handler/FirePHPHandler.php](https://github.com/Seldaek/monolog/blob/master/src/Monolog/Handler/FirePHPHandler.php) (1 only)



All data in headers (1)
=======================
{: id="header-only"}

INFO: Only a limited amount of data can be sent in the response headers before it may get trimmed in transport to the client.
This is a limitation of sending data in the response headers. If more data needs to be sent see [Secondary Request (2)](Protocols#secondary-request).

Any application can send log messages in the response headers and the *FirePHP* [client](Clients) will route these to the 
[Firebug](http://getfirebug.com/) [Console](http://getfirebug.com/commandline).

A simple *Hello World* message (response headers):

    CODE: {"lang": "plain"}

    X-Wf-Protocol-1: http://meta.wildfirehq.org/Protocol/JsonStream/0.2
    X-Wf-1-Plugin-1: http://meta.firephp.org/Wildfire/Plugin/FirePHP/Library-FirePHPCore/0.0.0master1106021548
    X-Wf-1-Structure-1: http://meta.firephp.org/Wildfire/Structure/FirePHP/FirebugConsole/0.1
    X-Wf-1-1-1-1: 63|[{"Type":"LOG","File":"/path/to/file","Line":10},"Hello World"]|
    X-Wf-1-Index: 1

For more information see [http://www.firephp.org/Wiki/Reference/Protocol](http://www.firephp.org/Wiki/Reference/Protocol)

A bunch of examples can be found here: [http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/](http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/)


Secondary Request (2)
=====================
{: id="secondary-request"}

INFO: Large amounts of data can be sent using this approach.

Any application can send a *pointer* message in the response headers and serve the log messages to the corresponding
secondary client request. Depending on how the *wildfire messages* are addressed the client will direct them to the
appropriate target.

A bunch of examples can be found here: [http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/](http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/)

PLANNED: More documentation on the format of these messages will be available in time.

A simple *pointer* message (response headers):

    CODE: {"lang": "plain"}
    
    x-request-id: 1309470322490165
    x-wf-protocol-1: http://registry.pinf.org/cadorn.org/wildfire/@meta/protocol/component/0.1.0
    x-wf-1-1-receiver: http://registry.pinf.org/cadorn.org/wildfire/@meta/receiver/transport/0
    x-wf-1-1-1-sender: http://registry.pinf.org/cadorn.org/wildfire/packages/lib-php/lib/Wildfire/Transport.php
    x-wf-1-1-1-1: 119||{"url":"http://example.com/","headers":{"x-insight":"transport"},"payload":{"key":"3a5d6bac25c2ed871e7344063fb5d183"}}|
    x-wf-1-index: 1

NOTE: The `x-request-id` header should be set to the same value as the corresponding header in the request.

Given the *pointer* message above, the client will make a call to:

    CODE: {"lang": "plain"}
    
    POST / HTTP/1.1
    Host: example.com
    x-insight: transport
    
    payload=%7B%22key%22%3A%223a5d6bac25c2ed871e7344063fb5d183%22%7D

NOTE: `payload` = `encodeURIComponent(JSON.stringify({key: "3a5d6bac25c2ed871e7344063fb5d183"}))`

The client expects a *wildfire* payload in the response **body**:

    CODE: {"lang": "plain"}
    
    x-wf-protocol-1: http://registry.pinf.org/cadorn.org/wildfire/@meta/protocol/component/0.1.0
    x-wf-1-1-receiver: http://registry.pinf.org/cadorn.org/insight/@meta/receiver/console/page/0
    x-wf-1-1-1-sender: http://registry.pinf.org/cadorn.org/github/firephp-libs/programs/standalone/examples/TestRunner/?lib=cadorn.org/github/firephp-libs/packages/insight@0.0.0master1106021548
    x-wf-1-1-1-1: 217|{"context":"page","target":"console","file":"/path/to/file","line":11,"lang.id":"registry.pinf.org/cadorn.org/github/renderers/packages/php/master"}|{"origin":{"type":"text","text":"Hello World","lang.type":"string"}}|
    x-wf-1-index: 1
