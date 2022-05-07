import React  from 'react';
import Button from 'react-bootstrap/Button';
import { FaSave,FaArrowLeft } from 'react-icons/fa';
import Api from './../../Api/Api'
import { Link } from "react-router-dom";

const loading='';
class EmployeeCreate extends React.Component {
   constructor(props) {
      super(props);
   
      this.state = {
        departments:[],
        designations:[],
     
        emp_name:'',
        department:'',
        designation:'',
        phone_no:'',
        mobile_no:'',
        email_id:'',
        date_of_joining:'',
        reporting_designation:'',
        isGoing: true,
         loading:false,
      }
  }


 async componentDidMount()
  {

    Api.getData(`/employee/create`,'').then((res)=>{
      console.log(res);
     this.setState({ departments: res.data.departments});
     this.setState({ designations: res.data.designations});
   })
  }
 


  submitButton = async (e) => {
    e.preventDefault();
    this.state.loading=true;
   // console.log(e.target.elements);
    let payload = {emp_name: this.state.emp_name, department: this.state.department,designation: this.state.designation,phone_no:this.state.phone_no,mobile_no:this.state.mobile_no,email_id:this.state.email_id,date_of_joining:this.state.date_of_joining,reporting_designation:this.state.reporting_designation,isGoing:this.state.isGoing};
    Api.postData('/employee/create', payload).then(res =>{
  if(res.data.status===200){
       this.state.loading=false;
        this.setState({
         setMFlash:res.data.message,
         className:res.data.class,
         country:'',
         isGoing: true,
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
handlethisinput = (e) => {
   if (e.target.value.length > 10) {
     return false;
    }
    else{ 
    this.setState({[e.target.name]: e.target.value});
    this.setState({ showMessage: false });
    }
}

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value});
    this.setState({ showMessage: false });
}
handleChange = e => this.setState({ isGoing: e.target.checked });
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
                   <li className="breadcrumb-item">Employee</li>
                   <li className="breadcrumb-item active">Create Employee</li>
                   </ol>
                   </div>
                   </div>
                   </div>
                   <div className="row">
                   <div className="col-xl-12">
                  <div className="card">
                  <h5 className="card-header" style={{backgroundColor: 'rgb(163 168 178 / 47%)'}}>
                  Create Employee
               
               
                  <Button
                     variant="success"
                     disabled={loading} onClick={!loading ? this.submitButton : null}
                  style={{float:'right' }} 
                  > <FaSave /> {loading ? 'Saving…' : 'Save'}</Button>

<Link to="/employee"> <Button  variant="warning"     style={{float:'right',marginRight:'3px'}}>
               <FaArrowLeft />
                     Back
                </Button>  </Link>
                
                </h5>
                 
                  <div className="card-body">
                 <form >
                 <div className="row">
            
         
       <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Employee Code</label>
           <input type="text" className="form-control" id="emp_code" name="emp_code" value={this.state.emp_code} onChange={this.handleInput} readOnly/>
         </div>
         </div>
                       
        <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Employee Name</label>
           <input type="text" className="form-control" id="emp_name" name="emp_name" value={this.state.emp_name} onChange={this.handleInput} />
         </div>
         </div>
         <div className="col-md-4">
          <div className="mb-3">
       <label className="form-label" htmlFor="validationCustom04">Department</label>
       <select ref="parentOption" className="form-control" id="department" value={this.state.department}  name="department"  style={{paddingTop:'0px'}}  onChange={this.handleInput}>
                              <option value="">Select Department</option>
                           {this.state.departments.map(nk => {
                            return (
                                <option key={nk.departmentid} value={nk.departmentid}>{nk.departmentname}</option>
                            );
                        })}
                        </select>
        </div>
       </div>
       <div className="col-md-4">
          <div className="mb-3">
       <label className="form-label" htmlFor="validationCustom04">Designation</label>
       <select ref="parentOption" className="form-control" id="designation" value={this.state.designation}  name="designation"  style={{paddingTop:'0px'}}  onChange={this.handleInput}>
                              <option value="">Select Designation</option>
                           {this.state.designations.map(nk => {
                            return (
                                <option key={nk.designationcode} value={nk.designationcode}>{nk.designationname}</option>
                            );
                        })}
                        </select>
        </div>
       </div>

     <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Phone No</label>
           <input type="number"  maxLength={9}
       className="form-control" id="phone_no" name="phone_no" value={this.state.phone_no} onChange={this.handlethisinput} />
         </div>
         </div>
     
     <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Mobile No</label>
           <input type="number" className="form-control" id="mobile_no" name="mobile_no" value={this.state.mobile_no} onChange={this.handlethisinput} />
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
            <label className="form-label" htmlFor="validationCustom03">Date of Joining</label>
           <input type="date" className="form-control" id="date_of_joining" name="date_of_joining" value={this.state.date_of_joining} onChange={this.handleInput} />
         </div>
         </div>
         <div className="col-md-4">
          <div className="mb-3">
       <label className="form-label" htmlFor="validationCustom04"> Reporting Designation</label>
       <select ref="parentOption" className="form-control" id="reporting_designation" value={this.state.reporting_designation}  name="reporting_designation"  style={{paddingTop:'0px'}}  onChange={this.handleInput}>
                              <option value="">Select Designation</option>
                           {this.state.designations.map(nk => {
                            return (
                                <option key={nk.designationcode} value={nk.designationcode}>{nk.designationname}</option>
                            );
                        })}
                        </select>
        </div>
       </div>
       <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Status </label>  
            <input
            name="isGoing"
            style={{marginLeft: '20px'}}
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleChange} />IsActive
          
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
export default EmployeeCreate;