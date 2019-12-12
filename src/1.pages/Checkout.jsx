import React, { Component } from 'react'
import {connect} from 'react-redux'
import Axios from 'axios'
import './sub.css'
import moment from 'moment'
import Swal from 'sweetalert2'

class Checkout extends Component {

    state = {
        user: {},
        address: [],
        cart: {},
        details: {},
        activeTab: '1',
        shipping: false,
        payment: false,
        filename: '',
        selectedFile: '',
        deadline: '',
        status: '',
        inputBank: 'Bank BCA'
    }

    componentDidMount() {
        this.getData()
        this.getCart()
        this.getDetails()
        if(this.props.payment){
            this.setState({shipping: true, activeTab: '2'})
        }

        if(this.props.complete){
            this.setState({activeTab: '1'})  
        }
    }

    getDetails = () => {
        Axios.get('http://localhost:2077/transaction/details', 
        {
            params: {
                userId : this.props.id
            }
        }).then((res) => {
            console.log(res.data.result.length);
            let newest = res.data.result.length - 1
            this.setState({details: res.data.result[newest]})
            console.log(this.state.details.paymentDeadline);
            if(this.state.details.paymentDeadline !== 'N' && (this.state.details.status === 'Pending' || this.state.details.status === 'Waiting Approval')){
                this.setState({payment: true, activeTab: '2'})
                console.log(this.state.payment);
                this.checkDeadline()
            }
            
        }).catch((err) => {
            console.log(err);
            
        })
    }

    getCart = () => {
        console.log(this.props.id);
        
        Axios.get(
            'http://localhost:2077/transaction/cart', {
                params: {
                    userId: this.props.id,
                  }
            }

        ).then((res) => {
            if(res){
                this.setState({
                    cart : res.data,
                })
                console.log(this.state.cart);
                for (let i = 0; i < this.state.cart.length; i++) {
                    console.log(this.state.cart[i].cartId)
                }
            }

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
            
            if(res.data.info.length > 0){
                this.setState({address: res.data.info[0], user: res.data.user[0]})
            }
            console.log(this.state.address)
        }).catch(err => {
            console.log(err);
        })
    }

