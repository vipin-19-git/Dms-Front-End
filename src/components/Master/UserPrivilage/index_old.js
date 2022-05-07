import  React , {useState,useEffect } from 'react';
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import {useNavigate } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
function Index() {
  const navigate = useNavigate();
    const [usernames , setstates] = useState([])
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token").replaceAll('"','')}`
      }

   function edit(event,cellValue)
    {
      navigate('/edit-vehicle/'+cellValue.id);   
       // console.log(cellValue.id);
    }
    function addVehicle()
    {
      navigate('/create-vehicle');   
    }
  
    const columns = [
      { field: 'transportname', headerName: 'Transporter Name', width: 270 },
        { field: 'vehicleno', headerName: 'Vehicle No', width: 270 },
        { field: 'vehiclename', headerName: 'Vehicle Name', width: 270 },
        { field: 'drivername', headerName: 'Driver Name', width: 270 },
       
     
      
       
        {
          field: 'Action',
          headerName: 'Action',
          description: 'It is button so it is not sortable',
          sortable: false,
          width: 100,
          renderCell: (cellValues) => {
              return (
                <Button startIcon={<EditIcon style={{marginRight: '0px',
                  marginLeft: '0px'}}/>}
                  variant="outlined"
                  size='small'
                  style={{ minWidth:'10px',marginRight: '0px',
                  marginLeft: '0px'}}
                  color="primary"
                  onClick={(event) => {
                    edit(event, cellValues);
                  }}
                   >
                
                </Button>
              );
            }
        },
      ];
      const getUserPrivilageList=async()=>
      {
          try{
                const data=await axios.get("http://localhost:85/api/user_privilage", {headers: headers});
                console.log(data.data);
                setstates(data.data);
            }
            catch(e)
            {
            console.log(e)
            }
      }
      useEffect(()=>{
        getUserPrivilageList();
      },[])
  return (
    <div id="layout-wrapper">
    <div className="main-content">
       <div className="page-content">
         <div className="container-fluid">
          <div className="row">
           <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
             <h4 className="mb-0">User Privilage</h4>
              <div className="page-title-right">
               <ol className="breadcrumb m-0">
               <li className="breadcrumb-item">Master</li>
               <li className="breadcrumb-item active">User Privilage</li>
               </ol>
               </div>
               </div>
               </div>
               <div className="row">
               <div className="col-xl-12">
              <div className="card">
             <h5  style={{backgroundColor: 'rgb(163 168 178 / 47%)'}} className="card-header d-flex justify-content-between align-items-center">
             User Privilage List
            <Button size="small"
                  variant="contained"
                  color="success" startIcon={<AddIcon />}  onClick={addVehicle}>Add User Privilage</Button>
            </h5>
               <div className="card-body">
               <div className="row">
               <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">User Name</label>
            <select className="form-control" id="user_type" >
            <option value="">--Select--</option>
            <option value="1">Employee</option>
            <option value="2">Dealer</option>
            <option value="3">Distributor</option>
                            
        </select>
      
         </div>
         </div>
         <div className="col-md-4">
                <div className="mb-3">
            <label className="form-label" htmlFor="validationCustom03">Module</label>
            <select className="form-control" id="user_type" >
            <option value="">--Select--</option>
            <option value="1">Employee</option>
            <option value="2">Dealer</option>
            <option value="3">Distributor</option>
                            
        </select>
         </div>
         </div>
         <div className="col-md-4">
                <div className="mb-3">
                <Button size="small"
                  variant="contained"
                  color="primary"  onClick={addVehicle}>Populate</Button>
         </div>
         </div>
         </div>
         
             <div style={{ height: 400, width: '100%' }}>

            
           
        </div>
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
export default Index;