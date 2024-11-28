import {useState,useEffect} from 'react';
import React from 'react';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import SHA256 from 'crypto-js/sha256';
import Dashboard from './Dashboard';

function Login()
{

var credentials = {"email":"","pwd":"","datafor":"login"};

useEffect(() => {
	 document.getElementById('err').style.visibility = "hidden";
	 if(localStorage.getItem('logstatus')=="true"){
		 window.location.href="http://localhost:3000/";
	 }
});

const handlePwd = (e) => {
    credentials["pwd"] = SHA256(e.target.value).toString();
}
const handleLog = (e) => {
    credentials["email"] = e.target.value;
}
const handleSmbt = (e) => {
	if(credentials["email"]==="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('email').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Email or Phone cannot be blank";
	}
	else if(credentials["pwd"]==="")
	{
		e.preventDefault();
		e.stopPropagation();
		document.getElementById('pwd').focus();
		document.getElementById('err').style.visibility = "visible";
		document.getElementById('err').innerHTML="Password cannot be blank";
	}
	else{
		e.preventDefault();
		e.stopPropagation();
		$.ajax({type:"POST",url:"http://localhost/backend/select.php",data:credentials,success(data){
			var obj = JSON.parse(data);
			console.log(obj);
			if(obj.length>0){
				localStorage.setItem("logstatus","true");
				localStorage.setItem("userid",obj[0].user_id);
				localStorage.setItem("isadmin",obj[0].isadmin);
				if(obj[0].isadmin.toString()=="0"){
				window.location.href="http://localhost:3000/";
				}
				else {
					window.location.href = "http://localhost:3000/dashboard";
				  }
			}
		}});
	}
}

return(
<>
<br/>
<br/>
<div align="center">
<Container style={{borderRadius:"25px",width:"25rem",background:"#FFF1DB",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<br/>
<h1 align="center" style={{color:"#536493"}}>Login</h1>
<Alert variant="warning" id="err"></Alert>
<Form method="post" onSubmit={(event) => handleSmbt(event)} >
<Form.Group>
<Form.Label style={{color:"#536493"}}>Email:</Form.Label>
<Form.Control type="email" name="email" id="email" onChange={(event) => handleLog(event)} ></Form.Control>
</Form.Group>
<Form.Group>
<Form.Label style={{color:"#536493"}}>Password:</Form.Label>
<Form.Control type="password" name="pwd" id="pwd" onChange={(event) => handlePwd(event)} ></Form.Control>
</Form.Group>
<br/>
<Button style={{backgroundColor:"#536493",borderColor:"#536493"}} type="submit">Login</Button>
</Form>
<br/>
</Container>
</div>
</>
);
}
export default Login;