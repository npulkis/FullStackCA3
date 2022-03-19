import React, {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import {Redirect} from "react-router-dom";

export default class ReturnOrder extends Component{
    constructor(props) {
        super(props);
        this.state={returned:false,
        sale:[],
        product:[]}
    }

    componentDidMount() {


        axios.get(`${SERVER_HOST}/sale/${this.props.match.params.id}`)
            .then(res =>
            {
                this.setState({returned:false})
                if (res.data)
                {
                    if (res.data.errorMessage){
                        console.log(res.data.errorMessage)
                    }else {
                        this.setState({sale:res.data})



                        console.log(this.state)

                        this.updateStock()



                        axios.put(`${SERVER_HOST}/return/${this.props.match.params.id}`)
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

                                        console.log(`order return `)
                                        this.setState({returned:true})
                                    }
                                }
                                else
                                {
                                    console.log(`Record not updated`)
                                }
                            })
                    }
                }
            })


    }


    updateStock = () =>{

        // this.state.sale.data.data.map((product)=> {
        //
        //     console.log(product.name)
        //
        // })


        let sales = this.state.sale.data.products
        sales.map((product)=> {


        let newStock =0;

        axios.get(`${SERVER_HOST}/product/${product._id}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        this.setState({product: res.data})
                       newStock = this.state.product.data.stock + product.count

                        console.log(newStock)



                        axios.put(`${SERVER_HOST}/updateStock/${product._id}/${newStock}`)
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
                                    }
                                }
                                else
                                {
                                    console.log(`Record not updated`)
                                }
                            })


                    }
                }
            })






       })

}











    render() {
        return(

            <div>
                {this.state.returned ? <Redirect to={`/orders/${localStorage.email}`} /> : null}
            </div>

        )
    }
}