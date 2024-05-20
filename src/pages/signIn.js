


// react hook
import { useRef } from "react";

// react router
import { NavLink, useNavigate } from "react-router-dom";

// css styles
import styles from "../styles/signIn.module.css";

// custom context hook (authentication)
import { useAuth } from "../authContext";

// Signin page component
function Signin() {
    // signin function from useAuth hook
    const { signin } = useAuth();

    // navigate function from useNavigate hook
    const navigate = useNavigate();
    
    // ref variables for email and password
    const emailRef = useRef();
    const passwordRef = useRef();

    // form submit function
    async function handleSubmit(e) {
        e.preventDefault();
        // storing user's data
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        // sign in user
        const status = await signin(data);
        // if user signed in redirect to corresponding page
        status ? navigate("/") : navigate("/signin");
    }

    return (
        // main container of the page
        <div className={styles.container}>
            <div className={styles.inputForm}>
                {/* heading */}
                <h1>SignIn</h1>
                {/* form */}
                <form onSubmit={handleSubmit}>
                    {/* email */}
                    <input 
                        type="email" 
                        placeholder="Enter Email" 
                        required
                        ref={emailRef} 
                    />
                    <br />
                    {/* password */}
                    <input 
                        type="password" 
                        placeholder="Enter Password"
                        required
                        ref={passwordRef} 
                    />
                    <br />
                    {/* submit button */}
                    <button>Submit</button>
                </form>
                <br /> 
                <span>or &nbsp;</span>
                {/* link for signup page */}
                <NavLink to="/signup">
                    Create New Account
                </NavLink>
            </div>
        </div>
    );
}

export default Signin;
