import React, {Component} from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { SERVER_HOST} from "../../config/global_constants";
import {Link, Redirect} from "react-router-dom";
import PasswordChecklist from "react-password-checklist"




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
            emailValid:false,
            passwordsMatch:false,
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
            }).catch(err=>{
                console.log(err)



        })

    }

    checkPassword = ()=>{
        if (this.state.password.length >=8 && this.state.confirmPassword.length >=8){
            this.setState({passwordsMatch:true})
        }else {
            this.setState({passwordsMatch:false})
        }
    }

    checkEmail=()=>{
        const pattern = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

        let email = document.getElementById("emailField")
        if (!pattern.test(this.state.email)){

            this.setState({emailValid:false})
            email.innerText = "Email Not Valid"
            email.style.color ="red";


        }else if(pattern.test(this.state.email)){
            this.setState({emailValid:true})
            email.innerText = "Email Valid"
            email.style.color ="green";
        }
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
                                      ref = {(input) => { this.inputToFocus = input }}required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={this.state.email} type="email" placeholder="Enter email" name="email" onChange={this.handleChange} onKeyUp={this.checkEmail} required/>
                        <Form.Text id="emailField" className="text">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={this.state.password} type="password" name="password" placeholder="Password" onChange={this.handleChange} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control value={this.state.confirmPassword} type="password" placeholder="Confirm Password" name="confirmPassword" onChange={this.handleChange} required/>
                    </Form.Group>

                    <PasswordChecklist
                        rules={["minLength","number","capital","match"]}
                        minLength={8}
                        value={this.state.password}
                        valueAgain={this.state.confirmPassword}
                        onChange={(isValid) => {this.checkPassword()}}
                    />
                    {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
                    {/*    <Form.Check type="checkbox" label="Check me out" />*/}
                    {/*</Form.Group>*/}
                    {this.state.passwordsMatch && this.state.emailValid && this.state.name.length >2 ?  <Button variant="primary" onClick={this.handleSubmit} >
                        Submit
                    </Button> :  <Button variant="primary" disabled  >
                        Submit
                    </Button>}

                    <Link to={"/"}>
                        <Button variant="danger" >Cancel</Button>
                    </Link>
                </Form>
            </div>

        )
    }
}