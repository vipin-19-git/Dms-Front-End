import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaSave,FaArrowLeft } from 'react-icons/fa';
import Api from './../../Api/Api';
import { Link } from "react-router-dom";


class VehicleEdit extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
        transporter: [],
        transporter_code: '',
        vehicle_id:'',
        vehicle_no: '',
        vehicle_name: '',
        driver_name: '',
        status: true,
        loading: false,
      }
   }


   async componentDidMount() {
    const pathname=window.location.pathname;
    var arrayPath = pathname.split('/');
    const file_id=arrayPath[2];
     try{
         Api.getData(`/vehicle/edit/${file_id}`,'')
        .then((res)=>{
         this.setState({ transporter: res.data.transportmaster });
         this.setState({vehicle_id:res.data.result.id});
         this.setState({transporter_code:res.data.result.transportcode});
         this.setState({vehicle_no:res.data.result.vehicleno});
         this.setState({vehicle_name:res.data.result.vehiclename});
         this.setState({driver_name:res.data.result.drivername});
        })
        .catch((error) => {
            console.log(error)
        })
      }
    catch(e){
       console.log(e)
      }
    

   }



   submitButton = async (e) => {
      e.preventDefault();
      this.state.loading = true;
      let payload = {vehicle_id:this.state.vehicle_id, transporter_code: this.state.transporter_code,
          vehicle_no: this.state.vehicle_no,vehicle_name:this.state.vehicle_name, driver_name: this.state.driver_name};
         Api.postData(`/vehicle/update`,payload)
          .then((response)=>{
            this.state.loading=false;
                 if (response.data.status === 200 && response.data.result==="success") {
                  this.props.Alert(response.data.message,'success')
               }
             else{
                this.props.Alert(response.data.message,'warning')
              }
          })
          .catch((error) => {
              console.log(error)
          })
        };

   
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
                                 <li className="breadcrumb-item">Vehicle</li>
                                 <li className="breadcrumb-item active">Edit Vehicle</li>
                              </ol>
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-xl-12">
                           <div className="card">
                              <h5 className="card-header" style={{ backgroundColor: 'rgb(163 168 178 / 47%)' }}>
                                 Edit Vehicle
                 <Button  variant="success" disabled={this.state.loading}  onClick={!this.state.loading ? 
                 this.submitButton : null}  style={{float:'right' }}><FaSave />
                  {this.state.loading ? 'Saving…' : 'Save'} </Button>
                 <Link to="/vehicle"> <Button  variant="warning"  style={{float:'right',marginRight:'3px'}}>
                  <FaArrowLeft /> Back</Button></Link>

                              </h5>

                              <div className="card-body">
                                 <form >
                                    <div className="row">


                                      

                                  

                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Transporter Name</label>
                                             <select ref="parentOption" className="form-control" id="transporter_code" value={this.state.transporter_code} name="transporter_code" style={{ paddingTop: '0px' }} onChange={this.handleInput}>
                                                <option value="">Select Transport</option>
                                                {this.state.transporter.map(nk => {
                                                   return (
                                                      <option key={nk.transportcode} value={nk.transportcode}>{nk.transportname}</option>
                                                   );
                                                })}
                                             </select>
                                          </div>
                                       </div>


                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Vehicle No </label>
                                             <input type="text" className="form-control" id="vehicle_no" name="vehicle_no" value={this.state.vehicle_no} onChange={this.handleInput} />
                                             <input type="hidden" className="form-control" id="vehicle_id" name="vehicle_id" value={this.state.vehicle_id} onChange={this.handleInput} />
                                          </div>
                                       </div>

                                      
                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Vehicle Name</label>
                                             <input type="text" className="form-control" id="vehicle_name" name="vehicle_name" value={this.state.vehicle_name} onChange={this.handleInput} />
                                          </div>
                                       </div>
                                       <div className="col-md-4">
                                          <div className="mb-3">
                                             <label className="form-label" htmlFor="validationCustom03">Driver Name</label>
                                             <input type="text" className="form-control" id="driver_name" name="driver_name" value={this.state.driver_name} onChange={this.handleInput} />
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
export default VehicleEdit;