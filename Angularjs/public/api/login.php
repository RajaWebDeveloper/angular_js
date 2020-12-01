<?php

include_once "dbconnect.php";

$postdata = file_get_contents("php://input");
$request     = json_decode($postdata);
$name = $request->username;
$password = $request->password;

$sql = 'SELECT name,role FROM user WHERE name = "'.$name.'" AND password = "'.$password.'" ';
$fetch = mysqli_query($connect,$sql);
$user_details = mysqli_fetch_assoc($fetch);
$count = mysqli_num_rows($fetch);

$json = json_encode($user_details);
echo $json;