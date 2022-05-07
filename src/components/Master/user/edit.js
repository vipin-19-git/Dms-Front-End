import React  from 'react';
import Button from 'react-bootstrap/Button';
import { FaSave,FaArrowLeft } from 'react-icons/fa';
import { Link,useParams } from "react-router-dom";
import Api from './../../Api/Api';
function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}
class Edit extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         user_data:[],
         user_type:'',
         emp_code:'',
         user_name:'',
         user_password:'',
         confirm_password:'',
         status: true,
         loading:false,
      }
  }
  async componentDidMount()
  {
    
    const  {id} =this.props.params;
    console.log(id);
    try{
        Api.getData(`/user/edit/${id}`,'')
       .then((res)=>{

          Api.getData(`/user/getUserName/${res.data.result.user_type}`,'')
         .then((response)=>{
            this.setState({ user_data: response.data });
         })
         .catch((err) => {
             console.log(err)
         })
         var empcode="";
      if(res.data.result.hasOwnProperty('get_emp_name') && res.data.result.get_emp_name!=null)
      {
        empcode=res.data.result.get_emp_name.employeecode;
      }
      if(res.data.result.hasOwnProperty('get_stockist') && res.data.result.get_stockist!=null)
      {
        empcode=res.data.result.get_stockist.distributorcode;
      }
        this.setState({
            user_type:res.data.result.user_type,
            emp_code:empcode,
            user_name: res.data.result.username,
            user_password:'',
            confirm_password:'',
            status: res.data.result.isactive,
            loading:false,
         });

       })
       .catch((error) => {
           console.log(error)
       })
     }
   catch(e){
      console.log(e)
     }
   }

handlethisinput =(e) => {
  if(e.target.name == 'user_type')
    {
     let user_type= e.target.value;
       try{
          Api.getData(`/user/getUserName/${user_type}`,'')
         .then((res)=>{
            this.setState({ user_data: res.data });
         })
         .catch((error) => {
             console.log(error)
         })
       }
     catch(e){
        console.log(e)
       }
    }

      this.setState({ [e.target.name]: e.target.value });
   
    
   
 }
  submitButton = async (e) => {
    e.preventDefault();
    const  {id} =this.props.params;
   this.state.loading=true; 
    let payload = {
        emp_code: this.state.emp_code,
        user_name: this.state.user_name,
        user_type:this.state.user_type,
        user_password: this.state.user_password,
        confirm_password:this.state.confirm_password,
        status:this.state.status
      };
    Api.postData(`/user/edit/${id}`,payload)
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
    this.setState({[e.target.name]: e.target.value});
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
                   <li className="breadcrumb-item">User</li>
                   <li className="breadcrumb-item active">Create User</li>
                   </ol>
                   </div>
                   </div>
                   </div>
                   <div className="row">
                   <div className="col-xl-12">
                  <div className="card">
                  <h5 className="card-header" style={{backgroundColor: 'rgb(163 168 178 / 47%)'}}>
                  Edit User
                 <Button  variant="success" disabled={this.state.loading}  onClick={!this.state.loading ? this.submitButton : null} 
                style={{float:'right' }}>  <FaSave /> {this.state.loading ? 'Saving…' : 'Save'}
              </Button>
              <Link to="/user"> <Button  variant="warning"  style={{float:'right',marginRight:'3px'}}>
               <FaArrowLeft />
                     Back
                </Button></Link>
                
                </h5>
                 
                  <div className="card-body">
                 <form >
                 <div className="row">
         
         <div className="col-md-4">
          <div className="mb-3">
       <label className="form-label" htmlFor="validationCustom04">User Type</label>
       <select ref="parentOption" className="form-control" id="user_type" value={this.state.user_type}  name="user_type"  style={{paddingTop:'0px'}}  onChange={this.handlethisinput}>
            <option value="">--Select--</option>
            <option value="EMPLOYEE">Employee</option>
            <option value="DEALER">Dealer</option>
            <option value="DISTRIBUTOR">Distributor</option>
                            
        </select>
        </div>
       </div>
      
        <div className="col-md-4">
           <div className="mb-3">
                           <label for="pwd">User Name<span style={{color:'red'}}>*</span>:</label>
                         <select ref="parentOption" className="form-control" id="emp_code" value={this.state.emp_code}  name="emp_code"  style={{paddingTop:'0px'}}  onChange={this.handleInput}>
                              <option value="">Select User Name</option>
                           
                                {
                                  this.state.user_data.map(nk => {
                                    return (
                                        <option key={nk.stockistcode} value={nk.stockistcode}>{nk.name}</option>
                                    );
                                    })
                             }
                        </select>
                        </div>
                        </div>
     
           <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">User Name</label>
           <input type="text" className="form-control" id="user_name" name="user_name" value={this.state.user_name} onChange={this.handleInput} />
         </div>
         </div>
         <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Password</label>
           <input type="password" className="form-control" id="user_password" name="user_password" value={this.state.user_password} onChange={this.handleInput} />
         </div>
         </div>
         <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Confirm Password</label>
           <input type="password" className="form-control" id="confirm_password" name="confirm_password" value={this.state.confirm_password} onChange={this.handleInput} />
         </div>
         </div>
         <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Status </label>  
            <input
            name="status"
            style={{marginLeft: '20px'}}
            type="checkbox"
            checked={this.state.status}
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

export default withParams(Edit);