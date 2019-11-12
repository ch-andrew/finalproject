import React, { Component } from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'

class Checkout extends Component {

    state = {
        user: {},
        address: {},
        cart: {},
        details: {},
        activeTab: '1',
        shipping: false,
        payment: false
    }

    componentDidMount() {
        this.getData()
        this.getCart()
        this.getDetails()
    }

    getDetails = () => {
        Axios.get('http://localhost:2077/transaction/details', 
        {
            params: {
                userId : this.props.id
            }
        }).then((res) => {
            console.log(res.data.result[0]);
            this.setState({details: res.data.result[0]})
        }).catch((err) => {
            console.log(err);
            
        })
    }

    getCart = () => {
        Axios.get(
            'http://localhost:2077/cart/data', {
                params: {
                    userId: this.props.id
          
                  }
          
            }

        ).then((res) => {
            
            this.setState({
                cart : res.data.cart,
            })
            console.log(res.data.cart);

        }).catch((err)=>{
            console.log(err)

        })
    }

    getData = () => {
        Axios.get(`http://localhost:2077/auth/info` , 
        {
            params: {
                userId : this.props.id
            }
        }).then(res => {
            this.setState({address: res.data.info[0], user: res.data.user[0]})
            
        }).catch(err => {
            console.log(err);
        })
    }

    Proceed = () => {

        var inputCountry = document.getElementById('inputCountry').value

        if(this.state.activeTab === '1'){
            Axios.post(`http://localhost:2077/auth/change-information` , {
                userId : this.props.id,
                type: 'changeInfo',
                firstName : this.firstName.value,
                lastName : this.lastName.value,
                shippingAddress : this.shipping.value,
                city : this.city.value,
                province : this.province.value,
                zipCode : this.zipCode.value,
                country : inputCountry,
                phoneNumber: this.phoneNumber.value
            })

            this.setState({activeTab: '2' , shipping: true})
            console.log(this.state.shipping);
            
        }
    }

    renderInput = () => {
        if(this.state.activeTab === '1'){
            return(
                <div className="col-6 px-5 pb-5">
                        <form className='form-group'>
                            <div className="form-row">
                                <div className="col">
                                    <h4 className="font-weight-bold">Shipping Address</h4>
                                </div>
                            </div>

                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>First Name</h5>
                                    <input ref={(input) => {this.firstName = input}} type='text' value={this.state.address.firstName} className='form-control'/>
                                </div>
                                <div className="col">
                                    <h5>Last Name</h5>
                                    <input ref={(input) => {this.lastName = input}} type='text' value={this.state.address.lastName} className='form-control'/>
                                </div>
                            </div>
                            
                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>Address</h5>
                                    <input ref={(input) => {this.shipping = input}} type='text' value={this.state.address.shippingAddress} className='form-control'/>
                                </div>
                            </div>

                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>City</h5>
                                    <input ref={(input) => {this.city = input}} value={this.state.address.city} type='text' className='form-control'/>
                                </div>
                            </div>

                            <div className="my-3 form-row">
                                <div className="col-8">
                                    <h5>State / Province</h5>
                                    <input ref={(input) => {this.province = input}} value={this.state.address.province} type='text' className='form-control'/>
                                </div>
                                <div className="col-4">
                                    <h5>Zip Code</h5>
                                    <input ref={(input) => {this.zipCode = input}} value={this.state.address.zipCode}  type='text' className='form-control'maxLength={10}/>
                                </div>
                            </div>

                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>Country</h5>
                                    <select id="inputCountry" class="form-control">
                                        <option selected>Indonesia</option>
                                        <option>Malaysia</option>
                                        <option>Singapore</option>
                                    </select>
                                </div>
                            </div>

                            <div className="my-3 form-row">
                                <div className="col">
                                    <h4 className="font-weight-bold">Contact</h4>
                                </div>
                            </div>

                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>Email</h5>
                                    <input ref={(input) => {this.phoneNumber = input}} value={this.state.user.email} type='text' className='form-control' maxLength={15}/>
                                </div>
                            </div>

                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>Phone Number</h5>
                                    <input ref={(input) => {this.phoneNumber = input}} value={this.state.address.phoneNumber} type='text' className='form-control' maxLength={15}/>
                                </div>
                            </div>
                        </form>
                        <div className="my-3">
                            <button className="btn btn-primary mr-3" onClick={this.Proceed}>
                                Proceed
                            </button>
                        </div>
                    </div>
            )
        }

        else if (this.state.activeTab === '2'){
            return(
                <div>
                    Total Payment : IDR {parseInt(this.state.details.totalPayment).toLocaleString('id')}
                    Bank Account Number : 1234567890
                </div>
            )
        }
    } 

    render() {
        return (
            <div style={{paddingLeft: '15px', paddingRight: '15px', borderTop: '2px solid #1a1a1a'}}>
                <div className="row m-5">
                    <div className="col-6 row m-0 p-0 text-center" style={{borderBottom: '2px solid grey'}}>
                        <div className="col-4" 
                        style={{color: this.state.activeTab === '1' ? '#1a1a1a' : 'gray', 
                                cursor: this.state.activeTab === '1' ? '' : 'pointer'}}
                        onClick={() => this.setState({activeTab: '1'})}>
                            <h5>Shipping</h5>
                        </div>
                        {
                            this.state.shipping === true ?
                            <div className="col-4" style={{color: this.state.activeTab === '2' ? '#1a1a1a' : 'gray', 
                                cursor: this.state.activeTab === '2' || this.state.shipping === true ? 'pointer' : ''}}
                                onClick={() => this.setState({activeTab: '2'})}>
                            <h5>Payment</h5>
                            </div> :
                            <div className="col-4" style={{color: this.state.activeTab === '2' ? '#1a1a1a' : 'gray', 
                                cursor: this.state.activeTab === '2' && this.state.shipping === true ? 'pointer' : ''}}>
                            <h5>Payment</h5>
                        </div>
                        }
                        <div className="col-4" 
                        style={{color: this.state.activeTab === '3' ? '#1a1a1a' : 'gray', 
                                cursor: this.state.activeTab === '3' && this.state.payment === true ? 'pointer' : ''}}
                        onClick={() => this.setState({activeTab: '3'})}>
                            <h5>Receipt</h5>
                        </div>
                    </div>
                </div>
                <div className="row m-5">
                    {this.renderInput()}
                </div>
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
  
        cartLength : state.cart.cartLength
    }
  }
  
export default connect(mapStateToProps)(Checkout)