<?php

ob_start();
require_once('FirePHPCore/FirePHP.class.php');

$firephp = FirePHP::getInstance(true);
$firephp->log('Hello World');

var_dump("OK");
