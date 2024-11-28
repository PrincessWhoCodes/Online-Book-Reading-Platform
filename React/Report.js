import React from 'react';
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
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function Report(){
    useEffect(()=>{
    $.ajax({type:"POST",url:"http://localhost/backend/fetch.php",data:{datafor:"dash1"},success(data){
        console.log(data);		
	    var obj = JSON.parse(data);
        var table="<tr><th>User Id</th><th>Fullname</th><th>Username</th><th>Email</th>";
        var opt="<option>select user</option>";
        for(let i=0;i<obj.length;i++)
        {
            table+="<tr><td>"+obj[i]['user_id']+"</td><td>"+obj[i]['fullname']+"</td><td>"+obj[i]['username']+"</td><td>"+obj[i]['email_id']+"</td></tr>";
            opt+="<option>"+obj[i]['fullname']+"</option>";
        }
        document.getElementById('users').innerHTML=table;
        // document.getElementById('userlist').innerHTML=opt;
        
    }});
},[]);
return(
<>

				
			<div style={{borderRadius:"30px",textAlign:"center",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
        <br />
        
<h1 style={{textShadow:" 0 0 3px #FF0000",fontFamily: "Times New Roman",fontSize:"32px"}}>Users Report</h1>
<br />
<div align="center">
<Table bordered striped id="users" style={{width:"60rem",textAlign:"center"}}>
</Table>
</div>
      </div>
</>
);
}
export default Report;