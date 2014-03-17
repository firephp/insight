<?php

function ___main___()
{
    $descriptor = json_decode(file_get_contents(dirname(dirname(dirname($_SERVER['SCRIPT_FILENAME']))) . '/program.json'), true);
    $versions = json_decode(file_get_contents(dirname(dirname(dirname(__FILE__))) . '/workspace/packages/test/etc/versions.json'), true);
    $urls = json_decode(file_get_contents(dirname(dirname(dirname(__FILE__))) . '/workspace/packages/test/etc/urls.json'), true);
    $url = str_replace('%%VERSION%%', $versions['FirePHPCore'][$descriptor['implements']['github.com/firephp/firephp/workspace/packages/test/0.1']['dependencies']['FirePHPCore']], $urls['FirePHPCore']);
    $path = dirname(dirname(dirname(__FILE__))) . '/workspace/.pinf-packages/downloads/packages/' . substr($url, strpos($url, '/') + 2) . "~pkg/lib";

    set_include_path('.' . PATH_SEPARATOR . $path);
    
    date_default_timezone_set('America/Vancouver');
}

___main___();

if (!empty($_GET['test'])) {

    require_once(dirname(__FILE__) . '/' . $_GET['test'] . '.php');

}
