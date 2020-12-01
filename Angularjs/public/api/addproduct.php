<?php

include "dbconnect.php";

if(!empty($_FILES))
{
    if(isset($_POST['discount']) && isset($_POST['from_date']) && isset($_POST['to_date'])){
        $from_date = date("Y-m-d", strtotime($_POST['from_date']));
        $to_date = date("Y-m-d", strtotime($_POST['to_date']));
        $sql = "INSERT INTO product SET product_name = '".$_POST['product_name']."' , description = '".$_POST['description']."' , short_description = '".$_POST['short_description']."' , price = '".$_POST['price']."' , discount = '".$_POST['discount']."' , from_date = '".$from_date."' , to_date = '".$to_date."' , image_name = '".$_FILES['image']['name']."' , file_name = '".$_FILES['file']['name']."' ";
    }else{
        $sql = "INSERT INTO product SET product_name = '".$_POST['product_name']."' , description = '".$_POST['description']."' , short_description = '".$_POST['short_description']."' , price = '".$_POST['price']."' , image_name = '".$_FILES['image']['name']."' , file_name = '".$_FILES['file']['name']."' ";
    }

    $query = mysqli_query($connect,$sql);

    if($query > 0){
        $last_id = mysqli_insert_id($connect);
        $dir_name = '../upload/'.$last_id;
        mkdir($dir_name);

        $path_1 = $dir_name.'/'.$_FILES['file']['name'];
        $path_2 = $dir_name.'/'. $_FILES['image']['name'];
        move_uploaded_file($_FILES['file']['tmp_name'], $path_1);
        move_uploaded_file($_FILES['image']['tmp_name'], $path_2);

        $status = "success";
        echo json_encode($status);
    }else{
        $status = "error";
        echo json_encode($status);
    }
}else{
    $status = "File Empty";
    echo json_encode($status);
}

//$json = json_encode($request->image);
//echo $json;
