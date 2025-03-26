import React from "react";
import {useEffect, useState, createContext} from "react";
import AuthMessage from "./AuthMessage";
import "../styles/LoginForm.css"
export const AuthContext = createContext();

const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [authStatus, setAuthStatus] = useState({ type: "", message: "" });
    
    useEffect(() => {
        if (redirect) {
          const timer = setTimeout(() => {
            window.location.href = "/courses";
          }, 2000);
          return () => clearTimeout(timer);
        }
      }, [redirect]);

    const handleLogin = async (e) => {
        e.preventDefault();
       
        if( !username || !password){
            setAuthStatus({ type: "error", message: "Username and password cannot be empty" });
            return;
        }
        if ( password.length < 8) { 
            setAuthStatus({ type: "error", message: "Password must be at least 8 characters" });
            return;
        }

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users")
            const users = await response.json();
            const user = users.find(user =>
                user.username === username && user.email === password
            );

            if (user) {
                setAuthStatus({ type: "success", message: "Login successful! Redirecting..." });
                setRedirect(true);
              }
              else{
                setAuthStatus({ type: "error", message: "Incorrect Username or Password" })
              }
        }
            catch (err) {
                setAuthStatus({ type: "error", message: "Error connecting to server" })
            }
          };
    return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
    <main className="login">
        <h2>LMS Login</h2>
        <form>
            <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input value = {username} type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)}/>
            </div>
            
            <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input value = {password} type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
            </div>
        </form> 

            <div>
                <button onClick = {handleLogin} > Login</button>
            </div>
         
            <div>
                <a href="#">Forgot Password?</a>
            </div>
            < AuthMessage />
    </main>
 </AuthContext.Provider>
    );
};

export default LoginForm;