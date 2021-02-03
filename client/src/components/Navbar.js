import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './log/logout';

const Navbar = ()=>{
    const uid = useContext(UidContext)

    return (
        <nav>
            <div className ='nav-container'> 
                <div className='logo'>
                    <NavLink exact to='/'>
                        <div className='logo'>
                            <img src='../img/icon.png' alt='icon of ratoon' />
                            <h3>Steby Network</h3>
                        </div>
                    </NavLink>
                </div>
                {uid? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact to='/profil'>
                                <h5>Bienvenu 'valeur dynamique'</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink exact to='/profil'>
                                <img src="../img/icons/login.svg" alt='login'/>
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}
export default Navbar