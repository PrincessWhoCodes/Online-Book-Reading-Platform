<?php
header('Access-Control-Allow-Origin:http://localhost:3000');


$host = "localhost";
$username = "root";
$password = "";
$database = "book_db.sql";
$conn=mysqli_connect($host, $username, $password, $database);

$datafor=$_POST['datafor'];

if($datafor=="dash1"){
	
	$sql="SELECT user_id,fullname,username,email_id  FROM user_master Where isadmin='0' ";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
	  $data[] = $row;
	}
	echo json_encode($data);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor=="dash2"){

    $sql="SELECT b.title as title ,Count(c.book_id) As total From book_master b Join chats c On b.book_id=c.book_id  Group By title Order By total desc ";
    $result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
	  $data[] = $row;
	}
	echo json_encode($data);
	}
	else{
		echo json_encode([]);
	}
}