import React, {useState} from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';


const Log = (props)=>{
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);
    
    const handleModals = (e)=>{
        e.preventDefault()
        if (e.target.id === 'register'){
            setSignInModal(false)
            setSignUpModal(true)
        } else if (e.target.id ==='login'){
            setSignInModal(true)
            setSignUpModal(false)
        }
    }

    return (
        <section className= "connection-form">
            <article className="form-container">
                <ul>
                    <li onClick ={handleModals} id='register' className={signUpModal? "active-btn":null}> S'incrire </li>
                    <li onClick ={handleModals} id='login' className={signInModal? "active-btn":null}> Se connecter </li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
            </article>
        </section>
    );
};

export default Log;