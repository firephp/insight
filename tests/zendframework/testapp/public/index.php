<?php


function ___main___()
{
    $descriptor = json_decode(file_get_contents(dirname(dirname(dirname(dirname(dirname($_SERVER['SCRIPT_FILENAME']))))) . '/program.json'), true);
    $versions = json_decode(file_get_contents(dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/workspace/packages/test/etc/versions.json'), true);
    $urls = json_decode(file_get_contents(dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/workspace/packages/test/etc/urls.json'), true);
    $url = str_replace('%%VERSION%%', $versions['ZendFramework'][$descriptor['implements']['github.com/firephp/firephp/workspace/packages/test/0.1']['dependencies']['ZendFramework']], $urls['ZendFramework']);
    $path = dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/workspace/.pinf-packages/downloads/packages/' . substr($url, strpos($url, '/') + 2) . "~pkg/library";

    set_include_path('.' . PATH_SEPARATOR . $path);
    
    date_default_timezone_set('America/Vancouver');
}

___main___();


// @see http://framework.zend.com/manual/1.11/en/learning.autoloading.usage.html

require_once 'Zend/Loader/Autoloader.php';
Zend_Loader_Autoloader::getInstance();




// Define path to application directory
defined('APPLICATION_PATH')
    || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));

// Define application environment
defined('APPLICATION_ENV')
    || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'production'));

// Ensure library/ is on include_path
set_include_path(implode(PATH_SEPARATOR, array(
    realpath(APPLICATION_PATH . '/../library'),
    get_include_path(),
)));

/** Zend_Application */
require_once 'Zend/Application.php';

// Create application, bootstrap, and run
$application = new Zend_Application(
    APPLICATION_ENV,
    APPLICATION_PATH . '/configs/application.ini'
);
$application->bootstrap()
            ->run();