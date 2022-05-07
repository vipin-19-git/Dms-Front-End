import React from 'react';
import Api from './../Api/Api';
import { useNavigate,Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
function Header(props) {
    const base_url = window.location.origin;
    const navigate = useNavigate();
    const loggedUser = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).username : '';
    
    let alertStyle = {
        padding: "10px",
        right: "0px",
        width: "33%",
        position: "absolute",
        zindex: "9999 !important"
    }
    function handleLogOut() {
        try{
            const logged_user_name = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).username : '';
            let payload = { user_name: logged_user_name};
            Api.postData(`/logout`,payload)
           .then((response)=>{
            if (response.data.status === 200) {
                props.changeAuth(false);
                localStorage.clear();
                navigate('/');
          }
          else if(response.data.status === 401){
                  props.changeAuth(false);
                 localStorage.clear();
                 navigate('/');
          }
            
           })
           .catch((error) => {
            console.log('An error occurred:' +error); 
           })
         }
       catch(e){
        console.log('An error occurred:' +e); 
         
         }
       

    }

    return (
        <header id="page-topbar">
            <div className="navbar-header">
                <div className="d-flex">
                    <div className="navbar-brand-box">
                        <a href="index.html" className="logo logo-dark">
                            <span className="logo-sm">
                                <img src={`${base_url}/assets/images/logo-sm.png`} alt="" height="22" />
                            </span>
                            <span className="logo-lg">
                                <img src={`${base_url}/assets/images/20210824155405.png`} alt="" height="20" />
                            </span>
                        </a>

                        <a href="index.html" className="logo logo-light">
                            <span className="logo-sm">
                                <img src={`${base_url}/assets/images/logo-sm.png`} alt="" height="22" />
                            </span>
                            <span className="logo-lg">
                                <img src={`${base_url}/assets/images/logo-light.png`} alt="" height="20" />
                            </span>
                        </a>
                    </div>

                    <button type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn">
                        <i className="fa fa-fw fa-bars"></i>
                    </button>

                    <form className="app-search d-none d-lg-block">
                        <div className="position-relative">
                            <input type="text" className="form-control" placeholder="Search..." />
                            <span className="uil-search"></span>
                        </div>
                    </form>
                </div>

                <div className="d-flex">

                    <div className="dropdown d-inline-block d-lg-none ms-2">
                        <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-search-dropdown"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="uil-search"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                            aria-labelledby="page-header-search-dropdown">

                            <form className="p-3">
                                <div className="m-0">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="dropdown d-inline-block">
                        <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="uil-bell"></i>
                            <span className="badge bg-danger rounded-pill">3</span>
                        </button>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                            aria-labelledby="page-header-notifications-dropdown">
                            <div className="p-3">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h5 className="m-0 font-size-16"> Notifications </h5>
                                    </div>
                                    <div className="col-auto">
                                        <a href="#!" className="small"> Mark all as read</a>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2 border-top">
                                <div className="d-grid">
                                    <Link className="btn btn-sm btn-link font-size-14 text-center" to="#">
                                        <i className="uil-arrow-circle-right me-1"></i> View More..
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dropdown d-inline-block">
                        <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <img className="rounded-circle header-profile-user" src={`${base_url}/assets/images/users/avatar-4.jpg`}
                                alt="Header Avatar" />
                            <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">
                                {loggedUser}</span>
                            <i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
                        </button>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" onClick={handleLogOut}><i className="uil uil-sign-out-alt font-size-18 align-middle me-1 text-muted"></i> <span className="align-middle">Sign out</span></a>
                        </div>
                    </div>
                     <div style={alertStyle}>
                        {props.Alertmsg ?
                            <Alert variant="filled" closeText='Close' onClose={props.closeAlert} severity={props.Alertcls}>
                                {props.Alertmsg}
                            </Alert> : null}

                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;