import {Component} from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";

export default class addCategory extends Component{
    constructor(props) {
        super(props)
        this.state = {
            category:""
        }
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
            <Form>
                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control value={this.state.name} name="category" type="text" onChange={this.handleChange}/>
                </Form.Group>

                <Button onClick={this.handleSubmit}>Submit</Button>

            </Form>
        )
    }

}