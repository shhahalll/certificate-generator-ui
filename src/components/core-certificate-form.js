import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CoreBox() {
    const [name, setName] = useState("");
    const [role, setRole] = useState(1); // Default to Sub Coordinator (1)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/login"); // Redirect only if not authenticated
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    const handleDownload = async () => {
        if (!name.trim()) {
            alert("Please enter a name");
            return;
        }

        try {
            const response = await axios.post(
                "https://apis.shahal.online/api/certificate/1/",
                { name: name, role: role },
                { 
                    responseType: "blob",
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } 
                }
            );

            const blob = new Blob([response.data], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `${name}_certificate.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Download error:", error);
            alert("Failed to download the certificate.");
        }
    };

    if (!isAuthenticated) return null;

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light p-5">
            <div className="container-fluid w-auto d-flex justify-content-center align-items-center rounded-4 flex-column bg-dark gap-3 p-5">
                <input 
                    name="Input"
                    className="form-control w-fill"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <select 
                    className="form-control w-fill"
                    value={role}
                    onChange={(e) => setRole(Number(e.target.value))}
                >
                    <option value="1">Sub Coordinator</option>
                    <option value="2">Core Coordinator</option>
                </select>

                <button className="btn btn-primary w-50%" onClick={handleDownload}>Download</button>
            </div>
        </div>
    );
}

export default CoreBox;
