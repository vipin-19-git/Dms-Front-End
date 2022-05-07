import React, {useState,useEffect } from "react";
import Api from './../../Api/Api'
import {useNavigate,useParams  } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { FaSave,FaArrowLeft } from 'react-icons/fa';
function  Create(props)
   {
    const navigate = useNavigate();
    let { id } = useParams();
    const [loading, setLoading] = React.useState(false);
     const [inputField , setInputField] = useState({countrycode:'',countryname: '', isdcode: '' })
    
   const  inputsHandler=(e)=>{
    const re = /^[0-9\b]+$/;
     if ((e.target.value === '' || re.test(e.target.value)) && e.target.name==="isdcode") {
       setInputField({...inputField,[e.target.name]:e.target.value});
      }
     else
     {
       if(e.target.name==="countryname")
        setInputField({...inputField,[e.target.name]:e.target.value});
     }
      
    } 

  const getCountry=async()=>
  {
 
   try{
               
    Api.getData(`/country/edit/${id}`,'')
     .then((response)=>{
      if (response.data.status === 200 && response.data.action==="Edit") {
          let resp=response.data.result;
          setInputField({countrycode:resp.countrycode,
           countryname: resp.countryname, isdcode: resp.isdcode })
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
        //localStorage.clear();
       // navigate('/');  
    })
}
catch(e)
{
  console.log(e)
  localStorage.clear();
  navigate('/');  
}

}
useEffect(()=>{
    getCountry();
},[])
    function goBack()
    {
      navigate('/country');  
    }
    const updateCountry=async()=>
    {
      let post_data={countryname:inputField.countryname,isdcode:inputField.isdcode};
      setInputField(post_data);
    try{
      setLoading(true);  
      Api.postData(`/country/edit/${id}`,post_data)
       .then((response)=>{
        setLoading(false);
        console.log(response);
        if (response.data.status == 200 && response.data.action=="update") {
            props.Alert(response.data.message,'success')
           }
         else{
               props.Alert(response.data.message,'warning')
            }
        })
      .catch((error) => {
          console.log(error)
          //localStorage.clear();
         // navigate('/');  
      })
  }
  catch(e)
  {
    console.log(e)
    localStorage.clear();
    navigate('/');  
  }
  
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
                    <li className="breadcrumb-item active">Edit country</li>
                    </ol>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-xl-12">
                   <div className="card">
                   <h5 className="card-header" style={{backgroundColor: 'rgb(163 168 178 / 47%)'}}>
                   Edit country
        
                  <Button  variant="success" disabled={loading}  
                  onClick={!loading ? updateCountry : null} 
             style={{float:'right' }}>  <FaSave /> {loading ? 'Updating…' : 'Update'}
              </Button>
                    <Button  variant="warning"  onClick={goBack} 
                      style={{float:'right',marginRight:'3px'}}>
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
            <input type="text" className="form-control" id="countrycode" name="countrycode"
             value={inputField.countrycode} readOnly/>
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
   </div>
           
          );

}

export default Create;