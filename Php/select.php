<?php
header('Access-Control-Allow-Origin:http://localhost:3000');


$host = "localhost";
$username = "root";
$password = "";
$database = "book_db.sql";
$conn=mysqli_connect($host, $username, $password, $database);

$datafor=$_POST['datafor'];

if($datafor=="login"){
	$email = $_POST['email'];
	$pwd = $_POST['pwd'];
	$sql="select user_id,isadmin from user_master where email_id='$email' and pwd='$pwd'";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
		while($row = mysqli_fetch_assoc($result))
		{
		  $data1[] = $row;
		}
		echo json_encode($data1);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor=="usersug"){
	$uid = $_POST['uid'];
	$sql="SELECT um.user_id, um.username, um.fullname, um.pfp FROM user_master um WHERE um.isadmin='0' AND NOT EXISTS (SELECT 1 FROM friend f WHERE ((f.user_id1 = um.user_id AND f.user_id2 = $uid) OR (f.user_id1 = $uid AND f.user_id2 = um.user_id)) AND f.status IN (0, 1))";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
		$data2[] = $row;
	}
	echo json_encode($data2);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor=="books"){
	$sql="select * from book_master";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
		$data3[] = $row;
	}
	echo json_encode($data3);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor=="userprof"){
	$uid = $_POST['uid'];
	$sql="select fullname,username,email_id,gender,pfp from user_master where user_id='$uid'";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
		$data4[] = $row;
	}
	echo json_encode($data4);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor=="booksbyuser"){
	$uid = $_POST['uid'];
	$sql="select count(book_id) as bookcnt from book_master where uploaded_by='$uid'";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
		$data5[] = $row;
	}
	echo json_encode($data5);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor=="freqs"){
	$uid = $_POST['uid'];
	$sql="SELECT um.user_id as userid, um.username as username, um.fullname as fullname, um.pfp as pfp, f.time as ts, f.frd_id as fid FROM user_master um JOIN friend f ON um.user_id = f.user_id1 WHERE f.user_id2 = $uid AND f.status = 0;";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
		$data6[] = $row;
	}
	echo json_encode($data6);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor=="freqsc"){
	$uid = $_POST['uid'];
	$ts = $_POST['ts'];
	$sql="SELECT count(frd_id) as cnt FROM friend WHERE user_id2 = $uid AND status = 0 AND time > '$ts'";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
		$data7[] = $row;
	}
	echo json_encode($data7);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor=="freqpend"){
	$uid = $_POST['uid'];
	$sql="SELECT count(frd_id) as cnt FROM friend WHERE user_id2 = $uid AND status = 0";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
		$data8[] = $row;
	}
	echo json_encode($data8);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor=="friends"){
	$uid = $_POST['uid'];
	$sql="SELECT um.user_id AS userid, um.username AS username, um.fullname AS fullname, um.pfp AS pfp, f.time AS ts, f.frd_id AS fid FROM user_master um JOIN friend f ON um.user_id = f.user_id1 OR um.user_id = f.user_id2 WHERE (f.user_id1 = $uid OR f.user_id2 = $uid) AND um.user_id<>$uid AND f.status = 1";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
		$data9[] = $row;
	}
	echo json_encode($data9);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor=="chats"){
	$uid = $_POST['uid'];
	$sql="SELECT b.title AS title,b.cover AS cover,c.chat_id AS cid, u1.pfp as user1p, u2.pfp as user2p, u1.username as user1n, u2.username as user2n FROM chats c INNER JOIN book_master b on c.book_id=b.book_id INNER JOIN friend f on c.frd_id=f.frd_id LEFT JOIN user_master u1 on f.user_id1=u1.user_id LEFT JOIN user_master u2 on f.user_id2=u2.user_id WHERE f.user_id2 = '$uid' or f.user_id1 = '$uid'";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
		$data9[] = $row;
	}
	echo json_encode($data9);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor=="loadbook"){
	$cid = $_POST['cid'];
	$sql="SELECT b.title as title,b.loc as loc FROM chats c INNER JOIN book_master b on c.book_id=b.book_id where c.chat_id='$cid'";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
		$data9[] = $row;
	}
	echo json_encode($data9);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor=="messages"){
	$cid = $_POST['cid'];
	$sql="SELECT m.msg_id as msg_id, m.msg as msg, m.from_uid as sender, m.to_uid as rec, u1.pfp as u1p, u1.username as u1u, u2.username as u2u from messages m left join user_master u1 on m.from_uid=u1.user_id left join user_master u2 on m.to_uid=u2.user_id where m.chat_id='$cid'";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
		$data9[] = $row;
	}
	echo json_encode($data9);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor=="unread"){
	$uid = $_POST['uid'];
	$cid = $_POST['cid'];
	$sql="SELECT c.chat_id AS cid, COUNT(m.msg_id) AS um FROM chats c INNER JOIN messages m ON c.chat_id = m.chat_id WHERE m.to_uid = $uid AND m.chat_id != $cid AND m.status = 0 GROUP BY c.chat_id;";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
		$data9[] = $row;
	}
	echo json_encode($data9);
	}
	else{
		echo json_encode([]);
	}
}
else if($datafor=="recid"){
	$cid = $_POST['cid'];
	$sql="SELECT f.user_id1 as u1, u1.username as u1u, f.user_id2 as u2, u2.username as u2u, u1.pfp as pfp1, u2.pfp as pfp2 FROM chats c inner join friend f on c.frd_id = f.frd_id inner join user_master u1 on f.user_id1=u1.user_id inner join user_master u2 on f.user_id2=u2.user_id WHERE c.chat_id = '$cid'";
	$result = mysqli_query($conn,$sql);
	if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result))
	{
		$data8[] = $row;
	}
	echo json_encode($data8);
	}
	else{
		echo json_encode([]);
	}
}

?>