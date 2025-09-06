import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import EmpDashboard from './pages/EmpDashboard';
import PrivateRoutes from './utills/PrivateRoutes';
import RoleBaseRoutes from './utills/RoleBaseRoutes';
import AdminSummary from './Dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import Mainpage from './fontend/Mainpage';
import OurStorypage from './fontend/OurStorypage';
import OurOfferingpage from './fontend/OurOfferingpage';
import NewsPage from './fontend/NewsPage';
import ContactUspage from './fontend/Contactuspage';
import AddDepartments from './components/department/AddDepartments';
import EditDepartment from './components/department/EditDepartment';
import EmpList from './components/employee/EmpList';
import EmpAdd from './components/employee/EmpAdd';

function App(){
  return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" />}/>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes> 
            </PrivateRoutes>
          }>
            <Route index element={<AdminSummary />}></Route>
            
            <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
            <Route path="/admin-dashboard/add-department" element={<AddDepartments />}></Route> 
            <Route path="/admin-dashboard/department/:id" element={<EditDepartment />}></Route> 

            <Route path="/admin-dashboard/employees" element={<EmpList />}></Route>
            <Route path="/admin-dashboard/add-employee" element={<EmpAdd />}></Route> 



          </Route>
          <Route path="/emp-dashboard" element={<EmpDashboard />}/>
          <Route path="/home" element={<Mainpage />} ></Route>
          <Route path="/ourStory" element={<OurStorypage/>}></Route>
          <Route path="/ourOfferings" element={<OurOfferingpage/>}></Route>
          <Route path="/NewsPage" element={<NewsPage/>}></Route>
          <Route path="/ContactUspage" element={<ContactUspage/>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;

/*function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to PSR vlog</h1>
        <button class='user-button' onClick={() => navigate('/users')}>Users</button>
      </header>
    </div>
  );
}*/


