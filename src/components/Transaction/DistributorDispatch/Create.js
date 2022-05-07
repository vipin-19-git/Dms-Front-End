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
            loading: false,
            invoice_no: '',
            invoice_date: current_date,
            prep_by: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).username : '',
            distributors: [],
            distributor: '',
            dealers:[],
            dealer:'',
            orders: [],
            order_no: '',
            status: '',
            remarks: '',
            models: [],
            line_item: []
        }
    }
   
handleChange = (index, evnt) => {
        const { name, value } = evnt.target;
        if (name == "qty") {
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
            if (current_state[i].product == "" || current_state[i].model == "" || current_state[i].qty == ""){
                isBlank = 0; row = i + 1;
            }
        }
        if (!isBlank) {
            this.props.Alert(`Please fill ${row} row of line item `, 'warning');
        }
    
        let payload = {
             invoice_no: this.state.invoice_no,invoice_date: this.state.invoice_date,
             prep_by: this.state.prep_by,distributor: this.state.distributor,
             order_no: this.state.order_no,dealer:this.state.dealer,
             status: this.state.status, remarks: this.state.remarks,
             line_item: this.state.line_item
          };
        Api.postData('/distributor-dispatch/save', payload).then(res => {
            this.state.loading = false;
            if (res.data.status === 200) {
                this.props.Alert(res.data.message, 'success');
                this.setState({
                    invoice_no: '',
                    distributor: '',
                    dealers:[],
                    dealer:'',
                    orders: [],
                    order_no: '',
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
           Api.getData(`/distributor-dispatch/getDealers/${code}`, '').then((res) => {
                let dealers = res.data.result;
                this.setState({ dealers: dealers });
              
             })
           }
           if (e.target.name == "dealer") {
            let code = e.target.value;
            Api.getData(`/distributor-dispatch/getDlrOrdrs/${code}`, '').then((res) => {
                let orders = res.data.result;
               this.setState({ orders: orders });
             })
           }
           if(e.target.name =="order_no")
           {
             let order_no = e.target.value;
              Api.getData(`/distributor-dispatch/getDlrOrdrdtls/${order_no}`, '').then((res) => {
                let line = res.data.result;
                var n = line.length;
                var itm_detail = new Array();
                for (let i = 0; i < n; i++) {
                    const new_row = { product: line[i].productcode,product_name: line[i].get_product_name.productname,
                         model: line[i].modelcode,model_name:line[i].get_model_name.modelname, qty: line[i].quantity,amt:line[i].price };
                    itm_detail.push(new_row);
                  
                }
               this.setState({ line_item: itm_detail });
             })
           }
        this.setState({ [e.target.name]: e.target.value });
    }
    async componentDidMount() {
        Api.getData(`/distributor-dispatch/getDistributor`, '').then((res) => {
            console.log(res);
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
                                                <li className="breadcrumb-item">Distributor Dispatch</li>
                                                <li className="breadcrumb-item active">Create Distributor Dispatch</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card">
                                            <h5 className="card-header" style={{ backgroundColor: 'rgb(163 168 178 / 47%)' }}>
                                            Create Distributor Dispatch
                                                <Button variant="success" disabled={this.state.loading} onClick={!this.state.loading ? this.submitButton : null}
                                                    style={{ float: 'right' }} > <FaSave /> {this.state.loading ? 'Saving…' : 'Save'}</Button>
                                                <Link to="/distributor-dispatch"> <Button variant="warning" style={{ float: 'right', marginRight: '3px' }}>
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
                                                                            <option key={nk.stockistcode}  value={nk.stockistcode}>{nk.name}</option>);
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" >Dealer </label>
                                                                <select className="form-control" value={this.state.dealer} name="dealer" onChange={this.handleInput}>
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
                                                                <label className="form-label" htmlFor="validationCustom03">Dealer's Order No</label>
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
                                                                <label className="form-label" >Status </label>
                                                                <select className="form-control" value={this.state.status} name="status" onChange={this.handleInput}>
                                                                    <option value="">Select Status</option>
                                                                    <option value="1">Dispatched</option>
                                                                    <option value="2">Cancel</option>
                                                                    <option value="3">Partial Dispatch</option>
                                                                </select>
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
                                                                <table class="table table-striped mb-0" style={{ marginTop: '-30px' }}>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Product</th>
                                                                            <th>Model</th>
                                                                            <th>Quantity</th>
                                                                            
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
                                                                                     <input className="form-control" readOnly  id="model_name" name="model_name" type="text" value={model_name} />
                                                                                    <input id="model" name="model" type="hidden" value={model} />
                                                                                    </td>
                                                                                    <td><input type="text" value={qty} onChange={(evnt) => (this.handleChange(index, evnt))} name="qty" className="form-control input-sm" /> </td>
                                                                                  
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