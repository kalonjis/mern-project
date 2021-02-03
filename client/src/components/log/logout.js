import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie'; // permet de gérer l'effacement du cookie en front car la suppression en back ne suffit pas appremment - "npm i -s js-cookie "


const Logout = () =>{
    const removeCookie = (key) =>{
        if (window !== 'undifined') {
            cookie.remove(key, { expires: 1})
        }
    }

    const logout = async () =>{
        await axios({
           method:'get',
           url:`${process.env.REACT_APP_API_URL}api/user/logout`,
           withCredentials:true
        })
            .then(()=> removeCookie('jwt'))
            .catch((err) => console.log(err))
        
        window.location ="/"
        
    }
    return (
        <li onClick ={logout}>
            <img src='./img/icons/logout.svg' alt='logout'/>
        </li>
    )

}
export default Logout;