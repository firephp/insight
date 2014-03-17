<?php

function __autoload__($class)
{
    $basePath = dirname(dirname(dirname(__FILE__))) . DIRECTORY_SEPARATOR . 'lib' . DIRECTORY_SEPARATOR;

    if (file_exists($file = $basePath . str_replace('_', '/', $class) . '.php')) {
        require_once($file);
    }
}

spl_autoload_register('__autoload__');

define('FIREPHP_ACTIVATED', true);

require(dirname(dirname(dirname(__FILE__))) . '/lib/FirePHP/Init.php');
