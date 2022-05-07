import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { FaSave, FaFill } from 'react-icons/fa';
import Api from './../../Api/Api'

class UserPrivilage extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         user_name: '',
         module: '',
         usernames: [],
         files: [],
         status: true,
         loading: false,
         ispopulate: false,
         auth_menu: []
      }
   }


   async componentDidMount() {
      try {
         Api.getData(`/user_privilage`, '')
            .then((res) => {
               this.setState({ usernames: res.data });
            })
            .catch((error) => {
               console.log(error)
            })
      }
      catch (e) {
         console.log(e)
      }

   }
   submitButton = async (e) => {
      e.preventDefault();
      this.state.loading = true;
      let files = this.state.files;
      const menus = []; var j = 0;
      for (var i = 0; i < files.length; i++) {
         var obj = files[i];
         if (obj.user_menu_status) {
            menus[j] = obj.fileid
            j++;
         }
      }
      let payload = { user_name: this.state.user_name, module: this.state.module, auth_menu: menus };
      try {
         Api.postData("/user_privilage/save", payload)
            .then((response) => {
               if (response.data.status === 200 && response.data.result === "success") {
                  this.state.loading = false;
                  this.props.Alert(response.data.message, 'success')
               }
               else {
                  this.props.Alert(response.data.message, 'warning')
               }
            })
            .catch((error) => {
               console.log(error)
            })
      }
      catch (e) {
         console.log(e);
      }

   };

   populate = async (e) => {
      e.preventDefault();
      this.setState({ auth_menu: [] });
      if(this.state.user_name!='' && this.state.module!='')
      {
         this.state.ispopulate = true;
      let fileData = { user_name: this.state.user_name, module: this.state.module };
      try {
         Api.postData("/user_privilage/populate", fileData)
            .then((response) => {
               this.state.ispopulate = false;
               this.setState({ files: response.data.filemaster.get_menu_list });
               })
            .catch((error) => {
               console.log(error)
            })
      }
      catch (e) {
         console.log(e);
      }
   }
   else
   {
      this.state.ispopulate = false;
      this.setState({ files: [] });
     this.props.Alert("Usename and module are required !", 'warning')
   }


   };
   handleInput = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   handleChange = e => {

      var all_files = this.state.files;
      var chk = e.target.value;
      var index = all_files.findIndex(img => img.fileid == chk);
      if (e.target.checked) {
         all_files[index].user_menu_status = true;
         this.setState({ files: all_files });
      }
      else {
         all_files[index].user_menu_status = false;
         this.setState({ files: all_files });
      }

   }
   render() {

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
                                    <li className="breadcrumb-item">Master</li>
                                    <li className="breadcrumb-item"> User Privilage</li>
                                    <li className="breadcrumb-item active">Create  User Privilage</li>
                                 </ol>
                              </div>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-xl-12">
                              <div className="card">
                                 <h5 className="card-header" style={{ backgroundColor: 'rgb(163 168 178 / 47%)' }}>
                                    User Privilage List
                                    <Button variant="success" disabled={this.state.loading} onClick={!this.state.loading ?
                                       this.submitButton : null}
                                       style={{ float: 'right' }}>  <FaSave /> {this.state.loading ? 'Saving…' : 'Save'}
                                    </Button>
                                 </h5>

                                 <div className="card-body">
                                    <form >
                                       <div className="row">

                                          <div className="col-md-4">
                                             <div className="mb-3">
                                                <label className="form-label" htmlFor="validationCustom03">User Name</label>
                                                <select className="form-control" id="user_name" value={this.state.user_name} name="user_name" onChange={this.handleInput}>
                                                   <option value="">Select User Name</option>
                                                   {this.state.usernames.map(nk => {
                                                      return (
                                                         <option key={nk.employeecode} value={nk.employeecode}>{nk.username}</option>
                                                      );
                                                   })}
                                                </select>
                                             </div>
                                          </div>

                                          <div className="col-md-4">
                                             <div className="mb-3">
                                                <label className="form-label" htmlFor="validationCustom03">Module</label>
                                                <select className="form-control" id="module" name="module"   onChange={this.handleInput}  value={this.state.module}>
                                                   <option value="">Select Module</option>
                                                   <option value="1">Master</option>
                                                   <option value="2">Transaction</option>
                                                   <option value="3">Report</option>
                                                </select>
                                             </div>

                                          </div>
                                          <div className="col-md-2">
                                             <br />
                                             <Button className="form-control" variant="primary" disabled={this.state.ispopulate} onClick={!this.state.ispopulate ?
                                                this.populate : null}
                                                style={{ marginTop: "8px", width: "101px" }}>  <FaFill /> {this.state.ispopulate ? 'Populating..' : 'Populate'}
                                             </Button>
                                          </div>
                                       </div>
                                   
                                          <fieldset className="border p-2" >
                                          <legend className='float-none w-auto p-2'>Menu List</legend>
                                          <div className="row">
                                             {this.state.files.map(nk => {
                                                return (

                                                   <div className="col-md-3">
                                                      <div class="form-check">
                                                         <input className="form-check-input" type="checkbox" name="auth_menu" checked={nk.user_menu_status} value={nk.fileid} id={nk.fileid}
                                                            onChange={this.handleChange} />
                                                         <label className="form-check-label" >{nk.filemenuname}</label>
                                                      </div>
                                                   </div>

                                                );
                                             }
                                             )}

                                          </div>


                                       </fieldset>

                                    </form>

                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }

}
export default UserPrivilage;