import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation (){
    return(
<nav>
      <ul className='navigation'>
            <li>
                  <NavLink  className={`navlink ${location.pathname === '/' ? 'active' : ''}`} to="/" >
                  Discover
                  </NavLink>
            </li>
            <li>
                  <NavLink className={`navlink ${location.pathname === '/categories' ? 'active' : ''}`} to="/categories">
                  Categories
                  </NavLink>
            </li>
            <li>
                  <NavLink className={`navlink ${location.pathname === '/favorites' ? 'active' : ''}`} to="/favorites">
                  Favorites
                  </NavLink>
            </li>       
      </ul>
</nav>
    )
}