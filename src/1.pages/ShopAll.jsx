import React, { Component } from 'react'
import Footer from './Footer'
import ProductItem from './ProductItem'

import Axios from 'axios'

class ShopAll extends Component {

    state = {
        products: [],
        variants: [],
        selectedProductId: 0
    }

    componentDidMount() {
        this.getData()
        console.log(this.state.selectedProductId);
    }

    getData = () => {
        Axios.get(
            'http://localhost:2077/products/all'

        ).then(res => {
            this.setState(
                {
                    products: res.data.products,
                    variants : res.data.variants,
                }
            )

        }).catch(err => {
            console.log(err)
        })
    }

    renderList = () => {

        return this.state.products.map((item) => {
            return <ProductItem product={item} key={item.id}/>
        })
    }

    render() {
        return (
            <div style={{fontFamily : 'Roboto'}}>
                <h1 className='text-center'>ALL PRODUCTS</h1>
                <div className='row'>

                    <div className='col-3 mt-3'>

                    </div>

                    <div className="row col-9">
                        {this.renderList()}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default ShopAll