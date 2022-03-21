import React, {Component} from 'react';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar"
import Nav from  'react-bootstrap/Nav'
import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_GUEST} from "../config/global_constants";
import {DataContext} from "./Context";


export default class NavBar extends Component{
    static contextType = DataContext;


    render()
    {
        const {cart} = this.context;

        return(

            <Navbar bg="light" variant="light">
                <Container fluid>
                    <Navbar.Brand href={"/"}>Shop</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href={"/"}>Home</Nav.Link>
                        <Nav.Link href={"/cart"}>Basket: {cart.length}</Nav.Link>

                        {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Nav.Link href={`/orders/${localStorage.email}`}>Orders</Nav.Link> : null}

                        {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Nav.Link href={"/logout"}>Logout</Nav.Link> : <Nav.Link href={"/login"}>Sign In</Nav.Link>}
                        {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?  <Nav.Link href={"/admin"}>Admin Menu</Nav.Link> : null }

                    </Nav>
                </Container>
            </Navbar>
        )
    }
}