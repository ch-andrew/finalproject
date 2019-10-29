import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
// import Swal from 'sweetalert2'
import {Redirect} from 'react-router-dom'

class ManageProducts extends Component {

    state = {
        products: [],
        selectedId: 0,
        selectedName: '',
        selectedDesc: '',
        selectedPrice: '',
        selectedPict: ''
    }

    // KETIGA
    // Akan Running setelah function render() dijalankan
    componentDidMount() {
        // Ambil (GET) semua products data dari database
        this.getData()
    }

    // Mengambil (GET) data dari database
    getData = () => {
        axios.get(
            'http://localhost:2019/products'

        ).then((res) => {
            // Di taruh di state.data
            console.log(res.data);
            
            this.setState(
                {
                    products: res.data,
                    selectedId: 0
                }
            )

        }).catch((err)=>{
            console.log(err)

        })
    }

    // Input (POST) data
    onAddProduct = () => {
        // Ambil data dari text input
        let data_name = this.name.value
        let data_description = this.desc.value
        let data_price = this.price.value
        let data_picture = this.pict.value

        // Menaruh (POST) data ke database (JSON)
        axios.post(
            'http://localhost:2019/products',
            {
                name: data_name,
                description: data_description,
                price: data_price,
                picture: data_picture
            }
        ).then((res) => {
            // Swal.fire(
            //     'Done!',
            //     'Product is added succesfully!',
            //     'success'
            //   )

            // Mengambil data
            this.getData()

        }).catch((err) => {
            console.log(err)
            alert('Gagal, coba buka console')

        })
    }

    onEditClick = (idProduct, product) => {
        this.setState(
            {
                selectedId: idProduct,
                selectedName: product.name,
                selectedDesc: product.description,
                selectedPrice: product.price,
                selectedPict: product.picture
            }
        )
    }

    onDeleteClick = (idProduct) => {
        axios.delete(
            `http://localhost:2019/products/${idProduct}`,
            {
                name: '',
                description: '',
                price: '',
                picture: '',
            }
        ).then((res) => {
            this.getData()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onCancelClick = () => {
        this.setState({selectedId: 0})
    }
    
    // Edit (PATCH) data
    onSaveClick = (idProduct) => {
        // axios.patch
        // http://localhost:2019/products/(id product)
        axios.patch(
            `http://localhost:2019/products/${idProduct}`,
            {
                name: this.state.selectedName,
                description: this.state.selectedDesc,
                price: this.state.selectedPrice,
                picture: this.state.selectedPict
            }
        ).then((res) => {
            // Get data ulang
            this.getData()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // Rendering List
    renderList = () => {
        // Map data object menjadi list
        // products = [{}, {}, {}]
        // product = {name, description, price, picture, id}
        // hasilrender = [<tr>, <tr>, <tr>]
        let hasilRender = this.state.products.map((product)=>{
            
            // Jika id tidak sama dg yang terdaftar di state
            if(product.id !== this.state.selectedId){
                // render sebagai list
                return (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>
                            <img style={{width: '45px'}} src={product.picture} alt=""/>
                        </td>
                        <td>
                            <button 
                                className='btn btn-outline-warning'
                                onClick={() => {this.onEditClick(product.id, product)}}>
                                Edit
                            </button>
                            <button 
                                className='btn btn-outline-danger'
                                onClick={() => {this.onDeleteClick(product.id, product)}}>
                                Delete
                            </button>
                        </td>
                    </tr>
                )
            } else {
                // render sebagai textbox
                return (
                    <tr key={product.id}>
                        <td>
                            <input type='text' size={8}
                            className='form-control'
                            value={this.state.selectedName}
                            onChange={(e) => {this.setState({selectedName: e.target.value})}}/>
                        </td>
                        <td>
                            <input type='text' size={8}
                            className='form-control'
                            value={this.state.selectedDesc}
                            onChange={(e) => {this.setState({selectedDesc: e.target.value})}}/>
                        </td>
                        <td>
                            <input type='text' size={8}
                            className='form-control'
                            value={this.state.selectedPrice}
                            onChange={(e) => {this.setState({selectedPrice: e.target.value})}}/>
                        </td>
                        <td>
                            <input type='text' size={8}
                            className='form-control'
                            value={this.state.selectedPict}
                            onChange={(e) => {this.setState({selectedPict: e.target.value})}}/>
                        </td>
                        <td>
                            <button 
                                className='btn btn-outline-success mr-2'
                                onClick={() => {this.onSaveClick(product.id)}}
                            >
                                Save
                            </button>
                            <button 
                                className='btn btn-outline-danger'
                                onClick={this.onCancelClick}
                            >
                                Cancel
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
        if(this.props.user_name){
            return (
                <div className='container'>
                {/* RENDERING LIST DATA */}
                <h1 className='display-4 text-center'>List Product</h1>
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>PRICE</th>
                            <th>PICTURE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Render pertama kali akan kosong */}
                        {/* Baru akan muncul ketika sudah mengambil data di componentdidmount */}
                        {this.renderList()}
                    </tbody>
                </table>


                {/* INPUT DATA */}
                <h1 className='display-4 text-center'>Input Product</h1>
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>PRICE</th>
                            <th>PICTURE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input ref={(input) => {this.name = input}} className='form-control' type='text'/></td>
                            <td><input ref={(input) => {this.desc = input}} className='form-control' type='text'/></td>
                            <td><input ref={(input) => {this.price = input}} className='form-control' type='text'/></td>
                            <td><input ref={(input) => {this.pict = input}} className='form-control' type='text'/></td>
                            <td>
                                <button
                                    className='btn btn-outline-success'
                                    onClick={this.onAddProduct}
                                >Add</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
        user_name : state.auth.username,
        user_id : state.auth.id
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