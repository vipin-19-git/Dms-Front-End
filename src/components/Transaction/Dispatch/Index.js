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
    navigate('/edit-dispatch/' + cellValue.row.id);
  }
const columns = [
    { field: 'despinvoiceno', headerName: 'Invoice no', width: 100 },
    { field: 'orderno', headerName: 'Order no.', width: 100 },
    { field: 'invoicedate', headerName: 'Invoice date', width: 100 },
    { field: 'grno', headerName: 'Gr. no.', width: 100 },
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
  
    { field: 'distributorcode', headerName: 'Distributor', width: 100 ,
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
    { field: 'transportcode', headerName: 'Transporter', width: 100 ,
    valueGetter: (params) => {
      let result = [];
      if (params.row.get_transporter) {
        if (params.row.get_transporter.transportname) {
          result.push(params.row.get_transporter.transportname);
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
    { field: 'vehicle', headerName: 'Vehicle', width: 120 },
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
      const data = await Api.getData("/dispatch", '');
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
                      <li className="breadcrumb-item active">Dispatch</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="card">
                    <h5 style={{ backgroundColor: 'rgb(163 168 178 / 47%)' }}
                      className="card-header d-flex justify-content-between align-items-center">
                      Dispatch List
                      <Link to="/create-dispatch">
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