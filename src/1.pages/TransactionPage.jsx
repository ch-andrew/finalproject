import React, { Component } from 'react'
import Checkout from './Checkout'
import Footer from './Footer'

class TransactionPage extends Component {

    state = {
        activeTab: '1'
    }

    render() {
        return (
            <div style={{fontFamily: "Roboto"}}>
                <h1 className="text-center pt-5">Transaction</h1>
                <Checkout/>
                <Footer/>
            </div>
        )
    }
}

export default TransactionPage