<?php

include "dbconnect.php";

$sql = "SELECT * FROM category";
$query = mysqli_query($connect,$sql);
$data = array();
while($row = mysqli_fetch_assoc($query)){
    $data[] = $row;
}

echo json_encode($data);