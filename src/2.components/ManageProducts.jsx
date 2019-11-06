import React, { Component } from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'
import {Redirect} from 'react-router-dom'
// import ProductItem from '../1.pages/ProductItem'
import {Table} from 'reactstrap'


class ManageProducts extends Component {

    state = {
        products: [],
        selectedId: 0,
        selectedName: '',
        selectedDesc: '',
        selectedCategory:'',
        selectedGender:'',
        selectedPrice: {
            IDR: '',
            MYR:'',
            SGD:'',
        },
        selectedPict: '',
        nameOption: [],
        catOption: [],
        genderOption: [],
        // Input Product
        inputId: '',
        inputCategory: '',
        inputGender: '',
        inputProduct: 'Default' ,
        inputColorCodes:'',
    }

    // KETIGA
    // Akan Running setelah function render() dijalankan
    componentDidMount() {
        // Ambil (GET) semua products data dari database
        this.getData()
        this.getExistingProduct()
        
    }

    // Mengambil (GET) data dari database
    getData = () => {
        Axios.get(
            'http://localhost:2077/products/list'

        ).then((res) => {
            // Di taruh di state.data
            
            this.setState(
                {
                    products: res.data.products,
                    selectedId: 0,
                    selectedProduct: res.data.products[0].name
                }
            )
        }).catch((err)=>{
            console.log(err)

        })
    }

    getExistingProduct = () => {
        Axios.get(
            'http://localhost:2077/products/names'
        ).then((res) => {
            
            this.setState({nameOption : res.data.existingProducts})
            
            Axios.get(
                'http://localhost:2077/products/options'
            ).then((res) => {
                this.setState({
                    catOption : res.data.categories,
                    inputCategory: res.data.categories[0].name,
                    genderOption : res.data.genders,
                    inputGender: res.data.genders[0].gender,
                    inputProduct: 'Default',

                })
            }).catch((err) => {
                console.log(err);
                
            })
            
        }).catch((err) => {
            console.log(err)  
        })
    }

    renderCategoryOption = () => {
        console.log(this.state.inputColorCodes);
        let jsx = this.state.catOption.map(val => {
            return (
                <option value={val.name}>{val.name}</option>
            )
        })

        return jsx
    }

    renderGenderOption = () => {
        let jsx = this.state.genderOption.map(val => {
            return (
                <option value={val.gender}>{val.gender}</option>
            )
        })

        return jsx
    }

    renderNameOption = () => {

        let jsx = this.state.nameOption.map(val => {
            return (
                <option value={val.name}>{val.name}</option>
            )
        })

        return jsx
    }

    renderInputProduct = () => {
        if(this.state.inputProduct === 'Default'){
            return (
                <div className='row'>
                    <div className='col mb-2 text-center'>
                        <div className='btn-group'>
                            <button className='btn btn-primary btn-lg'
                            onClick={() => this.setState({inputProduct: 'New'})}>
                                Add a New Product
                            </button>
                        </div>
                        <h5 className='d-inline mx-4' style={{color: '#007BFF'}}>or</h5>
                        <div className='btn-group'>
                            <button className='btn btn-outline-primary btn-lg'
                            onClick={() => this.setState({inputProduct: 'Variant'})}>
                                Add a Product Variant
                            </button>
                        </div>
                    </div>
    
                </div>
            )
        }

        else if (this.state.inputProduct === 'Variant'){
            return (
                <div className='row'>
                    <div className='col-12'>
                        <h5>Existing Product</h5>
                    </div>

                    <div className='col-8 mb-2'>
                        <select className="form-control" onChange={(e) => {this.setState({selectedProduct: e.target.value})}}>
                            {this.renderNameOption()}
                        </select>
                    </div>
                    <div className='col-4'>
                    </div>
                </div>
            )
        }
    }


