<?php
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json; charset=utf-8");

    include 'init.php';

    $table = $_GET["table"];
    $filter = $_GET["filter"];
    $name = $_GET["name"];
    $sql = 'SELECT * FROM ' . $table . ' WHERE ' . $filter . ' = "' . $name . '"';

	$result = mysqli_query($server, $sql);
	echo(json_encode(mysqli_fetch_assoc($result)));
?>