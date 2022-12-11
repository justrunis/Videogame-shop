import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {GameCategory} from './GameCategory'
import {Game} from './Game'
import {Comment} from './Comment'
import {BrowserRouter, Route , Routes , NavLink} from 'react-router-dom';
import Register from './Register';

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
          <NavLink className='btn btn-light btn-outline-primary' to ='/gameCategory'>
            Game Categories
          </NavLink>
          </li>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-primary' to ='/game'>
            Games
          </NavLink>
          </li>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-primary' to ='/comment'>
            Comments
          </NavLink>
          </li>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-primary' to ='/register'>
            Register
          </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path = '/home' element={<Home/>}/>
        <Route path = '/gameCategory' element={<GameCategory/>}/>
        <Route path = '/game' element={<Game/>}/>
        <Route path = '/comment' element={<Comment/>}/>
        <Route path = '/register' element={<Register/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
