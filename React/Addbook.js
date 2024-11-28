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

function Addbook(){
   
     
return(
<>
<br/>
<Container align="center" style={{borderRadius:"30px",textAlign:"center",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
<br/>
<h1 style={{textShadow:" 0 0 3px #FF0000",fontFamily: "Times New Roman",fontSize:"32px"}}>Add Book</h1>
<br />
<div align="center">
<Form action="http://localhost/backend/upload.php" method="POST" encType="multipart/form-data" align="center" style={{width:"30rem",color:"#536493"}}  autoComplete='off' noValidate>
  

<Form.Group >
<Form.Label align="center" style={{width:"30rem",color:"black"}} >Book Name</Form.Label>
<Form.Control type="text" name="bname" id="bname" ></Form.Control>
</Form.Group>
<br />
<Form.Group>
<Form.Label align="center" style={{width:"30rem",color:"black"}}>Upload Book</Form.Label>
<Form.Control  name="fupload" id="fupload" type="file"></Form.Control>
</Form.Group>
<br />
<Form.Group>
<Form.Label align="center" style={{width:"30rem",color:"black"}}>Upload Book Cover </Form.Label>
<Form.Control  name="cover" id="cover" type="file"></Form.Control>
</Form.Group>
<br />
<Button style={{backgroundColor:"#536493",borderColor:"#536493"}} type="submit" >Add</Button>
</Form>

</div>
</Container>

</>
);
}
export default Addbook;