    renderInputForm = () => {
        if(this.state.inputProduct === 'New'){
            return (

                <div className='row'>

                    <div className="col-12">
                        <h4 className='font-weight-bold py-2'>- New Product</h4>
                    </div>

                    <div className='col-3 mb-2'>
                        <h5>Name</h5>
                        <textarea ref={(input) => {this.name = input}} className='form-control' rows="2" placeholder="ex: Dakotaz Wolf"/>
                    </div>
                    
                    <div className='col-5 mb-2'>
                        <h5>Description</h5>
                        <textarea ref={(input) => {this.desc = input}} className='form-control' rows="2" placeholder="ex: Lorem ipsum dolor sit amet."/>
                    </div>

                    {/* {this.renderImageForm()} */}

                    <div className='col-2 mb-2'>
                        <h5>Category</h5>
                        <select className="form-control" onChange={(e) => {this.setState({inputCategory: e.target.value})}}>
                            {this.renderCategoryOption()}
                        </select>
                    </div>

                    <div className='col-2 mb-2'>
                        <h5>Gender</h5>
                        <select className="form-control" onChange={(e) => {this.setState({inputGender: e.target.value})}}>
                            {this.renderGenderOption()}
                        </select>
                    </div>

                    <div className='col-8 mb-2'>
                        <h5>Image</h5>
                        <input ref={(input) => {this.defaultImage = input}} type="text" className='form-control' placeholder='Insert image for showcasing the product on the main page. (450 x 450px)'/>
                        <input ref={(input) => {this.image = input}} type="text" className='form-control' placeholder='Insert image for displaying the product on the product page. (650 x 650px)'/>
                    </div>

                    <div className='col-4 mb-2'>
                        <h5>Color</h5>
                        <input type="color" className='form-control' onChange={(e)=>{this.setState({inputColorCodes: e.target.value})}}/>
                        <input ref={(input) => {this.color = input}} type="text" className='form-control' placeholder="ex: Black" />
                    </div>
                </div>
            )
        }
        else if (this.state.inputProduct === 'Variant'){
            return (
                <div className='row'>

                    <div className="col-12">
                        <h4 className='font-weight-bold py-2'>- Product Variant of {this.state.selectedProduct}</h4>
                    </div>

                    <div className='col-8 mb-2'>
                        <h5>Image</h5>
                        <input ref={(input) => {this.image = input}} type="text" className='form-control' placeholder='Insert image for displaying the product on the product page. (650 x 650px)'/>
                    </div>

                    <div className='col-4 mb-2'>
                        <h5>Codes</h5>
                        <input type="color" className='form-control' onChange={(e)=>{this.setState({inputColor: e.target.value})}}/>
                        <input ref={(input) => {this.color = input}} type="text" className='form-control' placeholder="ex: Black" />
                    </div>

                </div>
            )
        }
        else {
            return null
        }
    }

    renderPriceForm = () => {
        if(this.state.inputProduct === 'New')
            return(
                <div className='row'>
                    <div className="col">
                        <h4 className='font-weight-bold py-2'>- Price</h4>
                    </div>
                </div>
        )

        else {
            return null
        }

    }

    renderPrice = () => {
        if(this.state.inputProduct === 'New'){
            return(
                <div className='row'>
                        <div className='col-4 mb-2'>
                            <h5>IDR</h5>
                            <input ref={(input) => {this.IDR = input}} type="text" className='form-control' placeholder="ex: 200000"/>
                        </div>
                    
                        <div className='col-4 mb-2'>
                            <h5>MYR</h5>
                            <input ref={(input) => {this.MYR = input}} type="text" className='form-control' placeholder="ex: 60.00"/>
                        </div>

                        <div className='col-4 mb-2'>
                            <h5>SGD</h5>
                            <input ref={(input) => {this.SGD = input}} type="text" className='form-control' placeholder="ex: 20.00"/>
                        </div>

                        <div className='col-12 mb-2'>
                            <i className='font-weight-light' style={{color: 'gray', fontSize: '12px'}}>IDR 10,000 = MYR 3.00 <br/> IDR 10,000 = SGD 1.00</i>
                        </div>
                </div>
            )
        }
        else if (this.state.inputProduct !== 'New' && this.state.inputProduct !== 'Default'){
            return null
        }

        else {

        }
    }

