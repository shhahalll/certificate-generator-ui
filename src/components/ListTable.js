import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Check if the user is logged in
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/login/");
        }
    }, [navigate]);

    // Fetch data from API
    useEffect(() => {
        axios.get("https://apis.shahal.online/api/list/ ")
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load data");
                setLoading(false);
            });
    }, []);

    // Function to format role
    const getRoleName = (role) => {
        if (role === 0) return "Volunteer";
        if (role === 1) return "Sub Coordinator";
        if (role === 2) return "Core Coordinator";
        return "Unknown";
    };

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center text-danger">{error}</p>;

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">List of Members</h2>
            <div className="table-responsive">
                <table className="table table-striped table-bordered text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>SI No.</th>
                            <th>Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td> {/* Incrementing SI No. */}
                                <td>{item.name}</td>
                                <td>{getRoleName(item.role)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListTable;
