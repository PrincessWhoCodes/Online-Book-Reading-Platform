<?php
header('Access-Control-Allow-Origin:http://localhost:3000'); 


$host = "localhost";
$username = "root";
$password = "";
$database = "book_db.sql";
$conn=mysqli_connect($host, $username, $password, $database);

$datafor=$_POST['datafor'];

if($datafor == "pfp"){
$uid = $_POST['uid'];
$toDay = date("jnyHis");
if(isset($_FILES['file'])){
$file_name = $_FILES['file']['name'];
$file_size = $_FILES['file']['size'];
$file_tmp = $_FILES['file']['tmp_name'];
$file_type = $_FILES['file']['type'];
$file_n = $toDay.str_replace(' ', '',$file_name);
if(move_uploaded_file($file_tmp,"userpic/".$file_n)){
$sql = "UPDATE user_master SET pfp='$file_n' where user_id='$uid'";
if(mysqli_query($conn,$sql)){
		$data=array("regstat"=>"success");
		echo json_encode($data);
	}
	else{
		$data=array("regstat"=>"fail");
		echo json_encode($data);
	}
}
}
}
else if($datafor == "userupd"){
	$keys = array_keys($_POST);
	$key = $keys[0];
	$val = $_POST[$key];
	$uid = $_POST["uid"];
	$sql = "UPDATE user_master SET $key='$val' where user_id='$uid'";
	if(mysqli_query($conn,$sql)){
		$data=array("updstat"=>"success");
		echo json_encode($data);
	}
	else{
		$data=array("updstat"=>"fail");
		echo json_encode($data);
	}
}
else if($datafor == "addfrd"){
	$fid = $_POST["fid"];
	$sql = "UPDATE friend SET status='1' where frd_id='$fid'";
	if(mysqli_query($conn,$sql)){
		$data=array("updstat"=>"success");
		echo json_encode($data);
	}
	else{
		$data=array("updstat"=>"fail");
		echo json_encode($data);
	}
}
else if($datafor == "markseen"){
	$cid = $_POST["cid"];
	$uid = $_POST["uid"];
	$sql = "UPDATE messages SET status='1' where chat_id='$cid' AND to_uid='$uid'";
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