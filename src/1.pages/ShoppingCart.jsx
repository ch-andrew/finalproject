import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
// import Swal from 'sweetalert2'
import {Redirect} from 'react-router-dom'

class ShoppingCart extends Component {

    state = {
        products: [],
        selectedId: 0,
        selectedName: '',
        selectedDesc: '',
        selectedPrice: '',
        selectedPict: '',
    }

    componentDidMount() {
        // Ambil (GET) semua products data dari database
        this.getData()
    }

    getData = () => {
        axios.get(
            'http://localhost:2019/users'

        ).then((res) => {
            console.log(res.data);
            if(res.data){
                this.setState(
                    {
                        products: res.data,
                        selectedId: 0
                    }
                )
            }

        }).catch((err)=>{
            console.log(err)

        })
    }

    onDeleteItem = (id) => {
        axios.delete(
            `http://localhost:2019/cart/${id}`,
            {
            }
        ).then((res) => {
            this.getData()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        // Jika sudah login
        if(this.props.user_name){
            return (
                <div className='container'>
                {/* RENDERING LIST DATA */}
                <h1 className='display-4 text-center'>Shopping Cart</h1>
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>DESC</th>
                            <th>PRICE</th>
                            <th>QTY</th>
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
                </div>
            )
        }

        else {
            return <Redirect to="/"/>
        }

    }

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
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price}</td>
                        <td>{product.qty}</td>
                        {/* <td>{quantity}</td> */}
                        <td>
                            <img style={{width: '45px'}} src={product.picture} alt=""/>
                        </td>
                        <td>
                            <button 
                                className='btn btn-outline-danger'
                                onClick={() => {this.onDeleteItem(product.id, product)}}>
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
}

const mapStateToProps = (state) => {
    return {
        user_name : state.auth.username,
        user_id : state.auth.id
    }
}
export default connect(mapStateToProps)(ShoppingCart)
