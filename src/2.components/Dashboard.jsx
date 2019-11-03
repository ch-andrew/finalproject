import React, { Component } from 'react'
// import axios from 'axios'
import {connect} from 'react-redux'
// import Swal from 'sweetalert2'
// import {Redirect} from 'react-router-dom'
import { TabContent, TabPane, Nav, NavItem, NavLink}from 'reactstrap';
import classnames from 'classnames';
import ManageProducts from './ManageProducts'

class Dashboard extends Component {

    state = {
        activeTab: '1',
    }

    // toggle = (tab) => {
    //     if(this.state.activeTab !== tab){
    //         this.setState({activeTab: tab})
    //     }
    // }

    render() {

        // /admin
        
        if(this.props.account === 'admin'){
            return (
                <div className="container my-5 border border-dark">
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
                            ORDER
                        </TabPane>
                    </TabContent>
                </div>
            )
        }

        else {
            return (
                <div>
                    Profile Dashboard
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