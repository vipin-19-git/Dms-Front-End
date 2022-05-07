import React, { useState } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
const coworkers = [
    { first_name: 'Max', last_name: 'Mustermann', status: true },
    { first_name: 'Vladimir', last_name: 'Leles', status: false },
    { first_name: 'Tobias', last_name: 'Anhalt', status: false },
];
const CoworkerList = (props) => {
    const [state, setState] = useState( coworkers);
   function inputsHandler(ostatus,index)
   {
    let temp_state = [...state];
	let temp_element = { ...temp_state[index] };
	temp_element.status = ostatus;
	temp_state[index] = temp_element;
	setState( temp_state );
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
                                            <li className="breadcrumb-item">Transaction</li>
                                            <li className="breadcrumb-item">Dispatch</li>
                                            <li className="breadcrumb-item active">Create Dispatch</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-md-12" >
                                    <div className="table-responsive">
                                        <table className="table table-striped mb-0">
                                            <thead>
                                                <tr>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                    <th>Status</th>
                                                    <th>Change Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {state.map((data, index) => {
                                                    const { first_name, last_name, status } = data;
                                                   
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {first_name}
                                                            </td>
                                                            <td>
                                                                {last_name}
                                                            </td>
                                                            <td> {status ? 'Present' : 'Absent'}    
                                                            </td>
                                                            <td><BootstrapSwitchButton checked={status} onstyle="success" onChange={() => inputsHandler(!status,index)}/></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CoworkerList;