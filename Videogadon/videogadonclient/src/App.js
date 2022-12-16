import './App.css';
import {Home} from './Routes/Home';
import {Comments} from './Routes/Comments'
import {BrowserRouter, Route , Routes , NavLink} from 'react-router-dom';
import Register from './Routes/Register';
import Login from './Routes/Login';
import {Game} from "./Pages/Game";
import { GameCategoryComponent } from './Components/GameCategory';
import { CreateGameComponent } from './Components/CreateGame';
import {GameComponent} from "./Components/Game";
import { CreateCommentComponent } from './Components/CreateComments';
import { EditGameCategoryComponent } from './Components/EditGameCategory';
import { EditGameComponent } from './Components/EditGame';
import { EditCommentComponent } from './Components/EditComment';
import AuthUser from "./Services/AuthUser";
import { useNavigate } from 'react-router-dom';

function App() {
  
  const logout = () => {
    sessionStorage.clear();
    window.location.href = "http://localhost:3000/home";
  }

  const getUser = () => {
    const userString = sessionStorage.getItem('userName');
    const user_detail = JSON.parse(userString);
    console.log(user_detail);
    return user_detail;
}
  return (
    <BrowserRouter>
    <div className="AppContainer">
      <b>
        <h1 className='display-1 d-flex justify-content-center m-5 font-weight-bold'>
        <marquee> Videogadon website</marquee>
        </h1>
      </b>
      <nav className='navbar navbar-expand-sm m-2 bg-white navbar-white bg-white'>
        <ul className='navbar-nav'>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-dark btn-lg btn-block w-100 p-3 h-100 d-inline-block' to ='/home'>
            Home
          </NavLink>
          </li>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-dark btn-lg btn-block w-100 p-3 h-100 d-inline-block' to ='/register'>
            Register
          </NavLink>
          </li>
          <li className='nav-item m-1'>
          <NavLink className='btn btn-light btn-outline-dark btn-lg btn-block w-100 p-3 h-100 d-inline-block' to ='/login'>
            Login
          </NavLink>
          </li>
          <li className='nav-item m-1 p-15 float-right'>
          <NavLink onClick={logout} className='btn btn-light btn-outline-dark btn-lg btn-block w-100 p-3 h-100 d-inline-block'>
            Log out
          </NavLink>
          </li>
        </ul>
        <div className='collapse navbar-collapse  align-center'>
          {getUser() != null  ?(
            
            <h2 className="currentUser">
              Logged in: <h1 className='userName'>{getUser()}</h1>
            </h2>
            ) : null}
        </div>
      </nav>

      <Routes>
        <Route path = '/home' element={<Home/>}/>
        <Route path = '/' element={<Home/>}/>
        <Route path = 'home/api/gameCategories' element={<GameCategoryComponent/>}/>
        <Route path = 'home/api/gameCategories/:id1' element={<EditGameCategoryComponent/>}/>
        <Route path = 'home/api/gameCategories/:id1/games' element={<Game/>}/>
        <Route path = 'home/api/gameCategories/:id1/games/game' element={<CreateGameComponent/>}/>
        <Route path = 'home/api/gameCategories/:id1/games/game/:id2' element={<EditGameComponent/>}/>
        <Route path = 'home/api/gameCategories/:id1/games/:id2' element={<GameComponent/>}/>
        <Route path = 'home/api/gameCategories/:id1/games/:id2/comments' element={<Comments/>}/>
        <Route path = 'home/api/gameCategories/:id1/games/:id2/comments/comment' element={<CreateCommentComponent/>}/>
        <Route path = 'home/api/gameCategories/:id1/games/:id2/comments/comment/:id3' element={<EditCommentComponent/>}/>
        <Route path = '/register' element={<Register/>}/>
        <Route path = '/login' element={<Login/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
