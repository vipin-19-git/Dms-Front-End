import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import { useNavigate,Link } from "react-router-dom";
import { FaPlus, FaPen } from 'react-icons/fa';
import Api from '../../Api/Api'
function Index() {
  const navigate = useNavigate();
  const [list, setList] = useState([])
  function edit(event, cellValue) {
    navigate('/edit-distributor-dispatch/' + cellValue.row.id);
  }
const columns = [
    { field: 'despinvoiceno', headerName: 'Invoice no', width: 100 },
    { field: 'invoicedate', headerName: 'Invoice date', width: 100 },
    { field: 'distributorcode', headerName: 'Distributor Name', width: 180 ,
    valueGetter: (params) => {
        //getDistributor
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
    { field: 'dealercode', headerName: 'Dealer Name', width: 180 ,
    valueGetter: (params) => {
        //getDealer
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
    { field: 'orderno', headerName: 'Dealer Order no.', width: 180 },
    { field: 'dispatchstatus', headerName: 'Status	', width: 100,
    valueGetter: (params) => {
      let result = [];
      if (params.row.dispatchstatus) {
        if (params.row.dispatchstatus==1) {
          result.push("Dispatched");
        }
        else if (params.row.dispatchstatus==2) {
          result.push("Cancel");
        }
         else {
          result.push("Partial Dispatch");
        }

      } else {
        result = [""];
      }
      return result.join(", ");
    }
  },
    { field: 'remarks', headerName: 'Remark', width: 170 },
    { field: 'preparedby', headerName: 'Prepared by', width: 150 },
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
  const getAllDispatch = async () => {
    try {
      const data = await Api.getData("/distributor-dispatch", '');
      setList(data.data.result);
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getAllDispatch();
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
                      <li className="breadcrumb-item active">Distributor Dispatch</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <h5 style={{ backgroundColor: 'rgb(163 168 178 / 47%)' }}
                      className="card-header d-flex justify-content-between align-items-center">
                      Distributor Dispatch List
                      <Link to="/create-distributor-dispatch">
                      <Button variant="success">
                        <FaPlus style={{
                          marginRight: '1px',
                          marginLeft: '0px'
                        }} />
                        Add New Dispatch
                      </Button>
                     </Link>
                    </h5>
                    <div className="card-body">
                      <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={list} columns={columns} pageSize={5}
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