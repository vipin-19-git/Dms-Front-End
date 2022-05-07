import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,useNavigate,useParams  } from 'react-router-dom';

import Login from  './Login'
import Dashboard from './components/Dashboard';
import CountryIndex from './components/Master/Country/Index';
import ZoneIndex from './components/Master/Zone/index';
import ZoneCreate from './components/Master/Zone/create';
import ZoneEdit from './components/Master/Zone/edit';
import CountryCreate from './components/Master/Country/Create';
import CountryEdit from './components/Master/Country/Edit';

import StateIndex from './components/Master/State/index';
import StateCreate from './components/Master/State/create';
import StateEdit from './components/Master/State/edit';

import AreaIndex from './components/Master/Area/index';
import AreaCreate from './components/Master/Area/create';
import AreaEdit from './components/Master/Area/edit';

import DistrictIndex from './components/Master/District/index';
import DistrictCreate from './components/Master/District/create';
import DistrictEdit from './components/Master/District/edit';

import CityIndex from './components/Master/City/index';
import CityCreate from './components/Master/City/create';
import CityEdit from './components/Master/City/edit';

import ProductIndex from './components/Master/Product/index';
import ProductCreate from './components/Master/Product/create';
import ProductEdit from './components/Master/Product/edit';

import ModelIndex from './components/Master/model/index';
import ModelCreate from './components/Master/model/create';
import ModelEdit from './components/Master/model/edit';

import EmployeeIndex from './components/Master/employee/index';
import EmployeeCreate from './components/Master/employee/create';
import EmployeeEdit from './components/Master/employee/edit';

import DistributorIndex from './components/Master/Distributor/index';
import DistributorCreate from './components/Master/Distributor/create';
import DistributorEdit from './components/Master/Distributor/edit';

import UserIndex from './components/Master/user/index';
import UserCreate from './components/Master/user/create';
import UserEdit from './components/Master/user/edit';

import TransportIndex from './components/Master/Transport/index';
import TranportCreate from './components/Master/Transport/create';
import TransportEdit from './components/Master/Transport/edit';

import VehicleIndex from './components/Master/Vehicle/index';
import VehicleCreate from './components/Master/Vehicle/create';
import VehicleEdit from './components/Master/Vehicle/edit';

import TehsilIndex from './components/Master/Tehsil/index';
import TehsilCreate from './components/Master/Tehsil/create';
import TehsilEdit from './components/Master/Tehsil/edit';

import UserPrivilage from './components/Master/UserPrivilage/index';

import DoBookingIndex from './components/Transaction/DistributorOrderBooking/Index';
import DoBookingCreate from './components/Transaction/DistributorOrderBooking/Create';
import DoBookingEdit from './components/Transaction/DistributorOrderBooking/Edit';

import DlrBookingIndex from './components/Transaction/DealerOrderBooking/Index';
import DlrBookingCreate from './components/Transaction/DealerOrderBooking/Create';
import DlrBookingEdit from './components/Transaction/DealerOrderBooking/Edit';

import DisptchIndex from './components/Transaction/Dispatch/Index';
import DispatchCreate from './components/Transaction/Dispatch/Create';
import DispatchEdit from './components/Transaction/Dispatch/Edit';

import DistDispReceiveCreate from './components/Transaction/DistributorDispatchReceive/Create';

import DistributorDispatchIndex from './components/Transaction/DistributorDispatch/Index';
import DistributorDispatchCreate from './components/Transaction/DistributorDispatch/Create';
import DistributorDispatchEdit from './components/Transaction/DistributorDispatch/Edit';

import DlrDispReceiveCreate from './components/Transaction/DealerDispatchRecieve/Create';

import Office from './components/Master/office/Index';

