import React, { Component } from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
// import Swal from 'sweetalert2'
// import {Redirect} from 'react-router-dom'
import { TabContent, TabPane, Nav, NavItem, NavLink}from 'reactstrap';
import classnames from 'classnames';
import ManageProducts from './ManageProducts'
import Transactions from './Transactions'

class Dashboard extends Component {

    state = {
        activeTab: '1',
        pass: true,
        user: {},
        userInfo : {}
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.get(`http://localhost:2077/auth/info` , 
        {
            params: {
                userId : this.props.id
            }
        }).then(res => {
            this.setState({user: res.data.user[0], userInfo: res.data.info[0]})
            console.log(this.state.user);
            console.log(this.state.userInfo);
            
        }).catch(err => {
            console.log(err);
        })
    }

    passwordChecker = () => {
        if(this.password.value === this.confirmPassword.value || (this.password.value === '' && this.confirmPassword.value ==='')){
            this.setState({pass: true})
        }

        else {
            this.setState({pass: false})
        }
    }

    notification = () => {
        if(!this.state.pass){
            return(
                <div class="alert alert-warning" role="alert">
                Password does not match! Please try again.
                </div>
            )
        }
        
        else {
            return null
        }
    }

    onSave = () => {

        
        var inputCountry = document.getElementById('inputCountry').value

        if(this.state.activeTab === '2'){
            this.passwordChecker()
        }
        
        
        if(this.state.activeTab === '2' && this.state.pass)
        {
            Axios.post(`http://localhost:2077/auth/change-information` , {
                userId : this.props.id,
                type : 'changeUser',
                firstName : this.firstName.value,
                lastName : this.lastName.value,
                email : this.email.value,
                password: this.password.value
            })
        }
        else 
        {
            Axios.post(`http://localhost:2077/auth/change-information` , {
                userId : this.props.id,
                firstName : this.firstName.value,
                lastName : this.lastName.value,
                shippingAddress : this.shipping.value,
                city : this.city.value,
                province : this.province.value,
                zipCode : this.zipCode.value,
                country : inputCountry,
                phoneNumber: this.phoneNumber.value
            })
        }
    }

    renderAccountInfo = () => {
        
        if (this.state.activeTab === '1'){
            return (
                <div className="col-9 px-5 pb-5">
                    <h3 className="pt-2 mb-3">{this.props.firstName} {this.props.lastName}</h3>
                    <h4 className="pt-2" style={{cursor: 'pointer'}} onClick={() => this.setState({activeTab: '2'})}>Account Information</h4>
                    <h4 className="pt-2" style={{cursor: 'pointer'}} onClick={() => this.setState({activeTab: '3'})}>Shipping Address</h4>
                    <h4 className="pt-2" style={{cursor: 'pointer'}} onClick={() => this.setState({activeTab: '4'})}>Order History</h4>
                </div>
            )
        }
        else if(this.state.activeTab === '2'){
            return (
                <div className="col-9 px-5 pb-5">
                    <form className='form-group'>
                        <div className="my-3 form-row">
                            <div className="col">
                                <h5>First Name</h5>
                                <input ref={(input) => {this.firstName = input}} type='text' value={this.state.user.firstName} className='form-control'/>
                            </div>
                            <div className="col">
                                <h5>Last Name</h5>
                                <input ref={(input) => {this.lastName = input}} type='text' value={this.state.user.lastName} className='form-control'/>
                            </div>
                        </div>
                        
                        <div className="my-3 form-row">
                            <div className="col">
                                <h5>Email Address</h5>
                                <input ref={(input) => {this.email = input}} type='text'  value={this.state.user.email} className='form-control'/>
                            </div>
                        </div>

                        <div className="my-3 form-row">
                            <div className="col">
                                <h5>Password</h5>
                                <input ref={(input) => {this.password = input}} type='password' className='form-control'/>
                            </div>
                            <div className="col">
                                <h5>Confirm Password</h5>
                                <input ref={(input) => {this.confirmPassword = input}} type='password' className='form-control'/>
                            </div>
                            {this.notification()}
                        </div>
                    </form>
                    <div className="my-3">
                        <button className="btn btn-primary mr-3" onClick={this.onSave}>
                            Save Changes
                        </button>
                        <button className="btn btn-outline-dark" onClick={() => this.setState({activeTab: '1'})}>
                            Cancel
                        </button>
                    </div>
                </div>
            )
        }
        else if (this.state.activeTab === '3'){
            if(this.state.userInfo){
                return (
                    <div className="col-9 px-5 pb-5">
                        <form className='form-group'>
                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>First Name</h5>
                                    <input ref={(input) => {this.firstName = input}} type='text' value={this.state.userInfo.firstName} className='form-control'/>
                                </div>
                                <div className="col">
                                    <h5>Last Name</h5>
                                    <input ref={(input) => {this.lastName = input}} type='text' value={this.state.userInfo.lastName} className='form-control'/>
                                </div>
                            </div>
                            
                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>Shipping Address</h5>
                                    <input ref={(input) => {this.shipping = input}} type='text' value={this.state.userInfo.shippingAddress} className='form-control'/>
                                </div>
                            </div>

                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>City</h5>
                                    <input ref={(input) => {this.city = input}} value={this.state.userInfo.city} type='text' className='form-control'/>
                                </div>
                            </div>

                            <div className="my-3 form-row">
                                <div className="col-8">
                                    <h5>State / Province</h5>
                                    <input ref={(input) => {this.province = input}} value={this.state.userInfo.province} type='text' className='form-control'/>
                                </div>
                                <div className="col-4">
                                    <h5>Zip Code</h5>
                                    <input ref={(input) => {this.zipCode = input}} value={this.state.userInfo.zipCode}  type='text' className='form-control'maxLength={10}/>
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
                                    <h5>Phone Number</h5>
                                    <input ref={(input) => {this.phoneNumber = input}} value={this.state.userInfo.phoneNumber} type='text' className='form-control' maxLength={15}/>
                                </div>
                            </div>
                        </form>
                        <div className="my-3">
                            <button className="btn btn-primary mr-3" onClick={this.onSave}>
                                Save Changes
                            </button>
                            <button className="btn btn-outline-dark" onClick={() => this.setState({activeTab: '1'})}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )
            }

            else if (this.state.activeTab === '4'){
                
            }

            else {
                return (
                    <div className="col-9 px-5 pb-5">
                        <form className='form-group'>
                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>First Name</h5>
                                    <input ref={(input) => {this.firstName = input}} type='text' className='form-control'/>
                                </div>
                                <div className="col">
                                    <h5>Last Name</h5>
                                    <input ref={(input) => {this.lastName = input}} type='text'  className='form-control'/>
                                </div>
                            </div>
                            
                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>Shipping Address</h5>
                                    <input ref={(input) => {this.shipping = input}} type='text' className='form-control'/>
                                </div>
                            </div>
    
                            <div className="my-3 form-row">
                                <div className="col">
                                    <h5>City</h5>
                                    <input ref={(input) => {this.city = input}} type='text' className='form-control'/>
                                </div>
                            </div>
    
                            <div className="my-3 form-row">
                                <div className="col-8">
                                    <h5>State / Province</h5>
                                    <input ref={(input) => {this.province = input}} type='text' className='form-control'/>
                                </div>
                                <div className="col-4">
                                    <h5>Zip Code</h5>
                                    <input ref={(input) => {this.zipCode = input}} type='text' className='form-control'maxLength={10}/>
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
                                    <h5>Phone Number</h5>
                                    <input ref={(input) => {this.phoneNumber = input}} type='text' className='form-control' maxLength={15}/>
                                </div>
                            </div>
                        </form>
                        <div className="my-3">
                            <button className="btn btn-primary mr-3" onClick={this.onSave}>
                                Save Changes
                            </button>
                            <button className="btn btn-outline-dark" onClick={() => this.setState({activeTab: '1'})}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )
            }
            
        }
        else {}
    }

