import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getCartLength} from '../redux/actions/cartActions'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Swal from 'sweetalert2'





class ProductDetail extends Component {
    

    state = {
        product: null,
        variants: null,
        selectedId : 0,
        selectedSize: "S",
        selectedColor: '',
        selectedQty: 1,
        price: null

    }

    componentDidMount() {
        this.getData()
        this.getPriceList()
    }

    getData = () => {
        axios.get(
            `http://localhost:2077/products/detail/${this.props.match.params.id}` 

        ).then(res => {
            // res.data = {id, name, price, description, picture}
            this.setState({
                product: res.data.product,
                variants: res.data.variants,
                selectedColor: res.data.variants[0].color,
                selectedId: res.data.variants[0].variantId
            })
            
        }).catch(err => {
            console.log(err);
            
        })
    }

    getPriceList = () => {
        axios.get(
            `http://localhost:2077/products/price/${this.props.match.params.id}`
        ).then(res => {

            this.setState({
                price: res.data.price
            })

        }).catch(err => {
            console.log(err);
            
        })
    }

    checkCart = () => {
        axios.get(`http://localhost:2077/cart/data`,
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

    renderImage = () => {
        if(this.state.variants){
            let result = this.state.variants.find(variant => variant.color === this.state.selectedColor)
            
            return(
                <div>
                    <img className='img-fluid' src={result.image} alt={this.state.selectedColor}/>
                </div>
            )
        
        }
        else {
            return (
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }
        
    }

    renderColor = () => {
        if(this.state.variants){
            // console.log(this.state.variants);
            return this.state.variants.map((variants) => {
                return (
                    <div className='col-2'>
                        <button class="btn btn-circle btn-circle-sm mr-1" 
                        style={{backgroundColor: `${variants.colorCodes}`, border: '2px solid #283133'
                        }}
                        onClick={() => this.setState({selectedColor: variants.color, selectedId: variants.variantId})}></button>
                    </div>
                )
            })
        }
        
        else {
            return (
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }
    }

    renderQuantity = () => {   
        if(this.state.variants){

            let inputQty = this.state.selectedQty
            
            return (
                <div className='col'>
                    <h5 className="mb-1">Quantity</h5>
                        <RemoveIcon style={{backgroundColor: '#1a1a1a', color: 'white', cursor: 'pointer'}} onClick={() => this.setState({selectedQty: inputQty - 1})}/>
                        <span className="mx-3 text-muted">{this.state.selectedQty}</span>
                        <AddIcon style={{backgroundColor: '#1a1a1a', color: 'white', cursor: 'pointer'}} onClick={() => this.setState({selectedQty: inputQty + 1})}/>
                </div>
            )
        }

        else {
            return
        }
    }

    renderPrice = () => {
        if(this.state.price){

            let IDR = this.state.price[0].IDR
            let MYR = this.state.price[0].MYR
            let SGD = this.state.price[0].SGD
    
            if(this.props.region === 'Indonesia'){
                if(this.state.selectedQty){
                    IDR = IDR * this.state.selectedQty

                    return(
                        <p className='card-title' style={{fontSize: '1.2rem'}}>Rp.{IDR}</p>
                    )
                }
                else {
                    return(
                        <p className='card-title' style={{fontSize: '1.2rem'}}>--.--</p>
                    )
                }
            }
    
            else if (this.props.region === 'Malaysia'){
                if(this.state.selectedQty){
                    MYR = MYR * this.state.selectedQty

                    MYR = MYR.toFixed(2)

                    return(
                        <p className='card-title' style={{fontSize: '1.2rem'}}>RM{MYR}</p>
                    )
                }
                else {
                    return(
                        <p className='card-title' style={{fontSize: '1.2rem'}}>--.--</p>
                    )
                }
            }
    
            else {
                if(this.state.selectedQty){
                    SGD = SGD * this.state.selectedQty

                    SGD = SGD.toFixed(2)

                    return(
                        <p className='card-title' style={{fontSize: '1rem'}}>S${SGD}</p>
                    )
                }
                else {
                    return(
                        <p className='card-title' style={{fontSize: '1rem'}}>--.--</p>
                    )
                }
            }
        }

        else {
            return null
        }
    }

    renderAddtoCart = () => {
        if(this.state.variants){
            return (
                <div className='col'>
                    {this.renderPrice()}
                    <button className="btn btn-block text-center" 
                    style={{backgroundColor: '#007BFF', color: 'white'}}
                    onClick={() => this.onAddtoCart()}>
                        <ShoppingCartIcon className="mr-1"/>
                        Add to Cart
                    </button>
                </div>
            )
        }

        else {
            return null
        }
    }

    onAddtoCart = () => {

        let data_userId = this.props.id
        let data_variantId = this.state.selectedId
        let data_pricesId = this.state.price[0].pricesId
        let data_quantity = this.state.selectedQty
        let data_size = this.state.selectedSize

        console.log(this.state.variants);
        console.log(this.state.selectedId);
        console.log(this.state.selectedSize);
        

        axios.get(`http://localhost:2077/cart/data`,
        {
            params: {
            userId: this.props.id
            }

        }).then((res) => {
            console.log(res.data.cart);
            // CHECK IF ITEM ALREADY EXIST IN CART
            let addedItems = []
            res.data.cart.map((item) => {
                if(item.variantId === data_variantId && item.size === data_size){
                    addedItems.push(item)
                }

                return null
            }) 
            console.log(addedItems);
            
            // ALREADY EXIST = ADD QUANTITY
            if(addedItems.length > 0){
                let addedItem = addedItems[0]
                axios.put(`http://localhost:2077/cart/addquantity` , 
                {
                    quantity: this.state.selectedQty,
                    variantId: addedItem.variantId,
                    size: addedItem.size

                }).then((res) => {
                    console.log(res);
                    
                }).catch((err) => {
                    console.log(err);
                    
                })
            }

            // IF NOT = ADD ITEM 
            else {
                axios.post(`http://localhost:2077/cart/addtocart`, 
                {
                    userId : data_userId,
                    variantId: data_variantId,
                    pricesId: data_pricesId,
                    quantity: data_quantity,
                    size: data_size

                }
                ).then((res)=> {
                    console.log(res.data.success);
                    
                }).catch((err) => {
                    console.log(err);
                    
                })

                console.log(this.state.selectedId);
            }

            Swal.fire({
                position: 'top',
                icon: 'success',
                title: `${this.state.selectedQty} items has been added to your cart`,
                showClass: {
                    popup: 'animated bounceInDown faster'
                  },
                  hideClass: {
                    popup: 'animated bounceInUp faster'
                  },
                showConfirmButton: false,
                timer: 1000
            })
            this.checkCart()

            
        }).catch((err) => {
            console.log(err);
        })
    }

    checkCart = () => {
        axios.get(`http://localhost:2077/cart/data`,
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

    renderCard = () => {
        if(this.state.variants){
            this.renderImage()
            console.log(this.state.variants);
            return (
                <div className='container-fluid p-0' style={{border: '2px solid #1a1a1a', backgroundColor: '#1F2527'}}>

                    <div className='text-center m-0 py-3' style={{color: 'white'}}>
                        <h4 className='mb-3'>{this.state.product[0].name}</h4>
                        <p className='m-0'>{this.state.product[0].description}</p>
                    </div>

                    <div className='row' style={{height: '100%' , marginRight:0, marginLeft:0, width: '100%'}}>

                        <div className='col-8 p-0' style={{backgroundColor: '#EEEEEE'}}>
                            {this.renderImage()}
                        </div>

                        <div className='col-4 p-0' style={{backgroundColor:"#DDDDDD"}}>
                            <div className="m-3" style={{color: 'black'}}>
                                <h5>Size</h5>

                                <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                                    <div className="btn-group" role="group" aria-label="First group">
                                        <button type="button" className="btn btn-light" 
                                        style={{backgroundColor: this.state.selectedSize === "S" ? '#1a1a1a' : 'white', 
                                                color: this.state.selectedSize === "S" ? 'white' : '#1a1a1a' }}
                                        onClick={() => this.setState({selectedSize: "S"})}>S</button>
                                        <button type="button" className="btn btn-light"
                                        style={{backgroundColor: this.state.selectedSize === "M" ? '#1a1a1a' : 'white',
                                                color: this.state.selectedSize === "M" ? 'white' : '#1a1a1a' }}
                                        onClick={() => this.setState({selectedSize: "M"})}
                                        >M</button>
                                        <button type="button" className="btn btn-light"
                                        style={{backgroundColor: this.state.selectedSize === "L" ? '#1a1a1a' : 'white', 
                                                color: this.state.selectedSize === "L" ? 'white' : '#1a1a1a'}}
                                        onClick={() => this.setState({selectedSize: "L"})}
                                        >L</button>
                                        <button type="button" className="btn btn-light"
                                        style={{backgroundColor: this.state.selectedSize === "XL" ? '#1a1a1a' : 'white',
                                                color: this.state.selectedSize === "XL" ? 'white' : '#1a1a1a'}}
                                        onClick={() => this.setState({selectedSize: "XL"})}
                                        >XL</button>
                                    </div>
                                </div>
                                
                                <h5 className="mb-1">Color</h5>
                                <h5 className="text-muted mb-1 font-italic" style={{fontSize: '16px'}}>{this.state.selectedColor}</h5>

                                <div className="row mb-3">
                                    {this.renderColor()}
                                </div>

                                <div className="row mb-3">
                                    {this.renderQuantity()}
                                </div>

                                <h5 className="mb-1">Price</h5>
                                <div className="row mb-3">
                                    {this.renderAddtoCart()}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            )
        }

        else{
            return (
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }
    }

    render(){

        // Ketika product bukan null
        if(this.state.product){
            return (
                <div className='col-8 my-5 mx-auto'>
                    {this.renderCard()}
                </div>
            )
        } else {
            return (
            <div className='text-center'>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
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
        account : state.user.account,
        region : state.locale.region,
    }
}

export default connect(mapStateToProps, {getCartLength})(ProductDetail)