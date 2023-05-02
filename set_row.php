<?php
    header('Access-Control-Allow-Origin: *');
    header("Content-type: application/json; charset=utf-8");

    include 'init.php';

    $table = $_GET["table"];
    $filter = $_GET["filter"];
    $name = $_GET["name"];
    $data = $_GET["data"];

    $list = Array();
    foreach ($data as $key => $value) {
      $list[] = "$key=\"$value\"";
    }

    $sql = 'UPDATE ' . $table . ' SET ' . implode(",", $list) . ' WHERE ' . $filter . ' = "' . $name . '"';

	$result = mysqli_query($server, $sql);
?>