import Header from  './components/include/Header';
import Navbar from  './components/include/Navbar';
import Footer from  './components/include/Footer';
import './App.css'
function App() {
  const navigate = useNavigate();
  const [alert , setAlert] = useState({ AlertMessage: '', AlertClass: ''})
  const [isAuth , setAuth] = useState(false)
  function toggleAuth(status)
  {
    setAuth(status)
    if(!status)
    {
      localStorage.clear();
    }
  }
 
  function alertMsg(msg,cls)
  {
  setAlert({'AlertMessage':msg,'AlertClass':cls})
  }
  function closeAlert()
   {
    setAlert({'AlertMessage':'','AlertClass':''})
   }
   var rows=[];
   useEffect(()=>{
   let status=localStorage.getItem('isLoggedIn');
     setAuth(status);
     if(!status)
     {
      navigate('/');
     }
  
    //  else
    //  {
    //   navigate('/dashboard'); 
    //  }
    
   },[])
 
   let routes=[
    {path:"/office",element:<Office Alert={alertMsg} />},
    {path:"/dashboard",element:<Dashboard />},
    {path:"/country",element:<CountryIndex Alert={alertMsg}/>},
    {path:"/create-country",element:<CountryCreate Alert={alertMsg}/>},
    {path:"/edit-country/:id",element:<CountryEdit Alert={alertMsg} />},
 
 
    {path:"/state",element:<StateIndex Alert={alertMsg} />},
    {path:"/create-state",element:<StateCreate Alert={alertMsg} />},
    {path:"/edit-state/:id",element:<StateEdit Alert={alertMsg} />},
    
    {path:"/zone",element:<ZoneIndex Alert={alertMsg} />},
    {path:"/create-zone",element:<ZoneCreate Alert={alertMsg} />},
    {path:"/edit-zone/:id",element:<ZoneEdit Alert={alertMsg} />},

    {path:"/area",element:<AreaIndex Alert={alertMsg} />},
    {path:"/create-area",element:<AreaCreate Alert={alertMsg} />},
    {path:"/edit-area/:id",element:<AreaEdit Alert={alertMsg} />},
 
    {path:"/district",element:<DistrictIndex Alert={alertMsg} />},
    {path:"/create-district",element:<DistrictCreate Alert={alertMsg} />},
    {path:"/edit-district/:id",element:<DistrictEdit Alert={alertMsg} />},
 
    {path:"/city",element:<CityIndex Alert={alertMsg} />},
    {path:"/create-city",element:<CityCreate Alert={alertMsg} />},
    {path:"/edit-city/:id",element:<CityEdit Alert={alertMsg} />},
 
    {path:"/tehsil",element:<TehsilIndex Alert={alertMsg} />},
    {path:"/create-tehsil",element:<TehsilCreate Alert={alertMsg} />},
    {path:"/edit-tehsil/:id",element:<TehsilEdit Alert={alertMsg} />},

    {path:"/product",element:<ProductIndex Alert={alertMsg} />},
    {path:"/create-product",element:<ProductCreate Alert={alertMsg} />},
    {path:"/edit-product/:id",element:<ProductEdit Alert={alertMsg} />},
 
    {path:"/model",element:<ModelIndex Alert={alertMsg} />},
    {path:"/create-model",element:<ModelCreate Alert={alertMsg} />},
    {path:"/edit-model/:id",element:<ModelEdit Alert={alertMsg} />},
 
    {path:"/employee",element:<EmployeeIndex Alert={alertMsg} />},
    {path:"/create-employee",element:<EmployeeCreate Alert={alertMsg} />},
    {path:"/edit-employee/:id",element:<EmployeeEdit Alert={alertMsg} />},
 
    {path:"/stockist",element:<DistributorIndex Alert={alertMsg} />},
    {path:"/create-stockist",element:<DistributorCreate Alert={alertMsg} />},
    {path:"/edit-stockist/:id",element:<DistributorEdit Alert={alertMsg} />},
 
    {path:"/user",element:<UserIndex Alert={alertMsg} />},
    {path:"/create-user",element:<UserCreate Alert={alertMsg} />},
    {path:"/edit-user/:id",element:<UserEdit Alert={alertMsg} />},
   
    {path:"/user_privilage",element:<UserPrivilage Alert={alertMsg} />},

    {path:"/transport",element:<TransportIndex Alert={alertMsg} />},
    {path:"/create-transport",element:<TranportCreate Alert={alertMsg} />},
    {path:"/edit-transport/:id",element:<TransportEdit Alert={alertMsg} />},
 
    {path:"/vehicle",element:<VehicleIndex Alert={alertMsg} />},
    {path:"/create-vehicle",element:<VehicleCreate Alert={alertMsg} />},
    {path:"/edit-vehicle/:id",element:<VehicleEdit Alert={alertMsg} />},
 
    {path:"/dobooking",element:<DoBookingIndex Alert={alertMsg} />},
    {path:"/create-dobooking",element:<DoBookingCreate Alert={alertMsg} />},
    {path:"/edit-dobooking/:id",element:<DoBookingEdit Alert={alertMsg} />},

    {path:"/dlrbooking",element:<DlrBookingIndex Alert={alertMsg} />},
    {path:"/create-dlrbooking",element:<DlrBookingCreate Alert={alertMsg} />},
    {path:"/edit-dlrbooking/:id",element:<DlrBookingEdit Alert={alertMsg} />},
    {path:"/dispatch",element:<DisptchIndex Alert={alertMsg} />},
    {path:"/create-dispatch",element:<DispatchCreate Alert={alertMsg} />},
    {path:"/edit-dispatch/:id",element:<DispatchEdit Alert={alertMsg} />},
    {path:"/distributor-dispatch-receiving",element:<DistDispReceiveCreate Alert={alertMsg} />},
    {path:"/distributor-dispatch",element:<DistributorDispatchIndex Alert={alertMsg} />},
    {path:"/create-distributor-dispatch",element:<DistributorDispatchCreate Alert={alertMsg} />},
    {path:"/edit-distributor-dispatch/:id",element:<DistributorDispatchEdit Alert={alertMsg} />},
    {path:"/dealer-dispatch-receiving",element:<DlrDispReceiveCreate Alert={alertMsg} />},
   ]

   

  return (
    <div className="App">
    
  {isAuth ? 
     <>
     <Header changeAuth={toggleAuth} Alertmsg={alert.AlertMessage} Alertcls={alert.AlertClass} 
     closeAlert={closeAlert}/> 
      <Navbar/> 
       <Routes>
         {routes.map((route=>
        <Route exact path={route.path} element={route.element} /> 
            ))} 
       </Routes>
         <Footer/> 
         </>
         :<Routes> <Route exact path="/" element={<Login  changeAuth={toggleAuth}   navigation={navigate} />}/> </Routes>  }
      
      
    </div>
  );
}

export default App;