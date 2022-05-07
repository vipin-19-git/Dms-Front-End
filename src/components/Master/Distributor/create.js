import React from 'react';
import Api from './../../Api/Api';
import Button from 'react-bootstrap/Button';
import { FaSave,FaArrowLeft } from 'react-icons/fa';
import { Link } from "react-router-dom";


class DistributorCreate extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         distributors: [],
         countries: [],
         states: [],
         districts: [],
         cities: [],
         tehsils: [],
         stock_cd: '',
         stockist_type: '',
         distributor: '',
         country: '',
         state_nm: '',
         district: '',
         city: '',
         tehsil: '',
         mobile_no: '',
         email_id: '',
         phone_no: '',
         alt_phone_no: '',
         fax_no: '',
         concern_person: '',
         apt_date: '',
         address: '',
         area: '',
         name:'',
         status: true,
         loading: false,
      }
   }


   async componentDidMount() {
      
      Api.getData(`/stockist/create`,'').then((res)=>{
      this.setState({ distributors: [] });
      this.setState({ countries: res.data.countries });
      this.setState({ states: []});
      this.setState({ districts: [] });
      this.setState({ cities: [] });
      this.setState({ tehsils: [] });
        })

   }



   submitButton = async (e) => {
      e.preventDefault();
      this.state.loading = true;
      let payload = { stockist_type: this.state.stockist_type, distributor: this.state.distributor
         ,name:this.state.name, country: this.state.country, state_nm: this.state.state_nm,
          district: this.state.district, city: this.state.city, tehsil: this.state.tehsil,
           mobile_no: this.state.mobile_no, email_id: this.state.email_id,
           phone_no:this.state.phone_no,alt_phone_no:this.state.alt_phone_no,
           fax_no:this.state.fax_no,status:this.state.status,
           concern_person:this.state.concern_person,apt_date:this.state.apt_date,address:this.state.address,
           area:this.state.area };
    
      Api.postData('/stockist/create', payload).then(res =>{
         this.state.loading = false;
         if(res.data.status===200){
          
            // this.setState({
            //    setMFlash: res.data.message,
            //    className: res.data.class,
            //    country: '',
            //    isGoing: true,
            //    zone_names: '',
            //    state_name: '',

            // })
            this.setState({
            distributors: [],
            countries: [],
            states: [],
            districts: [],
            cities: [],
            tehsils: [],
            stock_cd: '',
            stockist_type: '',
            distributor: '',
            country: '',
            state_nm: '',
            district: '',
            city: '',
            tehsil: '',
            mobile_no: '',
            email_id: '',
            phone_no: '',
            alt_phone_no: '',
            fax_no: '',
            concern_person: '',
            apt_date: '',
            address: '',
            area: '',
            name:'',
            status: true,
            loading: false,
         })
            this.props.Alert(res.data.message, 'success')


 
    }else{
         
         this.props.Alert(res.data.message, 'warning')
         this.setState({
         setMFlash: res.data.message,
         className: res.data.class
      })
      }
 
       });


   };
   phonevalid =(e) => {
      if (e.target.value.length > 10) {
         return false;
        }
        else{ 
        this.setState({[e.target.name]: e.target.value});
        this.setState({ showMessage: false });
        }
   }

   handlethisinput =(e) => {
      if(e.target.name == 'stockist_type')
      {
         if(e.target.value == 'Dealer')
         {
           
            Api.getData(`/stockist/getdealer`,'').then((res)=>{
               this.setState({ distributors: res.data.dealers });
               this.setState({ [e.target.name]: e.target.value });
               this.setState({ showMessage: false });
                 })
           
         }
         else{
     
            Api.getData(`/stockist/getdistributor`,'').then((res)=>{
               this.setState({ distributors: res.data.distributors });
               this.setState({ [e.target.name]: e.target.value });
               this.setState({ showMessage: false });
                 })
           
         }
      }
      else if(e.target.name == 'country')
      {
         const coun_cd = e.target.value;
        
         Api.getData(`/stockist/getstates/${coun_cd}`,'').then((res)=>{
            this.setState({ states: res.data.states_data });
            this.setState({ [e.target.name]: e.target.value });
            this.setState({ showMessage: false });
              })
      }
      else if(e.target.name == 'state_nm')
      {
         const state_cd = e.target.value;
        
         Api.getData(`/stockist/getDistrict/${state_cd}`,'').then((res)=>{
            this.setState({ districts: res.data.district_datas });
            this.setState({ [e.target.name]: e.target.value });
            this.setState({ showMessage: false });

              })
      }
      else if(e.target.name == 'district')
      {
         const district_cd = e.target.value;
    
         Api.getData(`/stockist/getCity/${district_cd}`,'').then((res)=>{
            this.setState({ cities: res.data.city_datas });
            this.setState({ [e.target.name]: e.target.value });
            this.setState({ showMessage: false });

              })
      }
      else if(e.target.name =='city')
      {
         const city_cd = e.target.value;
         Api.getData(`/stockist/getTehsil/${city_cd}`,'').then((res)=>{
              this.setState({ tehsils: res.data.tehsil_datas });
            this.setState({ [e.target.name]: e.target.value });
            this.setState({ showMessage: false });
              })
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
                                 <li className="breadcrumb-item">Distributor</li>
                                 <li className="breadcrumb-item active">Create Distributor</li>
                              </ol>
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-xl-12">
                           <div className="card">
                              <h5 className="card-header" style={{ backgroundColor: 'rgb(163 168 178 / 47%)' }}>
                                 Create Distributor
                 <Button variant="success" disabled={ this.state.loading} onClick={! this.state.loading ?
                  this.submitButton : null}  style={{float:'right' }}  > <FaSave /> { this.state.loading ? 'Saving…' : 'Save'}</Button>

              <Link to="/stockist"> <Button  variant="warning"     style={{float:'right',marginRight:'3px'}}>
               <FaArrowLeft /> Back</Button>  </Link>
                              </h5>

                              <div className="card-body">
                                 <form >
                                    <div className="row">


                                       <div className="col-md-3">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Stockist Code</label>
                                             <input type="text" className="form-control" id="stock_cd" name="stock_cd" value={this.state.stock_cd} onChange={this.handleInput} readOnly />
                                          </div>
                                       </div>


                                       <div className="col-md-3">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom04">Stockist Type</label>
                                             <select ref="parentOption" className="form-control" id="stockist_type" value={this.state.stockist_type} name="stockist_type" style={{ paddingTop: '0px' }} onChange={this.handlethisinput}>
                                                <option value="">--Select--</option>
                                                <option value='Dealer'>Dealer</option>
                                                <option value='Distributor'>Distributor</option>


                                             </select>
                                          </div>
                                       </div>
                                       <div className="col-md-3">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom04">Distributor</label>
                                             <select ref="parentOption" className="form-control" id="distributor" value={this.state.distributor} name="distributor" style={{ paddingTop: '0px' }} onChange={this.handleInput}>
                                                <option value="">Select Distributor</option>
                                                {this.state.distributors.map(nk => {
                                                   return (
                                                      <option key={nk.stockistcode} value={nk.stockistcode}>{nk.name}</option>
                                                   );
                                                })}
                                             </select>
                                          </div>
                                       </div>
                                       <div className="col-md-3">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Name</label>
                                             <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleInput} />
                                          </div>
                                       </div>

                                       <div className="col-md-3">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Country</label>
                                             <select ref="parentOption" className="form-control" id="country" value={this.state.country} name="country" style={{ paddingTop: '0px' }} onChange={this.handlethisinput}>
                                                <option value="">Select Country</option>
                                                {this.state.countries.map(nk => {
                                                   return (
                                                      <option key={nk.countrycode} value={nk.countrycode}>{nk.countryname}</option>
                                                   );
                                                })}
                                             </select>
                                          </div>
                                       </div>

                                       <div className="col-md-3">
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


                                       <div className="col-md-3">
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
                                       <div className="col-md-3">
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

                                       <div className="col-md-3">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Tehsil</label>
                                             <select ref="parentOption" className="form-control" id="tehsil" value={this.state.tehsil} name="tehsil" style={{ paddingTop: '0px' }} onChange={this.handleInput}>
                                                <option value="">Select Tehsil</option>
                                                {this.state.tehsils.map(nk => {
                                                   return (
                                                      <option key={nk.tehsilcode} value={nk.tehsilcode}>{nk.tehsilname}</option>
                                                   );
                                                })}
                                             </select>
                                          </div>
                                       </div>

                                       <div className="col-md-3">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Mobile </label>
                                             <input type="number" className="form-control" id="mobile_no" name="mobile_no" value={this.state.mobile_no} onChange={this.phonevalid} />
                                          </div>
                                       </div>

                                       <div className="col-md-3">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Email ID</label>
                                             <input type="email" className="form-control" id="email_id" name="email_id" value={this.state.email_id} onChange={this.handleInput} />
                                          </div>
                                       </div>
                                       <div className="col-md-3">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Phone No</label>
                                             <input type="number" className="form-control" id="phone_no" name="phone_no" value={this.state.phone_no} onChange={this.phonevalid} />
                                          </div>
                                       </div>
                                       <div className="col-md-3">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Alternative Phone No</label>
                                             <input type="number" className="form-control" id="alt_phone_no" name="alt_phone_no" value={this.state.alt_phone_no} onChange={this.phonevalid} />
                                          </div>
                                       </div>
                                       <div className="col-md-3">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Fax No</label>
                                             <input type="number" className="form-control" id="fax_no" name="fax_no" value={this.state.fax_no} onChange={this.handleInput} />
                                          </div>
                                       </div>
                                   
                                       <div className="col-md-3">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Concern Person</label>
                                             <input type="text" className="form-control" id="concern_person" name="concern_person" value={this.state.concern_person} onChange={this.handleInput} />
                                          </div>
                                       </div>
                                       <div className="col-md-3">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Appoint Date</label>
                                             <input type="datetime-local" className="form-control" id="apt_date" name="apt_date" value={this.state.apt_date} onChange={this.handleInput} />
                                          </div>
                                       </div>
                                      
                                       <div className="col-md-5">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Address</label>
                                             <textarea  className="form-control" id="address" name="address" 
                                             rows="3"
                                                value={this.state.address} onChange={this.handleInput}>
                                                {this.state.address}
                                             </textarea>
                                          </div>
                                       </div>
                                       <div className="col-md-5">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Area</label>
                                             <textarea   className="form-control"  id="area" name="area"
                                              rows="3"
                                               value={this.state.area} onChange={this.handleInput} >
                                                {this.state.area}</textarea>
                                          </div>
                                       </div>
                                       <div className="col-md-2">
                                          <div className="mb-2">
                                             <label className="form-label" htmlFor="validationCustom03">Status </label>
                                             <input
                                                name="status"
                                                style={{ marginLeft: '20px' }}
                                                type="checkbox"
                                                checked={this.state.status}
                                                onChange={this.handleChange} />

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
export default DistributorCreate;