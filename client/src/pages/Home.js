import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext';
import LeftNav from '../components/LeftNav'
import NewPostForm from '../components/Post/NewPostForm';
import Log from '../components/log/Log'
import Thread from '../components/Thread';

const Home = () =>{
    const uid = useContext(UidContext);

    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <div className="home-header">
                    {uid? <NewPostForm/>: <Log signin={true} signup={false} />}
                </div>
            <Thread/>
            </div>
        </div> 
    )
}

export default Home;

