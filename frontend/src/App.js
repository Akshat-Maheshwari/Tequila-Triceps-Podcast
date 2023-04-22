import './App.css';
import Signup from './components/Signup.js';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return ( 
  <div className="App">
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<PrivateRoute>
            <Dashboard />
          </PrivateRoute>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </AuthProvider>
    </Router>      
  </div>
  );
}

export default App;
