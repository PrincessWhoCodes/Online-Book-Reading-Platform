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
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useParams } from 'react-router-dom';


let messageTimeout3;

function NewChat(){

 

    const [friends, setFriends] = useState([]);
    
    const [books, setBooks] = useState([]);
    const [SelectedFriend, setSelectedFriend] = useState(null);
    const [chats,setChats] = useState([]);
    
    

    useEffect(() => {
       
      getFriends(); 
      renderUsers();
      getBookId();
     
     
      return () => {
        clearTimeout(messageTimeout3);
      };
    }, []);

    
       
     
  
  

    const getFriends = () =>{
      if(localStorage.getItem("logstatus")==="true"){
      var uid = localStorage.getItem("userid");
      var fid=localStorage.getItem("frd_id");
      $.ajax({type:"POST",url:connstr+"/backend/select.php",data:{datafor:'friends',uid:uid,fid:fid},success(data){
      console.log(data);
      var obj = JSON.parse(data);
      setFriends(obj);
      }});
      }
    }

      const renderUsers = () => {
        return friends.map((friend, i) => (
          <option key={ i} value={friend.fid}>
            
            {friend.username}
            </option>
           
        ));
      };

      const getBookId = () =>{
        if(localStorage.getItem("logstatus")==="true"){
        var bookid = localStorage.getItem("book_id");
        
        $.ajax({type:"POST",url:connstr+"/backend/select.php",data:{datafor:'books',bookid:bookid},success(data){
        console.log(data);
        var obj = JSON.parse(data);
        setBooks(obj);
        }});
        }
      }
    
      const bookname= () => {
        return books.map((book, i) => (
          <option key={i} value={book.book_id}>
            {book.title}
          </option>
        ));
      };
     
        
       const submit = () =>{
        var fid = document.getElementById("fid").value;
        var bid =document.getElementById("bid").value;
        $.ajax({type:"POST",url:connstr+"/backend/insert.php?datafor=newchat",data:{fid:fid,bid:bid},success(data){
          console.log(data);
          var obj = JSON.parse(data);
          if(obj.fr == "success"){
            alert("You can now read book with Your another friend!");
            window.location.href="http://localhost:3000/chats";
          }
          else{
            alert("Please select any of the options");
            window.location.reload();
        }
        }});
      }
       
    return(
    
   <div>
     <br />   
    <Container  align="center" style={{borderRadius:"25px",width:"45rem",height:"25rem",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
    <h1 align="center" style={{color:"#536493",textShadow:" 0 0 3px #FF0000",fontFamily: "Times New Roman"}}>Wanna Start Reading New Book With Friend?</h1>
     <br/>
     <br />
     <Row md={7}>
      <Col >
      <h3 style={{color:"#536493", fontFamily:" Georgia"}}>Select Friend</h3>
      <select id="fid" >
        <option value="">Select Friend </option> 
        {renderUsers()}
      </select>
    <br />
   </Col>
   <Col xs={7}>
   <h3 style={{color:"#536493", fontFamily:" Georgia"}}>Select Book</h3>
   <select id="bid" >
        <option value="">Select a book</option> 
        {bookname()} 
      </select>
  
      
    
   </Col>
   </Row>
     
     
     <div >
      <br /><br /><br /><br />
     <Button variant="outline-info" onClick={submit}>Yes!!</Button> 
   </div>
    </Container>
    </div>
    );
      }

export default NewChat;