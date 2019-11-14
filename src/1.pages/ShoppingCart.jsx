import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'
// import {Redirect} from 'react-router-dom'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { getCartLength } from '../redux/actions'
import Axios from 'axios'
import Footer from './Footer'

class ShoppingCart extends Component {

    
    state = {
        products: [],
        selectedId: 0,
        selectedName: '',
        selectedDesc: '',
        selectedPrice: '',
        selectedPict: '',
        remove: '',
        subtotal: {},
        check: false,
    }

    componentDidMount() {
        // Ambil (GET) semua products data dari database
        this.getData()
        this.getPricing()
    }

    getPricing = () => {
        Axios.get(`http://localhost:2077/cart/subtotal`, 
            {
                params: {
                    userId: this.props.id
                }
            }).then(res => {
                this.setState({subtotal : res.data.subtotal[0]})
                // console.log(this.state.subtotal);
                
                
            }).catch(err => {
                console.log(err);
            })
    }

    getData = () => {
        Axios.get(
            'http://localhost:2077/cart/data', {
                params: {
                    userId: this.props.id
          
                  }
          
            }

        ).then((res) => {
            console.log(res.data.cart);
            
            this.setState({
                products : res.data.cart,
                check:true
            })

            console.log(this.state.products)


        }).catch((err)=>{
            console.log(err)

        })
    }
    
    plusHandler = (id) => {
        
        let result = this.state.products.find(product => product.cartId === id)

        this.renderPricing()
        
        if(result.quantity < 12){
            let add = result.quantity += 1
            this.setState({...this.state.products, quantity: add }) 
        }

        else{}

    }

    minusHandler = (id) => {

        let result = this.state.products.find(product => product.cartId === id)

        if(result.quantity > 0){
            let minus = result.quantity -= 1
            this.setState({...this.state.products, quantity: minus })
        }

        else {}
        
        console.log(result.quantity);
        
    }

    removeItem = (id) => {
        Axios.post(`http://localhost:2077/cart/remove` , 
        {
            cartId : id
        }).then(res => {
            console.log(res.data)
            this.getData()
        }).catch(err => {
            console.log(err)
        })
    }

    onSave = (id , qty) => {
        Axios.put(`http://localhost:2077/cart/changequantity` , {
            cartId : id,
            quantity: qty
        }).then(res => {
            this.getPricing()
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
        })
    }

