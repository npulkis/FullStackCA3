import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST} from "../../config/global_constants"


export default class DeleteCategory extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            redirectToAdmin:false
        }
    }


    componentDidMount()
    {
        axios.delete(`${SERVER_HOST}/category/${this.props.match.params.id}`,{headers:{"authorization":localStorage.token}})
            .then(res =>
            {
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else // success
                    {
                        console.log("Record deleted")
                    }
                    this.setState({redirectToAdmin:true})
                }
                else
                {
                    console.log("Record not deleted")
                }
            })
    }


    render()
    {
        return (
            <div>
                {this.state.redirectToAdmin ? <Redirect to="/admin"/> : null}
            </div>
        )
    }
}