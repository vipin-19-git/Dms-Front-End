import React  from 'react';
import Button from 'react-bootstrap/Button';
import { FaSave,FaArrowLeft } from 'react-icons/fa';
import Api from './../../Api/Api';
import { Link } from "react-router-dom";

const loading='';
class CityCreate extends React.Component {
   constructor(props) {
      super(props);
   
      this.state = {
         countries:[],
         statemaster:[],
         districtmaster:[],
         data: [],
         city_cd:'',
         country:'',
         state_names:'',
         district_code:'',
         city_name:'',
         std_code:'',
         loading:false,
      }
  }


 async componentDidMount()
  {
    
    Api.getData(`/city/create`,'').then((res)=>{
  
    console.log(res);
     this.setState({ countries: res.data.countries});
     this.setState({statemaster:res.data.statemaster});
     this.setState({districtmaster:res.data.districtmaster});
   })
  console.log(this.state.zones);

  }
 

  submitButton = async (e) => {
    e.preventDefault();
    this.state.loading=true;
   // console.log(e.target.elements);
    let payload = {country: this.state.country,state_names: this.state.state_names,
       district_code: this.state.district_code,city_name:this.state.city_name,
       std_code:this.state.std_code};
   
    Api.postData('/city/create', payload).then(res =>{
        if(res.data.status===200){
            this.state.loading=false;
      this.setState({
         setMFlash:res.data.message,
         className:res.data.class,
        })
      this.props.Alert(res.data.message,'success')

   }else{
      this.state.loading=true;
      this.props.Alert(res.data.message,'warning')
      this.setState({
         setMFlash:res.data.message,
         className:res.data.class
      })
     }

      });
      
    
    
       

};
  

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value});
    this.setState({ showMessage: false });
}
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
                   <li className="breadcrumb-item">City</li>
                   <li className="breadcrumb-item active">Create City</li>
                   </ol>
                   </div>
                   </div>
                   </div>
                   <div className="row">
                   <div className="col-xl-12">
                  <div className="card">
                  <h5 className="card-header" style={{backgroundColor: 'rgb(163 168 178 / 47%)'}}>
                  Create City
               
                 <Button variant="success"
                     disabled={loading} onClick={!loading ? this.submitButton : null} style={{float:'right' }} 
                  > <FaSave /> {loading ? 'Saving…' : 'Save'}</Button>

              <Link to="/city"> <Button  variant="warning"     style={{float:'right',marginRight:'3px'}}>
               <FaArrowLeft />
                     Back
                </Button>  </Link>
                
                </h5>
                 
                  <div className="card-body">
                 <form >
                 <div className="row">
               <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">City Code</label>
           <input type="text" className="form-control" id="city_cd" name="city_cd" value={this.state.city_cd} readOnly/>
         </div>
         </div>
         <div className="col-md-4">
          <div className="mb-3">
       <label className="form-label" htmlFor="validationCustom04">Country</label>
       <select ref="parentOption" className="form-control" id="country" value={this.state.country}  name="country"  style={{paddingTop:'0px'}}  onChange={this.handleInput}>
                              <option value="">Select Country</option>
                           {this.state.countries.map(nk => {
                            return (
                                <option key={nk.countrycode} value={nk.countrycode}>{nk.countryname}</option>
                            );
                        })}
                        </select>
        </div>
       </div>
      
                        <div className="col-md-4">
                         <div className="mb-3">
                           <label for="pwd">State<span style={{color:'red'}}>*</span>:</label>
                         <select ref="parentOption" className="form-control" id="state_names" value={this.state.state_names}  name="state_names"  style={{paddingTop:'0px'}}  onChange={this.handleInput}>
                              <option value="">Select State Name</option>
                           {this.state.statemaster.map(nk => {
                            return (
                                <option key={nk.statecode} value={nk.statecode}>{nk.statename}</option>
                            );
                        })}
                        </select>
                        </div>
                        </div>

                        <div className="col-md-4">
                         <div className="mb-3">
                           <label for="pwd">District<span style={{color:'red'}}>*</span>:</label>
                         <select ref="parentOption" className="form-control" id="district_code" value={this.state.district_code}  name="district_code"  style={{paddingTop:'0px'}}  onChange={this.handleInput}>
                              <option value="">Select District Name</option>
                           {this.state.districtmaster.map(nk => {
                            return (
                                <option key={nk.districtcode} value={nk.districtcode}>{nk.districtname}</option>
                            );
                        })}
                        </select>
                        </div>
                        </div>
     
                <div className="col-md-4">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="validationCustom03">City Name</label>
                        <input type="text" className="form-control" id="city_name" name="city_name" value={this.state.city_name} onChange={this.handleInput} />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="validationCustom03">STD Code</label>
                        <input type="text" className="form-control" id="std_code" name="std_code" value={this.state.std_code} onChange={this.handleInput} />
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
export default CityCreate;