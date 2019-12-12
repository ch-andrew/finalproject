import React, { Component } from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Table} from 'reactstrap'


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
            tId : id
        }).then(res => {
            this.getData()
        })
    }

    onReject = (id) => {
        Axios.post(`http://localhost:2077/transaction/status` , {
            input: 'Reject',
            tId : id
        }).then(res => {
            this.getData()
        })
    }

    onDelete = (id) => {
        Axios.post(`http://localhost:2077/transaction/status` , {
            input: 'Delete',
            tId : id
        }).then(res => {
            this.getData()
        })
    }

    onShip = (id) => {
        Axios.post(`http://localhost:2077/transaction/status` , {
            input: 'Ship',
            tId : id
        }).then(res => {
            this.getData()
        })
    }

    onComplete = (id) => {
        Axios.post(`http://localhost:2077/transaction/status` , {
            input: 'Complete',
            tId : id
        }).then(res => {
            this.getData()
        })
    }

    renderStatus = (status, transactionId) => {
        if(status === 'Approved'){
            return (
                <>
                    <button className="btn btn-success" onClick={() => this.onShip(transactionId)}>
                        Ship
                    </button>
                </>
            )
        }

        else if(status === 'Rejected'){
            return(
                <>
                    <button className="btn btn-danger" onClick={() => this.onDelete(transactionId)}>
                        Delete
                    </button>
                </>
            )
        }

        else if(status === 'On Shipment'){
            return (
                <>
                    <button className="btn btn-success" onClick={() => this.onComplete(transactionId)}>
                        Complete
                    </button>
                </>
            )
        }

        else if(status === 'Completed'){
            return (
                <>
                </>
            )
        }

        else {
            return(
                <>
                    <button className="btn btn-success" onClick={() => this.onApprove(transactionId)}>
                        Approve
                    </button>
                    <button className="btn btn-warning" onClick={() => this.onReject(transactionId)} style={{color: 'white'}}>
                        Reject
                    </button>
                </>
            )
        }
    }

    renderList = () => {

        return this.state.transactions.map((item) => {
            return (
                <tbody key={item.transactionId}>
                    <td>{item.email}</td>
                    <td>{item.paymentDeadline}</td>
                    <td>{item.accHolderName}</td>
                    <td>{item.accNumber}</td>
                    <td>{item.accBank}</td>
                    <td>{item.totalPayment.toLocaleString('id')}</td>
                    <td><img src={'http://localhost:2077/files/' + item.paymentProof} alt={item.paymentProof} style={{width: '50px'}}/></td>
                    <td>{item.status}</td>
                    <td>
                    {this.renderStatus(item.status, item.transactionId)}
                    </td>
                </tbody>
            )
        })
    }

    render() {
        if(this.props.account === 'admin'){
            return (
                <Table className=''>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Email</th>
                            <th>Deadline</th>
                            <th>Acc Name</th>
                            <th>Acc Number</th>
                            <th>Bank</th>
                            <th>Total</th>
                            <th>Proof</th>
                            <th>Status</th>
                            <th>Action</th>
                            
                        </tr>
                    </thead>
                    {this.renderList()}
                </Table>
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
