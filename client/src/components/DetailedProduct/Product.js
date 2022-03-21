// import React, {Component} from "react";
// import axios from "axios";
// import {SERVER_HOST} from "../../config/global_constants";
// import {Button, Col, Container, Row} from "react-bootstrap";
// import {DataContext} from "../Context";
//
// export default class Product extends Component{
//     static contextType= DataContext;
//
//     constructor(props) {
//         super(props);
//         this.state={
//             product:[]
//         }
//     }
//
//     componentDidMount() {
//         axios.get(`${SERVER_HOST}/product/${this.props.match.params.id}`)
//             .then(res => {
//                 if (res.data) {
//                     if (res.data.errorMessage) {
//                         console.log(res.data.errorMessage)
//                     } else {
//                         console.log("Product read")
//                         this.setState({product: res.data.data})
//                         console.log(this.state.product)
//
//
//
//                         // const image1 = this.state.product.photos[0].filename;
//                         // const image2 = this.state.product.photos[1].filename;
//                         // const image3 = this.state.product.photos[2].filename;
//                         //
//                         //
//                         // const imageID = this.state.product.photos[0]._id;
//                         // axios.get(`${SERVER_HOST}/photo/${image}`)
//                         //     .then(res =>
//                         //     {
//                         //         document.getElementById("img").src = `data:;base64,${res.data.image}`
//                         //     })
//                         //     .catch(err =>
//                         //     {
//                         //         // do nothing
//                         //     })
//
//
//                     }
//                 } else {
//                     console.log("Product not found")
//                 }
//             })
//
//
//     }
//
//    // Images=()=>{
//    //      return this.state.product.photos.map((photo)=>{
//    //          return <Row>{photo.filename}</Row>
//    //      })
//    // }
//
//
//     render() {
//        // const {product} = this.state
//
//         const{addCart} = this.context;
//
//         let inStockOrOutOfStock = null
//         if (this.state.product.stock < 1){
//             inStockOrOutOfStock = <Button disabled>Out of Stock</Button>
//         }else{
//             inStockOrOutOfStock= <Button onClick={()=> addCart(this.state.product._id)}>Add to cart</Button>
//         }
//
//
//
//         return(
//             <Container>
//                 <Col>
//                     <Row>{this.state.product.name}</Row>
//                     <Row>{this.state.product.description}</Row>
//                     <Row>{this.state.product.stock}</Row>
//                     <Row>€{this.state.product.price}</Row>
//                     <Row>{inStockOrOutOfStock}</Row>
//                     <Row><img id="img" src=""/></Row>
//
//                     {/*<Row>{this.state.product.photos.map((image)=>(*/}
//                     {/*    <h1>{image.filename}</h1>*/}
//                     {/*))}</Row>*/}
//
//
//                 </Col>
//
//
//             </Container>
//         )
//     }
// }


// <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>
//
//     <div style={{ display: 'flex', justifyContent: 'center' }}>
//         <h1>{this.state.product.name}</h1>
//     </div>
//
//     <br />
//
//     <Row gutter={[16, 16]} >
//         <Col lg={12} xs={24}>
//             {/*<ProductImage detail={Product} />*/}
//             <ImageSlider/>
//         </Col>
//         <Col lg={12} xs={24}>
//             <ProductInfo
//                 info={this.state.product} />
//         </Col>
//     </Row>
// </div>



import {Component} from "react";
import axios from "axios";
import {SERVER_HOST} from "../../config/global_constants";
import './Product.css'


export default class Product extends Component{
    constructor(props) {
        super(props);
        this.state={
            product:[]
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/product/${this.props.match.params.id}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Product read")
                        this.setState({product: res.data.data})
                        this.getPhoto()

                    }
                } else {
                    console.log("Product not found")
                }
            })

    }

    getPhoto = () =>{
        const image = this.state.product.photos[0].filename;
        const imageID = this.state.product.photos[0]._id;
        axios.get(`${SERVER_HOST}/photo/${image}`)
            .then(res =>
            {
                document.getElementById("image").src = `data:;base64,${res.data.image}`
            })
            .catch(err =>
            {
                // do nothing
            })

    }


    render() {

        return(
            <div className="app">
                {

                        <div className="details" key={this.state.product._id}>
                            <div className="big-img">
                                <img src="" id="image"  />
                            </div>

                            <div className="box">
                                <div className="row">
                                    <h2>{this.state.product.name}</h2>
                                    <span>${this.state.product.price}</span>
                                </div>
                                {/*<Colors colors={item.colors} />*/}

                                <p>{this.state.product.description}</p>
                                {/*<p>{item.content}</p>*/}

                                {/*<DetailsThumb images={item.src} tab={this.handleTab} myRef={this.myRef} />*/}
                                <button className="cart">Add to cart</button>

                            </div>
                        </div>

                }
            </div>
        );
    };
}
