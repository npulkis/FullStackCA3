import {Component} from "react";
import {Button, Card} from "react-bootstrap";
import placeholder from '../placeholder/placeholder.jpg';
import {DataContext} from "./Context";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";

export default class Product extends Component{

    static contextType= DataContext;

    componentDidMount()
    {
        console.log(this.props.product.photos[0].filename)

        const image = this.props.product.photos[0].filename;
        const imageID = this.props.product.photos[0]._id;
       axios.get(`${SERVER_HOST}/photo/${image}`)
                .then(res =>
                {
                    document.getElementById(imageID).src = `data:;base64,${res.data.image}`
                })
                .catch(err =>
                {
                    // do nothing
                })
    }


    render() {
        const { product } = this.props;
        const{addCart} = this.context;

        return(



            <Card className="border-0" >
                <Card.Body>
                    <Card.Img key={this.props.product.photos[0]._id} id={this.props.product.photos[0]._id} />

                    <Card.Title> {product.name}</Card.Title>
                    {/*<Card.Text>{product.description}</Card.Text>*/}
                    {/*<Card.Text>Category:{product.category}</Card.Text>*/}
                    {/*<Card.Text>Stock:{product.stock}</Card.Text>*/}
                    <Card.Text>Price: €{product.price}</Card.Text>
                    <Button onClick={()=> addCart(product._id)}>Add to cart</Button>
                    <Button>View</Button>
                </Card.Body>
            </Card>

        )
    }
}