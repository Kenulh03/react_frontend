import { useState } from "react";
import axios from "axios";
import { useAuth } from "./utils/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            username: username,
            password:password
        };

        axios.post("http://localhost:8080/auth/login",data)
            .then(function (response) {
                login(response.data);
                navigate("/")
            }).catch(function (error) {
                alert("Invalid Username or Password");
            });
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    UserName:
                    <input type="text" onChange={(e) => {
                        setUsername(e.target.value);
                    }} name="email" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" onChange={(e) =>{
                        setPassword(e.target.value);
                    }} />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginPage;