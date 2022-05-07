import React  from 'react';
import Button from 'react-bootstrap/Button';
import { FaSave,FaArrowLeft } from 'react-icons/fa';
import Api from './../../Api/Api'
import { Link } from "react-router-dom";

const loading='';





class ModelCreate extends React.Component {
   constructor(props) {
      super(props);
   
      this.state = {
        products:[],
        countries:[],
         zones:[],
         data: [],
         product:'',
         zone_names:'',
         model_code:'',
         country:'',
         isdcode:'',
         model_name:'',
         cylinder:'',
         loading:false,
      }
  }


 async componentDidMount()
  {

    Api.getData(`/model/create`,'').then((res)=>{
  
    console.log(res);
     this.setState({ products: res.data.products});
    
   })

     
    

  }
 


  submitButton = async (e) => {
    e.preventDefault();
    this.state.loading=true;
   // console.log(e.target.elements);
    let fileData = {product: this.state.product, model_name: this.state.model_name,cylinder: this.state.cylinder};
    console.log('employee => ' + JSON.stringify(fileData));
   
    Api.postData('/model/create', fileData).then(res =>{

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
                   <li className="breadcrumb-item">Model</li>
                   <li className="breadcrumb-item active">Create Model</li>
                   </ol>
                   </div>
                   </div>
                   </div>
                   <div className="row">
                   <div className="col-xl-12">
                  <div className="card">
                  <h5 className="card-header" style={{backgroundColor: 'rgb(163 168 178 / 47%)'}}>
                  Create Model
               
               
                  <Button
                     variant="success"
                     disabled={loading} onClick={!loading ? this.submitButton : null}
                  style={{float:'right' }} 
                  > <FaSave /> {loading ? 'Saving…' : 'Save'}</Button>

<Link to="/model"> <Button  variant="warning"     style={{float:'right',marginRight:'3px'}}>
               <FaArrowLeft />
                     Back
                </Button>  </Link>
                
                </h5>
                 
                  <div className="card-body">
                 <form >
                 <div className="row">
            
         <div className="col-md-4">
          <div className="mb-3">
       <label className="form-label" htmlFor="validationCustom04">Product Name</label>
       <select ref="parentOption" className="form-control" id="product" value={this.state.product}  name="product"  style={{paddingTop:'0px'}}  onChange={this.handleInput}>
                              <option value="">Select Product</option>
                           {this.state.products.map(nk => {
                            return (
                                <option key={nk.productcode} value={nk.productcode}>{nk.productname}</option>
                            );
                        })}
                        </select>
        </div>
       </div>
       <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Model Code</label>
           <input type="text" className="form-control" id="model_code" name="model_code" value={this.state.model_code} onChange={this.handleInput} readOnly/>
         </div>
         </div>
                       
        <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Model Name</label>
           <input type="text" className="form-control" id="model_name" name="model_name" value={this.state.model_name} onChange={this.handleInput} />
         </div>
         </div>
    

     <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Cylinder</label>
           <input type="text" className="form-control" id="cylinder" name="cylinder" value={this.state.cylinder} onChange={this.handleInput} />
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
export default ModelCreate;