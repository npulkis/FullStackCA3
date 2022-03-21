import {Component} from "react";
import {Button, Card} from "react-bootstrap";
import {DataContext} from "./Context";
import axios from "axios";
import {SERVER_HOST} from "../config/global_constants";
import {Link} from "react-router-dom";

export default class ProductCard extends Component{

    static contextType= DataContext;

    componentDidMount()
    {

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

        let inStockOrOutOfStock = null
        if (product.stock < 1){
            inStockOrOutOfStock = <Button disabled>Out of Stock</Button>
        }else{
            inStockOrOutOfStock= <Button onClick={()=> addCart(product._id)}>Add to cart</Button>
        }

        return(



            <Card className="shadow"  >
                <Card.Body>
                    <Card.Img key={this.props.product.photos[0]._id} id={this.props.product.photos[0]._id} />

                    <Card.Title> {product.name}</Card.Title>
                    {/*<Card.Text>{product.description}</Card.Text>*/}
                    {/*<Card.Text>Category:{product.category}</Card.Text>*/}
                    {/*<Card.Text>Stock:{product.stock}</Card.Text>*/}
                    <Card.Text>Price: €{product.price}</Card.Text>
                    {inStockOrOutOfStock}
                    <Link to= {"/product/" + product._id}>
                      <Button style={{marginLeft:"5rem"}}>View</Button>
                    </Link>
                </Card.Body>
            </Card>

        )
    }
}