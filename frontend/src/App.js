import { Suspense, lazy } from 'react';
import './App.css';
import Signup from './components/Signup.js';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Loading.js';

function App() {
  const Dashboard=lazy(()=>import('./components/Dashboard'));
  const AddFile=lazy(()=>import('./components/AddFile'));
  return ( 
  <div className="App">
    <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<Suspense fallback={<Loading/>}><Dashboard /></Suspense>} />
            <Route path='/addfile' element={<Suspense fallback={<Loading/>}><AddFile /></Suspense>} />
          </Route>
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
    </BrowserRouter>  
  </div>
  );
}

export default App;