    renderPricing = () => {

        let tax = {}

        let shippingIDR = 15000
        let shippingMYR = 25.00
        let shippingSGD = 25.00

        let renderSubTotal = () => {
            if(this.state.subtotal){
                if(this.props.region === "Indonesia"){
                    let subTotalIDR = this.state.subtotal.TotalIDR
                    return(
                        <h5>Subtotal Rp.{subTotalIDR}</h5>
                    )
                }
                else if(this.props.region === "Malaysia"){
                    let subTotalMYR = 0
                    return(
                        <h5>Subtotal RM{subTotalMYR}</h5>
                    )
                }
                else if (this.props.region === "Singapore"){
                    let subTotalSGD = 0
                    return(
                        <h5>Subtotal S${subTotalSGD}</h5>
                    )
                }
                else{}
            }
        }

        let renderShipping = () => {
            if(this.props.region === "Indonesia"){
                return(
                    <div>
                        <h5>Shipping (estimated) Rp.{shippingIDR.toLocaleString('en')}</h5>
                    </div>
                )
            }
            else if (this.props.region === "Malaysia"){
                return (
                    <div>
                        <h5>Shipping (estimated) RM{shippingMYR}</h5>
                    </div>
                )
            }
            else if (this.props.region === "Singapore"){
                return (
                    <div>
                        <h5>Shipping (estimated) S${shippingSGD}</h5>
                    </div>
                )
            }

            else {}
        }

        let renderTax = () => {
            if(this.props.region === "Indonesia"){
                tax = {IDR : this.state.subtotal.TotalIDR / 100}
                return(
                    <h5>Subtotal Rp.{tax.IDR.toLocaleString('en')}</h5>
                )
            }
            else if(this.props.region === "Malaysia"){
                tax = {MYR : this.state.subtotal.TotalMYR / 100}
                return(
                    <h5>Subtotal RM{tax.MYR.toFixed(2)}</h5>
                )
            }
            else if (this.props.region === "Singapore"){
                tax = {SGD : this.state.subtotal.TotalSGD / 100}
                return(
                    <h5>Subtotal S${tax.SGD.toFixed(2)}</h5>
                )
            }
            else{}
        }

        let renderTotal = () => {
            let totalIDR = this.state.subtotal.TotalIDR + (this.state.subtotal.TotalIDR / 100) + shippingIDR
            let totalMYR = this.state.subtotal.TotalMYR + (this.state.subtotal.TotalMYR / 100)
            let totalSGD = this.state.subtotal.TotalSGD + (this.state.subtotal.TotalSGD / 100)
            if(this.props.region === "Indonesia"){
                return(
                    <h4>Order Total Rp.{totalIDR.toLocaleString('en')}</h4>
                )
            }
            else if (this.props.region === "Malaysia"){
                return (
                    <h4>Order Total RM{totalMYR}</h4>
                )
            }
            else if (this.props.region === "Singapore"){
                return (
                    <h4>Order Total S${totalSGD}</h4>
                )
            }
            else {}
        }

        let onClickCheckout = () => {

            let totalIDR = this.state.subtotal.TotalIDR + (this.state.subtotal.TotalIDR / 100) + shippingIDR
            let totalMYR = this.state.subtotal.TotalMYR + (this.state.subtotal.TotalMYR / 100) + shippingMYR
            let totalSGD = this.state.subtotal.TotalSGD + (this.state.subtotal.TotalSGD / 100) + shippingSGD

            if(this.props.region === 'Indonesia'){
                Swal.fire({
                    title: 'Do you wish to proceed with checkout?',
                    html: `<div>Number of items : ${this.props.cartLength} <br/>Total payment for this order : Rp.${totalIDR.toLocaleString('en')}</div>`,
                    icon: 'warning',
                    width: 600,
                    showCancelButton: true,
                    confirmButtonColor: '#007BFF',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Proceed'
                  }).then((result) => {
                    if (result.value) {
                        let currency
                        if(this.props.region === 'Indonesia'){
                            currency = 'IDR'
                        }
                        else if(this.props.region === 'Malaysia'){
                            currency = 'MYR'
                        }
                        else{
                            currency = 'SGD'
                        }

                        Axios.post(`http://localhost:2077/transaction/checkout`, {
                            userId : this.props.id,
                            quantity: this.props.cartLength,
                            currency: currency,
                            total: totalIDR
                        }).then(res => {
                            window.location.href = `/transaction/${this.props.id}`;
                        }).catch(err => {
                            console.log(err);
                        })
                    }
                })
            }

            else if (this.props.region === 'Malaysia'){
                Swal.fire({
                    title: 'Are you sure?',
                    text: `Total : ${totalMYR.toLocaleString('en')}`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.value) {
                      Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                    }
                })
            }

            else if (this.props.region === 'Singapore'){
                Swal.fire({
                    title: 'Are you sure?',
                    text: `Total : ${totalSGD.toLocaleString('en')}`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                  }).then((result) => {
                    if (result.value) {
                      Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                    }
                })
            }

            else{}
    
        }


