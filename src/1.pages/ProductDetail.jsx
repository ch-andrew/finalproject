import React, { Component } from 'react'
import axios from 'axios'
import {
    Card, 
    CardImg, 
    // CardText, 
    // CardBody,
    // CardTitle, 
    // CardSubtitle, 
    // Button
} from 'reactstrap';

class ProductDetail extends Component {

    state = {
        product: [],
        variants: []

    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        
        axios.get(
            `http://localhost:2077/products/detail/${this.props.match.params.id}` 

        ).then(res => {
            // res.data = {id, name, price, description, picture}
            this.setState({
                product: res.data.product,
                variants: res.data.variants
            })

            console.log(this.state.variants[0]);
        }).catch(err => {
            console.log(err);
            
        })
    }

    renderCard = () => {

        return (

            <Card>
                <CardImg top width="100%" src={this.state.variants.image} alt="Card image cap" />
            </Card>

        )
    }
    

    render() {
        
        // Ketika product bukan null
        if(this.state.product){
            return (
                <div className='col-8 my-5 mx-auto'>
                    {this.renderCard()}
                </div>
            )
        } else {
            return <div><h1 className='text-center'>Loading</h1></div>
        }
    }
}

export default ProductDetail

// false
// '', 0, null, undefined