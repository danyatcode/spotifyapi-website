import { BrowserRouter } from 'react-router-dom';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Routes, Route } from 'react-router'
import { Header } from './components/Header';
import { Playlist } from './components/Playlist';
import {Player} from './components/Player'
import { Search } from './components/Search';

function App() {

  return (
    <div className='App' style={{width: "100%"}}>
      <BrowserRouter 
      // basename='/'
      >
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/me/playlist/:playlistId' element={<Playlist/>} />
          <Route path='/search' element={<Search />} />
        </Routes>
        <Player />
      </BrowserRouter>
    </div>
  );
}

export default App;
