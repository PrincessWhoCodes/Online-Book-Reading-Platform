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
import Plotly from 'plotly.js/dist/plotly-cartesian';

function Dashboard(){

	useEffect(()=>{
		
	
       
  $.ajax({type:"POST",url:"http://localhost/backend/fetch.php",data:{datafor:'dash2'},success(data){
	console.log(data);
	var obj = JSON.parse(data);
	var title = [];
	var nft = [];
	for(let i=0;i<obj.length;i++)
	{
	    title.push(obj[i]['title']);
		nft.push(obj[i]['total']);
	}
	var data1 = [{x:title,y:nft,type: 'bar', marker: {color: 'rgb(100,30,200)'}}];
	var layout = {height: 500,width: 1000};
	Plotly.newPlot('my2', data1, layout);
}});
},[]);
			
		return(
			<div>
				
				<br />
			<div style={{borderRadius:"30px",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <br />
       <Container>
		<Row >

		
		
		<Col >
		<Card style={{ width: '80rem' }}>
		<Card.Body>
		<Card.Title style={{textShadow:" 0 0 3px #FF0000",fontFamily: "Times New Roman",fontSize:"32px"}}>Top-Read Books</Card.Title>
            <Card.Text id='my2'>
			 
            </Card.Text>
	          
			  </Card.Body>
        </Card> 
		</Col>
		</Row>
		</Container>
		
			 </div>
			 </div>
			  
		)	
		

}
export default Dashboard;