import React, { Component } from 'react'
import axios from 'axios'
import ProductItem from './ProductItem'

import Footer from './Footer'
import CarouselHome from '../2.components/Carousel'

  

class Home extends Component {

    state = {
        products: [],
        searchProducts: []
    }

    componentDidMount() {
        axios.get(
            'http://localhost:2019/products'

        ).then(res => {
            this.setState(
                {
                    products: res.data,
                    searchProducts: res.data
                }
            )

        })
    }

    // Membuat list, akan menggunakan map
    renderList = () => {
        // products = [{}, {}, {}]
        // product = {id, name, description, price, picture}
        return this.state.searchProducts.map((product) => {
            return <ProductItem barang={product} key={product.id}/>
        })

    }

    // Search / Filter
    onSearchClick = () => {
        let input_name = this.name.value
        let input_min = parseInt(this.minimum.value)
        let input_max = parseInt(this.maximum.value)

        // input_name lowerCase = O -> o
        // product.name lowerCase : Product One -> product one
        
        let hasilFilter = this.state.products.filter((objectOfProducts)=>{
            if (input_name && input_min && input_max) {
                return objectOfProducts.name.toLowerCase().includes(input_name.toLowerCase()) &&
                parseInt(objectOfProducts.price) >= input_min &&
                parseInt(objectOfProducts.price) <= input_max
            } else if (input_name && input_min) {
                return objectOfProducts.name.toLowerCase().includes(input_name.toLowerCase()) &&
                parseInt(objectOfProducts.price) >= input_min
            } else if (input_name && input_max) {
                return objectOfProducts.name.toLowerCase().includes(input_name.toLowerCase()) &&
                parseInt(objectOfProducts.price) <= input_max
            } else if (input_min && input_max) { 
                return parseInt(objectOfProducts.price) >= input_min &&
                parseInt(objectOfProducts.price) <= input_max
            } else if (input_name) {
                return objectOfProducts.name.toLowerCase().includes(input_name.toLowerCase())
            } else if (input_min) {
                return parseInt(objectOfProducts.price) >= input_min
            } else if (input_max) {
                return parseInt(objectOfProducts.price) <= input_max
            } else {return 0}
        })
        this.setState({searchProducts: hasilFilter})
    }

    // Reset
    onResetClick = () => {
        // prevState = state saat ini
        this.setState((prevState) => {
            return {
                searchProducts: prevState.products
            }
        })
    }

    // Clean
    // onCleanClick = () => {
    //     this.setState({searchProducts: []})
    // }
    
    render() {
        return (
            <div className="">
                <div className="">
                    {/* <img src="image/tagline_header.png" class="img-fluid" alt="tagline_header"/> */}
                    <CarouselHome/>
                </div>
                <div className="row">
                    <div className="col mx-0">
                        <a href="/" class="">
                            <img src="image/header1.jpg" class="img-fluid" alt="First"/>
                        </a>
                    </div>
                    <div className="col mx-0">
                        <a href="/" class="">
                            <img src="image/header2.jpg" class="img-fluid" alt="Second"/>
                        </a>
                    </div>
                    <div className="col mx-0">
                        <a href="/" class="">
                            <img src="image/header3.jpg" class="img-fluid" alt="Third"/>
                        </a>
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