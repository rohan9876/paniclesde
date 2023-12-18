import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./pages/home/Home";
import Add from "./pages/add/Add";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route 
            path='/'
            element={<Home />}
          />
          <Route 
            path='/add'
            element={<Add />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
