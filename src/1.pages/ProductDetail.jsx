import React, { Component } from 'react'
import axios from 'axios'

class ProductDetail extends Component {

    state = {
        product: null
    }

    componentDidMount() {
        axios.get(
            `http://localhost:2019/products/${this.props.match.params.id}` 

        ).then(res => {
            // res.data = {id, name, price, description, picture}
            this.setState({product: res.data})

        })
    }
    

    render() {
        // Ketika product bukan null
        if(this.state.product){
            return (
                <div className='card col-5 my-5 mx-auto'>
                    <div className='card-header mt-2' style={{backgroundColor:"white"}}>
                        <h2>{this.state.product.name}</h2>
                    </div>
                    <div className='card-body' style={{marginBottom: "-1.25rem"}}>
                        <img className='card-img-top' src={this.state.product.picture} alt=""/>
                        <h3 style={{fontSize: "24px", fontWeight: "bold" , margin: "2px 0px 2px 0px"}}>Name :</h3>
                        <p style={{margin: "0 auto", fontSize: "18px"}}>{this.state.product.name}</p>
                        <p style={{fontSize: "24px", fontWeight: "bold" , margin:"2px 0px 2px 0px"}}>Description :</p>
                        <p>{this.state.product.description}</p>
                        <p style={{fontSize:"20px", fontWeight:"bold"}}>Price : Rp.{this.state.product.price}</p>
                    </div>
                    <form style={{padding: "1.25rem" , marginTop:"-1.25rem"}}><input className='form-control' type='number' placeholder='Quantity'/></form>
                    <button className='btn btn-outline-primary' style={{margin: "1px 1.25rem 1.25rem 1.25rem"}}>Add To Cart</button>
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