    checkDeadline = () => {
        this.setState({activeTab: '2' , shipping: true})
        Axios.post(`http://localhost:2077/transaction/pay-time` , 
        {
            userId : this.props.id,
        }).then(res => {
            console.log(res.data.result[0]);
            this.setState({deadline: res.data.result[0].paymentDeadline, status: res.data.result[0].status, transactionId: res.data.result[0].transactionId})
            console.log(this.state.deadline)
            
            if(this.state.deadline !== 'N'){
                let check = moment().format('YYYY-M-D HH:mm')
                if(this.state.deadline <= check){
                    Axios.post(`http://localhost:2077/transaction/pay-time` , {
                        input: 'deadline expired',
                        userId : this.props.id
                    }).then(res => {
                        console.log(res);
                        Axios.post(`http://localhost:2077/transaction/checkout`, {
                            userId : this.props.id,
                            quantity: this.props.cartLength,
                            total: this.state.details.totalPayment,
    
                        }).then(res => {
                            console.log(res);
                        }).catch(err => {
                            console.log(err);
                        })
                        
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
    
            else {
                Axios.post(`http://localhost:2077/transaction/pay-time` , {
                    input: 'set time',
                    userId : this.props.id,
                    paymentIssued: moment().format('YYYY-M-D HH:mm'),
                    paymentDeadline: moment().add(1 , 'h').format('YYYY-M-D HH:mm')
                }).then(res => {
                    console.log(res);
                        Axios.post(`http://localhost:2077/transaction/pay-time` , {
                            userId : this.props.id,
                        }).then(res => {
                            this.setState({deadline: res.data.result[0].paymentDeadline, status: res.data.result[0].status})
                            console.log(this.state.deadline)
                            return (dispatch) => {
                                dispatch({
                                    type : 'PAYMENT'
                                })
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                    
                }).catch(err => {
                    console.log(err);
                })
            }
        })
    }

    Proceed1 = () => {
        var inputCountry = document.getElementById('inputCountry').value

        Swal.fire({
            title: 'Do you wish to proceed with payment?',
            text: 'All items in your cart will be removed.',
            icon: 'warning',
            width: 600,
            showCancelButton: true,
            confirmButtonColor: '#007BFF',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Proceed'
        }).then((result) => {
            if(result.value){
                if(this.state.address.userId === this.props.id.toString()){
                    Axios.post(`http://localhost:2077/auth/change-information` , {
                        userId : this.props.id,
                        type: 'changeInfo',
                        firstName : this.state.address.firstName,
                        lastName : this.state.address.lastName,
                        shippingAddress : this.state.address.shippingAddress,
                        city : this.state.address.city,
                        province : this.state.address.province,
                        zipCode : this.state.address.zipCode,
                        country : inputCountry,
                        phoneNumber: this.state.address.phoneNumber
                    }).then(res => {
                        console.log(res);
                        this.checkDeadline()
                        this.getData()
                    })
                }

                else {
                    Axios.post(`http://localhost:2077/auth/change-information`, {
                        userId : this.props.id,
                        firstName : this.state.address.firstName,
                        lastName : this.state.address.lastName,
                        shippingAddress : this.state.address.shippingAddress,
                        city : this.state.address.city,
                        province : this.state.address.province,
                        zipCode : this.state.address.zipCode,
                        country : inputCountry,
                        phoneNumber: this.state.address.phoneNumber
                   }).then(res => {
                       console.log(res.data);       
                       this.getDetails()
                       this.checkDeadline()
                       this.getData()
                       
                   })
                }
            }
        })
    }

    Proceed2 = () => {
        var fd = new FormData()

        let data = {
            name : this.accountname.value,
            number: this.accountnumber.value,
            bank : this.state.inputBank,
            userId : this.props.id
        }

        console.log(this.state.selectedFile, this.state.selectedFile.name);
        fd.append('proof', this.state.selectedFile, this.state.selectedFile.name)
        fd.append('data', JSON.stringify(data))
        Axios.post(`http://localhost:2077/transaction/uploadpaymentproof `, fd)
            .then(res =>{
                Axios.post(`http://localhost:2077/transaction/add-order` , {
                    transactionId: this.state.transactionId,
                    addressId: this.state.address.infoId
                }).then(res => {
                    console.log(res);
                    // INSERT TO ORDER
                    for (let i = 0; i < this.state.cart.length; i++) {
                        console.log(this.state.cart[i].cartId)
                        Axios.post(`http://localhost:2077/transaction/add-conn` , {
                            transactionId: this.state.transactionId,
                            cartId : this.state.cart[i].cartId
                        }).then(res => {
                            console.log(res)
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                    window.location.href="/info"
                })
            }).catch(err=>{
                console.log(err)
            })
    }

    renderInput = () => {
        if(this.state.activeTab === '1' && this.state.address){
            return(
                <div className="col-12 px-5 pb-5">
                        <form className='form-group'>
                            <div className="form-row">
                                <div className="col">
                                    <h4 className="font-weight-bold">Shipping Address</h4>
                                </div>
                            </div>

                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>First Name</h5>
                                    <input onChange={(e) => {this.setState({address: {firstName: e.target.value, lastName: this.state.address.lastName, city: this.state.address.city, province:this.state.address.province, phoneNumber:this.state.address.phoneNumber, zipCode:this.state.address.zipCode , shippingAddress: this.state.address.shippingAddress}})}}
                                    type='text' value={this.state.address.firstName} className='form-control'/>
                                </div>
                                <div className="col">
                                    <h5>Last Name</h5>
                                    <input onChange={(e) => {this.setState({address: {firstName: this.state.address.firstName, lastName: e.target.value, city: this.state.address.city, province:this.state.address.province, phoneNumber:this.state.address.phoneNumber, zipCode:this.state.address.zipCode , shippingAddress: this.state.address.shippingAddress}})}} 
                                    type='text' value={this.state.address.lastName} className='form-control'/>
                                </div>
                            </div>
                            
                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>Address</h5>
                                    <input onChange={(e) => {this.setState({address: {firstName: this.state.address.firstName, lastName: this.state.address.lastName, city: this.state.address.city, province:this.state.address.province, phoneNumber:this.state.address.phoneNumber, zipCode:this.state.address.zipCode , shippingAddress: e.target.value}})}}
                                    type='text' value={this.state.address.shippingAddress} className='form-control'/>
                                </div>
                            </div>

                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>City</h5>
                                    <input onChange={(e) => {this.setState({address: {firstName: this.state.address.firstName, lastName: this.state.address.lastName, city: e.target.value, province:this.state.address.province, phoneNumber:this.state.address.phoneNumber, zipCode:this.state.address.zipCode , shippingAddress: this.state.address.shippingAddress}})}}
                                    type='text' value={this.state.address.city} className='form-control'/>
                                </div>
                            </div>

                            <div className="my-3 form-row">
                                <div className="col-8">
                                    <h5>State / Province</h5>
                                    <input onChange={(e) => {this.setState({address: {firstName: this.state.address.firstName, lastName: this.state.address.lastName, city: this.state.address.city, province:e.target.value, phoneNumber:this.state.address.phoneNumber, zipCode:this.state.address.zipCode , shippingAddress: this.state.address.shippingAddress}})}}
                                    type='text' value={this.state.address.province}  className='form-control'/>
                                </div>
                                <div className="col-4">
                                    <h5>Zip Code</h5>
                                    <input onChange={(e) => {this.setState({address: {firstName: this.state.address.firstName, lastName: this.state.address.lastName, city: this.state.address.city, province:this.state.address.province, phoneNumber:this.state.address.phoneNumber, zipCode:e.target.value , shippingAddress: this.state.address.shippingAddress}})}}  
                                    type='text' value={this.state.address.zipCode}  className='form-control'maxLength={10}/>
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
                                    <h5>Phone Number</h5>
                                    <input onChange={(e) => {this.setState({address: {firstName: this.state.address.firstName, lastName: this.state.address.lastName, city: this.state.address.city, province:this.state.address.province, phoneNumber:e.target.value, zipCode:this.state.address.zipCode , shippingAddress: this.state.address.shippingAddress}})}}  
                                    value={this.state.address.phoneNumber} 
                                    type='text' className='form-control' maxLength={15}/>
                                </div>
                            </div>
                        </form>
                        <div className="my-3">
                            <button className="btn btn-primary mr-3" onClick={this.Proceed1}>
                                Proceed
                            </button>
                        </div>
                    </div>
            )
        }

        else if (this.state.activeTab === '2'){

            if(this.state.status === 'Pending'){
                return(
                    <div className="col-12 px-5 pb-5 text-center">
                        <h4>Bank Transfer Details</h4>
                        <h5 className="font-weight-light">Please transfer the payment before : <b>{this.state.deadline} (GMT + 7)</b></h5>
                        <div className="my-3">
                            <h5>Total Payment :</h5>
                            <h5 style={{color: "#007BFF"}}>Rp {parseInt(this.state.details.totalPayment).toLocaleString('id')}</h5>
                            <h5>Status : <b>{this.state.status}</b></h5>
                        </div>
    
                        <div className="mb-3 pt-3 row">
                            <h5 className="col-12">Bank Account Destination Details :</h5>
                            <div className="col py-3">
                                <img className="col my-3" src="image/472px-BCA_logo.png" alt="bca_logo" style={{width: '200px'}}/>
                                <h5>1. BCA</h5>
                                <h5>Bank Account Number : 123 456 7890</h5>
                                <h5>Branch : Kebon Jeruk</h5>
                                <h5>Account's Holder Name : PT. Cimo</h5>
                            </div>
    
                            <div className="col py-3">
                                <img className="col my-3" src="image/Bank_Mandiri_logo.png" alt="mandiri_logo" style={{width: '200px'}}/>
                                <h5>2. Mandiri</h5>
                                <h5>Bank Account Number : 123 456 789 0123</h5>
                                <h5>Branch : Kebon Jeruk</h5>
                                <h5>Account's Holder Name : PT. Cimo</h5>
                            </div>
                        </div>
    
                        <div className="my-3 form-row text-left">
                            <div className="col-12">
                                <h5>Bank Account Destination</h5>
                            </div>
    
                            <div className="col mb-3">
                                <h5 className="font-weight-light">Account's Holder Name</h5>
                                <input ref={(input) => {this.accountname = input}} type='text' className='form-control' required/>
                            </div>
    
                            <div className="col mb-3">
                                <h5 className="font-weight-light">Account's Holder Number</h5>
                                <input ref={(input) => {this.accountnumber = input}} type='text' className='form-control' required/>
                            </div>
    
    
                            <div className="col mb-3">
                                <h5 className="font-weight-light">Bank Account Destination</h5>
                                <select id="inputBank" class="form-control" onChange={(e) => this.setState({inputBank: e.target.value})}>
                                    <option selected>BCA</option>
                                    <option>Mandiri</option>
                                </select>
                                
                            </div>
    
                            <div className="col-12">
                                <h5 className="font-weight-light">Please upload payment proof</h5>
                                <input className="css-file-input" type='file' onChange={(e) => this.setState({selectedFile : e.target.files[0]})} id="paymentProof"/>
                                <label className="btn btn-outline-primary" style={{cursor: 'pointer'}} for="paymentProof">Choose File</label>
                                <h5 className="font-weight-light">{this.state.selectedFile.name}</h5>
                                {this.state.selectedFile && this.accountname.value && this.state.inputBank ? 
                                <button className="btn btn-primary mr-3" onClick={this.Proceed2}>
                                Proceed
                                </button> 
                                : 
                                ''
                                }
                            </div>
    
                        </div>
                    </div>
                )
            }

            else {
                return(
                    <div className="col-12 px-5 pb-5 text-center">
                        <h4>Bank Transfer Details</h4>
                        <h5 className="font-weight-light">Please transfer the payment before : <b>{this.state.deadline} (GMT + 7)</b></h5>
                        <div className="my-3">
                            <h5>Total Payment :</h5>
                            <h5 style={{color: "#007BFF"}}>Rp {parseInt(this.state.details.totalPayment).toLocaleString('id')}</h5>
                            <h5>Status : <b>{this.state.status}</b></h5>
                        </div>
    
                        <div className="mb-3 pt-3 row">
                            <h5 className="col-12">Bank Account Destination Details :</h5>
                            <div className="col py-3">
                                <img className="col my-3" src="image/472px-BCA_logo.png" alt="bca_logo" style={{width: '200px'}}/>
                                <h5>1. BCA</h5>
                                <h5>Bank Account Number : 123 456 7890</h5>
                                <h5>Branch : Kebon Jeruk</h5>
                                <h5>Account's Holder Name : PT. Cimo</h5>
                            </div>
    
                            <div className="col py-3">
                                <img className="col my-3" src="image/Bank_Mandiri_logo.png" alt="mandiri_logo" style={{width: '200px'}}/>
                                <h5>2. Mandiri</h5>
                                <h5>Bank Account Number : 123 456 789 0123</h5>
                                <h5>Branch : Kebon Jeruk</h5>
                                <h5>Account's Holder Name : PT. Cimo</h5>
                            </div>
                        </div>
                    </div>
                )
            }
            
        }

        else {}
    } 

    render() {        
        return (
            <div className='my-5' style={{paddingLeft: '15px', paddingRight: '15px', borderTop: '2px solid #1a1a1a'}}>
                <div className="row m-5">
                    <div className="col-12 row m-0 p-0 text-center" style={{borderBottom: '2px solid grey'}}>
                        <div className="col-6" 
                        style={{color: this.state.activeTab === '1' ? '#1a1a1a' : 'gray', 
                                cursor: this.state.activeTab === '1' ? '' : 'pointer'}}
                        onClick={() => this.setState({activeTab: '1'})}>
                            <h5>Shipping</h5>
                        </div>
                        {
                            this.state.shipping === true ?
                            <div className="col-6" style={{color: this.state.activeTab === '2' ? '#1a1a1a' : 'gray', 
                                cursor: this.state.activeTab === '2' || this.state.shipping === true ? 'pointer' : ''}}
                                onClick={() => this.setState({activeTab: '2'})}>
                            <h5>Payment</h5>
                            </div> :
                            <div className="col-6" style={{color: this.state.activeTab === '2' ? '#1a1a1a' : 'gray', 
                                cursor: this.state.activeTab === '2' && this.state.shipping === true ? 'pointer' : ''}}>
                            <h5>Payment</h5>
                        </div>
                        }
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
        complete : state.locale.complete,
        payment: state.locale.payment,
  
        cartLength : state.cart.cartLength
    }
  }
  
export default connect(mapStateToProps)(Checkout)