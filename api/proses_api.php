<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token");
header("Content-Type: application/json; charset=utf-8");

include "config.php";

$postjson = json_decode(file_get_contents('php://input'), true); 
$today = date('Y-m-d H:i:s');

if($postjson['aksi']=="proses_register"){
$password = md5($postjson['password']);

$insert = mysqli_query($mysqli, " INSERT INTO register SET 
your_name    = '$postjson[your_name]',
email        = '$postjson[email]',
password     =  $password ,
confirm_pass = '$postjson[confirm_pass]',
created_at   = '$today'
");

if($insert){
    $result = json_encode(array('success'=> true,'msg'=> 'Register successfuly' ));
}else(){
    $result = json_encode(array('success'=> false,'msg'=> 'Register error' ));
}

echo $result; 

}