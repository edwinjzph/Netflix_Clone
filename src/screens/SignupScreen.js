import React, { useRef } from 'react'
import { auth } from '../firebase';
import './SignUpScreen.css' 

function SignupScreen() {
    const emailRef = useRef(null);
    const password = useRef(null)

const register =(e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        password.current.value
    ).then((authUser) => {
console.log(authUser)
    }).catch((error) =>{
        alert(error.message)
    });
} 
const signIn =(e) =>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(
        emailRef.current.value,
        password.current.value

    ).then((authUser) => {
        console.log(authUser)
            }).catch((error) =>{
                alert(error.message)
            });
}

    return (
        <div className="signupscreen">
            <form>
            <h1>Sign In</h1>
            <input ref={emailRef} placeholder="Email" type="email"/>
            <input  ref={password}placeholder="Password" type="password"/>
            <button onClick={signIn} type="submit">Sign In</button>
            <h4>
                <span className="signupscreen_grey">
                New to Netflix? </span>
              <span onClick={register} className="signscreen_link">Sign Up now.</span> </h4>
            </form>
            
        </div>
    )
}

export default SignupScreen
