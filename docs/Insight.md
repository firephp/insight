Insight Intelligence System
===========================

[Insight](http://www.christophdorn.com/Research/#insight) is an intelligence system used to gather, aggregate and display internal 
information from a running application. 
The data is encoded in a language agnostic JSON-based object graph that can be transmitted and rendered by developer 
tools such as integrated development environments, monitoring services and debugging inspectors.

The insight system is being incubated as part of [DeveloperCompanion](Clients#devcomp) and there is a PHP 
implementation bundled with the *FirePHP 1.0* release.

See [Concepts](Concepts) for an overview of how *Insight* fits into the request flow.

See [Protocols](Protocols) for an overview of how *Insight* data is transmitted.

PLANNED: More documentation on *Insight* will be made available in time.

Implementations
---------------

  * PHP implementation: [http://github.com/pinf/insight-php](http://github.com/pinf/insight-php)
  * JavaScript implementation (partial): [http://github.com/pinf/insight-js](http://github.com/pinf/insight-js)

    NOTE: Currently the JavaScript implementation focuses on *rendering* instead of *gathering* insight data. Full
    data gathering for JavaScript is planned in the near future.

PLANNED: Complete JavaScript, Java, Perl, Ruby and other language implementations are planned.


Object Graph Specification
==========================

TODO
