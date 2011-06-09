
<div class="body">

    <p>The following examples are included in the <a href="../Install/">ZIP archive</a> of the <i>FirePHP</i> server library. To setup these
    examples on your own server see the <a href="../Quickstart/">Quickstart</a> Guide.</p>
    
    <p class="info">Make sure you have <a target="_blank" href="http://www.developercompanion.com/">DeveloperCompanion</a> installed!</p>

    <h3>Groups</h3>

    <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/Quickstart/Groups.php" class="chili-lang-php">$inspector = FirePHP::to('page');
$console = $inspector->console();
$console->group('group1')->open();
$console->log('Group 1');    // Group Label
$console->log('Group 1 message 1');
$console->group('group1')->close();
</code></pre></div>    


    <h3>Message Priorities</h3>

    <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/Quickstart/MessagePriorities.php" class="chili-lang-php">$inspector = FirePHP::to('page');
$console = $inspector->console();
$console->log('Log Message');
$console->info('Info message');
$console->warn('Warning message');
$console->error('Error message');</code></pre></div>    


    <h3>Tables</h3>

    <div class="code"><pre><code run="/Tools/FirePHPCompanion/Run/Examples/Quickstart/Tables.php" class="chili-lang-php">$inspector = FirePHP::to('page');
$console = $inspector->console();
$table = array();
$table[] = array('Row 1  Column 1', 'Row 1 Column 2');
$table[] = array('Row 2  Column 1', 'Row 2 Column 2');
$console->table('Sample Table', $table, array('Column 1', 'Column 2'));
</code></pre></div>    

