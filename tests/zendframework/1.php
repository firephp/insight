<?php

// @see http://framework.zend.com/manual/1.11/en/learning.autoloading.usage.html

require_once 'Zend/Loader/Autoloader.php';
Zend_Loader_Autoloader::getInstance();
    

// @see http://framework.zend.com/manual/en/zend.log.writers.html#zend.log.writers.firebug

$writer = new Zend_Log_Writer_Firebug();
$logger = new Zend_Log($writer);
 
$request = new Zend_Controller_Request_Http();
$response = new Zend_Controller_Response_Http();
$channel = Zend_Wildfire_Channel_HttpHeaders::getInstance();
$channel->setRequest($request);
$channel->setResponse($response);
 
// Start output buffering
ob_start();
 
// Now you can make calls to the logger
 
$logger->log('This is a log message!', Zend_Log::INFO);
 
// Flush log data to browser
$channel->flush();
$response->sendHeaders();
