import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import { useNavigate,Link } from "react-router-dom";
import { FaPlus, FaPen } from 'react-icons/fa';
import Api from '../../Api/Api'
function Index() {
  const navigate = useNavigate();
  const [countries, setContries] = useState([])
  function edit(event, cellValue) {
    navigate('/edit-dobooking/' + cellValue.row.id);
}
 
  const columns = [
    { field: 'orderno', headerName: 'Order No.', width: 170 },
    { field: 'bookingdate', headerName: 'Booking Date', width: 190 },
    { field: 'distributorcode', headerName: 'Distributor Code', width: 270 },
    { field: 'status', headerName: 'Status', width: 170 },
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
            style={{
              minWidth: '10px', marginRight: '0px',
              marginLeft: '0px'
            }}

            onClick={(event) => {
              edit(event, cellValues);
            }}
          >
            <FaPen style={{
              marginRight: '0px',
              marginLeft: '0px'
            }} />
          </Button>
        );
      }
    },
  ];
  const getBookingList = async () => {
    try {
      const data = await Api.getData("/dobooking", '');
      setContries(data.data);
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getBookingList();
  }, [])
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
                      <li className="breadcrumb-item">Transaction</li>
                      <li className="breadcrumb-item active">Distributor Order Booking</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <h5 style={{ backgroundColor: 'rgb(163 168 178 / 47%)' }}
                      className="card-header d-flex justify-content-between align-items-center">
                      Distributor Order Booking List
                     <Link to="/create-dobooking"> <Button variant="success" >
                        <FaPlus style={{
                          marginRight: '1px',
                          marginLeft: '0px'
                        }} />
                        Add New Order
                      </Button>
                      </Link>
                    </h5>
                    <div className="card-body">
                      <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={countries} columns={columns} pageSize={5}
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