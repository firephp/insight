
There are two primary *APIs* available in *FirePHP 1.0*. The traditional [FirePHP API](FirePHP) and the all new
[Insight API](Insight).

The same *FirePHP API* has been around since the beginning (2007) and has established a debugging API modeled after the
[Firebug Console API](http://getfirebug.com/wiki/index.php/Console_API) which had been used to send messages to the
[Firebug Console](http://getfirebug.com/commandline).

The *Insight API* has evolved from the *FirePHP API* to be a permanent (leave logging calls in place) and extensible approach to collecting
data from an application. *Insight API* calls can be intertwined with application logic to capture precisely
the information that is desired.

**Using the *Insight API* is recommended in all cases. The *FirePHP API* should only be used for ad-hock debug logging
where statements will be removed again later.**

FirePHP API
===========

The [FirePHP API](FirePHP) is very simple (and thus limited) in that every API call to a logging method immediately causes
the logged data to be sent to the client.

Example:

    CODE: {"lang":"php"}
    
    $firephp = FirePHP::getInstance(true);
    $firephp->log($var, 'Label');
    
    // or
    
    FB::log($var, 'Label');

See [FirePHP API](FirePHP) for complete reference.


Insight API
===========

The [Insight API](Insight) is a *chained API* that allows for creating and manipulating multiple contexts (read channels) 
and then sending messages to these. Most importantly it is flexible enough to allow application internal architecture
and event flows to be reflected in the context attached to messages and displayed using custom renderers on the client.

PLANNED: Customizable client renderers are coming soon.

Example:

    CODE: {"lang":"php"}
    
    $inspector = FirePHP::to('page');
    $console = $inspector->console();

    $console->label('Label')->log($var);

    $group = $console->group('events', 'Events');
    $group->label('Label')->log($var);

See [Insight API](Insight) for complete reference.

NOTE: The *Insight API* is **not supported** by the [FirePHP Firefox Extension](Clients#firephp).
