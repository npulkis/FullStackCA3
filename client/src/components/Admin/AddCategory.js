import {Component} from "react";
import {Button, Form, Table} from "react-bootstrap";
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import {Link} from "react-router-dom";

export class AddCategory extends Component{
    constructor(props) {
        super(props)
        this.state = {
            category:"",
            categories:[]
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

    handleSubmit = (e) =>
    {
        e.preventDefault()

        axios.post(`${SERVER_HOST}/products/add_category/${this.state.category}`)
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
                        console.log("category Added")

                    }
                }
                else
                {
                    console.log("Category failed to add")
                }
            })

    }


    render() {

        return(

            <div>
                <h1>Categories</h1>

                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.categories.map((category)=>(
                        <tr key={category._id}>
                            <th>{category.category}</th>
                            <th>
                                <Link to={"/DeleteCategory/"+category._id}>
                                    <Button variant="danger"> Delete</Button>
                                </Link>
                            </th>
                        </tr>
                    ))}
                    </tbody>

                </Table>

            <Form>
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control value={this.state.name} name="category" type="text" onChange={this.handleChange}/>
                </Form.Group>

                <Button onClick={this.handleSubmit}>Submit</Button>

            </Form>

            </div>
        )
    }

}