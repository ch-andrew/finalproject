import React, { Component } from 'react'
import {Route, BrowserRouter} from 'react-router-dom'

import '../index.css'
import Register from '../1.pages/Register'
import Login from '../1.pages/Login'
import Home from '../1.pages/Home'
import Header from '../1.pages/Header'
import ManageProducts from '../1.pages/ManageProducts'
import ProductDetail from '../1.pages/ProductDetail'
import ShoppingCart from '../1.pages/ShoppingCart'
import ShopAll from '../1.pages/ShopAll'
import ShopMen from '../1.pages/Shop Men/ShopMen'
import ShopWomen from '../1.pages/Shop Women/ShopWomen'


import Dashboard from './Dashboard'
import { connect } from 'react-redux';

// Action Creator
const keepLogin = (objUser) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: objUser.id,
            username: objUser.username,
        }
    }
}

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
                <BrowserRouter>
                    <Header/>
                    <Route path='/' exact component={Home}/>
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/manageproducts' component={ManageProducts} />
                    <Route path='/productdetail/:id' component={ProductDetail}/>
                    <Route path='/shoppingcart' component={ShoppingCart}/>
                    <Route path='/dashboard' component={Dashboard}/>
                    <Route path='/shop/all' component={ShopAll}/>
                    <Route path='/shop/men' component={ShopMen}/>
                    <Route path='/shop/women' component={ShopWomen}/>
                </BrowserRouter>
            )
        } else {
            return <div><h1 className="text-center">Loading</h1></div>
        }
    }
}

export default connect(null,{keepLogin})(App)