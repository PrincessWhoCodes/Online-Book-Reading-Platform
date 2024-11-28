import React from "react";
import {useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Table from 'react-bootstrap/Table';
import $ from 'jquery';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Register from './Register.js'
import Login from './Login.js'
import Home from './Home.js';
import Profile from './Profile.js';
import Friends from './Friends.js';
import Chat from './Chat.js';
import { Carousel } from 'react-bootstrap';
import logo from './logo.png';
import connstr from './constr.js';
import Book from './Book.js';
import NewChat from './Newchat.js';
import Dashboard from './Dashboard.js';
import Report from './Report.js';
import AddBook from "./Addbook.js";






let timeout;

function BaseRoute()
{
const [noti,setNoti] = useState(0);

useEffect(() => {
	if(localStorage.getItem("logstatus")==="true"){
		if(localStorage.getItem("isadmin")==="1"){
			document.getElementById('normal').style.display = "none";
			document.getElementById('mod').style.display = "";
		}
		else if(localStorage.getItem("isadmin")==="0"){
			document.getElementById('normal').style.display = "";
			document.getElementById('mod').style.display = "none"; 
		}
	  document.getElementById('anonym').style.display = "none";
	  document.getElementById('logged').style.display = "";	
	}
    else
	{
      document.getElementById('anonym').style.display = "";
	  document.getElementById('logged').style.display = "none";
	  document.getElementById('mod').style.display = "none";
	  document.getElementById('normal').style.display = "none";
	}
	getNewFriendReqCount();
	},[]);

const logout = () =>{
		localStorage.setItem("logstatus","false");
		localStorage.setItem("userid","");
		localStorage.setItem("isadmin","");
		console.log("Logged Out");
}

const getNewFriendReqCount = () => {
  clearTimeout(timeout);
  var uid = localStorage.getItem("userid");
  if(localStorage.getItem("logstatus")==="true"){
  $.ajax({type:"POST",url:connstr+"/backend/select.php",data:{datafor:'freqsc',uid:uid,ts:localStorage.getItem("lastcheck")},success(data){
	try{
	var obj = JSON.parse(data);
	if(obj[0].cnt > 0){
	setNoti(obj[0].cnt);
	timeout = setTimeout(() => {
		getNewFriendReqCount();
	}, 10000);
	}
	else{
	timeout = setTimeout(() => {
		getNewFriendReqCount();
	}, 10000);
	}
	}
	catch(e){
		console.log(e);
		timeout = setTimeout(() => {
		getNewFriendReqCount();
	}, 10000);
	}
  }});
  }
}


return(
<Router>
<Navbar style={{boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)', backgroundColor:"#EF5A6F",fontFamily:"'Garamond', serif"}} variant="dark" id="nb">
        <Container>
<Navbar.Brand href="/" style={{color:"#FFF1DB"}}><h1><img src={logo} style={{height:"42px",width:"42px"}}/>VerseVibe</h1></Navbar.Brand>
          <Nav className="me-auto" id="normal">
            <Nav.Link href="/" >Home</Nav.Link>
            <Nav.Link href="books" >Books</Nav.Link>
			<Nav.Link href="friends" id="mport" >Friends<Badge pill style={{backgroundColor:"#536493"}}>{noti == 0?"":noti}</Badge></Nav.Link>
			<Nav.Link href="chats" id="mtends">Chats</Nav.Link>
			<Nav.Link href="newchat" id="mtends">New Chat</Nav.Link>
          </Nav>
	<Nav className="me-auto" id="mod">
	
            <Nav.Link href="dashboard" >Dashboard</Nav.Link>
			<Nav.Link href="report" >Report</Nav.Link>
			<Nav.Link href="addbook">Add Book</Nav.Link>
			
          </Nav>

		  <Nav className="ms-auto" id="anonym">
		 {window.location.pathname == "/login"?<Nav.Link href="register" className="ms-auto" id="Reg">Register</Nav.Link>:<Nav.Link href="login" className="ms-auto" id="Log">Login</Nav.Link>}
		  </Nav>
		  <Nav className="ms-auto" id="logged">
		  <NavDropdown title="User">
		  <Nav.Link href="profile" id="Profile" style={{color:"black"}} >Profile</Nav.Link>
			  {localStorage.getItem('role')==""?<Nav.Link href="helpdesk" style={{color:"black"}}>Help Desk</Nav.Link>:""}
		  <hr/>
		  <Nav.Link href="/" id="Logout" onClick={logout} style={{color:"black"}}>Logout</Nav.Link>
		  </NavDropdown>
		  </Nav>
        </Container>
      </Navbar>	  
<Routes> 
<Route exact path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} /> 
<Route path="/profile" element={<Profile />} />
<Route path="/friends" element={<Friends />} />
<Route path="/chats" element={<Chat />} />
<Route path="/books" element={<Book />} />
<Route path="/newchat" element={<NewChat />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/report" element={<Report />} />
<Route path="/addbook" element={<AddBook/>} />

</Routes>
</Router>
);
}

export default BaseRoute;