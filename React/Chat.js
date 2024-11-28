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

var curchat = 0;
let messageTimeout;
let messageTimeout2;
let messageTimeout3;

function Chat(){
const [mdval1,setMdval1] = useState(1);
const [mdval2,setMdval2] = useState(4);
const [dh,setDh] = useState("40px");
const [dw,setDw] = useState("40px");
const [disp,setDisp] = useState("none");
const [disp2,setDisp2] = useState("block");
const [Book,setBook] = useState("Book");
const [chat,setChat] = useState("Chat");
const [pfp,setPfp] = useState("default.jpg");
const [op,setOp] = useState("name");
const [chats,setChats] = useState([]);
const [msg,setMsg] = useState([]);
const [unreads,setUnreads] = useState([]);


useEffect(()=>{
	getAllChats();
	loadUnreads(curchat);
},[]);
	
const shrinkChats = (e) =>{
	setMdval1(1);
	setMdval2(4);
	setDw("40px");
	setDh("40px");
	setDisp("none");
	setDisp2("block");
};
const expandChats = (e) =>{
	setMdval1(4);
	setMdval2(1);
	setDw("60px");
	setDh("60px");
	setDisp("block");
	setDisp2("none");
};


const getAllChats = () =>{
	clearTimeout(messageTimeout3);
	if(localStorage.getItem("logstatus")==="true"){
		var uid = localStorage.getItem("userid");
		$.ajax({type:"POST",url:connstr+"/backend/select.php",data:{datafor:'chats',uid:uid},success(data){
			console.log(data);
			var obj = JSON.parse(data);
			setChats(obj);
			messageTimeout3 = setTimeout(() => {
				getAllChats();
			},2000);
		}});
	}
};

const loadBook = (c) =>{
	$.ajax({type:"POST",url:connstr+"/backend/select.php",data:{datafor:'loadbook',cid:c},success(data){
		console.log(data);
			var obj = JSON.parse(data);
			document.getElementById("pdfviewer").src = connstr+"/backend/"+obj[0].loc;
			setBook(obj[0].title);
		}});
};

const getOp = (c) =>{
	$.ajax({type:"POST",url:connstr+"/backend/select.php",data:{datafor:'recid',cid:c},success(data){
		console.log(data);
			var uid = localStorage.getItem("userid");
			var obj = JSON.parse(data);
			if(uid == obj[0].u1){
				setOp(obj[0].u2);
				setChat(obj[0].u2u);
				setPfp(obj[0].pfp2);
			}
			else{
				setOp(obj[0].u1);
				setChat(obj[0].u1u);
				setPfp(obj[0].pfp1);
			}
		}});
};

const markMessagesSeen = (c) =>{
	var uid = localStorage.getItem("userid");
	$.ajax({type:"POST",url:connstr+"/backend/update.php",data:{datafor:"markseen",cid:c,uid:uid},success(data){
		console.log(data);
		var obj = JSON.parse(data);
		if(obj.updstat == "success"){
				//console.log("success");
			}
		else{
				//console.log("error");
		}
	}
	});
};

const openChat = (e,c) =>{
	curchat = c;
	loadBook(c);
	loadMessages(c);
	markMessagesSeen(c);
	getOp(c);
	//console.log(curchat);
	
};

const loadMessages = (c) =>{
	clearTimeout(messageTimeout);
	if (curchat === c) {
	$.ajax({type:"POST",url:connstr+"/backend/select.php",data:{datafor:'messages',cid:c},success(data){
		console.log(data);
			var obj = JSON.parse(data);
			setMsg(obj);
			messageTimeout = setTimeout(() => {
				loadMessages(c);
			},2000);
		}});
	}
};

const loadUnreads = (c) =>{
	clearTimeout(messageTimeout2);
	var uid = localStorage.getItem("userid");
	$.ajax({type:"POST",url:connstr+"/backend/select.php",data:{datafor:'unread',cid:c,uid:uid},success(data){
		console.log(data);
			var obj = JSON.parse(data);
			if(obj.length>0){
			setUnreads(obj);
			}
			else{
			setUnreads([{"cid":0,"um":0}]);
			}
			messageTimeout2 = setTimeout(() => {
				loadUnreads(c);
			},2000);
		}});
};

const renderAllChats = () =>{
	let chatItems = [];
		for(let i = 0; i < chats.length; i++){
		chatItems.push(<Container key={i} style={{borderRadius:"12px", maxHeight:"5rem",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",padding:"10px 10px",marginBottom:"5px"}} onClick={(event) => openChat(event,chats[i].cid)}>
						<Row>
						<Col md={3}>
						<Image style={{height:dh,width:dw}} src={connstr+"/backend/covers/"+chats[i].cover} roundedCircle />
						</Col>
						<Col md={1}>
						{chats[i].cid !== curchat && (
							<Badge pill bg="danger" id={chats[i].cid}>
							{unreads.find(n => n.cid === chats[i].cid)?.um || ""}
							</Badge>
						)}
						</Col>
						<Col md={5} align="left" style={{display:disp}}>
						<p style={{fontSize:"12px",whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"}}><b>@{chats[i].title}</b></p>
						</Col>
						<Col md={3} align="left" style={{display:disp}}>
						<Image style={{height:"20px",width:"20px"}} src={connstr+"/backend/userpic/"+chats[i].user1p} title={chats[i].user1n} roundedCircle />
						<Image style={{height:"20px",width:"20px"}} src={connstr+"/backend/userpic/"+chats[i].user2p} title={chats[i].user2n} roundedCircle />
						</Col>
						</Row>
						</Container>
		);
		}
		return chatItems;
};

const renderMessages = () =>{
	var uid = localStorage.getItem("userid");
	let chatItems = [];
		for(let i = 0; i < msg.length; i++){
		chatItems.push(<Container key={i} style={{borderRadius:"12px", maxHeight:"5rem",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",marginBottom:"5px",padding:"10px 10px",display:disp2, border:msg[i].sender === uid ?"2px solid #536493":"2px solid #EF5A6F"}}>
						<Row>
						{
							msg[i].sender === uid ? (
							  <>
								<Col md={10} align="right">
								  <p style={{fontSize: "12px"}}>{msg[i].msg}</p>
								</Col>
								<Col md={2} align="right">
								  <Image 
									style={{ height: "30px", width: "30px" }} 
									src={connstr + "/backend/userpic/" + msg[i].u1p}
									title="You"
									roundedCircle 
								  />
								</Col>
							  </>
							) : (
							  <>
								<Col md={2}>
								  <Image 
									style={{ height: "30px", width: "30px" }} 
									src={connstr + "/backend/userpic/" + msg[i].u1p} 
									title={msg[i].u1u}
									roundedCircle 
								  />
								</Col>
								<Col md={10} align="left">
								  <p style={{fontSize: "12px"}}>{msg[i].msg}</p>
								</Col>
							  </>
							)
						}
						</Row>
						</Container>
		);
		}
		return chatItems;
};

const sendMessage = (e) =>{
	var uid = localStorage.getItem("userid");
	var m = document.getElementById("message").value;
	$.ajax({type:"POST",url:connstr+"/backend/insert.php?datafor=messages",data:{cid:curchat,sender:uid,rec:op,msg:m},success(data){
			var obj = JSON.parse(data);
			if(obj.fr == "success"){
				document.getElementById("message").value = "";
				markMessagesSeen(curchat);
			}
		}});
};
	
return(
<>
<br/>
<Container fluid style={{borderRadius:"15px",background:"#FFF1DB",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<Row>
<Col md={mdval1} onMouseEnter={(event)=>expandChats(event)} onMouseLeave={(event)=>shrinkChats(event)}>
<br/>
<Container style={{borderRadius:"15px",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<h5 style={{textShadow:" 0 0 3px #FF0000",fontFamily: "Times New Roman"}}>Chats</h5>
{renderAllChats()}
<br/>
</Container>
</Col>
<Col md={7}>
<br/>
<Container style={{borderRadius:"15px",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<h5 style= {{textShadow:" 0 0 3px #FF0000",fontFamily: "Times New Roman"}}>{Book}</h5>
<iframe id="pdfviewer" style={{width:"100%",height:"600px"}} frameBorder="0"></iframe>
</Container>
</Col>
<Col md={mdval2}>
<br/>
<Container style={{borderRadius:"15px",maxHeight:"32rem",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<Row>
<Col>
<h5 style={{display:disp2,textShadow:" 0 0 3px #FF0000",fontFamily: "Times New Roman"}}>{chat}</h5>
<br/>
</Col>
</Row>
<Row>
<Col>
<Image style={{ height: "60px", width: "60px", display:disp }} src={connstr + "/backend/userpic/" + pfp} roundedCircle />
<Container style={{maxHeight:"24rem",whiteSpace: "nowrap",overflowY:"scroll",display:disp2}}>
	{renderMessages()}
</Container>
</Col>
</Row>
<br/>
<Row>
<Container style={{display:disp2}}>
<InputGroup size='lg'>
	<Form.Control placeholder="Message..." id="message" style={{fontSize:"12px"}}/>
	<Button style={{backgroundColor:"#536493",borderColor:"#536493",fontSize:"12px"}} onClick={(event)=>sendMessage(event)}>Send</Button>
</InputGroup>
</Container>
</Row>
<br/>
</Container>
<br />
<Container style={{borderRadius:"15px",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<h5 style={{textShadow:" 0 0 3px #FF0000",fontFamily: "Times New Roman"}}>Start Reading New Book</h5>
<br/>
<Button style={{backgroundColor:"#536493",borderColor:"#536493",fontSize:"14px"}} href="http://localhost:3000/newchat">Start </Button>
<br/>
</Container>
</Col>
</Row>
<br/>
</Container>
</>
);
}

export default Chat;