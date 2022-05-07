import React from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Link } from "react-router-dom";

const token = localStorage.getItem("token") ? localStorage.getItem("token") : '';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token.replaceAll('"', '')}`
}



class TransportEdit extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
     
         states: [],
         districts: [],
         cities: [],
         transporter_id:'',
         transporter_code: '',
         transport_name: '',
         state_nm: '',
         district: '',
         city: '',
         mobile_no: '',


         phone_no: '',
         alt_phone_no: '',
         email_id: '',
         fax_no: '',
         address: '',
         
         status: true,
         loading: false,
      }
   }


   async componentDidMount() {
    const pathname=window.location.pathname;
    var arrayPath = pathname.split('/');
    const file_id=arrayPath[2];
   console.log(file_id);

    const res = await axios.get(`http://localhost:85/api/edit-transport/${file_id}`,{ headers });
   
      console.log(res);
      
      this.setState({transporter_id:res.data.result.id});
    this.setState({transporter_code:res.data.result.transportcode});
    this.setState({transport_name:res.data.result.transportname});
    this.setState({state_nm:res.data.result.statecode});

    this.setState({district:res.data.result.districtcode});

    this.setState({city:res.data.result.citycode});

    this.setState({mobile_no:res.data.result.mobileno});
    this.setState({phone_no:res.data.result.phone});
    this.setState({alt_phone_no:res.data.result.alternatephoneno});
    this.setState({email_id:res.data.result.emailid});
    this.setState({fax_no:res.data.result.faxno});
    this.setState({address:res.data.result.address});


    this.setState({ states: res.data.statemaster });
    this.setState({ districts: res.data.districtmaster });
    this.setState({ cities: res.data.citymaster });

    

   }



   submitButton = async (e) => {
      e.preventDefault();
      this.state.loading = true;
      // console.log(e.target.elements);
      let fileData = {transporter_id:this.state.transporter_id, transport_name: this.state.transport_name, state_nm: this.state.state_nm,district:this.state.district, city: this.state.city, mobile_no: this.state.mobile_no, phone_no: this.state.phone_no, alt_phone_no: this.state.alt_phone_no, email_id: this.state.email_id, fax_no: this.state.fax_no,address: this.state.address};
      console.log('employee => ' + JSON.stringify(fileData));

      var res = axios.post('http://localhost:85/api/UpdateTransport', fileData, { headers }).then(res => {

         console.log(res.data);

         if (res.data.status === 200) {
            this.state.loading = false;
            this.setState({
               setMFlash: res.data.message,
               className: res.data.class,
               country: '',
               isGoing: true,
               zone_names: '',
               state_name: '',

            })
            this.props.Alert(res.data.message, 'success')

         } else {
            this.state.loading = true;
            this.props.Alert(res.data.message, 'warning')
            this.setState({
               setMFlash: res.data.message,
               className: res.data.class
            })
            setTimeout(() => {
               this.setState({
                  setMFlash: '',
                  className: ''
               })
            }, 5000);

         }

      });





   };

   handlethisinput =(e) => {
  if(e.target.name == 'state_nm')
      {
         const state_cd = e.target.value;
         const res =  axios.get(`http://localhost:85/api/getDistrict/${state_cd}`,{ headers }).then(res => {
              
           
            this.setState({ districts: res.data.district_datas });
            this.setState({ [e.target.name]: e.target.value });
            this.setState({ showMessage: false });
            this.setState({ city: '' });
            this.setState({ cities: [] });

            

         });
      }
      else if(e.target.name == 'district')
      {
         const district_cd = e.target.value;
         const res =  axios.get(`http://localhost:85/api/getCity/${district_cd}`,{ headers }).then(res => {
              console.log(res);
           
            this.setState({ cities: res.data.city_datas });
            this.setState({ [e.target.name]: e.target.value });
            this.setState({ showMessage: false });

         });
      }
     
      this.setState({ [e.target.name]: e.target.value });
     
   }

   handleInput = (e) => {
      this.setState({ [e.target.name]: e.target.value });
      this.setState({ showMessage: false });

     
   }
   handleChange = e => this.setState({ status: e.target.checked });
   render() {


      return (<div id="layout-wrapper">
         <div className="main-content">
            <div className="page-content">
               <div className="container-fluid">
                  <div className="row">
                     <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                           <h4 className="mb-0"></h4>
                           <div className="page-title-right">
                              <ol className="breadcrumb m-0">
                                 <li className="breadcrumb-item">Master</li>
                                 <li className="breadcrumb-item">Transport</li>
                                 <li className="breadcrumb-item active">Edit Transport</li>
                              </ol>
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-xl-12">
                           <div className="card">
                              <h5 className="card-header" style={{ backgroundColor: 'rgb(163 168 178 / 47%)' }}>
                                 Edit Transport


                                 <LoadingButton
                                    variant="contained"
                                    color="success" loading={this.state.loading}
                                    loadingPosition="start" style={{ float: 'right' }} startIcon={<SaveIcon />}
                                    onClick={this.submitButton} size="medium">Save</LoadingButton>

                                 <Link to="/transport"> <Button variant="contained" style={{ float: 'right', marginRight: '3px' }} color="warning"
                                    startIcon={<ArrowBackIcon />}> Back</Button>  </Link>

                              </h5>

                              <div className="card-body">
                                 <form >
                                    <div className="row">


                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Transporter Code</label>
                                             <input type="text" className="form-control" id="transporter_code" name="transporter_code" value={this.state.transporter_code} onChange={this.handleInput} readOnly />
                                             <input type="hidden" className="form-control" id="transporter_id" name="transporter_id" value={this.state.transporter_id} />
                                          </div>
                                       </div>


                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Transporter Name</label>
                                             <input type="text" className="form-control" id="transport_name" name="transport_name" value={this.state.transport_name} onChange={this.handleInput} />
                                          </div>
                                       </div>

                                  

                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">State</label>
                                             <select ref="parentOption" className="form-control" id="state_nm" value={this.state.state_nm} name="state_nm" style={{ paddingTop: '0px' }} onChange={this.handlethisinput}>
                                                <option value="">Select State</option>
                                                {this.state.states.map(nk => {
                                                   return (
                                                      <option key={nk.statecode} value={nk.statecode}>{nk.statename}</option>
                                                   );
                                                })}
                                             </select>
                                          </div>
                                       </div>


                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">District</label>
                                             <select ref="parentOption" className="form-control" id="district" value={this.state.district} name="district" style={{ paddingTop: '0px' }} onChange={this.handlethisinput}>
                                                <option value="">Select District</option>
                                                {this.state.districts.map(nk => {
                                                   return (
                                                      <option key={nk.districtcode} value={nk.districtcode}>{nk.districtname}</option>
                                                   );
                                                })}
                                             </select>
                                          </div>
                                       </div>
                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">City</label>
                                             <select ref="parentOption" className="form-control" id="city" value={this.state.city} name="city" style={{ paddingTop: '0px' }} onChange={this.handlethisinput}>
                                                <option value="">Select City</option>
                                                {this.state.cities.map(nk => {
                                                   return (
                                                      <option key={nk.citycode} value={nk.citycode}>{nk.cityname}</option>
                                                   );
                                                })}
                                             </select>
                                          </div>
                                       </div>

                                      

                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Mobile </label>
                                             <input type="number" className="form-control" id="mobile_no" name="mobile_no" value={this.state.mobile_no} onChange={this.handleInput} />
                                          </div>
                                       </div>

                                      
                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Phone No</label>
                                             <input type="number" className="form-control" id="phone_no" name="phone_no" value={this.state.phone_no} onChange={this.handleInput} />
                                          </div>
                                       </div>
                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Alternative Phone No</label>
                                             <input type="number" className="form-control" id="alt_phone_no" name="alt_phone_no" value={this.state.alt_phone_no} onChange={this.handleInput} />
                                          </div>
                                       </div>
                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Email ID</label>
                                             <input type="email" className="form-control" id="email_id" name="email_id" value={this.state.email_id} onChange={this.handleInput} />
                                          </div>
                                       </div>
                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Fax No</label>
                                             <input type="number" className="form-control" id="fax_no" name="fax_no" value={this.state.fax_no} onChange={this.handleInput} />
                                          </div>
                                       </div>
                                     
                                     
                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Address</label>
                                             <textarea id="address" name="address" rows={5}
                                                cols={50} value={this.state.address} onChange={this.handleInput}>
                                                {this.state.address}
                                             </textarea>
                                          </div>
                                       </div>
                                     

                                    </div>




                                 </form>
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
export default TransportEdit;