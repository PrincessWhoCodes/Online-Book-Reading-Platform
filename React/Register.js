import {useState,useEffect} from 'react';
import React from 'react';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import SHA256 from 'crypto-js/sha256';
import connstr from './constr.js';

function Register()
{
	

var user={fname:null,uname:null,email:null,pwd:null,gender:null,pfp:"default.jpg"};

useEffect(() => {
	 document.getElementById('err').style.visibility = "hidden";
});

const handleFullname = (e) =>{
	user.fname=e.target.value;
}
const handleUsername = (e) =>{
	user.uname=e.target.value;
}

const handleEmail = (e) =>{
	user.email=e.target.value;
}
 
const handlePassword = (e) =>{
	user.pwd=e.target.value;
}

const handleGen = (e) =>{
	user.gender=e.target.value;
}

const handleReg = (e) =>{
	if(user.fname==""){

		 e.preventDefault();
		 e.stopPropagation();
		 document.getElementById('fname').focus();
		 document.getElementById('err').style.visibility="visible";
		 document.getElementById('err').innerHTML="Name cannot be blank";
	}
	else if(user.uname==""){

		 e.preventDefault();
		 e.stopPropagation();
		 document.getElementById('uname').focus();
		 document.getElementById('err').style.visibility="visible";
		 document.getElementById('err').innerHTML="Username cannot be blank";
	}
	else if(user.email==""){
        
		 e.preventDefault();
		 e.stopPropagation();
		 document.getElementById('email').focus();
		 document.getElementById('err').style.visibility="visible";
		 document.getElementById('err').innerHTML="Email cannot be blank";
	}
	else if(user.pwd==""){

		 e.preventDefault();
		 e.stopPropagation();
		 document.getElementById('pwd').focus();
		 document.getElementById('err').style.visibility="visible";
		 document.getElementById('err').innerHTML="Password cannot be blank";
	}
	else if(user.gender==""){

		 e.preventDefault();
		 e.stopPropagation();
		 document.getElementById('gender').focus();
		 document.getElementById('err').style.visibility="visible";
		 document.getElementById('err').innerHTML="Gender cannot be blank";
	}
	else if(user.email.match(/[A-Za-z0-9._ ]*@+[a-zA-Z]*\.+[a-zA-Z.]*/)==null){

		e.preventDefault();
		e.stopPropagation();
		document.getElementById('email').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="invalid email address! <br/>rules :<br/>1)Cannot be Blank<br/>2)Must be a valid email format <br/>eg: Exam_ple.123@gmail.com";
	}
	else if(user.pwd.match(/[A-Za-z0-9._@]{7}[a-zA-Z0-9._@]*/)==null){
        
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('pwd').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="invalid password <br/> rules :<br/>1)Must be 7 characters ";

	}
	else{
		e.preventDefault();
		e.stopPropagation();
		user.pwd = SHA256(user.pwd).toString();
		$.ajax({type:"POST",url:connstr+"/backend/insert.php?datafor=register",data:user,success(data){
			console.log(data);
			var obj = JSON.parse(data);
			
			if(obj.regstat == "success"){
				alert("Registration successfull!");
				window.location.href="/login";
			}
			else{
				alert("Registration Failed!");
				window.location.href="/register";
			}
			
			}});
		}
	}


return(
<>
<br/>
<Container align="center" style={{borderRadius:"25px",width:"35rem",background:"#FFF1DB",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<br/>
<h1 align="center" style={{color:"#536493"}}>Register</h1>
<Alert variant="warning" id="err"></Alert>
<Form style={{width:"30rem",color:"#536493"}} method='POST' autoComplete='off' noValidate>
<Form.Group>
<Form.Label>Full Name:</Form.Label>
<Form.Control type="text" name="name" id="name" onChange={(event) => handleFullname(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>UserName:</Form.Label>
<Form.Control type="text" name="uname" id="uname" onChange={(event) => handleUsername(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Email:</Form.Label>
<Form.Control type="email" name="email" id="email" onChange={(event) => handleEmail(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Password:</Form.Label>
<Form.Control type="password" name="pwd" id="pwd" onChange={(event) => handlePassword(event)}></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label>Select Gender:</Form.Label><br/>
<Form.Check inline type="radio" name="gender" id="gender" label="Male" value="Male" onChange={(event) => handleGen(event)} />
<Form.Check inline type="radio" name="gender" id="gender" label="Female" value="Female" onChange={(event) => handleGen(event)} />
</Form.Group>
<br/>
<Button style={{backgroundColor:"#536493",borderColor:"#D4BDAC"}} type="submit" id="reg" name="reg" onClick={(event) => handleReg(event)} >Register</Button>&nbsp;&nbsp;
<Button style={{backgroundColor:"#536493",borderColor:"#536493"}} type="Reset">Reset</Button>
</Form>
<br/>
</Container>
<br/>
</>
);
}

export default Register;