import React, { useContext } from 'react';
import Log from '../components/log/Log';
import { UidContext} from '../components/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil';


/**Profil page component adress:.../profil  */


const Profil = () =>{
    const uid = useContext(UidContext);// on recupère l'id (s'il existe!) stockée dans le "UidContext.Provider" qui englobe le "<Routes/>" component (voir App.js)

    // renvoie un affichage conditionnel: si uid=> "updateProfil" comp. sinon=> "Log" comp. (formulaire signUpForm(par défaut)/signIN)
    return (
        <div className="profil-page">
            {uid?( 
                <UpdateProfil/>
            ): (
             <div className="log-container">
                <Log signup = {true} signin = {false} />
                <div className="img-container">
                    <img src="./img/log.svg" alt="img-log"/>
                </div>
            </div>
            )}
        </div>
    );
};

export default Profil;