    renderActionButton = () => {
        if(this.state.inputProduct === 'New' || this.state.inputProduct !== 'Default'){
            return(
                <div className='row'>
                    <div className='col mb-2 text-center'>
                        <button className='btn btn-primary btn-lg m-2' onClick={this.onAddProduct}>Add Product</button>
                        <button className='btn btn-danger btn-lg m-2'
                        onClick={() => this.setState({inputProduct: 'Default'})}
                        style={{color: 'white'}}>
                            Cancel
                        </button>
                    </div>
                    
                </div>
            )
        }

        else {
            return null
        }
    }

    onAddProduct = () => {
        
        if(this.state.inputProduct === 'New'){

            Swal.fire({
                title: 'Are you sure?',
                text: "By clicking confirm, the new product will be added to the database.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#007BFF',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm'
                }).then((result) => {
                    if (result.value) {
                        Axios.post(
                        'http://localhost:2077/products/add',
                        {
                            name : this.name.value,
                            description : this.desc.value,
                            category : this.state.inputCategory,
                            gender : this.state.inputGender,
                            existing_product : this.state.selectedProduct,
                            input_product: this.state.inputProduct,
                            price_IDR : this.IDR.value,
                            price_MYR : this.MYR.value,
                            price_SGD : this.SGD.value,
                            color: this.color.value,
                            color_codes: this.state.inputColorCodes,
                            defaultImage: this.defaultImage.value,
                            image: this.image.value
                        }
                        ).then((res) => {
                            console.log(res);
                            Swal.fire(
                            'Success!',
                            'The product has been added.',
                            'success'
                        )

                        }).catch((err) => {
                            console.log(err);
                        })
                    }
            })
        }

        else {
            Swal.fire({
                title: 'Are you sure?',
                text: `By clicking confirm, the product will be added to the database as variant of ${this.state.selectedProduct}.`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#007BFF',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm'
                }).then((result) => {
                    if (result.value) {
                        Axios.post(
                            'http://localhost:2077/products/add',
                            {
                                existing_product : this.state.selectedProduct,
                                color: this.color.value,
                                color_codes: this.state.inputColorCodes,
                                image: this.image.value
                            }
                        ).then((res) => {
                            console.log(res);
                            Swal.fire(
                                'Success!',
                                'The variant has been added.',
                                'success'
                                )
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                })
        }
        
    }

    onEditClick = (idProduct, product) => {
        this.setState(
            {
                selectedId: idProduct,
                selectedName: product.name,
                selectedDesc: product.description,
                selectedCategory: product.category,
                selectedGender: product.gender,
                selectedColor: product.color,
                selectedPrice: {IDR: product.IDR, MYR: product.MYR, SGD: product.SGD},
                selectedPict: product.image
            }
        )
        
    }

    onCancelClick = () => {
        this.setState({selectedId: 0})
    }


    // Rendering List
    renderList = () => {

        let hasilRender = this.state.products.map((product, idx)=>{

            idx = idx + 1


            // DISPLAY CONTENT
            if(idx !== this.state.selectedId){
                return (
                    <tr key={idx} style={{height: '150px'}}>
                        <td style={{width: '50px'}}>{idx}</td>
                        <td style={{width: '150px'}}>{product.name}</td>
                        <td style={{width: '300px'}}>{product.description}</td>
                        <td style={{width: '150px'}}>{product.category}</td>
                        <td style={{width: '100px'}}>{product.gender}</td>
                        <td style={{width: '100px'}}>{product.color}</td>
                        <td style={{width: '100px'}}>{product.IDR}</td>
                        <td style={{width: '100px'}}>{product.MYR}</td>
                        <td style={{width: '100px'}}>{product.SGD}</td>
                        <td style={{width: '100px'}}><img src={product.image} alt={product.name} style={{width: '100px'}}/></td>
                        <td style={{width: '100px'}}>
                            <button className="btn btn-block btn-warning" 
                                    style={{color: 'white'}}
                                    onClick={() => {this.onEditClick(idx, product)}}
                                    >EDIT
                            </button>
                        </td>
                    </tr>
                )
            }
            // TEXTBOX FOR EDITING CONTENT
            else {
                return (
                    <tr key={idx} style={{height: '150px'}}>
                        <td style={{width: '50px'}}>{idx}</td>
                        <td style={{width: '150px'}}>
                            <input type='text' 
                            className='form-control'
                            value={this.state.selectedName}
                            onChange={(e) => {this.setState({selectedName: e.target.value})}}/>
                        </td>
                        <td style={{width: '300px'}}>
                            <textarea 
                            className='form-control'
                            value={this.state.selectedDesc}
                            onChange={(e) => {this.setState({selectedDesc: e.target.value})}}/>
                        </td>
                        <td style={{width: '150px'}}>
                            <input type='text' 
                            className='form-control'
                            value={this.state.selectedCategory}
                            onChange={(e) => {this.setState({selectedCategory: e.target.value})}}/>
                        </td>
                        <td style={{width: '100px'}}>
                            <input type='text' 
                            className='form-control'
                            value={this.state.selectedGender}
                            onChange={(e) => {this.setState({selectedGender: e.target.value})}}/>
                        </td>
                        <td style={{width: '100px'}}>
                            <input type='text' 
                            className='form-control'
                            value={this.state.selectedColor}
                            onChange={(e) => {this.setState({selectedColor: e.target.value})}}/>
                        </td>
                        <td style={{width: '100px'}}>
                            <input type='text' 
                            className='form-control'
                            value={this.state.selectedPrice.IDR}
                            onChange={(e) => {this.setState({selectedPrice: {IDR: e.target.value}})}}
                            />
                        </td>
                        <td style={{width: '100px'}}>
                            <input type='text' 
                            className='form-control'
                            value={this.state.selectedPrice.MYR}
                            onChange={(e) => {this.setState({selectedPrice: {MYR: e.target.value}})}}
                            />
                        </td>
                        <td style={{width: '100px'}}>
                            <input type='text' 
                            className='form-control'
                            value={this.state.selectedPrice.SGD}
                            style={{width: '100px'}}
                            onChange={(e) => {this.setState({selectedPrice: {SGD: e.target.value}})}}
                            />
                        </td>
                        <td style={{width: '100px'}}>
                            <input type='text' 
                            className='form-control'
                            value={this.state.selectedPict}
                            onChange={(e) => {this.setState({selectedPict: e.target.value})}}
                            />
                        </td>
                        <td style={{width: '100px'}}>
                        <button 
                                className='btn btn-block btn-success'
                                onClick={() => {this.onSaveClick(product.id)}}
                            >
                                SAVE
                            </button>
                            <button 
                                className='btn btn-block btn-danger'
                                onClick={this.onCancelClick}
                            >
                                BACK
                            </button>
                        </td>
                    </tr>
                )
            }
        })

        return hasilRender
    }

    // KEDUA
    render() {
        // Jika sudah login
        if(this.props.account === 'admin'){
            return (
                <div className=''>

                {/* INPUT DATA */}
                <h3 className='font-weight-bold py-2'><u>Input Product</u></h3>
                <form>

                    {this.renderInputProduct()}

                    {this.renderInputForm()}

                    {this.renderPriceForm()}

                    {this.renderPrice()}


                </form>
                    {this.renderActionButton()}

                {/* RENDERING LIST DATA */}
                <h3 className='font-weight-bold py-2'><u>Product List</u></h3>
                <Table hover bordered responsive>
                    <thead className='thead-dark'>
                        <tr>
                            <th>NO</th>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>CATEGORY</th>
                            <th>GENDER</th>
                            <th>COLOR</th>
                            <th>IDR</th>
                            <th>MYR</th>
                            <th>SGD</th>
                            <th>IMAGE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    {this.renderList()}
                </Table>

            </div>
            )
        }

        else {
            return <Redirect to="/"/>
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

export default connect(mapStateToProps)(ManageProducts)