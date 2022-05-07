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
     const [inputField , setInputField] = useState({zonecode:'',zonename: ''})
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("token").replaceAll('"','')}`
    }
   const  inputsHandler=(e)=>{
      if(e.target.name==="zonename")
        setInputField({...inputField,[e.target.name]:e.target.value});
       } 

  const getZone=async()=>
  {
  
   try{
               
    Api.getData(`/zone/edit/${id}`,'')
     .then((response)=>{
      if (response.data.status === 200 && response.data.action==="Edit") {
          let resp=response.data.result;
          setInputField({zonecode:resp.zonecode,  zonename: resp.zonename })
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
    getZone();
},[])
    function goBack()
    {
      navigate('/zone');   
    }
    const updateZone=async()=>
    {
     
     let post_data={zonename:inputField.zonename};
     setInputField(post_data)
     try{
      setLoading(true);  
      Api.postData(`/zone/edit/${id}`,post_data)
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
                    <li className="breadcrumb-item">Zone</li>
                    <li className="breadcrumb-item active">Edit Zone</li>
                    </ol>
                    </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-xl-12">
                   <div className="card">
                   <h5 className="card-header" style={{backgroundColor: 'rgb(163 168 178 / 47%)'}}>
                   Edit Zone
                   <Button  variant="success" disabled={loading}  
                  onClick={!loading ? updateZone : null} 
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
             <label className="form-label" htmlFor="validationCustom03">Zone Code</label>
            <input type="text" className="form-control" id="zonecode" name="zonecode"
             value={inputField.zonecode} readOnly/>
          </div>
          </div>
          <div className="col-md-4">
           <div className="mb-3">
        <label className="form-label" htmlFor="validationCustom04">Zone Name </label>
       <input type="text" className="form-control"  id="zonename" value={inputField.zonename}  onChange={inputsHandler}
         name="zonename"  required />
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