<?php
header('Access-Control-Allow-Origin:http://localhost:3000'); 


$host = "localhost";
$username = "root";
$password = "";
$database = "book_db.sql";
$conn=mysqli_connect($host, $username, $password, $database);

$datafor=$_POST['datafor'];

if($datafor == "decreq"){
	$fid = $_POST["fid"];
	$sql = "DELETE FROM friend where frd_id='$fid'";
	if(mysqli_query($conn,$sql)){
		$data=array("updstat"=>"success");
		echo json_encode($data);
	}
	else{
		$data=array("updstat"=>"fail");
		echo json_encode($data);
	}
}
?>