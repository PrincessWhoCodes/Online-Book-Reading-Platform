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
import ButtonGroup from 'react-bootstrap/ButtonGroup';



function Book(){

  const [books, setBooks] = useState([]);

  useEffect(()=>{
   
   
  },[]);
  
  


    

    
    
    return (
        <div style={{borderRadius:"15px",background:"white",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <br />
        <Container >
        <Row md={4}>
        <Col>
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={connstr+"/backend/covers/horror2.jpg"}/>
          <Card.Body>
            <Card.Title>The Picture Of Dorian Gray</Card.Title>
            <Card.Text>
             
            </Card.Text>
            <Button variant="outline-primary" href={connstr+"/backend/books/DorianGray.pdf"} target="_blank">Self Read </Button>{'  '}
           
          </Card.Body>
        </Card> 
          </Col>
          <Col xs={6}>
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={connstr+"/backend/covers/love1.jpg"}/>
          <Card.Body>
            <Card.Title>Pride And Prejudice</Card.Title>
            <Card.Text>
             
            </Card.Text>
            <Button variant="outline-primary" href={connstr+"/backend/books/prideandprej.pdf"} target="_blank">Self Read </Button>{'  '}
            
          </Card.Body>
        </Card> 
          </Col>
          <Col>
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={connstr+"/backend/covers/fantasy2.jpg"}/>
          <Card.Body>
            <Card.Title>Wonderful Wizard OZ</Card.Title>
            <Card.Text>
             
            </Card.Text>
            <Button variant="outline-primary" href={connstr+"/backend/books/wonderful.pdf"} target="_blank">Self Read </Button>{'  '}
          
          </Card.Body>
        </Card> 
          </Col>
          <Col>
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={connstr+"/backend/covers/fantasy3.jpg"}/>
          <Card.Body>
            <Card.Title>Ozma Of Oz</Card.Title>
            <Card.Text>
             
            </Card.Text>
            <Button variant="outline-primary" href={connstr+"/backend/books/ozma.pdf"} target="_blank">Self Read </Button>{'  '}
          
          </Card.Body>
        </Card> 
          </Col>
        </Row>
        </Container>
        <br /> 
        <Container>
        <Row md={4}>
        <Col>
           <Card style={{ width: '15rem' }}>
          <Card.Img variant="top" src={connstr+"/backend/covers/history1.jpg"}/>
          <Card.Body>
            <Card.Title>War And Peace</Card.Title>
            <Card.Text>
             
            </Card.Text>
            <Button variant="outline-primary" href={connstr+"/backend/books/warandpeace.pdf"} target="_blank">Self Read </Button>{'  '}
            
          </Card.Body>
        </Card> 
        </Col>
        <Col xs={6}>
          <Card style={{ width: '15rem' }}>
          <Card.Img variant="top" src={connstr+"/backend/covers/history2.jpg"}/>
          <Card.Body>
            <Card.Title>The Hunchback Of NotreDame</Card.Title>
            <Card.Text>
             
            </Card.Text>
            <Button variant="outline-primary" href={connstr+"/backend/books/hunchback.pdf"} target="_blank">Self Read </Button>{'  '}
          
          </Card.Body>
        </Card> 
          </Col>
         
          <Col>
          <Card style={{ width: '16rem' }}>
          <Card.Img variant="top" src={connstr+"/backend/covers/horror1.jpg"}/>
          <Card.Body>
            <Card.Title>Northanger Abbey</Card.Title>
            <Card.Text>
             
            </Card.Text>
            <Button variant="outline-primary" href={connstr+"/backend/books/northanger.pdf"} target="_blank">Self Read </Button>{'  '}
           
          </Card.Body>
        </Card> 
         </Col>
         <Col>
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={connstr+"/backend/covers/221024115125scifi1.jpg"}/>
          <Card.Body>
            <Card.Title>Time Machine</Card.Title>
            <Card.Text>
             
            </Card.Text>
            <Button variant="outline-primary" href={connstr+"/backend/books/221024115125timemachine.pdf"} target="_blank">Self Read </Button>{'  '}
           
          </Card.Body>
        </Card> 
         </Col>
        </Row>
        </Container>

      </div>
    );

       
        
    }
    


export default Book;