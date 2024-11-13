
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Add from './components/Add.jsx';         // Example component
import Home from './components/Home.jsx';
import LoginPage from './components/LoginPage.jsx';
import DashboardAdmin from './components/admin/Dashboard.jsx';
import useAuthMiddleware from './middleware/AuthMiddleware.js';

const PrivateRoute = ({ children }) => {
  useAuthMiddleware(); // Check authentication before rendering the children
  
  return children; // If authenticated, render children, else redirect happens in the hook
};
function App() {
  /**
   * Routes : routing untuk halaman nya
   * dokumentasi seperti pada landingpage agendakota
   */
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/admin'>
        
          <Route path='dashboard' element={
            <PrivateRoute>
              <DashboardAdmin/>
            </PrivateRoute>
            }/>
        
        </Route>
      </Routes>
    </Router>
  )
}

export default App
