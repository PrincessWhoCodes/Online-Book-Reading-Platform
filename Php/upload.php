<?php
header('Access-Control-Allow-Origin:http://localhost:3000'); 


$title = $_POST['bname'];

$toDay = date("jnyHis");

$file_name = $_FILES['fupload']['name'];
$file_size = $_FILES['fupload']['size'];
$file_tmp = $_FILES['fupload']['tmp_name'];
$file_type = $_FILES['fupload']['type'];
move_uploaded_file($file_tmp,"books/".$toDay.str_replace(' ', '',$file_name));
$file_loc = "books/".$toDay.str_replace(' ', '',$file_name);

$file_name = $_FILES['cover']['name'];
$file_size = $_FILES['cover']['size'];
$file_tmp = $_FILES['cover']['tmp_name'];
$file_type = $_FILES['cover']['type'];
move_uploaded_file($file_tmp,"covers/".$toDay.str_replace(' ', '',$file_name));
$cover_loc = "".$toDay.str_replace(' ', '',$file_name);

$host = "localhost";
$username = "root";
$password = "";
$database = "book_db.sql";
$conn=mysqli_connect($host, $username, $password, $database);
$sql = "INSERT INTO book_master(title,loc,cover) VALUES('$title','$file_loc','$cover_loc')";
if(mysqli_query($conn,$sql))
	{
		echo "Book Uploaded Successfully";
	}
	else{
		echo "Error";
	}

?>