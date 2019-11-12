import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// import axios from 'axios';
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
        let {id, name, defaultImage, IDR, MYR , SGD, gender, category} = this.props.product

        let renderPrice = () => {
            if(this.props.region === 'Indonesia'){
                return(
                    <p className='card-title text-center' style={{fontSize: '1rem'}}>Rp.{IDR}</p>
                )
            }

            else if (this.props.region === 'Malaysia'){
                return(
                    <p className='card-title text-center' style={{fontSize: '1rem'}}>RM{MYR}</p>
                )
            }

            else {
                return(
                    <p className='card-title text-center' style={{fontSize: '1rem'}}>S${SGD}</p>
                )
            }
        }

        return (
            <div className='card col-sm-3 my-4' style={{border: 'none'}}>
                <Link to={`/shop/product/${category.toLowerCase()}/${gender.toLowerCase()}/${id}`}>
                <div className='product-card'>
                    <img src={defaultImage} className='card-img-top' alt=""/>
                    <div className='card-body'>
                    <p className='card-title text-center' style={{fontSize: '1rem'}}>{name}</p>
                    {renderPrice()}
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
        account : state.user.account,
        region : state.locale.region,
    }
}

export default connect(mapStateToProps)(ProductItem)