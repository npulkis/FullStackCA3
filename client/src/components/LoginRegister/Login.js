import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../../config/global_constants";
import {DataContext} from "../Context";

export default class Login extends Component{
    constructor(props)
    {
        super(props)

        this.state = {
            loginEmail:"",
            loginPassword:"",
            emailValid:false,
            isLoggedIn:false,
            wasSubmittedAtLeastOnce:false
        }
    }

    static contextType = DataContext


    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) =>
    {
        axios.post(`${SERVER_HOST}/users/login/${this.state.loginEmail}/${this.state.loginPassword}`)
            .then(res =>
            {

                        console.log("User logged in")

                        localStorage.name = res.data.name
                        localStorage.email = res.data.email
                        localStorage.accessLevel = res.data.accessLevel
                        localStorage.token = res.data.token

                       this.context.loggedIn()
                        this.setState({isLoggedIn:true})



            }).catch(err =>
        {
            console.log(err)
            this.setState({wasSubmittedAtLeastOnce:true})

        })
    }

    checkEmail=()=>{
        const pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

        let email = document.getElementById("emailField")
        if (!pattern.test(this.state.loginEmail)){

            this.setState({emailValid:false})
            email.innerText = "Email Not Valid"
            email.style.color ="red";


        }else if(pattern.test(this.state.loginEmail)){
            this.setState({emailValid:true})
            email.innerText = "Email Valid"
            email.style.color ="green";
        }
    }


    render() {
        return(
            <div>
                <h3>Have an account. Login</h3>
                {this.state.isLoggedIn ? <Redirect to="/"/> : null}

                <Form>
                    <Form.Group className="mb-3" controlId="loginEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={this.state.loginEmail} type="email" placeholder="Enter email" name="loginEmail" onChange={this.handleChange} onKeyUp={this.checkEmail}/>
                        <Form.Text id="emailField" className="text">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={this.state.loginPassword} type="password" name="loginPassword" placeholder="Password" onChange={this.handleChange} />
                    </Form.Group>

                    {this.state.emailValid && this.state.loginPassword.length > 7 ? <Button variant="primary" onClick={this.handleSubmit} >
                        Login
                    </Button> :  <Button variant="primary" disabled >
                        Login
                    </Button>}
                    <Link to={"/"}>
                        <Button variant="danger" >Cancel</Button>
                    </Link>
                </Form>
            </div>
        )

    }
}