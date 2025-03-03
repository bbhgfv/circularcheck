import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './RegisterCSS.css';
import PropTypes from 'prop-types';
//import axios from "../api/axios";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//const REGISTER_URL = '/register';

const Register= ({setActivePage}) =>{
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user); 
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const pass = PWD_REGEX.test(pwd);
        setValidPwd(pass);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = PWD_REGEX.test(pwd);
        
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                body: JSON.stringify({ username: user , password: pwd, email: email}), 
                headers: myHeaders,
            });
    
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            
        } catch (error) {
            console.error(error.message);
        }
        
       setSuccess(true); 
       console.log("Success registered!");
        
    }
    return(
        <>
        { success ? (
            <section>
                <h1>Success!</h1>
                
                <p className="alreadyRegister">
                Now you can 
                <span className="line">
                    <span 
                        onClick={() => setActivePage("Login")} 
                        style={{ cursor: "pointer", color: "blue" }}
                    >
                        Sign In
                    </span>
                </span>
                </p>

                
            </section>
        ) : (    
        <section>
            <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertion">{errMsg}</p>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                {/*username */}
                <div>
                    <label htmlFor="username">
                        Username:
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        placeholder="Enter your username"
                    />
                    
                </div>
                <p id="uidnote" className={user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                </p>
                {/*email */}
                <div>
                    <label htmlFor="email">
                        Email:
                        <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        placeholder="Enter your email"
                    />
                </div>
                <p id="emailnote" className={email && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Muss be a valid email (e.g user@example.com) 
                </p>
                 {/*pass */}
                 <div>
                    <label htmlFor="password">
                        Password:
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                    </label>
                    
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        placeholder="Enter your password"
                    />
                    
                 </div>
                 <p id="pwdnote" className={pwd && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>
                {/*pass confirm */}
                <div>
                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        placeholder="Re-enter your password"
                    />
                    
                </div>
                <p id="confirmnote" className={matchPwd && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                </p>

                <button className="wide" disabled={!validName || !validPwd || !validMatch ? true : false} >Sign Up</button>
                <button className="wide" onClick={() => setActivePage("Assessment")}>Continue without Account</button>
            </form>
            <p className="alreadyRegister">
                Already registered?<br />
                <span className="line">
                    <span 
                        onClick={() => setActivePage("Login")} 
                        style={{ cursor: "pointer", color: "blue" }}
                    >
                        Login
                    </span>
                </span>
            </p>
        </section> )
        }
    </>
    )
}

Register.propTypes = {
    setActivePage: PropTypes.func.isRequired,
};

export default Register;