import React, { Component , useState} from 'react';

// import AcccessibleTable from './MaterialCheck';
import { Route, Switch, BrowserRouter, useHistory, Redirect } from "react-router-dom";

// import { FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Button, Form } from "react-bootstrap";

const Home = ()=>{

  let history = useHistory();

  const [name, setMail] = useState("");
  const [password, setPass] = useState("");


  const handleSubmit = ()=>{

    let logins = {name,password}

    if(name && password){
      history.push({pathname:"./auth" , obj:{logins}})
    }
  }
    return (
      <div className="Login">
            Hello please Login with owner credentials below.

            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your Name Login" value={name} onChange={(e)=>setMail(e.target.value)} required/>
              
            </Form.Group>
          
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password}  onChange={(e)=>setPass(e.target.value)}required />
            </Form.Group>
           
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>

          

        </div>
    );

}
export default Home
