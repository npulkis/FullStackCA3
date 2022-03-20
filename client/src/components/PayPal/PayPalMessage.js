import {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {Button, Container,Col} from "react-bootstrap";
import {DataContext} from "../Context";

export default class PayPalMessage extends Component{

    static contextType = DataContext

    static messageType = {SUCCESS:"success",
                          ERROR:"error",
                          CANCEL:"cancel"}
    constructor(props) {
        super(props);
        this.state = {redirectToHome:false}
    }

    componentDidMount() {
        if(this.props.match.params.messageType === PayPalMessage.messageType.SUCCESS)
        {
            this.setState({heading:"PayPal Transaction Confirmation",
                message:"Your PayPal transaction was successful.",
                buttonColour:"green-button"})

            this.context.clearCart()

        }
        else if(this.props.match.params.messageType === PayPalMessage.messageType.CANCEL)
        {
            this.setState({heading:"PayPal Transaction Cancelled",
                message:"You cancelled your PayPal transaction. Therefore, the transaction was not completed."})
        }
        else if(this.props.match.params.messageType === PayPalMessage.messageType.ERROR)
        {
            this.setState({heading:"PayPal Transaction Error",
                message:"An error occured when trying to perform your PayPal transaction. The transaction was not completed. Please try to perform your transaction again."})
        }
        else
        {
            console.log("The 'messageType' prop that was passed into the PayPalMessage component is invalid. It must be one of the following: PayPalMessage.messageType.SUCCESS, PayPalMessage.messageType.CANCEL or PayPalMessage.messageType.ERROR")
        }
    }

    render() {
        return(
           <Container className="payPalMessage shadow-lg">

               <Col>
                   <h3>{this.state.heading}</h3>
               </Col>

               <Col>
                   <p>{this.props.match.params.message}</p>
                   <p>{this.state.message}</p>
               </Col>

               <Col>
                   {this.props.match.params.messageType === PayPalMessage.messageType.SUCCESS ? <p>Your PayPal payment confirmation is <span id="payPalPaymentID">{this.props.match.params.payPalPaymentID}</span></p> : null}

               </Col>


               {this.state.redirectToHome ? <Redirect to="/"/> : null}






                <p id="payPalPaymentIDButton"><Link  to={"/"}><Button>Continue</Button></Link></p>
           </Container>
        )
    }

}