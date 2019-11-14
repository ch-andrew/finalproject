import React, { Component } from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


class Transactions extends Component {

    state = {
        transactions: []
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.get(`http://localhost:2077/transaction/`

        ).then(res => {
            console.log(res.data.result);
            this.setState({transactions: res.data.result})
        }).catch(err => {
            console.log(err);
            
        }) 
    }

    onApprove = (id) => {
        Axios.post(`http://localhost:2077/transaction/status` , {
            input: 'Approve',
            id
        })
    }

    onReject = (id) => {
        Axios.post(`http://localhost:2077/transaction/status` , {
            input: 'Reject',
            id
        })
    }

    renderList = () => {

        return this.state.transactions.map((item) => {
            return (
                <div key={item.transactionId} className='col row'>
                    <div className='col'>
                        {item.email}
                    </div>
                    <div className='col'>
                        {item.paymentDeadline}
                    </div>
                    <div className='col'>
                        {item.accHolderName}
                    </div>
                    <div className='col'>
                        {item.accNumber}
                    </div>
                    <div className='col'>
                        {item.accBank}
                    </div>
                    <div className='col'>
                        {item.totalPayment.toLocaleString('id')}
                    </div>
                    <div className='col'>
                        <img src={'http://localhost:2077/files/' + item.paymentProof} alt={item.paymentProof} style={{width: '50px'}}/>
                    </div>
                    <div className='col'>
                        {item.status}
                    </div>
                    <div className='col'>
                        <button className="btn btn-success" onClick={() => this.onApprove(item.id)}>
                            Approve
                        </button>
                        <button className="btn btn-warning" style={{color: 'white'}}>
                            Reject
                        </button>
                    </div>
                </div>
            )
        })
    }

    render() {
        if(this.props.account === 'admin'){
            return (
                <div className=''>
                    <div className='row'>
                        <div className='col'>
                            Email
                        </div>
                        <div className='col'>
                            Deadline
                        </div>
                        <div className='col'>
                            Account Holder's Name
                        </div>
                        <div className='col'>
                            Account Number
                        </div>
                        <div className='col'>
                            Bank
                        </div>
                        <div className='col'>
                            Total
                        </div>
                        <div className='col'>
                            Proof
                        </div>
                        <div className='col'>
                            Status
                        </div>
                        <div className='col'>
                            Action
                        </div>
                    </div>
                    <div className='row'>

                        {this.renderList()}
                    </div>
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

export default connect(mapStateToProps)(Transactions)
