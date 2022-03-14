import React, {Component} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { SERVER_HOST} from "../config/global_constants";
import {Link, Redirect} from "react-router-dom";



export default class Register extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            name:"",
            email:"",
            password:"",
            confirmPassword:"",
            isRegistered:false
        }
    }


    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleSubmit = (e) =>
    {
        e.preventDefault()

        axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`)
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
                        console.log("User registered and logged in")

                        localStorage.name = res.data.name
                        localStorage.accessLevel = res.data.accessLevel
                        localStorage.token = res.data.token

                        this.setState({isRegistered:true})
                    }
                }
                else
                {
                    console.log("Registration failed")
                }
            })

    }



    render()
    {
        return (


            <div>
                {this.state.isRegistered ? <Redirect to="/"/> : null}
                <h3> Don't have an account. Sign up</h3>
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={this.state.name} type="text" placeholder="Enter Name" name="name" onChange={this.handleChange}
                                      ref = {(input) => { this.inputToFocus = input }}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={this.state.email} type="email" placeholder="Enter email" name="email" onChange={this.handleChange}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={this.state.password} type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control value={this.state.confirmPassword} type="password" placeholder="Confirm Password" name="confirmPassword" onChange={this.handleChange} />
                    </Form.Group>
                    {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
                    {/*    <Form.Check type="checkbox" label="Check me out" />*/}
                    {/*</Form.Group>*/}
                    <Button variant="primary" onClick={this.handleSubmit} >
                        Submit
                    </Button>
                    <Link to={"/"}>
                        <Button variant="danger" >Cancel</Button>
                    </Link>
                </Form>
            </div>

        )
    }
}