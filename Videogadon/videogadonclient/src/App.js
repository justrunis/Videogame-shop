import './App.css';
import {Home} from './Routes/Home';
import {Comments} from './Routes/Comments'
import {BrowserRouter, Route , Routes , NavLink} from 'react-router-dom';
import Register from './Routes/Register';
import Login from './Routes/Login';
import {Game} from "./Pages/Game";
import {GameComponent} from "./Components/Game";

function App() {
  return (
    <BrowserRouter>
    <div className="AppContainer">
      <b>
        <h1 className='display-1 d-flex justify-content-center m-5'>
          Videogadon website
        </h1>
      </b>
      <nav className='navbar navbar-expand-sm bg-light navbar-dark bg-primary'>
        <ul className='navbar-nav'>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-dark' to ='/home'>
            Home
          </NavLink>
          </li>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-dark' to ='/register'>
            Register
          </NavLink>
          </li>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-dark' to ='/login'>
            Login
          </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path = '/home' element={<Home/>}/>
        <Route path = 'home/api/gameCategories/:id1/games' element={<Game/>}/>
        <Route path = 'home/api/gameCategories/:id1/games/:id2' element={<GameComponent/>}/>
        <Route path = 'home/api/gameCategories/:id1/games/:id2/comments' element={<Comments/>}/>
        <Route path = '/register' element={<Register/>}/>
        <Route path = '/login' element={<Login/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
