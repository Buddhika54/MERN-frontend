import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import MachinesList from './Components/Machines/MachinesList';
import AddMachines from './Components/Machines/AddMachines';
import EditMachine from './Components/EditMachine';
import List from './Components/Maintenance/List';
import Add from './Components/Maintenance/Add';
import Edit from './Components/Maintenance/Edit';
import AddT from './Components/Maintenance/AddT';
import ListT from './Components/Technician/ListT';
import NewTech from './Components/Technician/NewTech';
import EditT from './Components/Technician/EditT';
import AssignList from './Components/Assign/AssignList';
import AssignInfo from './Components/Assign/AssignInfo';

function App() {
  return (
    
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>

          <Route path="/home/machines" element={<MachinesList/>}/>
          <Route path="/home/add-machine" element={<AddMachines/>}/>
          <Route path="/home/machines/:id" element={<EditMachine/>}/>

          <Route path="/home/maintenance" element={<List/>}/>
          <Route path="/home/add-maintenance" element={<Add/>}/>
          <Route path="/home/maintenance/:id" element={<Edit/>}/>

          <Route path="/home/add-technician" element={<AddT/>}/>
          <Route path="/home/technician" element={<ListT/>}/>
          <Route path="/home/new-technician" element={<NewTech/>}/>
          <Route path="/home/technician/:id" element={<EditT/>}/>
          
          <Route path="/home/assign" element={<AssignList/>}/>
          <Route path="/home/assign-info/:id" element={<AssignInfo/>}/>

        </Routes>
      </BrowserRouter>


    
  );
}

export default App;
