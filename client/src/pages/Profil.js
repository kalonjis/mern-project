import React from 'react';
import Log from '../components/log/Log';


const Profil = () =>{
    return (
        <div className="profil-page">
            <div className="log-container">
                <Log signup = {true} signin = {false} />
                <div className="img-container">
                    <img src="./img/log.svg" alt="img-log"/>
                </div>
            </div>

        </div>
    );
};

export default Profil;

