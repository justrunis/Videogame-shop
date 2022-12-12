import './App.css';
import {Home} from './Routes/Home';
import {GameCategories} from './Routes/GameCategories'
import {Games} from './Routes/Games'
import {Comments} from './Routes/Comments'
import {BrowserRouter, Route , Routes , NavLink} from 'react-router-dom';
import Register from './Routes/Register';
import Login from './Routes/Login';

function App() {
  return (
    <BrowserRouter>
    <div className="AppContainer">
      <h3 className='d-flex justify-content-center m-3'>
        React JS Frontend
      </h3>
      <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
        <ul className='navbar-nav'>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-primary' to ='/home'>
            Home
          </NavLink>
          </li>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-primary' to ='/gameCategories'>
            Game Categories
          </NavLink>
          </li>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-primary' to ='/games'>
            Games
          </NavLink>
          </li>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-primary' to ='/comments'>
            Comments
          </NavLink>
          </li>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-primary' to ='/register'>
            Register
          </NavLink>
          </li>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-primary' to ='/login'>
            Login
          </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path = '/home' element={<Home/>}/>
        <Route path = '/gameCategories' element={<GameCategories/>}/>
        <Route path = '/games' element={<Games/>}/>
        <Route path = '/comments' element={<Comments/>}/>
        <Route path = '/register' element={<Register/>}/>
        <Route path = '/login' element={<Login/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
