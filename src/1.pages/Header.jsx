import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import './main.css'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem 
  } from 'reactstrap';
    

import {connect} from 'react-redux'


import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import Modal from '@material-ui/core/Modal';
    
class Header extends Component {

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this)
        this.state = {
          isOpen: false,
          dropdownOpen: false,
          selectedRegion: 'Indonesia'
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
  
      toggleDropdown() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        })
      }

    // changeRegion = () => {

    //   let region = this.state.selectedRegion

    //   return (dispatch) => {
    //     dispatch({
    //         type: 'SET_REGION',
    //         region
    //     })
    // }
    // }
    componentDidMount(){
        this.props.changeRegion(this.state.selectedRegion)
    }

    render() {
      // jika belum ada yg login
      if(!this.props.email){
        return (
          <div className="fixed-top border-bottom border-dark" style={{fontFamily:"Roboto"}}>
  
            <Navbar style={{backgroundColor:"black"}}>
              <Nav>
                <NavItem className="text-center" style={{color:"white", fontSize:"12px" , fontFamily:"Open Sans"}}>Free Worldwide Shipping On Apparel Over $75.
                  <Link to="/" style={{color:"white", fontWeight:"bold"}}>Learn more.</Link>
                </NavItem>

                <NavItem style={{color:"white", fontSize:"12px" , fontFamily:"Open Sans"}}>
                    <Dropdown nav inNavbar isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                      <DropdownToggle nav style={{border: 'none', backgroundColor: 'black', margin: 0, padding: 0}}>
                        Region : {this.props.region}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem defaultValue="Indonesia" className={this.props.region ==='Indonesia' ? 'active' : ''} 
                        onClick={e => this.props.changeRegion(e.target.innerHTML)}>
                          Indonesia                         
                        </DropdownItem>
                        <DropdownItem className={this.props.region ==='Malaysia' ? 'active' : ''}
                        onClick={e => this.props.changeRegion(e.target.innerHTML)}>
                          Malaysia                            
                        </DropdownItem>
                        <DropdownItem className={this.props.region ==='Singapore' ? 'active' : ''}
                        onClick={e => this.props.changeRegion(e.target.innerHTML)}>
                          Singapore                           
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
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

                  <div style={{marginRight: "-1rem", marginLeft: "1rem", width:"50px"}}>
                    <Link className="navbar-brand right" style={{color: "black"}} to='/login'><ShoppingCartIcon style={{fontSize: "36px"}}/></Link>
                  </div>


                </Collapse>
            </Navbar>
          </div>
        );
      } else if (this.props.account === 'admin'){
        return (
          <div className="fixed-top border-bottom border-dark" style={{fontFamily:"Roboto"}}>
  
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
                      <Link className="navbar-brand right" style={{color: "black"}} to='/admin'><AccountBoxIcon active style={{fontSize: "36px"}}/></Link>
                  </div>

                </Collapse>
            </Navbar>
          </div>
        );
      }
      else{
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
                      <Link className="navbar-brand right" style={{color: "black"}} to='/login'><AccountBoxIcon active style={{fontSize: "36px"}}/></Link>
                  </div>
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
      account : state.user.account,
      region : state.locale.region
  }
}

const changeRegion = (region) => {

  return (dispatch) => {
    dispatch({
        type: 'SET_REGION',
        region
    })
}
}

export default connect(mapStateToProps, {changeRegion})(Header)