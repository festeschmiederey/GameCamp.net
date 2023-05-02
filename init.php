<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    session_start();

    define('DB_HOST', 'rdbms.strato.de');
    define('DB_USER', 'dbu2857498');
    define('DB_PASS', 'DataBase#666');
    define('DB_NAME', 'dbs9502308');

    $server = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($server->connect_error)
    {
        die('Connection Failed ' . $server->connect_error);
    }
?>