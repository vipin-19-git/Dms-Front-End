import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import Api from './../../Api/Api';
import { Link } from "react-router-dom";
class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states: [],
            products: [],
            models: [],
            dealers: [],
            distributors: [],
            loading: false,
            order_no: '',
            order_date: '',
            state_nm: '',
            dealer: '',
            distributor: '',
            status: '',
            prep_by: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).username : '',
            remarks: '',
            line_item: [{ product: '', model: '', qty: '' ,amt:0}]
        }
    }
    addTableRows = () => {
        const current_state = this.state.line_item;
        var isBlank = 1;
        for (let i = 0; i < current_state.length; i++) {
            if (current_state[i].product == "" || current_state[i].model == "" || current_state[i].qty == "" || current_state[i].amt ==0) {
                isBlank = 0;
            }
        }
        if (isBlank) {
            const new_row = { product: '', model: '', qty: '',amt:0 };
            current_state.push(new_row);
            this.setState({ line_item: current_state });
            console.log(this.state.line_item);
        }
    }
    deleteTableRows = (index) => {
        const rows = this.state.line_item;
        rows.splice(index, 1);
        this.setState({ line_item: rows });

    }

    handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        if (name == "qty" || name == "amt") {
            var test = (!isNaN(parseFloat(value)) && !isNaN(value - 0));
            console.log(value);
            if (test) {
                const rowsInput = this.state.line_item;
                rowsInput[index][name] = value;
                this.setState({ line_item: rowsInput });
            }
            if (value === '') {
                const rowsInput = this.state.line_item;
                rowsInput[index][name] = value;
                this.setState({ line_item: rowsInput });
            }
        }
        else {
            const rowsInput = this.state.line_item;
            rowsInput[index][name] = value;
            this.setState({ line_item: rowsInput });
        }

    }
    getModel = (index, evnt) => {
        const { name, value } = evnt.target;
        const rowsInput = this.state.line_item;
        rowsInput[index][name] = value;
        this.setState({ line_item: rowsInput });
        const state_models = this.state.models;
        Api.getData(`/dobooking/getModel/${value}`, '').then((res) => {
            state_models[index] = res.data;
            this.setState({ models: state_models });
        })
    }
    async componentDidMount() {
        Api.getData(`/transport/create`, '').then((res) => {
            this.setState({ states: res.data.statemaster });
        })
        Api.getData(`/model/create`, '').then((res) => {
            this.setState({ products: res.data.products });
        })
    }

    submitButton = async (e) => {
        e.preventDefault();
        const current_state = this.state.line_item;
        var isBlank = 1; var row = 0;
        for (let i = 0; i < current_state.length; i++) {
            if (current_state[i].product == "" || current_state[i].model == "" || current_state[i].qty == "" || current_state[i].amt == 0) {
                isBlank = 0; row = i + 1;
            }
        }
        if (!isBlank) {
            this.props.Alert(`Please fill ${row} row of line item `, 'warning');
        }
        this.state.loading = true;
        let payload = {
            order_no: this.state.order_no, order_date: this.state.order_date, state_nm: this.state.state_nm
            , dealer: this.state.dealer,distributor: this.state.distributor, status: this.state.status, prep_by: this.state.prep_by, remarks: this.state.remarks,
            line_item: this.state.line_item
        };
        Api.postData('/dlrbooking/save', payload).then(res => {
            this.state.loading = false;
            if (res.data.status === 200) {
                this.props.Alert(res.data.message, 'success');
                this.setState({
                    models: [],
                    dealers: [],
                    distributors: [],
                    order_no: '',
                    order_date: '',
                    state_nm: '',
                    dealer: '',
                    distributor: '',
                    status: '',
                    remarks: '',
                    line_item: [{ product: '', model: '', qty: '',amt :0}]
                });
            } else {
                this.props.Alert(res.data.message, 'warning')
            }

        }).catch((error) => {
            console.log(error)
        })
    };
    handleInput = (e) => {
        if (e.target.name == "state_nm") {
            let st = e.target.value;
            Api.getData(`/dlrbooking/getDlrDist/${st}`, '').then((res) => {
                var dealers = res.data.result.dealers;
                var distributors = res.data.result.distributors;
                this.setState({ dealers: dealers });
                this.setState({ distributors: distributors });
            })
        }
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div id="layout-wrapper">
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-flex align-items-center justify-content-between">
                                        <h4 className="mb-0"></h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item">Transaction</li>
                                                <li className="breadcrumb-item">Dealer Order Booking</li>
                                                <li className="breadcrumb-item active">Create Dealer Order Booking</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card">
                                            <h5 className="card-header" style={{ backgroundColor: 'rgb(163 168 178 / 47%)' }}>
                                                Create Dealer Order Booking
                                                <Button variant="success" disabled={this.state.loading} onClick={!this.state.loading ? this.submitButton : null}
                                                    style={{ float: 'right' }} > <FaSave /> {this.state.loading ? 'Saving…' : 'Save'}</Button>
                                                <Link to="/dlrbooking"> <Button variant="warning" style={{ float: 'right', marginRight: '3px' }}>
                                                    <FaArrowLeft />Back </Button></Link>
                                            </h5>
                                            <div className="card-body">
                                                <fieldset className="border p-2" >
                                                    <legend className='float-none w-auto p-2'>Dealer Order Booking</legend>
                                                    <div className="row" style={{ marginTop: '-20px' }}>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">Order No</label>
                                                                <input type="text" className="form-control" id="order_no" name="order_no" value={this.state.order_no} onChange={this.handleInput} readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">Order Booking Date</label>
                                                                <input type="date" className="form-control" id="order_date" name="order_date" value={this.state.order_date} onChange={this.handleInput} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">State</label>
                                                                <select ref="parentOption" className="form-control" id="state_nm" value={this.state.state_nm} name="state_nm" onChange={this.handleInput}>
                                                                    <option value="">Select State</option>
                                                                    {this.state.states.map(nk => {
                                                                        return (
                                                                            <option key={nk.statecode} value={nk.statecode}>{nk.statename}</option>);
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">Dealer Name </label>
                                                                <select ref="parentOption" className="form-control" id="dealer" value={this.state.dealer} name="dealer" onChange={this.handleInput}>
                                                                    <option value="">Select Dealer</option>
                                                                    {this.state.dealers.map(nk => {
                                                                        return (
                                                                            <option key={nk.stockistcode} value={nk.stockistcode}>{nk.name}</option>);
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" >Distributor  Name </label>
                                                                <select className="form-control" id="distributor" name="distributor" value={this.state.distributor}
                                                                    onChange={this.handleInput}>
                                                                    <option value="">Select Distributor</option>
                                                                    {this.state.distributors.map(nk => {
                                                                        return (
                                                                            <option key={nk.stockistcode} value={nk.stockistcode}>{nk.name}</option>);
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" >Sataus</label>
                                                                <select className="form-control" value={this.state.status} name="status" onChange={this.handleInput}>
                                                                    <option value="">Select status</option>
                                                                    <option value="1">Booked</option>
                                                                    <option value="2">Confirm</option>
                                                                    <option value="3">Cancel</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">Order Prepared By </label>
                                                                <input type="text" readOnly className="form-control" id="prep_by" name="prep_by" value={this.state.prep_by} onChange={this.handleInput} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">Remarks</label>
                                                                <input type="text" className="form-control" id="remarks" name="remarks" value={this.state.remarks} onChange={this.handleInput} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <div className="row" >
                                                    <div className="col-md-12" >
                                                        <div class="table-responsive">
                                                            <fieldset className="border p-2">
                                                                <legend className='float-none w-auto p-2'>Item Details</legend>
                                                                <table class="table table-striped mb-0" style={{ marginTop: '-35px' }}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th colspan="5" style={{ textAlign: "right" }}><Button size="sm" variant="outline-success" onClick={this.addTableRows} >
                                                                                <FaPlus /></Button></th>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Product</th>
                                                                            <th>Model</th>
                                                                            <th>Quantity</th>
                                                                            <th>Esstimate Amount</th>
                                                                            <th>Delete</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.line_item.map((data, index) => {
                                                                            const { product, model, qty,amt } = data;
                                                                            return (
                                                                                <tr key={index}><td>
                                                                                    <select className="form-control" id="product" name="product" onChange={(evnt) => (this.getModel(index, evnt))} value={product}>
                                                                                        <option value="">Select Product</option>
                                                                                        {this.state.products.map(nk => { return (<option key={nk.productcode} value={nk.productcode}>{nk.productname}</option>); })}
                                                                                    </select>
                                                                                </td>
                                                                                    <td>
                                                                                        <select className="form-control" id="model" name="model" onChange={(evnt) => (this.handleChange(index, evnt))} value={model}>
                                                                                            <option value="">Select model</option>
                                                                                            {this.state.models.length != 0 ?
                                                                                                typeof this.state.models[index] !== 'undefined' ? this.state.models[index].map(nk => {
                                                                                                    return (<option key={nk.modelcode} value={nk.modelcode}>{nk.modelname}</option>);
                                                                                                }) : '' : ''}
                                                                                        </select>
                                                                                    </td>
                                                                                    <td><input type="text" value={qty} onChange={(evnt) => (this.handleChange(index, evnt))} name="qty" className="form-control input-sm" /> </td>
                                                                                    <td><input type="text" value={amt} onChange={(evnt) => (this.handleChange(index, evnt))} name="amt" className="form-control input-sm" /> </td>
                                                                                    <td><Button size="sm" variant="outline-danger" onClick={() => (this.deleteTableRows(index))}>x</Button></td>
                                                                                </tr>)
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Create;