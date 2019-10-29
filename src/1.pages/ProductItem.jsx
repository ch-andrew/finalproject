import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
// import Swal from 'sweetalert2'
import {connect} from 'react-redux'


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
        let {id, name, price, picture} = this.props.barang

        return (
            <div className='card col-sm-3 my-4' >
                <img src={picture} className='card-img-top' alt=""/>
                <div className='card-body'>
                    <p className='card-title mb-2'>{name}</p>
                    <p className='card-text mb-2'>Rp. {price}</p>
                    {/* <input className='form-control mb-2' type="number" placeholder="Quantity" onInput={(e)=>{this.setState({addQuantity: parseInt(e.target.value)})}}/> */}
                    {this.notification()}
                    <Link to={`/productdetail/${id}`}>
                        <button className='btn btn-block btn-outline-primary mt-2'>Detail</button>
                    </Link>
                    {/* <button className='btn btn-block btn-outline-primary' onClick={() => this.AddtoCart(id, name, price, picture, description, qty)}>Add To Cart</button> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user_name : state.auth.username,
        user_id : state.auth.id
    }
    
}

export default connect(mapStateToProps)(ProductItem)