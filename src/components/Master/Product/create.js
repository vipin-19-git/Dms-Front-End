import React  from 'react';
import Button from 'react-bootstrap/Button';
import { FaSave,FaArrowLeft } from 'react-icons/fa';
import Api from './../../Api/Api'
import { Link } from "react-router-dom";

const loading='';


class ProductCreate extends React.Component {
   constructor(props) {
      super(props);
   
      this.state = {
      
         product_cd:'',
         product_nm:'',
         prod_desc:'',
         
      
         loading:false,
      }
  }




  submitButton = async (e) => {
    e.preventDefault();
    this.state.loading=true;
   // console.log(e.target.elements);
    let fileData = {product_nm: this.state.product_nm,prod_desc: this.state.prod_desc};
  
   
    Api.postData('/product/create',fileData).then(res =>{

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
                   <li className="breadcrumb-item">Product</li>
                   <li className="breadcrumb-item active">Create Product</li>
                   </ol>
                   </div>
                   </div>
                   </div>
                   <div className="row">
                   <div className="col-xl-12">
                  <div className="card">
                  <h5 className="card-header" style={{backgroundColor: 'rgb(163 168 178 / 47%)'}}>
                  Create Product
               
               
                  <Button
                     variant="success"
                     disabled={loading} onClick={!loading ? this.submitButton : null}
                  style={{float:'right' }} 
                  > <FaSave /> {loading ? 'Saving…' : 'Save'}</Button>

<Link to="/product"> <Button  variant="warning"     style={{float:'right',marginRight:'3px'}}>
               <FaArrowLeft />
                     Back
                </Button> </Link>
                
                </h5>
                 
                  <div className="card-body">
                 <form >
                 <div className="row">
               <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Product Code</label>
           <input type="text" className="form-control" id="product_cd" name="product_cd" value={this.state.product_cd} readOnly/>
         </div>
         </div>
        <div className="col-md-4">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="validationCustom03">Product Name</label>
                        <input type="text" className="form-control" id="product_nm" name="product_nm" value={this.state.product_nm} onChange={this.handleInput} />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="validationCustom03">Product Description</label>
                        <input type="text" className="form-control" id="prod_desc" name="prod_desc" value={this.state.prod_desc} onChange={this.handleInput} />
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
export default ProductCreate;