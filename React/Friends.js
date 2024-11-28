import React from "react";
import {useState,useEffect} from 'react';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { CardGroup, InputGroup } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Carousel }  from 'react-bootstrap'; 
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import connstr from './constr.js';
import Badge from 'react-bootstrap/Badge';

function Friends(){
	
const [cnt,setCnt] = useState(0);
const [friendReqs, setFriendReqs] = useState([]);
const [friends, setFriends] = useState([]);

useEffect(() => {
	var now = new Date();
	var formattedDate = now.toLocaleString('sv-SE',{ timeZone: 'Asia/Kolkata' }).replace('T', ' ');
	localStorage.setItem("lastcheck",formattedDate);
	pendingFriendReq();
	getFriendReqs();
	getFriends();
},[]);

const pendingFriendReq = () => {
  if(localStorage.getItem("logstatus")==="true"){
  var uid = localStorage.getItem("userid");
  $.ajax({type:"POST",url:connstr+"/backend/select.php",data:{datafor:'freqpend',uid:uid},success(data){
	console.log(data);
	var obj = JSON.parse(data);
	setCnt(obj[0].cnt);
  }});
  }
}

const getFriendReqs = () =>{
  if(localStorage.getItem("logstatus")==="true"){
  var uid = localStorage.getItem("userid");
  $.ajax({type:"POST",url:connstr+"/backend/select.php",data:{datafor:'freqs',uid:uid},success(data){
	console.log(data);
	var obj = JSON.parse(data);
	setFriendReqs(obj);
  }});
  }
}

const getFriends = () =>{
  if(localStorage.getItem("logstatus")==="true"){
  var uid = localStorage.getItem("userid");
  $.ajax({type:"POST",url:connstr+"/backend/select.php",data:{datafor:'friends',uid:uid},success(data){
	console.log(data);
	var obj = JSON.parse(data);
	setFriends(obj);
  }});
  }
}

const viewProfile = (e,id) =>{
	window.href.location = "/profile?uid="+id;
}
const acceptFriendReq = (e,fid) => {
	$.ajax({type:"POST",url:connstr+"/backend/update.php",data:{datafor:"addfrd",fid:fid},success(data){
		var obj = JSON.parse(data);
		if(obj.updstat == "success"){
				alert("Accepted!");
				window.location.reload();
			}
		else{
				alert("Error while accepting please try again!");
				window.location.reload();
		}
	}
	});
}

const declineFriendReq = (e,fid) => {
	$.ajax({type:"POST",url:connstr+"/backend/delete.php",data:{datafor:"decreq",fid:fid},success(data){
		var obj = JSON.parse(data);
		if(obj.updstat == "success"){
				alert("Accepted!");
				window.location.reload();
			}
		else{
				alert("Error while accepting please try again!");
				window.location.reload();
		}
	}
	});
}

const getTimeDifference = (ts) =>{
  const requestTime = new Date(ts.replace(' ', 'T'));
  const currentTime = new Date();
  const diffInMs = currentTime - requestTime;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  if(diffInDays == 0){
	if(diffInHours == 0){
		if(diffInMinutes == 0){
			return diffInSeconds+"sec ago";
		}
		else{
			return diffInMinutes+"min ago";
		}
	}
	else{
		return diffInHours+"hour ago";
	}
  }
  else{
	 return diffInDays+"days ago";
  }
}

const renderFreindReqs = () => {
		var uid = localStorage.getItem("userid");
		let userItems = [];
		for(let i = 0; i < friendReqs.length; i++){
		userItems.push(<Container key={i} style={{borderRadius:"12px", maxHeight:"6rem",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",margin:"5px 5px 5px 5px",padding:"10px 20px"}}>
						<Row>
						<Col md={2}>
						<Image style={{height:"80px",width:"80px"}} src={connstr+"/backend/userpic/"+friendReqs[i].pfp} roundedCircle />
						</Col>
						<Col md={8} align="left">
						<p><b>@{friendReqs[i].username}</b> sent you a friend request.</p>
						<Button style={{backgroundColor:"#536493",borderColor:"#536493",fontSize:"10px"}} onClick={(event) => acceptFriendReq(event,friendReqs[i].fid)}>Accept</Button> &nbsp;
						<Button style={{backgroundColor:"#EF5A6F",borderColor:"#EF5A6F",fontSize:"10px"}} onClick={(event) => declineFriendReq(event,friendReqs[i].fid)}>Delete</Button>
						</Col>
						<Col>
						{getTimeDifference(friendReqs[i].ts)}
						</Col>
						</Row>
						<br/>
						</Container>
		);
		}
		return userItems;
	};
	
const renderUsers = () => {
		var uid = localStorage.getItem("userid");
		let userItems = [];
		let friendList = [];
		for(let i = 0; i < friends.length; i++){
		userItems.push(<Col key={i} style={{borderRadius:"12px", maxWidth:"12rem",height:"15rem",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",margin:"5px 5px 5px 5px",padding:"10px 20px"}}>
						<Container align="center">
						<Row>
						<Col style={{padding:"10px"}}>
						<Image style={{height:"120px",width:"120px"}} src={connstr+"/backend/userpic/"+friends[i].pfp} roundedCircle />
						</Col>
						</Row>
						<Row>
						<Col style={{padding:"10px"}}>
						<b>@{friends[i].username}</b>
						</Col>
						</Row>
						<Row><Col style={{padding:"7px"}}>
						<Button style={{backgroundColor:"#536493",borderColor:"#536493",fontSize:"10px"}} onClick={(event) => viewProfile(friends[i].userid)}>View Profile</Button> &nbsp;
						</Col>
						</Row>
						</Container>
						</Col>
		);
		if ((i + 1) % 3 === 0 || i === friends.length - 1) {
				friendList.push(
						<Row>
						{userItems}
						</Row>
					);
				userItems = [];
			}
		}
		console.log(friendList);
		return friendList;
};

return(
<>
<br/>
<Container style={{borderRadius:"25px",width:"65rem",background:"White",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<Row>
<Col>
<br/>
<h5 style={{ textShadow: "0 0 3px violet, 0 0 5px white"}}>Friend Requests <Badge pill bg="danger" style={{backgroundColor:"#EF5A6F"}}>{cnt==0?"":cnt}</Badge></h5>
{renderFreindReqs()}
</Col>
</Row>
<hr/>
<Row>
<Col>
<br/>
<h5 style={{ textShadow: "0 0 3px violet, 0 0 5px white"}}>Friend List</h5>
<Container>
{renderUsers()}
<br/>
</Container>
</Col>
</Row>
</Container>
</>
);
}
export default Friends;