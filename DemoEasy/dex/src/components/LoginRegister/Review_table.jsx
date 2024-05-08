import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './admin.css';
function ReviewTable() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/review_table');
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div className="table-container">
            <h1 style={{ color: 'white' }} >User Review</h1>
            <table className="custom-table">    
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Rating</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.users}</td>
                            <td>{user.rating}</td>
                            <td>{user.review}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br></br>
            <Link to="/admin">
                <button className='btn btn-primary'>Go back Admin page.</button>
            </Link>
        </div>
    );
}

export default ReviewTable;