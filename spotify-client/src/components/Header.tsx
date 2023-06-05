
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { clearPlaylists, clearSelectedPlaylist, clearUserProfile, setLogOut, setSearchStr } from '../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import {GrHomeRounded} from 'react-icons/gr';
import {BiLogIn} from 'react-icons/bi';
import {FiSearch} from 'react-icons/fi';
import React from 'react';
import { ShopReducerUI, UserProfile } from '../types/types';

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const profile:UserProfile = useSelector((state: ShopReducerUI):UserProfile => state.userProfile);

    const [, , removeCookie] = useCookies(['access_token', 'refresh_token']);

    const handleClick = React.useCallback(() => {

        navigate('')

    }, [navigate])

    const handleLogOut = React.useCallback(() => {

        navigate('')
        removeCookie('access_token')
        removeCookie('refresh_token')
        dispatch(setLogOut())
        dispatch(clearUserProfile())
        dispatch(clearSelectedPlaylist())
        dispatch(clearPlaylists())

    }, [navigate, removeCookie, dispatch])

      const searchStr = useSelector((state: ShopReducerUI) => state.searchStr) 
      const inputRef = React.useRef<HTMLInputElement>(null);
    console.log(searchStr)
      React.useEffect(() => {
        if(inputRef.current !== null){
          inputRef?.current?.focus();
        }
      }, [location.pathname]);
    
  return (
    <div className='header'>
      <nav className='header-nav'>
        <Link 
          to="/" 
          className='header-link'
          onClick={handleClick} 
        >
          <GrHomeRounded className="header-link-icon" />
          <span className='header-link-span'>Home</span>
        </Link>

        
        {
        !location.pathname.includes('/search')?
         <Link className='header-link search-link' to={`/search`}>
            <FiSearch className="header-link-icon no-invert"/>
            <span className='header-link-span'>Search</span>
          </Link>
          :
          <div className='search-div'>
            <input ref={inputRef} value={searchStr} onChange={(e) => dispatch(setSearchStr(e.target.value))} className='search-input' type='text' placeholder='Search...'/>
          </div>
        }

        {
          profile.images ?
            <img 
            src={profile.images[0].url} 
            width={35} 
            height={35} 
            alt="profile image"
            className='header-profile-img'
            />
          :
        <Link 
          to="/login"
          className='header-link'
        >
          <BiLogIn className="header-link-icon no-invert" />
          <span className='header-link-span'>Log In</span>
        </Link>}

        <Link 
          to="/" 
          onClick={handleLogOut}
          className='header-link'
        >
          <BiLogIn className="header-link-icon no-invert mirror" />
          <span className='header-link-span'>Log Out</span>
        </Link>

        </nav>
    </div>
  )
}
