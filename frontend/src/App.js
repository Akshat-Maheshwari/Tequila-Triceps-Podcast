import './App.css';
import Signup from './components/Signup.js';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import AddFile from './components/AddFile';

function App() {
  return ( 
  <div className="App">
    <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/addfile' element={<AddFile />} />
          </Route>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
    </BrowserRouter>  
  </div>
  );
}

export default App;
