import {Component} from "react";
import {PayPalButton} from "react-paypal-button-v2";
import {SANDBOX_CLIENT_ID, SERVER_HOST} from "../../config/global_constants";
import {DataContext} from "../Context";
import PayPalMessage from "./PayPalMessage";
import {Redirect} from "react-router-dom";
import axios from "axios";
import './PayPalMessage.css'

export default class CheckoutPaypal extends Component{
    static contextType = DataContext;

    constructor(props) {
        super(props);
        this.state = {redirectToPayPalMessage:false,
                      payPalMessage:null,
                      payPalPaymentID:null,
                      name: localStorage.name,
                      email: localStorage.email}
    }


    onSuccess = paymentData =>
    {
        console.log("PayPal payment was successful:", paymentData)


        let cart = JSON.stringify(this.props.cart);


        axios.post(`${SERVER_HOST}/sales/${paymentData.id}/${this.props.total}/${this.state.name}/${this.state.email}`,cart,{headers:{"Content-type": "application/json"}})
            .then(res =>
            {
                this.setState({payPalMessageType:PayPalMessage.messageType.SUCCESS,
                    payPalPaymentID:paymentData.id,
                    redirectToPayPalMessage:true})
            })
            .catch(errorData =>
            {
                console.log("PayPal payment unsuccessful error:", errorData)
                this.setState({payPalMessageType:PayPalMessage.messageType.ERROR,
                    redirectToPayPalMessage:true})
            })


        let tempCart = JSON.parse(localStorage.dataCart)

        tempCart.map((product)=>{
            let newStock = product.stock - product.count;
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
        })

        this.setState({payPalMessageType:PayPalMessage.messageType.SUCCESS,
            payPalPaymentID:paymentData.id,
            redirectToPayPalMessage:true})




    }


    onError = errorData =>
    {
        console.log("PayPal error:", errorData)
        this.setState({payPalMessageType:PayPalMessage.messageType.ERROR,
            redirectToPayPalMessage:true})
    }


    onCancel = cancelData =>
    {
        // The user pressed the Paypal checkout popup window cancel button or closed the Paypal checkout popup window
        console.log("Payment cancelled by user:", cancelData)
        this.setState({payPalMessageType:PayPalMessage.messageType.CANCEL,
            redirectToPayPalMessage:true})
    }


    render() {
        const environment = "sandbox";
        const client_id= {sandbox:SANDBOX_CLIENT_ID}

        const redirect = `/PayPalMessage/${this.state.payPalMessageType}/${this.state.payPalPaymentID}`

        return(
            <div>

                {this.state.redirectToPayPalMessage ? <Redirect to= {redirect}/> : null}


                <PayPalButton
                clientID = {SANDBOX_CLIENT_ID}
                currency="USD"
                onSuccess = {this.onSuccess}
                onError = {this.onError}
                onCancel = {this.onCancel}
                amount={this.props.total}

            />

            </div>
        )
    }

}