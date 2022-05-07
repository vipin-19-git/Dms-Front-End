import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import Api from './../Api/Api'

function Navbar() {
  const base_url = window.location.origin;
  const navigate = useNavigate();
  const [menus, setMenus] = useState([])
  function getMenuList() {
    try {
      const logged_user_name = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')).username : '';
      let payload = { user_name: logged_user_name };
      Api.postData(`/getMenus`, payload)
        .then((response) => {
          if (response.data.status === 200) {
            setMenus(response.data.menus);
          }
          else if (response.data.status === 401) {
            console.log(response.data);
            //  localStorage.clear();
            //  navigate('/');
          }

        })
        .catch((error) => {
          // console.log("hello " +error.response.data);
          console.log('An error occurred:' + error);
        })
    }
    catch (e) {
      console.log('An error occurred:' + e);
      // console.log("hello " +e.response.data)
    }
  }
 
  useEffect(() => {
    getMenuList();
  }, [])

  return (
    <div className="vertical-menu">
      <div className="navbar-brand-box">
        <Link to="/dashboard" className="logo logo-dark">
          <span className="logo-sm">
            <img src={`${base_url}/assets/images/20210824155405.png`} alt="" height="30" width="45" />
          </span>
          <span className="logo-lg">
            <img src={`${base_url}/assets/images/20210824155405.png`} alt="" height="40" />
          </span>
        </Link>
        <Link to="/dashboard" className="logo logo-light">
          <span className="logo-sm">
            <img src={`${base_url}/assets/images/20210824155405.png`} alt="" height="22" />
          </span>
          <span className="logo-lg">
            <img src={`${base_url}/assets/images/20210824155405.png`} alt="" height="40" />
          </span>
        </Link>
      </div>

      <button type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn">
        <i className="fa fa-fw fa-bars"></i>
      </button>
      <div data-simplebar className="sidebar-menu-scroll">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu" >
            <li>
              <Link to="/dashboard">
                <i className="uil-home-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            {menus.map(({ element,fileid,filemenuname,filepath,getMenuList,menu_icon,menuid,menuseq,status }) => (
            <li id={fileid}>
              <Link to="#" className="has-arrow waves-effect">
                <i className={menu_icon}></i>
                <span>{filemenuname}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
              {getMenuList.map(({ element,fileid,filemenuname,filepath,get_sub_menu_list,menu_icon,menuid,
                menuseq,status,user_menu_auth }) => (
                <li id={fileid}><Link to={filepath}>{filemenuname}</Link></li>
                ))} 
              </ul>
            </li>
            ))}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;