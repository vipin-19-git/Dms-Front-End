import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import { useNavigate,Link } from "react-router-dom";
import { FaPlus, FaPen } from 'react-icons/fa';
import Api from '../../Api/Api'
function Index() {
  const navigate = useNavigate();
  const [bookings, setBooking] = useState([])
  function edit(event, cellValue) {
    navigate('/edit-dlrbooking/' + cellValue.row.id);
  }
const columns = [
    { field: 'orderno', headerName: 'Order No.', width: 150 },
    { field: 'dealer',
      headerName: 'Dealer Name',
      width: 200,
      valueGetter: (params) => {
        let result = [];
        if (params.row.get_dealer) {
          if (params.row.get_dealer.name) {
            result.push(params.row.get_dealer.name);
          }
          else {
            result = [""];
          }

        } else {
          result = [""];
        }
        return result.join(", ");
      }
  
  },
    { field: 'distributor', headerName: 'Distributor Name', width: 200 ,
    valueGetter: (params) => {
      let result = [];
      if (params.row.get_distributor) {
        if (params.row.get_distributor.name) {
          result.push(params.row.get_distributor.name);
        }
        else {
          result = [""];
        }

      } else {
        result = [""];
      }
      return result.join(", ");
    }

  },
    { field: 'bookingdate', headerName: 'Booking Date', width: 150 },
    { field: 'preparedby', headerName: 'Prepared By	', width: 150 },
    { field: 'status', headerName: 'Status	', width: 100,
    valueGetter: (params) => {
      let result = [];
      if (params.row.status) {
        if (params.row.status==1) {
          result.push("Booked");
        }
        else if (params.row.status==2) {
          result.push("Confirm");
        }
         else {
          result.push("Cancel");
        }

      } else {
        result = [""];
      }
      return result.join(", ");
    }
  },
    { field: 'get_state.statename', headerName: 'StateName	', width: 170 ,
    valueGetter: (params) => {
      let result = [];
      if (params.row.get_state) {
        if (params.row.get_state.statename) {
          result.push(params.row.get_state.statename);
        }
        else {
          result = [""];
        }

      } else {
        result = [""];
      }
      return result.join(", ");
    }

  },
    { field: 'remarks', headerName: 'Remarks	', width: 170 },
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
      const data = await Api.getData("/dlrbooking", '');
      setBooking(data.data.result);
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
                      <li className="breadcrumb-item active">Dealer Order Booking</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <h5 style={{ backgroundColor: 'rgb(163 168 178 / 47%)' }}
                      className="card-header d-flex justify-content-between align-items-center">
                      Dealer Order Booking
                    <Link to="/create-dlrbooking" > <Button variant="success">
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
                        <DataGrid rows={bookings} columns={columns} pageSize={5}
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