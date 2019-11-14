import React, { Component } from 'react'
import Checkout from './Checkout'
import Footer from './Footer'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class TransactionPage extends Component {

    state = {
        activeTab: '1'
    }

    render() {
        if(this.props.match.params.id === this.props.id.toString()){
            return (
                <div style={{fontFamily: "Roboto"}}>
                    <h1 className="text-center pt-5">Transaction</h1>
                    <Checkout/>
                    <Footer/>
                </div>
            )
        }
        else{
            return(
                <Redirect to ="/"/>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        id : state.user.id,

    }
}

export default connect(mapStateToProps)(TransactionPage)