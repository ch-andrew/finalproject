import React, { Component } from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
// import Swal from 'sweetalert2'
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
        selectedColor:'',
        selectedPrice: {
            IDR: '',
            MYR:'',
            SGD:'',
        },
        selectedPict: '',
        nameOption: [],
        // Input Existing Product
        inputId: '',
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
                    selectedId: 0
                }
            )
        }).catch((err)=>{
            console.log(err)

        })
    }

    getExistingProduct = () => {
        Axios.get(
            'http://localhost:2077/products/name'
        ).then((res) => {
            
            this.setState({nameOption : res.data.existingProducts})

            console.log(this.state.nameOption);
            
        }).catch((err) => {
            console.log(err)  
        })
    }

    renderNameOption = () => {

        let jsx = this.state.nameOption.map(val => {
            return (
                <option value={val.id}>{val.name}</option>
            )
        })

        return jsx
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
                <h4 className='font-weight-bold py-2'>Input Product</h4>
                <form>
                
                    <div className='row'>

                        <div className='col-2 mb-2'>
                            <h5>Name</h5>
                            <textarea ref={(input) => {this.name = input}} className='form-control' rows="2"/>
                        </div>
                        
                        <div className='col-3 mb-2'>
                            <h5>Description</h5>
                            <textarea ref={(input) => {this.desc = input}} className='form-control' rows="2"/>
                        </div>

                        <div className='col-2 mb-2'>
                            <h5>Category</h5>
                            <select className="form-control" onChange={e => this.setState({inputId : e.target.value})}>
                                <option value="0">None</option>
                            </select>
                        </div>

                        <div className='col-1 mb-2'>
                            <h5>Gender</h5>
                            <select className="form-control" onChange={e => this.setState({inputId : e.target.value})}>
                                <option value="0">None</option>
                            </select>
                        </div>

                        <div className='col-4 mb-2'>
                            <h5>Existing Product</h5>
                            <select className="form-control" onChange={e => this.setState({inputId : e.target.value})}>
                                <option value="0">None</option>
                                {this.renderNameOption()}
                            </select>
                            <p>For adding a new variant of an existing product, please select the product name.(For new products, please select "None")</p>
                        </div>

                    </div>

                    <h5>Price :</h5>

                    <div className='row'>

                        <div className='col-4 mb-2'>
                            <h5>IDR</h5>
                            <input type="text" className='form-control' placeholder="ex: 200000"/>
                        </div>

                        <div className='col-4 mb-2'>
                            <h5>MYR</h5>
                            <input type="text" className='form-control' placeholder="ex: 60.00"/>
                        </div>

                        <div className='col-4 mb-2'>
                            <h5>SGD</h5>
                            <input type="text" className='form-control' placeholder="ex: 20.00"/>
                        </div>

                    </div>

                    <div className='row'>

                         <div className='col-4 mb-2'>
                             <h5>Image</h5>
                             <h5>Link</h5>
                             <input type="text" className='form-control'/>
                         </div>

                         <div className='col-4 mb-2'>
                             <h5>Color</h5>
                             <input type="color" name="" id=""/><input type="text" className='form-control' placeholder="(Value) ex: Black"/>
                         </div>
                    </div>

                    <div className="row">
                        <div className='col mb-2'>
                            <h5>Action</h5>
                            <button className="btn btn-primary mb-2">ADD PRODUCT</button>
                            <p>By clicking the button above, we will add the product to the database and send information regarding the identity whom filled the form. <br/> Form is filled by {this.props.firstName}({this.props.account}). <br/> Email : {this.props.email}</p>
                        </div>
                    </div>
                </form>

                {/* RENDERING LIST DATA */}
                <h4 className='font-weight-bold py-2'>Product List</h4>
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