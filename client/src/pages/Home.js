import React from 'react';
import Log from '../components/log/Log'

const Home = () =>{
    return (
        <div className="profil-page">
            <div className="log-container">
                <Log signup = {false} signin = {true} />
                <div className="img-container">
                    <img src="./img/log.svg" alt="img-log"/>
                </div>
            </div>

        </div>
    );
};

export default Home;

