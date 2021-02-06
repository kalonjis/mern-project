import React from 'react';
import LeftNav from '../LeftNav';
import {useSelector} from 'react-redux';
import UploadImg from './UploadImg';
 
// Component sous la barre Navbar qu'on récupère dans la page '/profil' quand user est connecté
const UpdateProfil = ()=>{
    const userData = useSelector((state)=>state.userReducer);// On récupère les datas dans le store

    // On affiche la LeftNav, l'uploadImg et la Bio
    return (
        <div className="profil-container">
            <LeftNav/>
            <h1> Profil de {userData.pseudo}</h1>
            <div className="update-container" >
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg />

                </div>
            </div>
        </div>
        
    )
}
export default UpdateProfil;