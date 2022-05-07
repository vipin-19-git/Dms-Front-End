import React  from 'react';
import Button from 'react-bootstrap/Button';
import { FaSave,FaArrowLeft } from 'react-icons/fa';
import Api from './../../Api/Api'
import { Link } from "react-router-dom";

const loading='';
class AreaCreate extends React.Component {
   constructor(props) {
      super(props);
   
      this.state = {
        countries:[],
        statemaster:[],
         data: [],
         state_names:'',
         area_cd:'',
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

   Api.getData(`/area/edit/${file_id}`,'').then((res)=>{
  
    console.log(res.data.result.statecode);
    this.setState({area_cd:res.data.result.areacode})
    this.setState({country:res.data.result.countrycode})
   
    this.setState({state_names:res.data.result.statecode})
    this.setState({area_name:res.data.result.areaname})
    
    
     this.setState({ countries: res.data.countries});
     this.setState({statemaster:res.data.statemaster});


   }) 
     console.log(this.state.state_id);

  }

 

  submitButton = async (e) => {
    e.preventDefault();
    this.state.loading=true;
   // console.log(e.target.elements);
    let fileData = {area_cd: this.state.area_cd, country: this.state.country, state_names: this.state.state_names,area_name:this.state.area_name};
    console.log('employee => ' + JSON.stringify(fileData));
   
    Api.postData('/area/update', fileData).then(res =>{

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
                   <li className="breadcrumb-item">Area</li>
                   <li className="breadcrumb-item active">Create Area</li>
                   </ol>
                   </div>
                   </div>
                   </div>
                   <div className="row">
                   <div className="col-xl-12">
                  <div className="card">
                  <h5 className="card-header" style={{backgroundColor: 'rgb(163 168 178 / 47%)'}}>
                  Update Area
               
               
                  <Button
                     variant="success"
                     disabled={loading} onClick={!loading ? this.submitButton : null}
                  style={{float:'right' }} 
                  > <FaSave /> {loading ? 'Updating…' : 'Update'}</Button>

<Link to="/area"> <Button  variant="warning"     style={{float:'right',marginRight:'3px'}}>
               <FaArrowLeft />
                     Back
                </Button>  </Link>
                
                </h5>
                 
                  <div className="card-body">
                 <form >
                 <div className="row">
               <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Area Code</label>
           <input type="text" className="form-control" id="area_cd" name="area_cd" value={this.state.area_cd} readOnly/>
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
            <label className="form-label" htmlFor="validationCustom03">Area Name</label>
           <input type="text" className="form-control" id="area_name" name="area_name" value={this.state.area_name} onChange={this.handleInput} />
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
export default AreaCreate;