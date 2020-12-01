<?php

include "dbconnect.php";

$sql = "INSERT INTO category SET category_name	= '".$_POST['category_name']."' ";
$query = mysqli_query($connect,$sql);

if($query > 0){
    $status = array(
    	"status"=>"success"
    );
    echo json_encode($status);
}else{
    $status = array(
    	"status"=>"failed"
    );
    echo json_encode($status);
}