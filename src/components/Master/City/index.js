import  React , {useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import {useNavigate } from "react-router-dom";
import { FaPlus,FaPen} from 'react-icons/fa';
import Api from './../../Api/Api'
function Index() {
  const navigate = useNavigate();
  const [states , setstates] = useState([])
  function edit(event,cellValue){
    navigate('/edit-city/'+cellValue.id);   
       // console.log(cellValue.id);
  }
    function addCity()
    {
      navigate('/create-city');   
    }
  
    const columns = [
        { field: 'districtname', headerName: 'District Name', width: 270 },
        { field: 'cityname', headerName: 'City Name', width: 270 },
        { field: 'stdcode', headerName: 'STD Code', width: 270 },
      
       
        {
          field: 'Action',
          headerName: 'Action',
          description: 'It is button so it is not sortable',
          sortable: false,
          width: 100,
          renderCell: (cellValues) => {
              return (
                <Button variant="outline-primary"
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
      const getCityList=async()=>
      {
          try{
            Api.getData("/city", '').then((response)=>{
                console.log(response.data);
                setstates(response.data);
              }) .catch((error) => {
                console.log(error)
                localStorage.clear();
                navigate('/');  
            })
            }
            catch(e)
            {
            console.log(e)
            }
      }
      useEffect(()=>{
        getCityList();
      },[])
  return (
    <div id="layout-wrapper">
    <div className="main-content">
       <div className="page-content">
         <div className="container-fluid">
          <div className="row">
           <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
             <h4 className="mb-0">City</h4>
              <div className="page-title-right">
               <ol className="breadcrumb m-0">
               <li className="breadcrumb-item">Master</li>
               <li className="breadcrumb-item active">City</li>
               </ol>
               </div>
               </div>
               </div>
               <div className="row">
               <div className="col-xl-12">
              <div className="card">
             <h5  style={{backgroundColor: 'rgb(163 168 178 / 47%)'}} className="card-header d-flex justify-content-between align-items-center">
              City  List
              <Button  variant="success"   onClick={addCity}><FaPlus style={{marginRight: '1px',
                  marginLeft: '0px'}}/>
                  Add City</Button>
       
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