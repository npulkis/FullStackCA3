import {Component} from "react";
import {PayPalButton} from "react-paypal-button-v2";
import {SANDBOX_CLIENT_ID} from "../config/global_constants";

export default class CheckoutPaypal extends Component{


    onSuccess = paymentData =>
    {
        console.log("PayPal payment was successful:", paymentData)
    }


    onError = errorData =>
    {
        console.log("PayPal error:", errorData)
    }


    onCancel = cancelData =>
    {
        // The user pressed the Paypal checkout popup window cancel button or closed the Paypal checkout popup window
        console.log("Payment cancelled by user:", cancelData)
    }


    render() {
        const environment = "sandbox";
        const client_id= {sandbox:SANDBOX_CLIENT_ID}

        return(
            <PayPalButton
                clientID = {SANDBOX_CLIENT_ID}
                currency="USD"
                onSuccess = {this.onSuccess}
                onError = {this.onError}
                onCancel = {this.onCancel}
                amount={this.props.total}

            />
        )
    }

}