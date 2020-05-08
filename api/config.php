<?php 

define('DB_NAME','requerimientos');
define('DB_USER','root');
define('DB_PASSWORD','');
define('DB_HOST','localhost');

$myslqli = new myslqli(DB_NAME, DB_USER, DB_PASSWORD, DB_HOST);

date_default_timezone_set('Asia/Jakarta');

