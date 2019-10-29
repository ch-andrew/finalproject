import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import './main.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
    

import {connect} from 'react-redux'

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import Modal from '@material-ui/core/Modal';
    
class Header extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
      // jika belum ada yg login
      if(!this.props.user_name){
        return (
          <div className="fixed-top" style={{fontFamily:"Roboto"}}>
  
            <Navbar style={{backgroundColor:"black"}}>
              <Nav className="mx-auto">
                <NavItem style={{color:"white", fontSize:"12px" , fontFamily:"Open Sans"}}>Free Worldwide Shipping On Apparel Over $75.
                <Link to="/" style={{color:"white", fontWeight:"bold"}}>Learn more.</Link>
                </NavItem>
              </Nav>
            </Navbar>

            <Navbar color="white" light expand="md">
                <div style={{width:"50px"}}>
                  <Link className="navbar-brand" to="/"><img src="image/omega_logo.png" alt="omega" style={{width:"50px"}}/></Link>
                </div>

                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="mx-auto" navbar style={{fontSize:"1.2em", fontWeight:"bold"}}>
                    <NavItem>
                      <NavLink className="nav-link mr-4" style={{color: "black"}} to="/shop/all">All Products</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link mx-4" style={{color: "black"}} to="/shop/men">Men</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link mx-4" style={{color: "black"}} to="/shop/women">Women</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link ml-4" style={{color: "black"}} to="/">Outlet</NavLink>
                    </NavItem>
                  </Nav>
                  
                  <div style={{marginRight: "-1rem", marginLeft: "1rem", width:"50px"}}>
                    <Link className="navbar-brand right" style={{color: "black"}} to='/login'><AccountBoxIcon style={{fontSize: "36px"}}/></Link>
                  </div>

                </Collapse>
            </Navbar>
          </div>
        );
      } else {
        return (
          <div style={{fontFamily:"Roboto"}}>
            {/* <Navbar style={{backgroundColor:"black"}}>
              <Nav>
                <NavItem>Free Shipping Worldwide</NavItem>
              </Nav>
            </Navbar> */}
            <Navbar color="white" light expand="md">
              <Link className="navbar-brand" to="/"><img src="image/omega_logo.png" alt="omega" style={{width:"50px"}}/></Link>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mx-auto" navbar style={{fontSize:"1.2em"}}>
                  <NavItem>
                    <NavLink className="nav-link mx-4" to="/shop/all">All Products</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link mx-4" to="/shop/men">Men</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link mx-4" to="/shop/women">Women</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link mx-4" to="/">Sale</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link mx-4" to="/">Outlet</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link mx-4" to="/">Contact</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link mx-4" to="/cart"><ShoppingCartIcon/>Cart</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar className="text-center">
                  <DropdownToggle nav caret>
                    <AccountBoxIcon/>
                    <b>Hello {this.props.user_name}</b>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <NavLink className="nav-link" to="/manageproducts">Dashboard</NavLink>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                    <NavLink className="nav-link" onClick={this.props.onLogoutUser}>Log Out</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
      }
        
    }
}

// function untuk mengambil data di redux state
const mapStateToProps = (state) => {
  return {
      id : state.user.id,
      email : state.user.email,
      firstName : state.user.firstName,
      lastName : state.user.lastName,
      isLoading : state.user.loading,
      success : state.user.success,
      error : state.user.error,
  }
}
export default connect(mapStateToProps)(Header)