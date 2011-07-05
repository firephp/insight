
The traditional *FirePHP API* is **always** available in *Object-Oriented* form when [including](Install#Configure) 
*FirePHP* with either of the following:

    CODE: {"lang":"php"}
    
    // The NEW way
    require_once('/.../FirePHP/Init.php');
    // The deprecated way
    require_once('/.../FirePHPCore/FirePHP.class.php');

To also make the *Procedural FirePHP API* available use either of the following **instead** of the calls above:
  
    CODE: {"lang":"php"}

    // The NEW way
    require_once('/.../FirePHP/FB.php');
    // The deprecated way
    require_once('/.../FirePHPCore/FB.php');

Basics
======

SECURITY: WARNING: When [including](Install#Configure) *FirePHP* in the [traditional](../Configuration/Traditional) 
way (using the `/FirePHPCore/*.php` files) you must protect the security of your application by [disabling](FirePHP#disable) *FirePHP* 
logging on production sites. You can do this by removing the logging statements before you upload your code or by 
restricting FirePHP logging to authorized users only (using [setEnabled()](FirePHP#disable)). If including *FirePHP*
using the `/FirePHP/*.php` files your setup is automatically secure and no data will be sent unless the client is [authorized](../Authorize).

NOTE: The information below is targeted at *PHP 5* users. If you are using *PHP 4* please see [PHP 4](FirePHP#php4) below.

Use the *Object Oriented API* when you want to **keep logging statements in the application**:

    CODE: {"lang":"php"}
    
    $firephp = FirePHP::getInstance(true);
    $firephp-> *

Use the *Procedural API* when you want to **temporarily log some variables**:

    CODE: {"lang":"php"}

    FB:: *
    fb();

Disabling FirePHP
-----------------
{: id="disable"}

Logging is **enabled by default**. You can disable it with `setEnabled(false)`. Use this method to disable logging on your live site 
for everyone except authorized users.

    CODE: {"lang":"php"}

    $firephp->setEnabled(false);    // or
    FB::setEnabled(false);

Options
-------

    CODE: {"lang":"php"}
    
    // Defaults:
    $options = array('maxObjectDepth' => 5,
                     'maxArrayDepth' => 5,
                     'maxDepth' => 10,
                     'useNativeJsonEncode' => true,
                     'includeLineNumbers' => true);
    
    $firephp->setOptions($options);  // or FB::setOptions($options);
    $firephp->getOptions();          // or FB::getOptions();

Where:

  * `maxObjectDepth` - Maximum depth to traverse objects.
  * `maxArrayDepth` - Maximum depth to traverse arrays.
  * `maxDepth` - Maximum depth to traverse mixed arrays/objects.
  * `useNativeJsonEncode` - Set to `FALSE` to use *JSON* encoder included with *FirePHP* instead of `json_encode()`.
  * `includeLineNumbers` - Include *File* and *Line* information in message.

Object Filters
--------------

To exclude specific members when logging objects use `setObjectFilter()`. This is useful to reduce the size of the
logged object graph in larger applications or frameworks.

    CODE: {"lang":"php"}
    
    $firephp->setObjectFilter('ClassName',
                               array('MemberName'));

TIP: [TIP: FirePHP data volume filtering](http://www.christophdorn.com/Blog/2010/10/15/tip-firephp-data-volume-filtering/) for an in-depth tutorial.

Error, Exception & Assertion Handling
-------------------------------------

INFO: This is only available when [including](Install#Configure) *FirePHP* in the [traditional](../Configuration/Traditional) 
way (using the `/FirePHPCore/*.php` files).

Convert `E_WARNING`, `E_NOTICE`, `E_USER_ERROR`, `E_USER_WARNING`, `E_USER_NOTICE` and `E_RECOVERABLE_ERROR` errors to `ErrorExceptions` 
and send all *Exceptions* to the console.

    CODE: {"lang":"php"}
    
    $firephp->registerErrorHandler(
                $throwErrorExceptions=false);
    $firephp->registerExceptionHandler();
    $firephp->registerAssertionHandler(
                $convertAssertionErrorsToExceptions=true,
                $throwAssertionExceptions=false);
    try {
      throw new Exception('Test Exception');
    } catch(Exception $e) {
      $firephp->error($e);  // or FB::
    }

Redirect to [Insight](Insight) console
--------------------------------------

The *FirePHP API* always logs to the *Console* for a page (e.g. [Firebug](http://getfirebug.com/) [Console](http://getfirebug.com/commandline)). 
To direct all *FirePHP API* log messages to a specific [Insight console](Insight#console) use:

    CODE: {"lang": "php", "run": "http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/TestRunner/?action=run&snippet=insight-devcomp/snippets/Traditional-RedirectAPI"}
    
    $firephp->setLogToInsightConsole('Firebug'); // or
    FB::setLogToInsightConsole('Firebug');

NOTE: This will log to a [Request console](Insight#to) called *Firebug*. You can also pass your own *$console* to log to (e.g. 
`FirePHP::to('request')->console('Firebug')`).


FirePHP API
===========

Logging Variables
-----------------

    CODE: {"lang":"php"}
    
    $firephp->log($var);            // or FB::log($var)
    $firephp->log($var, 'Label');   // or FB::log($var, 'Label')

    fb($var);           // or FB::send($var);
    fb($var, 'Label');  // or FB::send($var, 'Label');

Priority Styling
----------------

These logging methods follow the four [Firebug logging priorities](http://getfirebug.com/wiki/index.php/Console_API). 

    CODE: {"lang":"php"}
    
    $firephp->log($var);    // or FB::log($var)
    $firephp->info($var);   // or FB::info($var)
    $firephp->warn($var);   // or FB::warn($var)
    $firephp->error($var);  // or FB::error($var)
    
    $firephp->fb($var, FirePHP::*);  // or FB::send($var, FirePHP::*);
    
    fb($var, FirePHP::*);

INFO: Replace `FirePHP::*` with one of `FirePHP::LOG`, `FirePHP::INFO`, `FirePHP::WARN` or `FirePHP::ERROR`.

INFO: Add an optional label as a second argument to any of these methods. e.g. `$firephp->fb($var, 'Label', FirePHP::WARN);`

Groups
------

In many cases it is useful to group logging messages together. Groups can be nested programatically and expanded/contracted by the user.

    CODE: {"lang":"php"}
    
    $firephp->group('Test Group');
    $firephp->log('Hello World');
    $firephp->groupEnd();

To collapse groups in the console or change the color of the group label use:

    CODE: {"lang":"php"}
    
    $firephp->group('Collapsed and Colored Group',
                    array('Collapsed' => true,
                          'Color' => '#FF00FF'));

Tables
------

You can log tables of information. The *Table Label* is displayed in the console and the user can toggle the display of the table. 
The first row of the table is automatically used as the heading and the number of columns is dynamically determined.

    CODE: {"lang":"php"}
    
    $table   = array();
    $table[] = array('Col 1 Heading','Col 2 Heading');
    $table[] = array('Row 1 Col 1','Row 1 Col 2');
    $table[] = array('Row 2 Col 1','Row 2 Col 2');
    $table[] = array('Row 3 Col 1','Row 3 Col 2');
    
    $firephp->table('Table Label', $table);  // or FB::('Table Label', $table);
    
    fb($table, 'Table Label', FirePHP::TABLE);

Traces
------

You can send a [backtrace](http://www.php.net/manual/en/function.debug-backtrace.php) showing *File*, *Line*, *Class*, *Method* and 
*Function* information including *Arguments* to clearly show the execution path up to the point in your code where you triggered the trace.

    CODE: {"lang":"php"}
    
    $firephp->trace('Trace Label');  // or FB::trace('Trace Label'); 
    
    fb('Trace Label', FirePHP::TRACE);


PHP 4
=====
{: id="php4"}

*PHP 4* support is only available when [including](Install#Configure) *FirePHP* in the [traditional](../Configuration/Traditional) 
way (using the `/FirePHPCore/*.php4` files). The *FirePHP API* for *PHP 4* is identical to the one for *PHP 5* with some minor
differences (see *Notes* below).

SECURITY: WARNING: You are responsible for turning off logging on production sites (using [setEnabled()](FirePHP#disable)).

Use the *PHP 4* versions of the library files (notice the `.php4` extension):

    CODE: {"lang":"php"}
    
    require_once('FirePHPCore/FirePHP.class.php4'); // Object Oriented
    require_once('FirePHPCore/fb.php4');            // Object Oriented + Procedural

Notes
-----

  * `FirePHP::getInstance()` auto creates a global object called `$FirePHP_Instance` and returns a **reference** to it. 
    Make sure to **remember the `&` symbol when assigning the returned reference** to ensure the object is not copied.
    
        CODE: {"lang":"php"}
        $firephp =& FirePHP::getInstance(true);

  * All `FirePHP::*` class constants are accessible via global `FirePHP_*` constants.
  
        CODE: {"lang":"php"}
        fb($var, FirePHP_*);
  
  * Exception handling functionality will not work as there is no exception support in PHP4. `registerErrorHandler()` always 
    logs errors to FirePHP.
