import {Component} from "react";
import {AddCategory} from "./AddCategory";
import {AddProduct} from "./AddProduct";
import {ProductList} from "./ProductList";
import {UserList} from "./UserList";
import {Accordion, Container} from "react-bootstrap";

export class AdminMenu extends Component{

    render() {
        return(
           <Container style={{justifyContent:"center", marginTop:"80px"}}>
                <Accordion className="shadow">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Add Category</Accordion.Header>
                        <Accordion.Body>
                            <AddCategory/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Add Product</Accordion.Header>
                        <Accordion.Body>
                            <AddProduct/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                        <Accordion.Header>Products</Accordion.Header>
                        <Accordion.Body>
                            <ProductList/>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4">
                        <Accordion.Header>Users</Accordion.Header>
                        <Accordion.Body>
                            <UserList/>
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>
           </Container>
        )
    }
}