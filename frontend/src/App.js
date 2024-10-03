import './App.css';
import {AddEmployeeForm} from './components/addEmployeeForm';
import DisplayComponents from './components/displayComponents'
import Home from './components/home'
import LoginForm from './components/loginform';
import RegisterForm from './components/registerFor';
import {UpdateEmployee} from './components/updateEmployee';
import RenderImage from './components/renderImage';
//link
import { Route,Routes } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} /> 
      <Route path="/home" element={<Home />} />
      <Route path="/display" element={<DisplayComponents />} />
      <Route path="/add" element={<AddEmployeeForm />} />
      <Route path="/update/:id" element={<UpdateEmployee />}/>
      <Route path="/image" element={<RenderImage />} />

  </Routes>
  );
}

export default App;
