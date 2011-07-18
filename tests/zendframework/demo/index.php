<?php

function ___main___()
{
    $descriptor = json_decode(file_get_contents(dirname(dirname(dirname(dirname($_SERVER['SCRIPT_FILENAME'])))) . '/program.json'), true);
    $versions = json_decode(file_get_contents(dirname(dirname(dirname(dirname(__FILE__)))) . '/workspace/packages/test/etc/versions.json'), true);
    $urls = json_decode(file_get_contents(dirname(dirname(dirname(dirname(__FILE__)))) . '/workspace/packages/test/etc/urls.json'), true);
    $url = str_replace('%%VERSION%%', $versions['ZendFramework'][$descriptor['implements']['github.com/firephp/firephp/workspace/packages/test/0.1']['dependencies']['ZendFramework']], $urls['ZendFramework']);
    $path = dirname(dirname(dirname(dirname(__FILE__)))) . '/workspace/.pinf-packages/downloads/packages/' . substr($url, strpos($url, '/') + 2) . "~pkg/library";

    set_include_path('.' . PATH_SEPARATOR . $path);
    
    date_default_timezone_set('America/Vancouver');
}

___main___();


// @see http://framework.zend.com/manual/1.11/en/learning.autoloading.usage.html

require_once 'Zend/Loader/Autoloader.php';
Zend_Loader_Autoloader::getInstance();


// NOTE: If ./demo/public/.htaccess gets more complicated this needs to be revised

$uri = substr($_SERVER['REQUEST_URI'], 51);

if(substr($uri, 0, 5)=='Boot/') {
    
    $uri_info = parse_url($uri);

    require_once(dirname(__FILE__) . '/public/' . $uri_info['path']);

} else {
    
    require_once(dirname(__FILE__) . '/public/index.php');
    
}
