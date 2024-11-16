<?php

define("Host" ,"localhost");
define("user","root");
$pass="";
define("Dbname","listed");

try{

    $conn= new PDO("mysql:host=".Host.";dbname=".Dbname."",user,$pass);
$conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

echo "<script> alert('success  '); </script>";

echo "<script> console.log('success  '); </script>";


}catch(PDOException $ex){
    $ex->getMessage();
}

?>