import React  from 'react';

import Button from 'react-bootstrap/Button';
import { FaSave,FaArrowLeft } from 'react-icons/fa';

import Api from './../../Api/Api';
import { Link } from "react-router-dom";
const loading='';
class StateEdit extends React.Component {
   constructor(props) {
      super(props);
   
      this.state = {
        countries:[],
         zones:[],
         data: [],
         zone_names:'',
         state_id:'',
         country:'',
         isdcode:'',
         loading:false,
      }
  }


 async componentDidMount()
  {
    const pathname=window.location.pathname;
    var arrayPath = pathname.split('/');
    const file_id=arrayPath[2];
   console.log(file_id);

   Api.getData(`/state/edit/${file_id}`,'').then((response)=>{
  
    console.log(response.data.result.statecode);
    this.setState({state_id:response.data.result.statecode})
    this.setState({country:response.data.result.countrycode})
    this.setState({zone_names:response.data.result.zonecode})
    this.setState({state_name:response.data.result.statename})
    
   
     this.setState({ countries: response.data.countries});
     this.setState({zones:response.data.zones});
   }).catch((error) => {
      console.log(error)

  })
 console.log(this.state.state_id);
}

  
 


  submitButton = async (e) => {
    e.preventDefault();
    this.state.loading=true;
   // console.log(e.target.elements);
    let payload = {state_id:this.state.state_id,country: this.state.country, zone_names: this.state.zone_names, state_name: this.state.state_name};
    
   
    Api.postData('/state/update', payload).then(res =>{

      console.log(res.data);
   
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
      setTimeout(() => {
         this.setState({
            setMFlash:'',
            className:''
         })
      }, 5000);

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
                   <li className="breadcrumb-item">State</li>
                   <li className="breadcrumb-item active">Update State</li>
                   </ol>
                   </div>
                   </div>
                   </div>
                   <div className="row">
                   <div className="col-xl-12">
                  <div className="card">
                  <h5 className="card-header" style={{backgroundColor: 'rgb(163 168 178 / 47%)'}}>
                  Update State
                  <Button
                     variant="success"
                     disabled={loading} onClick={!loading ? this.submitButton : null}
                  style={{float:'right' }} 
                  > <FaSave /> {loading ? 'Saving…' : 'Save'}</Button>
               
                

<Link to="/state"> <Button  variant="warning"     style={{float:'right',marginRight:'3px'}}>
               <FaArrowLeft />
                     Back
                </Button> </Link>
                
                </h5>
                 
                  <div className="card-body">
                 <form >
                 <div className="row">
               <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">State ID</label>
           <input type="text" className="form-control" value={this.state.state_id} id="state_id" name="state_id" readOnly/>
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
                           <label for="pwd">Zone Name<span style={{color:'red'}}>*</span>:</label>
                         <select ref="parentOption" className="form-control" id="zone_names" value={this.state.zone_names}  name="zone_names"  style={{paddingTop:'0px'}}  onChange={this.handleInput}>
                              <option value="">Select Zone Name</option>
                           {this.state.zones.map(nk => {
                            return (
                                <option key={nk.zonecode} value={nk.zonecode}>{nk.zonename}</option>
                            );
                        })}
                        </select>
                        </div>
                        </div>
     
        <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">State Name</label>
           <input type="text" className="form-control" id="state_name" name="state_name" value={this.state.state_name} onChange={this.handleInput} />
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
export default StateEdit;