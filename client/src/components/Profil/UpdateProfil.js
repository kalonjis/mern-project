import React, { useState } from 'react';
import LeftNav from '../LeftNav';
import {useDispatch, useSelector} from 'react-redux';
import UploadImg from './UploadImg';
import { updateBio } from '../../actions/user.action';
 
// Component sous la barre Navbar qu'on récupère dans la page '/profil' quand user est connecté
const UpdateProfil = ()=>{
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false)
    const userData = useSelector((state)=>state.userReducer);// On récupère les datas dans le store
    const dispatch = useDispatch()

    const handleUpdate=()=>{
        dispatch(updateBio(userData._id, bio));
        setUpdateForm(false);
    }

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
                <div className="right-part">
                    <div className="bio-pdate">
                        <h3>Bio</h3>
                        {updateForm === false && (
                            <>
                                <p onClick={()=>setUpdateForm(!updateForm)} >{userData.bio}</p>
                                <button onClick={()=>setUpdateForm(!updateForm)}>Modifier Bio</button>
                            </>
                        )}
                        {updateForm && (
                            <>
                              <textarea type="text" defaultValue={userData.bio} onChange={(e)=>setBio(e.target.value)}>
                              </textarea>
                              <button onClick={handleUpdate} >Valider modifications</button>  
                            </>
                        )}
                    </div>
                    <h4>Membre depuis le : {userData.createdAt}</h4>
                    <h4>Abonnement {userData.following? userData.following.length:"0"}</h4>
                    <h4>Abonnés {userData.followers? userData.followers.length:"0"}</h4>
                </div>
            </div>
        </div>
        
    )
}
export default UpdateProfil;