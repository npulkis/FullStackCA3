import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants";

export default class Login extends Component{
    constructor(props)
    {
        super(props)

        this.state = {
            loginEmail:"",
            loginPassword:"",
            isLoggedIn:false
        }
    }
    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) =>
    {
        axios.post(`${SERVER_HOST}/users/login/${this.state.loginEmail}/${this.state.loginPassword}`)
            .then(res =>
            {

                localStorage.name = "GUEST"
                localStorage.accessLevel = ACCESS_LEVEL_GUEST

                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else // user successfully logged in
                    {
                        console.log("User logged in")

                        localStorage.name = res.data.name
                        localStorage.accessLevel = res.data.accessLevel
                        localStorage.token = res.data.token

                        this.setState({isLoggedIn:true})
                    }
                }
                else
                {
                    console.log("Login failed")
                }
            })
    }


    render() {
        return(
            <div>
                <h3>Have an account. Login</h3>
                {this.state.isLoggedIn ? <Redirect to="/"/> : null}

                <Form>
                    <Form.Group className="mb-3" controlId="loginEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={this.state.loginEmail} type="email" placeholder="Enter email" name="loginEmail" onChange={this.handleChange}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={this.state.loginPassword} type="password" name="loginPassword" placeholder="Password" onChange={this.handleChange} />
                    </Form.Group>

                    <Button variant="primary" onClick={this.handleSubmit} >
                        Login
                    </Button>
                    <Link to={"/"}>
                        <Button variant="danger" >Cancel</Button>
                    </Link>
                </Form>
            </div>
        )

    }
}