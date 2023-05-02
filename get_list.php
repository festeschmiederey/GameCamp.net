<?php
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json; charset=utf-8");

    include 'init.php';

    $table = $_GET["table"];
    $col = $_GET["col"];

    $sql = 'SELECT ' . implode(',', $col)  . ' FROM ' . $table;

	$result = mysqli_query($server, $sql);
	echo(json_encode(mysqli_fetch_all($result)));
?>