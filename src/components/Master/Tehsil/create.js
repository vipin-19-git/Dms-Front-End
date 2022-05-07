import React  from 'react';
import Button from 'react-bootstrap/Button';
import { FaSave,FaArrowLeft } from 'react-icons/fa';
import Api from './../../Api/Api'
import { Link } from "react-router-dom";

const loading='';
class TehsilCreate extends React.Component {
   constructor(props) {
      super(props);
       this.state = {
         citymaster:[],
          data: [],
         tehsil_cd:'',
         city:'',
         tehsil_name:'',
         loading:false,
      }
  }


 async componentDidMount()
  {
    
    Api.getData(`/tehsil/create`,'').then((res)=>{
    this.setState({ citymaster: res.data.citymaster});
   })
     
 }
 


  submitButton = async (e) => {
    e.preventDefault();
    this.state.loading=true;
   // console.log(e.target.elements);
    let fileData = {city: this.state.city, tehsil_name: this.state.tehsil_name};
   
   
    Api.postData('/tehsil/create', fileData).then(res =>{

      console.log(res.data);
   
         if(res.data.status===200){
            this.state.loading=false;
      this.setState({
         setMFlash:res.data.message,
         className:res.data.class,
         country:'',
         zone_names:'',
         state_name:'',
      
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
                   <li className="breadcrumb-item">Tehsil</li>
                   <li className="breadcrumb-item active">Create Tehsil</li>
                   </ol>
                   </div>
                   </div>
                   </div>
                   <div className="row">
                   <div className="col-xl-12">
                  <div className="card">
                  <h5 className="card-header" style={{backgroundColor: 'rgb(163 168 178 / 47%)'}}>
                  Create Tehsil
               
               
                  <Button
                     variant="success"
                     disabled={loading} onClick={!loading ? this.submitButton : null}
                  style={{float:'right' }} 
                  > <FaSave /> {loading ? 'Saving…' : 'Save'}</Button>


<Link to="/tehsil"> <Button  variant="warning"     style={{float:'right',marginRight:'3px'}}>
               <FaArrowLeft />
                     Back
                </Button>  </Link>
                
                </h5>
                 
                  <div className="card-body">
                 <form >
                 <div className="row">
               <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Tehsil Code</label>
           <input type="text" className="form-control" id="tehsil_cd" name="tehsil_cd" value={this.state.tehsil_cd} readOnly/>
         </div>
         </div>
         <div className="col-md-4">
          <div className="mb-3">
       <label className="form-label" htmlFor="validationCustom04">City</label>
       <select ref="parentOption" className="form-control" id="city" value={this.state.city}  name="city"  style={{paddingTop:'0px'}}  onChange={this.handleInput}>
                              <option value="">Select Cities</option>
                           {this.state.citymaster.map(nk => {
                            return (
                                <option key={nk.citycode} value={nk.citycode}>{nk.cityname}</option>
                            );
                        })}
                        </select>
        </div>
       </div>
      
                   
     
        <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Tehsil Name</label>
           <input type="text" className="form-control" id="tehsil_name" name="tehsil_name" value={this.state.tehsil_name} onChange={this.handleInput} />
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
export default TehsilCreate;