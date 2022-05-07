import  React , {useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import {useNavigate } from "react-router-dom";
import { FaPlus,FaPen} from 'react-icons/fa';
import Api from './../../Api/Api'
function Index(props) {
  const navigate = useNavigate();
    const [countries , setContries] = useState([])
   function edit(event,cellValue)
    {
      navigate('/edit-country/'+cellValue.id);   
       // console.log(cellValue.id);
    }
    function addCompany()
    {
      navigate('/create-country');   
    }
  
    const columns = [
        { field: 'countrycode', headerName: 'Country code', width: 270 },
        { field: 'countryname', headerName: 'Country name', width: 270 },
        { field: 'isdcode', headerName: 'Isd code', width: 270 },
        {
          field: 'Action',
          headerName: 'Action',
          description: 'It is button so it is not sortable',
          sortable: false,
          width: 100,
          renderCell: (cellValues) => {
              return (
                <Button variant="outline-primary" size='sm' style={{ minWidth:'10px',marginRight: '0px',
                  marginLeft: '0px'}} onClick={(event)=>{ edit(event, cellValues);}}>
                <FaPen style={{marginRight: '0px', marginLeft: '0px'}}/></Button>
                );
             }
        },
      ];
      const getCountryList=async()=>
      {
          try{
               
                Api.getData("/country",'')
                .then((response)=>{
                  if (response.data.status === 200 && response.data.action==="Get") {
                    //props.Alert(response.data.message,'success')
                    setContries(response.data.result);
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
          getCountryList();
      },[])
  return (
    <div id="layout-wrapper">
    <div className="main-content">
       <div className="page-content">
         <div className="container-fluid">
          <div className="row">
           <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
             <h4 className="mb-0">Country</h4>
              <div className="page-title-right">
               <ol className="breadcrumb m-0">
               <li className="breadcrumb-item">Master</li>
               <li className="breadcrumb-item active">Country</li>
               </ol>
               </div>
               </div>
               </div>
               <div className="row">
               <div className="col-xl-12">
              <div className="card">
             <h5  style={{backgroundColor: 'rgb(163 168 178 / 47%)'}}
             className="card-header d-flex justify-content-between align-items-center">
              Country List
             <Button  variant="success"  onClick={addCompany} >
               <FaPlus style={{marginRight: '1px',
                  marginLeft: '0px'}}/>
                  Add Country
                </Button>
            </h5>
               <div className="card-body">
             <div style={{ height: 400, width: '100%' }}>
              <DataGrid  rows={countries} columns={columns} pageSize={5}
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