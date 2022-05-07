import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import Api from './../../Api/Api';
import { Link } from "react-router-dom";
class Create extends React.Component {
        constructor(props) {
        super(props);
        const current = new Date();
        var current_date = `${current.getFullYear()}-`+("0" + (current.getMonth() + 1)).slice(-2)+`-${current.getDate()}`;
        this.state = {
            models: [],
            orders: [],
            distributors: [],
            transporters:[],
            vehicles:[],
            vehicle:'',
            loading: false,
            invoice_no: '',
            invoice_date: current_date,
            transporter:'',
            order_no: '',
            distributor: '',
            status: '',
            gr_no:'',
            prep_by: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).username : '',
            remarks: '',
            line_item: []
        }
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
             invoice_no: this.state.invoice_no,invoice_date: this.state.invoice_date,
             prep_by: this.state.prep_by,distributor: this.state.distributor,
             order_no: this.state.order_no,transporter:this.state.transporter,
             vehicle:this.state.vehicle,gr_no:this.state.gr_no,
             status: this.state.status, remarks: this.state.remarks,
             line_item: this.state.line_item
          };
        Api.postData('/dispatch/save', payload).then(res => {
            this.state.loading = false;
            if (res.data.status === 200) {
                this.props.Alert(res.data.message, 'success');
                this.setState({
                    models: [],
                    orders: [],
                    transporters:[],
                    vehicles:[],
                    vehicle:'',
                    invoice_no: '',
                    transporter:'',
                    state_nm: '',
                    order_no: '',
                    distributor: '',
                    gr_no:'',
                    status: '',
                    remarks: '',
                    line_item: []
                });
            } else {
                this.props.Alert(res.data.message, 'warning')
            }

        }).catch((error) => {
            console.log(error)
        })
    };
    handleInput = (e) => {
        if (e.target.name == "distributor") {
            let code = e.target.value;
           Api.getData(`dispatch/getDistOrder/${code}`, '').then((res) => {
                let orders = res.data.result.orders;
                let transporters = res.data.result.transporters;
               this.setState({ orders: orders });
               this.setState({ transporters: transporters });
             })
           }
           if (e.target.name == "transporter") {
            let code = e.target.value;
            Api.getData(`dispatch/geVehicle/${code}`, '').then((res) => {
                let vehicles = res.data.result;
               this.setState({ vehicles: vehicles });
             })
           }
           if(e.target.name =="order_no")
           {
             let order_no = e.target.value;
              Api.getData(`dispatch/getDistOrderDtls/${order_no}`, '').then((res) => {
                let line = res.data.result;
                var n = line.length;
                var itm_detail = new Array();
                const state_models = this.state.models;
                for (let i = 0; i < n; i++) {
                    const new_row = { product: line[i].productcode,product_name: line[i].get_product_name.productname,
                         model: line[i].modelcode,model_name:line[i].get_model_name.modelname, qty: line[i].quantity,amt:line[i].price };
                    itm_detail.push(new_row);
                    Api.getData(`/dobooking/getModel/${line[i].productcode}`, '').then((res) => {
                        state_models[i] = res.data;
                        this.setState({ models: state_models });
                     })
                }
               this.setState({ line_item: itm_detail });
             })
           }
        this.setState({ [e.target.name]: e.target.value });
    }
    async componentDidMount() {
        Api.getData(`/dispatch/getDistributor`, '').then((res) => {
            this.setState({ distributors: res.data.result});
        })
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
                                                <li className="breadcrumb-item">Dispatch</li>
                                                <li className="breadcrumb-item active">Create Dispatch</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card">
                                            <h5 className="card-header" style={{ backgroundColor: 'rgb(163 168 178 / 47%)' }}>
                                            Create Dispatch
                                                <Button variant="success" disabled={this.state.loading} onClick={!this.state.loading ? this.submitButton : null}
                                                    style={{ float: 'right' }} > <FaSave /> {this.state.loading ? 'Saving…' : 'Save'}</Button>
                                                <Link to="/dispatch"> <Button variant="warning" style={{ float: 'right', marginRight: '3px' }}>
                                                    <FaArrowLeft />Back </Button></Link>
                                            </h5>
                                            <div className="card-body">
                                                <fieldset className="border p-2" >
                                                    <legend className='float-none w-auto p-2'>Dispatch Invoice</legend>
                                                    <div className="row" style={{ marginTop: '-20px' }}>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">Invoice No</label>
                                                                <input type="text" className="form-control" id="invoice_no" name="invoice_no" value={this.state.invoice_no} 
                                                                onChange={this.handleInput} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">Invoice Date</label>
                                                                <input type="date" className="form-control" id="invoice_date" name="invoice_date" value={this.state.invoice_date} onChange={this.handleInput} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03"> Despatch Invoice Prepared By </label>
                                                                <input type="text" readOnly className="form-control" id="prep_by" name="prep_by" value={this.state.prep_by} onChange={this.handleInput} />
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
                                                                            <option key={nk.distributorcode}  value={nk.distributorcode}>{nk.name}</option>);
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">Distributor's Order No</label>
                                                                <select ref="parentOption" className="form-control" id="order_no" value={this.state.order_no} name="order_no" onChange={this.handleInput}>
                                                                    <option value="">Select Order No</option>
                                                                    {this.state.orders.map(nk => {
                                                                        return (
                                                                            <option key={nk.orderno} value={nk.orderno}>{nk.orderno}</option>);
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" >Transport </label>
                                                                <select className="form-control" value={this.state.transporter} name="transporter" onChange={this.handleInput}>
                                                                    <option value="">Select Transport</option>
                                                                  
                                                                    {this.state.transporters.map(nk => {
                                                                        return (
                                                                            <option key={nk.transportcode} value={nk.transportcode}>{nk.transportname}</option>);
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">Vehicle</label>
                                                                <select ref="parentOption" className="form-control" id="vehicle" value={this.state.vehicle} name="vehicle" onChange={this.handleInput}>
                                                                    <option value="">Select Vehicle</option>
                                                                    {this.state.vehicles.map(nk => {
                                                                        return (
                                                                            <option key={nk.vehicleno} value={nk.vehicleno}>{nk.vehiclename}</option>);
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">GR No</label>
                                                                <input type="text" className="form-control" id="gr_no" name="gr_no" value={this.state.gr_no} onChange={this.handleInput} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" >Status </label>
                                                                <select className="form-control" value={this.state.status} name="status" onChange={this.handleInput}>
                                                                    <option value="">Select Status</option>
                                                                    <option value="1">Dispatched</option>
                                                                    <option value="2">Cancel</option>
                                                                    <option value="3">Partial Dispatch</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-9">
                                                            <div className="mb-9">
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
                                                                <table class="table table-striped mb-0" style={{ marginTop: '-30px' }}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Product</th>
                                                                            <th>Model</th>
                                                                            <th>Quantity</th>
                                                                            <th>Esstimate Amount</th>   
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.line_item.map((data, index) => {
                                                                            const { product,product_name, model,model_name, qty,amt } = data;
                                                                            return (
                                                                                <tr key={index}><td>
                                                                                    <input className="form-control"  readOnly  id="product_name" name="product_name" type="text" value={product_name} />
                                                                                    <input id="product" name="product" type="hidden" value={product} />
                                                                                </td>
                                                                                    <td>
                                                                                     <input className="form-control" readOnly  id="product_name" name="product_name" type="text" value={model_name} />
                                                                                    <input id="model" name="model" type="hidden" value={model} />
                                                                                    </td>
                                                                                    <td><input type="text" value={qty} onChange={(evnt) => (this.handleChange(index, evnt))} name="qty" className="form-control input-sm" /> </td>
                                                                                    <td><input type="text" value={amt} onChange={(evnt) => (this.handleChange(index, evnt))} name="amt" className="form-control input-sm" /> </td>
                                                                               </tr>
                                                                             )})}
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