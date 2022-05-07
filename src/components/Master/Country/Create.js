import React, {useState ,useEffect} from "react";
import {useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { FaSave,FaArrowLeft } from 'react-icons/fa';
import Api from './../../Api/Api'
function  Create(props)
   {
    
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [inputField , setInputField] = useState({countryname: '', isdcode: '' })
    const  inputsHandler=(e)=>{
    const re = /^[0-9\b]+$/;
     if (( e.target.value === '' || re.test(e.target.value)) &&  e.target.name==="isdcode") {
       setInputField({...inputField,[e.target.name]:e.target.value});
      }
     else
     {
       if(e.target.name==="countryname")
       {
        setInputField({...inputField,[e.target.name]:e.target.value});
       }
        
     }
      
    }

 const submitButton = () =>{
  setLoading(true);
   let payload= {countryname:inputField.countryname,
    isdcode:inputField.isdcode};
     Api.postData("/country/create",payload)
        .then((response)=>{
          setLoading(false);
          if (response.data.status === 200 && response.data.result==="success") {
            props.Alert(response.data.message,'success')
            setInputField({countryname: '', isdcode: '' })
             }
             else if(response.data.status === 401)
             {
              props.Alert(response.data.message,'warning')
              navigate('/dashboard');  
             }
           else{
             props.Alert(response.data.message,'warning')
            }
        })
        .catch((error) => {
            console.log(error)
        })
  }
  useEffect(()=>{
    submitButton();
},[])
    function goBack()
    {
      navigate('/country');  
    }
   return (
        <div id="layout-wrapper">
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
                    <li className="breadcrumb-item">Country</li>
                    <li className="breadcrumb-item active">Create country</li>
                    </ol>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-xl-12">
                   <div className="card">
                   <h5 className="card-header" style={{backgroundColor: 'rgb(163 168 178 / 47%)'}}>
                   Create country
               <Button  variant="success" disabled={loading}  onClick={!loading ? submitButton : null} 
                style={{float:'right' }}>  <FaSave /> {loading ? 'Saving…' : 'Save'}
              </Button>
               <Button  variant="warning"  onClick={goBack}   style={{float:'right',marginRight:'3px'}}>
               <FaArrowLeft />
                     Back
                </Button>
                
                </h5>

                   <div className="card-body">
                  <form >
                  <div className="row">
                <div className="col-md-4">
                 <div className="mb-3">
             <label className="form-label" htmlFor="validationCustom03">Country Code</label>
            <input type="text" className="form-control" id="countrycode" name="countrycode" readOnly/>
          </div>
          </div>
          <div className="col-md-4">
           <div className="mb-3">
        <label className="form-label" htmlFor="validationCustom04">Country Name </label>
       <input type="text" className="form-control"  id="countryname" value={inputField.countryname}  onChange={inputsHandler}
         name="countryname"  required />
         </div>
        </div>
        <div className="col-md-4">
         <div className="mb-3">
          <label className="form-label" htmlFor="validationCustom05">ISD Code</label>
         <input type="text" className="form-control"  id="isdcode" value={inputField.isdcode} onChange={inputsHandler}  name="isdcode"  required  />
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
   </div>  );

}

export default Create;