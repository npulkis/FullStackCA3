import {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import {Button, Table} from "react-bootstrap"
import {Link} from "react-router-dom";
import {DataContext} from "../Context";

export class ProductList extends Component{


    static contextType= DataContext;


    render() {

        const{products} = this.context;

        return(

            <div>
                <h1>Products List</h1>

        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {products.map((product)=>(
                <tr key={product._id}>
                    <th>{product._id}</th>
                    <th>{product.name}</th>
                    <th>{product.category}</th>
                    <th>{product.stock}</th>
                    <th>€{product.price}</th>
                    <th> <Link to= {"/EditProduct/" + product._id}>
                        <Button variant="primary">Edit</Button>
                    </Link>
                        <Link to= {"/DeleteProduct/" + product._id}>
                            <Button variant="danger">Delete</Button>
                        </Link>

                    </th>
                </tr>
            ))}
            </tbody>
            </Table>
            </div>
            )
    }
}