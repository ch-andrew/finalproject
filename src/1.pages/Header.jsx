import React, { Component } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { getCartLength } from '../redux/actions'
import { onLogOut } from '../redux/actions/userActions'
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
    

import Badge from '@material-ui/core/Badge';
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
          selectedRegion: 'Indonesia',
          selectedNav: ''
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

    componentDidMount(){
      this.props.changeRegion(this.state.selectedRegion)
    }
    
    componentDidUpdate(){
      this.checkCart()

    }

    checkCart = () => {
      Axios.get(`http://localhost:2077/cart/data`,
      {
        params: {
          userId: this.props.id

        }

      }).then((res) => {
          let arrCart = res.data.cart.map((item) => {return item.quantity} )
          let totalQuantity = arrCart.reduce((a,b) => a + b, 0)

          console.log(totalQuantity);
          this.props.getCartLength(totalQuantity)
          
          
          
      }).catch((err) => {
          console.log(err);
          
      })
    }
    
    render() {
      // jika belum ada yg login
      if(!this.props.email){
        return (
          <div className="fixed-top border-bottom border-dark" style={{fontFamily:"Roboto"}}>

            <Navbar style={{backgroundColor:"black"}}>
              <Nav className="mx-auto">
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
                  <Link className="navbar-brand" to="/"><img src="image/CIMO.png" alt="cimo" style={{width:"50px"}}/></Link>
                </div>

                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="mx-auto" navbar style={{fontSize:"1.2em", fontWeight:"bold"}}>
                    <NavItem>
                      <Link className="nav-link mx-4" style={{color : this.state.selectedNav === 'All' ? '#007BFF' : 'black'}} to="/shop/All"
                            onClick={() => this.setState({selectedNav: 'All'})}>All Products
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link className="nav-link mx-4" style={{color : this.state.selectedNav === 'Men' ? '#007BFF' : 'black'}} to="/shop/men"
                            onClick={() => this.setState({selectedNav: 'Men'})}>Men
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link className="nav-link mx-4" style={{color : this.state.selectedNav === 'Women' ? '#007BFF' : 'black'}} to="/shop/women"
                            onClick={() => this.setState({selectedNav: 'Women'})}>Women
                      </Link>
                    </NavItem>
                  </Nav>
                  

                  <div style={{marginRight: "-1rem", marginLeft: "1rem", width:"50px"}}>
                    <Link className="navbar-brand right" style={{color: "black"}} to='/login'><AccountBoxIcon style={{fontSize: "36px"}}/></Link>
                  </div>
                </Collapse>
            </Navbar>
          </div>
        );
      } else if (this.props.account === 'admin'){
        return (
          <div className="fixed-top border-bottom border-dark" style={{fontFamily:"Roboto"}}>
  
            <Navbar style={{backgroundColor:"black"}}>
              <Nav className="ml-auto">
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
                <NavItem style={{color:"white", fontSize:"12px" , fontFamily:"Open Sans", marginLeft: "750px"}}>
                    <b style={{cursor: 'pointer'}} onClick={this.props.onLogOut}>Logout</b>
                </NavItem>
              </Nav>
            </Navbar>

            <Navbar color="white" light expand="md">
                <div style={{width:"50px"}}>
                  <Link className="navbar-brand" to="/"><img src="image/CIMO.png" alt="cimo" style={{width:"50px"}}/></Link>
                </div>

                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="mx-auto" navbar style={{fontSize:"1.2em", fontWeight:"bold"}}>
                  <NavItem>
                      <Link className="nav-link mx-4" style={{color : this.state.selectedNav === 'All' ? '#007BFF' : 'black'}} to="/shop/All"
                            onClick={() => this.setState({selectedNav: 'All'})}>All Products
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link className="nav-link mx-4" style={{color : this.state.selectedNav === 'Men' ? '#007BFF' : 'black'}} to="/shop/men"
                            onClick={() => this.setState({selectedNav: 'Men'})}>Men
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link className="nav-link mx-4" style={{color : this.state.selectedNav === 'Women' ? '#007BFF' : 'black'}} to="/shop/women"
                            onClick={() => this.setState({selectedNav: 'Women'})}>Women
                      </Link>
                    </NavItem>
                  </Nav>
                  
                  <div style={{marginRight: "-1rem", marginLeft: "1rem", width:"50px"}}>
                    <Badge badgeContent={this.props.cartLength} color="primary">
                      <Link className="navbar-brand right" style={{color: "black"}} to='/shoppingcart'>
                        <ShoppingCartIcon style={{fontSize: "36px"}}/>
                      </Link>
                    </Badge>
                  </div>
                  
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
          <div className="fixed-top border-bottom border-dark" style={{fontFamily:"Roboto"}}>
  
            <Navbar style={{backgroundColor:"black"}}>
              <Nav className="ml-auto">
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
                <NavItem style={{color:"white", fontSize:"12px" , fontFamily:"Open Sans", marginLeft: "750px"}}>
                    <b style={{cursor: 'pointer'}} onClick={this.props.onLogOut}>Logout</b>
                </NavItem>
              </Nav>
            </Navbar>

            <Navbar color="white" light expand="md">
                <div style={{width:"50px"}}>
                  <Link className="navbar-brand" to="/"><img src="image/CIMO.png" alt="cimo" style={{width:"50px"}}/></Link>
                </div>

                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="mx-auto" navbar style={{fontSize:"1.2em", fontWeight:"bold"}}>
                  <NavItem>
                      <Link className="nav-link mx-4" style={{color : this.state.selectedNav === 'All' ? '#007BFF' : 'black'}} to="/shop/All"
                            onClick={() => this.setState({selectedNav: 'All'})}>All Products
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link className="nav-link mx-4" style={{color : this.state.selectedNav === 'Men' ? '#007BFF' : 'black'}} to="/shop/men"
                            onClick={() => this.setState({selectedNav: 'Men'})}>Men
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link className="nav-link mx-4" style={{color : this.state.selectedNav === 'Women' ? '#007BFF' : 'black'}} to="/shop/women"
                            onClick={() => this.setState({selectedNav: 'Women'})}>Women
                      </Link>
                    </NavItem>
                  </Nav>
                  
                  <div style={{marginRight: "-1rem", marginLeft: "1rem", width:"50px"}}>
                    <Badge badgeContent={this.props.cartLength} color="primary">
                      <Link className="navbar-brand right" style={{color: "black"}} to='/shoppingcart'>
                        <ShoppingCartIcon style={{fontSize: "36px"}}/>
                      </Link>
                    </Badge>
                  </div>

                  <div style={{marginRight: "-1rem", marginLeft: "1rem", width:"50px"}}>
                      <Link className="navbar-brand right" style={{color: "black"}} to='/my-account'><AccountBoxIcon active style={{fontSize: "36px"}}/></Link>
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

      region : state.locale.region,

      cartLength : state.cart.cartLength
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

export default connect(mapStateToProps, {changeRegion, getCartLength, onLogOut})(Header)