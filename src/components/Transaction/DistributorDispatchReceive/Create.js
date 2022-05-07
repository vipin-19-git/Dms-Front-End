import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import Api from './../../Api/Api';

class Create extends React.Component {
    constructor(props) {
        super(props);
        const current = new Date();
        var current_date = `${current.getFullYear()}-` + ("0" + (current.getMonth() + 1)).slice(-2) + `-${current.getDate()}`;
        this.state = {
            loading: false,
            distributors: [],
            distributor: '',
            invoices: [],
            invoice_no: '',
            order_no:'',
            gr_no: '',
            received_date: current_date,
            received_by: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).username : '',
            remarks: '',
            line_item: []
        }
    }


    submitButton = async (e) => {
        e.preventDefault();
        let payload = {
            distributor: this.state.distributor,
            invoice_no: this.state.invoice_no,
            order_no:this.state.order_no,
            gr_no: this.state.gr_no,
            received_date: this.state.received_date,
            received_by: this.state.received_by,
            remarks: this.state.remarks,
            line_item: this.state.line_item
        };
        this.state.loading = true;
        Api.postData(`/distributor-dispatch-receiving/save`, payload).then(res => {
            this.state.loading = false;
            if (res.data.status === 200) {
                this.props.Alert(res.data.message, 'success');
                this.setState({
                    distributor: '',
                    invoices: [],
                    invoice_no: '',
                    order_no:'',
                    gr_no: '',
                    remarks: '',
                    line_item: [],
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
            this.setState({
                invoices: [],
                invoice_no: '',
                order_no:'',
                gr_no: '',
                remarks: '',
                line_item: [],
            });
            if(code!='')
            {
           Api.getData(`distributor-dispatch-receiving/getInvoices/${code}`, '').then((res) => {
                let invoices = res.data.result;
                this.setState({ invoices: invoices });
            })
          }
        }

        if (e.target.name == "invoice_no") {
            let invoice_no = e.target.value;
            Api.getData(`distributor-dispatch-receiving/getDispDtls/${invoice_no}`, '').then((res) => {
                let line = res.data.result.details;let head_data=res.data.result.head;
                var n = line.length;
                var itm_detail = new Array();
                for (let i = 0; i < n; i++) {
                    const new_row = {
                        product: line[i].productcode, product_name: line[i].get_product_name.productname,
                        model: line[i].modelcode, model_name: line[i].get_model_name.modelname, qty: line[i].quantity,
                        amt: line[i].price
                    };
                    itm_detail.push(new_row);
                }
                
                this.setState({ line_item: itm_detail });
                this.setState({ gr_no: head_data.grno });
                this.setState({ order_no: head_data.orderno });
               // this.state.gr_no = head_data.grno;
            })
        }
        this.setState({ [e.target.name]: e.target.value });
    }
    async componentDidMount() {
        Api.getData(`/distributor-dispatch-receiving/getDistributor`, '').then((res) => {
            this.setState({ distributors: res.data.result });
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
                                                <li className="breadcrumb-item">Distributor Dispatch Receiving</li>
                                                <li className="breadcrumb-item active">Create Distributor Dispatch Receiving</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="card">
                                            <h5 className="card-header" style={{ backgroundColor: 'rgb(163 168 178 / 47%)' }}>
                                                Create Distributor Dispatch Receiving
                                                <Button variant="success" disabled={this.state.loading} onClick={!this.state.loading ? this.submitButton : null}
                                                    style={{ float: 'right' }} > <FaSave /> {this.state.loading ? 'Saving…' : 'Save'}</Button>
                                          <Button variant="warning" style={{ float: 'right', marginRight: '3px' }} >
                                             <FaArrowLeft />Back </Button>
                                            </h5>
                                            <div className="card-body">
                                                <fieldset className="border p-2" >
                                                    <legend className='float-none w-auto p-2'>Dispatch Invoice</legend>
                                                    <div className="row" style={{ marginTop: '-20px' }}>

                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" >Distributor  Name </label>
                                                                <select className="form-control" id="distributor" name="distributor" value={this.state.distributor}
                                                                    onChange={this.handleInput}>
                                                                    <option value="">Select Distributor</option>
                                                                    {this.state.distributors.map(nk => {
                                                                        return (
                                                                            <option key={nk.distributorcode} value={nk.distributorcode}>{nk.name}</option>);
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">Dispatch Invoice No</label>

                                                                <select className="form-control" id="invoice_no" name="invoice_no" value={this.state.invoice_no}
                                                                    onChange={this.handleInput}>
                                                                    <option value="">Select Invoice number</option>
                                                                    {this.state.invoices.map(nk => {
                                                                        return (
                                                                            <option key={nk.despinvoiceno} value={nk.despinvoiceno}>{nk.despinvoiceno}</option>);
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">GR No :</label>
                                                                <input type="text" className="form-control" id="gr_no" name="gr_no" value={this.state.gr_no} onChange={this.handleInput} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">Received Date :</label>
                                                                <input type="date" className="form-control" id="received_date" name="received_date" value={this.state.received_date} onChange={this.handleInput} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="mb-3">
                                                                <label className="form-label" htmlFor="validationCustom03">Receive By </label>
                                                                <input type="text" readOnly className="form-control" id="received_by" name="received_by" value={this.state.received_by} onChange={this.handleInput} />
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
                                                                <table class="table table-striped mb-0" style={{ marginTop: '-25px' }}>
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
                                                                            const { product, product_name, model, model_name, qty, amt } = data;
                                                                            return (
                                                                                <tr key={index}><td>
                                                                                    {product_name}
                                                                                    <input id="product" name="product" type="hidden" value={product} />
                                                                                </td>
                                                                                    <td>
                                                                                        {model_name}
                                                                                        <input id="model" name="model" type="hidden" value={model} />
                                                                                    </td>
                                                                                    <td>
                                                                                        {qty}
                                                                                        <input id="qty" name="qty" type="hidden" value={qty} />
                                                                                    </td>
                                                                                    <td>
                                                                                        {amt}
                                                                                        <input id="amt" name="amt" type="hidden" value={amt} />
                                                                                    </td>
                                                                                </tr>
                                                                            )
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