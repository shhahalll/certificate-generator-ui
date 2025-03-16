import { useState } from "react";
import axios from "axios";

function Box() {
    const [name, setName] = useState("");

    const handleDownload = async () => {
        if (!name.trim()) {
            alert("Please enter a name");
            return;
        }

        try {
            const response = await axios.post(
                "https://apis.shahal.online/api/certificate/0/",
                { name: name },
                { responseType: "blob" } // Ensures response is treated as a file
            );

            // Create a download link
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
                <input 
                    className="btn btn-primary w-50%" 
                    type="button" 
                    value="Download" 
                    onClick={handleDownload} 
                />
            </div>
        </div>
    );
}

export default Box;
