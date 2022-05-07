import  React , {useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import {useNavigate } from "react-router-dom";
import { FaPlus,FaPen} from 'react-icons/fa';
import Api from './../../Api/Api'
function Index() {
  const navigate = useNavigate();
    const [states , setstates] = useState([])
    function edit(event,cellValue)
    {
      navigate('/edit-transport/'+cellValue.id);   
       // console.log(cellValue.id);
    }
    function addTransport()
    {
      navigate('/create-transport');   
    }
  
    const columns = [
        { field: 'transportcode', headerName: 'Transporter Code', width: 270 },
        { field: 'transportname', headerName: 'Transporter Name', width: 270 },
        { field: 'statename', headerName: 'State', width: 270 },
        { field: 'districtname', headerName: 'District', width: 270 },
        { field: 'cityname', headerName: 'City', width: 270 },
        { field: 'phone', headerName: 'Phone No', width: 270 },
        { field: 'emailid', headerName: 'Email ID', width: 270 },
        { field: 'faxno', headerName: 'Fax No', width: 270 },
     
      
       
        {
          field: 'Action',
          headerName: 'Action',
          description: 'It is button so it is not sortable',
          sortable: false,
          width: 100,
          renderCell: (cellValues) => {
              return (
                <Button 
                variant="outline-primary"
                size='sm'
                style={{ minWidth:'10px',marginRight: '0px',
                marginLeft: '0px'}}
                  onClick={(event) => {
                    edit(event, cellValues);
                  }}
                   >
                <FaPen style={{marginRight: '0px',
                  marginLeft: '0px'}}/>
                </Button>
              );
            }
        },
      ];
      const getTransportList=async()=>
      {
        
            try{
              Api.getData("transport",'').then((response)=>{
                setstates(response.data);
              }).catch((error) => {
                      console.log(error)
                      // localStorage.clear();
                      // navigate('/');  
                  })
              }
              catch(e)
              {
              console.log(e)
              }
      }
      useEffect(()=>{
        getTransportList();
      },[])
  return (
    <div id="layout-wrapper">
    <div className="main-content">
       <div className="page-content">
         <div className="container-fluid">
          <div className="row">
           <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
             <h4 className="mb-0">Transport</h4>
              <div className="page-title-right">
               <ol className="breadcrumb m-0">
               <li className="breadcrumb-item">Master</li>
               <li className="breadcrumb-item active">Transport</li>
               </ol>
               </div>
               </div>
               </div>
               <div className="row">
               <div className="col-xl-12">
              <div className="card">
             <h5  style={{backgroundColor: 'rgb(163 168 178 / 47%)'}} className="card-header d-flex justify-content-between align-items-center">
              Transport List
           
                   <Button  variant="success"  onClick={addTransport} >
               <FaPlus style={{marginRight: '1px',
                  marginLeft: '0px'}}/>
                  Add State
                </Button>
            </h5>
               <div className="card-body">
             <div style={{ height: 400, width: '100%' }}>
              <DataGrid  rows={states} columns={columns} pageSize={5}
              rowsPerPageOptions={[5]}
            />
           
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