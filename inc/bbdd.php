<?php

$cfgServers['host'] = 'localhost';
$cfgServers['port'] = '';
$cfgServers['stduser'] = '';
$cfgServers['stdpass'] = '';

$cfgServers['user'] = 'aran'; 
$cfgServers['password'] = 'v41134r4n'; 

$cfgServer['db'] = 'aran';
$cfgConfirm = true;
$cfgPersistentConnections = false;
$cfgConfirm = true;
$db = $cfgServer['db'];

$connect_func = ($cfgPersistentConnections) ? "mysql_pconnect" : "mysql_connect";
$res = mysql_connect($cfgServers['host'],$cfgServers['user'],$cfgServers['password']);
$res = mysql_select_db($cfgServer['db']);
?>