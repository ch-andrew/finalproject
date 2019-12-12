import React, { Component } from 'react'
import Footer from './Footer'
import ProductItem from './ProductItem'

import Axios from 'axios'

class ShopNew extends Component {
    state = {
        products: [],
        variants: [],
        prices: [],
        selectedProductId: 0
    }

    componentDidMount() {
        this.getData()
        console.log(this.state.selectedProductId);
    }

    getData = () => {
        Axios.get(
            'http://localhost:2077/products/all', {
                params:{
                    input : 'New Arrivals'
                }
            }

        ).then(res => {
            this.setState(
                {
                    products: res.data.new,
                }
            )

        })
    }

    renderList = () => {

        return this.state.products.map((item) => {
            return <ProductItem product={item} key={item.id}/>
        })
    }

    render() {
        return (
            <div className='my-5' style={{fontFamily : 'Roboto'}}>
                <div className='row'>
                    <h1 className='col-12 text-center'>Newest Arrivals</h1>
                    {/* <div className='col-3 mt-3'>

                    </div> */}

                    <div className="row col-12">
                        {this.renderList()}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}


export default ShopNew