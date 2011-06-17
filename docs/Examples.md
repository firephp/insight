    
The following examples are included in the [ZIP archive](Install) of the *FirePHP* server library. To setup these
examples on your own server see the [Guide](Quickstart).

        
INFO: Make sure you have [DeveloperCompanion](http://www.developercompanion.com/) installed!
    
Groups
------
    
        <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/Quickstart/Groups.php" class="chili-lang-php">$inspector = FirePHP::to('page');
    $console = $inspector->console();
    $console->group('group1')->open();
    $console->log('Group 1');    // Group Label
    $console->log('Group 1 message 1');
    $console->group('group1')->close();
    </code></pre></div>    
    
    
Message Priorities
------------------
   
        <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/Quickstart/MessagePriorities.php" class="chili-lang-php">$inspector = FirePHP::to('page');
    $console = $inspector->console();
    $console->log('Log Message');
    $console->info('Info message');
    $console->warn('Warning message');
    $console->error('Error message');</code></pre></div>    
    
    
Tables
------
    
        <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/Quickstart/Tables.php" class="chili-lang-php">$inspector = FirePHP::to('page');
    $console = $inspector->console();
    $table = array();
    $table[] = array('Row 1  Column 1', 'Row 1 Column 2');
    $table[] = array('Row 2  Column 1', 'Row 2 Column 2');
    $console->table('Sample Table', $table, array('Column 1', 'Column 2'));
    </code></pre></div>    

