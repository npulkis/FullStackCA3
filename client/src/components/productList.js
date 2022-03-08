import {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import {Button, Table} from "react-bootstrap"
import {Link} from "react-router-dom";

export class productList extends Component{
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }


    componentDidMount(){
        axios.get(`${SERVER_HOST}/products`)
            .then(res =>
            {
                if (res.data){
                    if (res.data.errorMessage){
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log("Products read")
                        this.setState({products: res.data})



                    }
                }else {
                    console.log("Products not found")
                }
            })
    }
    render() {
        return(


        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {this.state.products.map((product)=>(
                <tr key={product._id}>
                    <th>{product._id}</th>
                    <th>{product.name}</th>
                    <th>{product.category}</th>
                    <th>{product.stock}</th>
                    <th><Button variant="primary">Edit</Button>
                        <Link to= {"/DeleteProduct/" + product._id}>
                            <Button variant="danger">Delete</Button>
                        </Link>

                    </th>
                </tr>
            ))}
            </tbody>
            </Table>

            )
    }
}