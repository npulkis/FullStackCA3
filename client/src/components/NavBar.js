import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar"
import Nav from  'react-bootstrap/Nav'
import Register from "./Register";


export default class NavBar extends Component{

    render()
    {
        return(

            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href={"/"}>Shop</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href={"/"}>Home</Nav.Link>
                        <Nav.Link href={"/cart"}>Basket</Nav.Link>
                        <Nav.Link href={"/login"}>Sign In</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}