    render() {

        // /admin
        
        if(this.props.account === 'admin'){
            return (
                <div className="mx-5 my-5 border border-dark" style={{paddingLeft: '15px', paddingRight: '15px'}}>
                    <h4 className='font-weight-bold pt-2'>Dashboard</h4>
                    <Nav tabs>
                        {/* Manage Products */}
                        <NavItem>
                            <NavLink 
                            className={classnames({ active : this.state.activeTab === '1'})}
                            onClick={() => {this.setState({activeTab : '1'})}}>
                                ManageProducts
                            </NavLink>
                        </NavItem>
                
                        
                        {/* Analytics */}
                        <NavItem>
                            <NavLink 
                            className={classnames({ active : this.state.activeTab === '2'})}
                            onClick={() => {this.setState({activeTab : '2'})}}>
                                Analytics
                            </NavLink>
                        </NavItem>

                        {/* Order */}
                        <NavItem>
                            <NavLink 
                            className={classnames({ active : this.state.activeTab === '3'})}
                            onClick={() => {this.setState({activeTab : '3'})}}>
                                Orders
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <ManageProducts/>
                        </TabPane>
                        <TabPane tabId="2">
                        </TabPane>
                        <TabPane tabId="3">
                            <Transactions/>
                        </TabPane>
                    </TabContent>
                </div>
            )
        }

        else {
            return (
                <div className="mx-5 mb-5" style={{paddingLeft: '15px', paddingRight: '15px', borderTop: '2px solid #1a1a1a'}}>
                    <div className="row">
                        <div className="col-3 py-2 px-0 text-center" style={{backgroundColor: '#EEEEEE', height: '150px'}}>
                            <div style={{backgroundColor: this.state.activeTab === '2' ? 'white' : ''}}>
                                <h5 className="p-2 m-0" style={{cursor: 'pointer'}} onClick={() => this.setState({activeTab: '2'})}>Account Information</h5>
                            </div>
                            <div style={{backgroundColor: this.state.activeTab === '3' ? 'white' : ''}}>
                                <h5 className="p-2 m-0" style={{cursor: 'pointer'}} onClick={() => this.setState({activeTab: '3'})}>Shipping Address</h5>
                            </div>
                            <div style={{backgroundColor: this.state.activeTab === '4' ? 'white' : ''}}>
                                <h5 className="p-2 m-0" style={{cursor: 'pointer'}} onClick={() => this.setState({activeTab: '4'})}>Order History</h5>
                            </div>
                        </div>
                        {this.renderAccountInfo()}
                    </div>
                </div>
            )
        }
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

export default connect(mapStateToProps)(Dashboard)

// key pada baris ke 74 menggunakan nilai id dari masing2 product
// product = {name, description, price, picture, id} / product.id

/*
    life cycle method

 1. componentWillMount()
 2. render()
 3. componentDidMount()
 4. render() (ini disebabkan karena kita jalankan this.setState)
*/

// setiap kita running this.setState()
// ini akan men-trigger function render() untuk running ulang (re-render)

/*
    Memberikan function ke onClick

    1. Function tidak menerima argument
        Langsung tuliskan nama function tersebut didalam kurung kurawang onClick

        contoh:
            onClick = {this.somethingToDo}


    2. Function yang menerima argument
        Masukkan terlebih dahulu ke onClick sebuah anonymous function () => {}
        Baru masukkan function yg ingin kita panggil didalam anonymous funcion tsb

        contoh:
            onClick = { () => { this.somethingToDo(23) } }
*/