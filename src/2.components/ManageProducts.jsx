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
        selectedProductId: 0,
        selectedId: 0,
        selectedName: '',
        selectedDesc: '',
        selectedPrice: '',
        selectedPict: '',
        variants: []
    }

    // KETIGA
    // Akan Running setelah function render() dijalankan
    componentDidMount() {
        // Ambil (GET) semua products data dari database
        this.getData()
    }

    // Mengambil (GET) data dari database
    getData = () => {
        Axios.get(
            'http://localhost:2077/products/all'

        ).then((res) => {
            // Di taruh di state.data
            console.log(res.data.products);
            console.log(res.data.variants);
            
            this.setState(
                {
                    products: res.data.products,
                    variants: res.data.variants,
                    selectedId: 0
                }
            )
        }).catch((err)=>{
            console.log(err)

        })
    }

    renderVar = () => {

        let productVariants = this.state.variants.map((variant)=>{

                if(variant.id === this.state.selectedProductId){
                    return (
                        <tr key={variant.id}>
                            <td>{variant.id}</td>
                            <td><img src={variant.image} style={{width: "45px"}}alt={variant.id}/></td>
                            <td>{variant.IDR}</td>
                            <td>{variant.SGD}</td>
                            <td>{variant.MYR}</td>
                        </tr>
    
                    )
                }

                else {
                    return null
                }



        })

        return productVariants
    }

    // Rendering List
    renderList = () => {

        let hasilRender = this.state.products.map((product)=>{

            if(product.id !== this.state.selectedId){
                return (
                    <tbody>
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td>{product.gender}</td>
                        </tr>
                        {this.renderVar()}
                    </tbody>
                )
            }

            else {
                return (
                    <div>TEST</div>
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
                <Table bordered>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>CATEGORY</th>
                            <th>GENDER</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input ref={(input) => {this.name = input}} className='form-control' type='text'/></td>
                            <td><input ref={(input) => {this.desc = input}} className='form-control' type='text'/></td>
                            <td><input ref={(input) => {this.category = input}} className='form-control' type='text'/></td>
                            <td><input ref={(input) => {this.pict = input}} className='form-control' type='text'/></td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th>COLOR</th>
                            <th colSpan="3">PRICE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="color" name="" id=""/><input type="text" className='form-control' placeholder="(Value) ex: Black"/></td>
                            <td>IDR<input type="text" className='form-control' placeholder="ex: 200000"/></td>
                            <td>SGD<input type="text" className='form-control' placeholder="ex: 20.00"/></td>
                            <td>MYR<input type="text" className='form-control' placeholder="ex: 60.00"/></td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th colSpan="3">IMAGE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="3"><input type="text" name="" id=""/></td>
                            <td><button className="btn btn-primary">ADD PRODUCT</button></td>
                        </tr>
                    </tbody>
                </Table>

                {/* RENDERING LIST DATA */}
                <h4 className='font-weight-bold py-2'>Product List</h4>
                <Table hover bordered>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>CATEGORY</th>
                            <th>GENDER</th>
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