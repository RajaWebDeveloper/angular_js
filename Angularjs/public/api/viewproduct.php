<?php

include "dbconnect.php";

$sql = "SELECT * FROM product";
$query = mysqli_query($connect,$sql);
$data = array();
while($row = mysqli_fetch_assoc($query)){
    $data[] = $row;
}

echo json_encode($data);