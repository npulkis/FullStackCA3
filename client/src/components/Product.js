import {Component} from "react";
import {Card} from "react-bootstrap";

export default class Product extends Component{



    render() {
        const { product } = this.props;
        return(
            <Card>
                <Card.Body>
                    <Card.Img src={`data:image/jpeg;base64,${product.productPhotoFilename}`}/>
                    <Card.Title> {product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>Category:{product.category}</Card.Text>
                    <Card.Text>Stock:{product.stock}</Card.Text>
                    <Card.Text>Price: €{product.price}</Card.Text>
                </Card.Body>
            </Card>

        )
    }
}