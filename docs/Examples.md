
NOTE: Make sure you have [DeveloperCompanion](Clients#devcomp) installed!

PLANNED: Many more examples will be added in time.

Groups
------

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/Quickstart/Groups.php"}
    
    $inspector = FirePHP::to('page');
    $console = $inspector->console();
    $console->group('group1')->open();
    $console->log('Group 1');    // Group Label
    $console->log('Group 1 message 1');
    $console->group('group1')->close();


Message Priorities
------------------
   
    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/Quickstart/MessagePriorities.php"}
    
    $inspector = FirePHP::to('page');
    $console = $inspector->console();
    $console->log('Log Message');
    $console->info('Info message');
    $console->warn('Warning message');
    $console->error('Error message');


Tables
------

    CODE: {"lang":"php","run":"http://reference.developercompanion.com/Tools/FirePHPCompanion/Run/Examples/Quickstart/Tables.php"}
    
    $inspector = FirePHP::to('page');
    $console = $inspector->console();
    $table = array();
    $table[] = array('Row 1  Column 1', 'Row 1 Column 2');
    $table[] = array('Row 2  Column 1', 'Row 2 Column 2');
    $console->table('Sample Table', $table, array('Column 1', 'Column 2'));
