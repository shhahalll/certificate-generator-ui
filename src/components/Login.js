import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginBox() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("https://apis.shahal.online/api/login/", {
                username: username,
                password: password
            });

            // Store tokens in localStorage
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);

            navigate("/core"); // Redirect to CoreBox after successful login
        } catch (error) {
            setError("Invalid Credentials");
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light p-5">
            <div className="container-fluid w-auto d-flex justify-content-center align-items-center rounded-4 flex-column bg-dark gap-3 p-5">
                {error && <p className="text-danger">{error}</p>}

                <input 
                    className="form-control w-fill"
                    type="text"
                    placeholder="Enter your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    className="form-control w-fill"
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn btn-primary w-50%" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default LoginBox;
