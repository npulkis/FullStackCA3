import {Component} from "react";
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import {Redirect} from "react-router-dom";

export class EditProduct extends Component{
    constructor(props) {
        super(props)
        this.state ={
            name:"",
            description:"",
            category:"",
            stock:"",
            categories:[],
            price:"",
            RedirectToAdminMenu:false
        }
    }
    componentDidMount(){

        axios.get(`${SERVER_HOST}/categories`)
            .then(res =>
            {
                if (res.data){
                    if (res.data.errorMessage){
                        console.log(res.data.errorMessage)
                    }
                    else {
                        console.log("categories read")
                        this.setState({categories: res.data})

                    }
                }else {
                    console.log("categories not found")
                }
            })

        axios.get(`${SERVER_HOST}/product/${this.props.match.params.id}`)
            .then(res =>
            {
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else
                    {
                        this.setState({
                            name: res.data.data.name,
                            description: res.data.data.description,
                            category: res.data.data.category,
                            stock: res.data.data.stock,
                            price: res.data.data.price
                        })
                    }
                }
                else
                {
                    console.log(`Record not found`)
                }
            })

    }

    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) =>
    {
        e.preventDefault()

        const productObject = {
            name: this.state.name,
            description: this.state.description,
            category:this.state.category,
            stock: this.state.stock,
            price: this.state.price
        }

        axios.put(`${SERVER_HOST}/products/${this.props.match.params.id}`, productObject,{headers:{"authorization":localStorage.token}})
            .then(res =>
            {
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else
                    {
                        console.log(`Record updated`)
                        this.setState({redirectToAdminMenu:true})
                    }
                }
                else
                {
                    console.log(`Record not updated`)
                }
            })
    }



    render() {
        return(
            <Container>
                {this.state.redirectToAdminMenu ? <Redirect to="/admin"/> : null}

                <h1>Edit Products</h1>

                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control value={this.state.name} name="name" type="text" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control value={this.state.description} name="description" type="text" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Select name="category" onChange={this.handleChange} >
                        <option>Select Category</option>
                        {this.state.categories.map((category) =>(
                            <option key={category._id} value={category.category}>{category.category}</option>
                        ))}

                    </Form.Select>

                    <Form.Group className="mb-3" controlId="stock">
                        <Form.Label>Product Stock</Form.Label>
                        <Form.Control value={this.state.stock} name="stock" type="text" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="stock">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control value={this.state.price} name="price" type="text" onChange={this.handleChange}/>
                    </Form.Group>

                    <Button onClick={this.handleSubmit}>Submit</Button>

                </Form>
            </Container>
        )
    }
}