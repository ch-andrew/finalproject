import React, { Component } from 'react'
import Footer from './Footer'
import ProductItem from './ProductItem'

import Axios from 'axios'

class ShopAll extends Component {

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
            'http://localhost:2077/products/all'

        ).then(res => {
            this.setState(
                {
                    products: res.data.products,
                    variants : res.data.variants,
                }
            )

            Axios.get(
                'http://localhost:2077/products/pricelist'
            ).then(res => {
                this.setState(
                    {
                        prices : res.data.pricelist
                    }
                )
            }).catch(err => {
                console.log(err);
            })

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
            <div className='my-5' style={{fontFamily : 'Roboto'}}>
                <div className='row'>
                    <h1 className='col-12 text-center'>ALL PRODUCTS</h1>
                    {/* <div className='col-3 mt-3 px-5'>
                        <div className='row' style={{border: '2px solid #1a1a1a', height: '300px'}}>
                            <div className='col-12 my-5'>
                                <h5 className='ml-5'>Men's</h5>
                            </div>

                        </div>
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

export default ShopAll