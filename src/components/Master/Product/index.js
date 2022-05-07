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
      navigate('/edit-product/'+cellValue.id);   
       // console.log(cellValue.id);
    }
    function addProduct()
    {
      navigate('/create-product');   
    }
  
    const columns = [
        { field: 'productcode', headerName: 'Product Code', width: 270 },
        { field: 'productname', headerName: 'Product Name', width: 270 },
        { field: 'description', headerName: 'Product Description', width: 270 },
      
       
        {
          field: 'Action',
          headerName: 'Action',
          description: 'It is button so it is not sortable',
          sortable: false,
          width: 100,
          renderCell: (cellValues) => {
              return (
                <Button  variant="outline-primary"
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
      const getProductList=async()=>
      {
          try{
            Api.getData("/product", '').then((response)=>{
              //console.log(data.data);
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
        getProductList();
      },[])
  return (
    <div id="layout-wrapper">
    <div className="main-content">
       <div className="page-content">
         <div className="container-fluid">
          <div className="row">
           <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
             <h4 className="mb-0">Product</h4>
              <div className="page-title-right">
               <ol className="breadcrumb m-0">
               <li className="breadcrumb-item">Master</li>
               <li className="breadcrumb-item active">Product</li>
               </ol>
               </div>
               </div>
               </div>
               <div className="row">
               <div className="col-xl-12">
              <div className="card">
             <h5  style={{backgroundColor: 'rgb(163 168 178 / 47%)'}} className="card-header d-flex justify-content-between align-items-center">
              Product  List
              <Button  variant="success"   onClick={addProduct}><FaPlus style={{marginRight: '1px',
                  marginLeft: '0px'}}/>
                  Add Product</Button>
           
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