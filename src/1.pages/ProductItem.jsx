import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
// import Swal from 'sweetalert2'
import {connect} from 'react-redux'
import './sub.css'


class ProductItem extends Component {

    state = {
        products: [],
        selectedId: 0,
        selectedName: '',
        selectedDesc: '',
        selectedPrice: '',
        selectedPict: '',

    }

    AddtoCart = (id, name, price, picture, description, qty) => {
        let addedItems = [{id, name, price, picture, description, qty}]

        console.log(addedItems);

        axios.get(
            'http://localhost:2019/users',
        ).then((res) => {

            let user = JSON.parse(localStorage.getItem('userData'))

                axios.post(
                    `http://localhost:2019/users/${user.id}/`,{
                        cart: addedItems
                    }
                ).then((res) => {
                    console.log(res);
                    
                })

                // let indexofID = id - 1

                // console.log(res.data[indexofID].id);
                
    
                // if(qty === 0){
    
                //     this.setState({loading: false, error: `Please input the amount of quantity`})
                // } 
        }
        )
        
    }
        

    notification = () => {
        if(this.state.error){
            return (
                <div className="alert alert-danger mt-4">
                    {this.state.error}
                </div>
            )
            // notif error, danger
        } else {
            return null
        }
    }

    render() {
        let {id, name, defaultImage} = this.props.product

        return (
            <div className='card col-sm-3 my-4' style={{border: 'none'}}>
                <Link to={`/productdetail/${id}`}>
                <div className='product-card'>
                    <img src={defaultImage} className='card-img-top' alt=""/>
                    <div className='card-body'>
                    <p className='card-title text-center' style={{fontSize: '1rem'}}>{name}</p>
                </div>

                </div>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id : state.user.id,
        email : state.user.email,
        firstName : state.user.firstName,
        lastName : state.user.lastName,
        isLoading : state.user.loading,
        success : state.user.success,
        error : state.user.error,
        account : state.user.account
    }
}

export default connect(mapStateToProps)(ProductItem)