        return (
            <div className='mt-3 py-2 p-0 row' style={{border: '2px solid #1a1a1a', height: '250px'}}>
                <div className='col-12 my-3' style={{borderBottom: '2px solid #1a1a1a'}}>
                    {renderSubTotal()}
                    {renderShipping()}
                    {renderTax()}
                </div>
                <div className='col-12 mb-3'>
                    {renderTotal()}
                    <button className='btn btn-block btn-primary' onClick={onClickCheckout}>
                        Checkout
                    </button>
                </div>
            </div>
        )
    }
    
    
    renderList = () => {   

        return this.state.products.map((product) => {   

            let notification = () => {
                if(product.quantity === 12){
                    return(
                        <div class="m-0" style={{backgroundColor: '#FFF3CD', color: '#85644D'}} role="alert">
                            Maximum purchase quantity for this product has been reached. (Max : 12)
                        </div>
                    )
                }

                else if (product.quantity === 0){
                    return (
                        <div class="m-0" style={{backgroundColor: '#FFF3CD', color: '#85644D'}} role="alert">
                            Quantity for this product is empty.
                            <br/>Do you wish to
                            <span className='link-remove text-right' onClick={() => this.removeItem(product.cartId)} style={{cursor:'pointer'}}> remove this product</span> from your cart?
                        </div>

                    )
                }

                else {
                    return (
                        <div class="m-0">
                        </div>
                    )
                }
            }
         
            return(
                <div className='mt-3 m-0 p-0 row' style={{border: '2px solid #1a1a1a', backgroundColor: '#EEEEEE', height: '250px'}}>
                    <div className='col-4 p-0 m-auto text-center'>
                        <img src={product.image} alt={product.variantId} style={{width: '200px'}}/>
                    </div>
                    <div className='col-8 p-2' style={{borderLeft: '2px solid #1a1a1a', backgroundColor: 'white'}}>
                        <h4><Link to={`/shop/product/${product.category.toLowerCase()}/${product.gender.toLowerCase()}/${product.id}`}>{product.name}</Link></h4>
                        <h5 className='mb-0'>{product.gender}'s {product.category.toLowerCase().substring(0, product.category.length - 1)}</h5>
                        <h5 className='mb-0'>Size : {product.size}</h5>
                        <h5 className='mb-0'>Color : {product.color}</h5>
                        <h5 className='mb-0'>Quantity :</h5>
                        <h5 style={{marginBottom: '0.5rem', marginTop: '0.5rem'}}>
                            <RemoveIcon className="mr-3" style={{backgroundColor: '#1a1a1a', color: 'white', cursor: 'pointer'}}
                            onClick={() => this.minusHandler(product.cartId)}/>
                            {product.quantity}
                            <AddIcon className="ml-3" style={{backgroundColor: '#1a1a1a', color: 'white', cursor: 'pointer'}}
                            onClick={() => this.plusHandler(product.cartId)}/>
                            </h5>
                            <button className="btn btn-primary mr-3" onClick={() => this.onSave(product.cartId , product.quantity)}>
                                Save
                            </button>
                            {notification()}
                    </div>
                </div>
            )
        })
    }

    render() {
        // Jika sudah login
        if(this.state.check){
            if(this.props.email && this.state.subtotal && this.state.products.length > 0){
                return (
                    <div>
                    <div className='container' style={{fontFamily : 'Roboto'}}>
                    {/* RENDERING LIST DATA */}
                        <div className="row">
                            <h1 className='col-12 text-center'>{this.props.cartLength > 1 ? `You have ${this.props.cartLength} items in your cart:` : `You have ${this.props.cartLength} item in your cart:`}</h1>
                            <div className='col-8'>

                            {this.renderList()}
                            </div>
                            <div className='col-4'>

                            {this.renderPricing()}
                            </div>
                        </div>
                    </div>
                        <Footer/>
                    </div>
                )
            }

            else {
                return(
                    <div className='container' style={{fontFamily : 'Roboto'}}>
                        <div className="row">
                            <div className="col text-center">
                                <h1>
                                    You have no items in your cart.
                                </h1>
                                <button className='btn btn-primary' onClick={() => window.location.href="/shop/all"}>
                                    Start Shopping Now
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            
        }

        
        return <p>Loading</p>
    
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
  
export default connect(mapStateToProps, {getCartLength})(ShoppingCart)
