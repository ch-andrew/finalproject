import React, { Component } from 'react'
import {Route, BrowserRouter} from 'react-router-dom'

import '../index.css'
import Register from '../1.pages/Register'
import Login from '../1.pages/Login'
import Home from '../1.pages/Home'
import Header from '../1.pages/Header'
import ProductDetail from '../1.pages/ProductDetail'
import ShoppingCart from '../1.pages/ShoppingCart'
import ShopAll from '../1.pages/ShopAll'
import ShopMen from '../1.pages/Shop Men/ShopMen'
import ShopWomen from '../1.pages/Shop Women/ShopWomen'
import AdminPage from '../1.pages/AdminPage'

import { connect } from 'react-redux';
import {keepLogin} from '../redux/actions'

class App extends Component {
    
    state = {
        check: false
    }

    componentDidMount() {
        // check local storage
        let userStorage = JSON.parse(localStorage.getItem('userData'))
        
        if(userStorage){
            // kirim ke redux
            this.props.keepLogin(userStorage)
        }

        this.setState({check: true})
    }

    render() {
        if(this.state.check){
            return (
                <div>
                <BrowserRouter>
                    <Header/>
                    <Route path='/' exact component={Home}/>
                    <Route path='/register' exact component={Register}/>
                    <Route path='/login'exact component={Login}/>
                    <Route path='/admin' exact component={AdminPage}/>
                    <Route path='/productdetail/:id' exact component={ProductDetail}/>
                    <Route path='/shoppingcart' exact component={ShoppingCart}/>
                    <Route path='/shop/all' exact component={ShopAll}/>
                    <Route path='/shop/men' exact component={ShopMen}/>
                    <Route path='/shop/women' exact component={ShopWomen}/>
                </BrowserRouter>
                </div>
            )
        } else {
            return  <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
        }
    }
}


export default connect(null, {keepLogin})(App)