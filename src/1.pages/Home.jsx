import React, { Component } from 'react'
import axios from 'axios'
import ProductItem from './ProductItem'

import Footer from './Footer'
import CarouselHome from '../2.components/Carousel'
import './Home.css'

  

class Home extends Component {

    state = {
        products: [],
    }

    componentDidMount() {
        axios.get(
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

    // Membuat list, akan menggunakan map
    renderList = () => {
        // products = [{}, {}, {}]
        // product = {id, name, description, price, picture}
        return this.state.products.map((item) => {
            return <ProductItem product={item} key={item.id}/>
        })

    }
    
    render() {
        return (
            <div className="">
                <div className="" style={{marginBottom: '30px'}}>
                    <CarouselHome/>
                </div>

                    <div class="row">
                        <div class="col-4 p-0 css-container">
                            <div className='text-center'>
                                <a href="/shop/men">
                                    <img src="image/SHOP MEN.png" className="img-fluid" alt="First" style={{maxHeight: '650px'}}/>
                                </a>
                            </div>
                        </div>
                        <div class="col-4 p-0 css-container">
                            <div className='text-center'>
                                <a href="/shop/new">
                                    <img src="image/SHOP NEW.png" className="img-fluid" alt="First" style={{maxHeight: '650px'}}/>
                                </a>
                            </div>
                        </div>
                        <div class="col-4 p-0 css-container">
                            <div className='text-center'>
                                <a href="/shop/women">
                                <   img src="image/SHOP WOMEN.png" className="img-fluid" alt="First" style={{maxHeight: '650px'}}/>
                                </a>
                            </div>
                        </div>
                    </div>

                <div className="text-center mx-auto my-4">
                    <h1 style={{textDecoration:"underline", fontFamily:"Playfair Display, serif", fontSize:"4em"}}>New Arrivals</h1>
                </div>

                <div className='row'>
                {/* div untuk search */}
                {/* <div className='col-3 mt-3'>
                    <div className='card p-3'>
                        <div className='border-bottom border-secondary card-title'>
                            <h1>Search</h1>
                        </div>
                        <form className='form-group mb-5'>
                            <h4>Name</h4>
                            <input ref={(input) => {this.name =input}} type='text' className='form-control'/>

                            <h4>Price</h4>
                            <input ref={(input) => {this.minimum =input}} type='text' placeholder='Minimum' className='form-control mb-2'/>
                            <input ref={(input) => {this.maximum =input}} type='text' placeholder='Maximum' className='form-control'/>
                        </form>
                        <button onClick={this.onSearchClick} className='btn btn-block btn-outline-success'>Search</button>
                        <button onClick={this.onResetClick} className='btn btn-block btn-outline-danger'>Reset</button>
                        {/* <button onClick={this.onCleanClick} className='btn btn-block btn-outline-primary'>Clean</button> */}
                    {/* </div>
                </div> */}

                {/* div untuk list */}
                <div className="container"> 
                    <div className='row'>
                        {this.renderList()}
                    </div>
                </div>
            </div>
                <Footer/>
            </div>
        )
    }
}

export default Home