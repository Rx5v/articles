
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Add from './components/Add.jsx';         // Example component
import Home from './components/Home.jsx';
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
      </Routes>
    </Router>
  )
}

export default App
