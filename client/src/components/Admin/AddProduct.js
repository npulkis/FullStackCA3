import {Component} from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";

export class AddProduct extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name:"",
            description:"",
            stock:"",
            price:"",
            images:null,
            category:"",
            categories:[],
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

    }
    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state);
    }

    handleFileChange = (e) =>
    {
        this.setState({images: e.target.files})
    }

    handleSubmit = (e) =>
    {
        e.preventDefault()


        // name:"",
        //     description:"",
        // stock:"",
        // price:"",
        // images:null,
        // category:"",
        let formData = new FormData()
        formData.append("name",this.state.name)
        formData.append("description",this.state.description)
        formData.append("stock",this.state.stock)
        formData.append("price",this.state.price)
        formData.append("category",this.state.category)
        formData.append("productPhoto", this.state.images)

        if(this.state.images)
        {
            for(let i = 0; i < this.state.images.length; i++)
            {
                formData.append("productPhotos", this.state.images[i])
            }
        }

        axios.post(`${SERVER_HOST}/products/`,formData,{headers: {"Content-type": "multipart/form-data"}})
            .then(res =>
            {

                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else // user successfully registered
                    {
                        console.log("Product Added")
                        this.setState({ name:"",
                            description:"",
                            stock:"",
                            price:"",
                            images:"",
                            category:""});

                    }
                }
                else
                {
                    console.log("Product failed to add")
                }
            })

    }


    render() {

        return(
            <div>

            <h1>Add Product</h1>

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

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control value={this.state.price} name="price" type="text" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="images">
                    <Form.Label>Product Images</Form.Label>
                    <Form.Control type="file" name="images" onChange={this.handleFileChange} multiple/>
                </Form.Group>
                <Button onClick={this.handleSubmit}>Submit</Button>

            </Form>
            </div>
        )
    }

}