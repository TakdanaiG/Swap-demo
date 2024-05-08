import React, { useState ,useEffect } from 'react';
import './LoginRegister.css'
import { FaUser } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaWallet } from "react-icons/fa6";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function Login() {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const navigate = useNavigate()
    const handleLogout = () => {
    // Clear username from localStorage
    localStorage.removeItem('username');
    alert('Logout')

    // Clear username state
    
      };
    
    useEffect(()=>{
        axios.get('http://localhost:3001')
        .then( res => {
            if(res.data.valid){
                navigate('/swap')
            }else{
                navigate('/')
            }
        })
        .catch(err => console.log(err))

    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { username, password })
            .then(result => {
                if (result.data === "user") {
                    alert('Success')
                    navigate('/swap');
                    localStorage.setItem('username', username);
                }
                else if (result.data === "admin"){
                    localStorage.setItem('username', username);
                    alert('Welcome My Lord')

                    navigate('/admin');
                }else {
                    alert('Fail')

                    console.log("Fail");
                }
            })
            .catch(err => console.error(err));
    };
    
    return (
        <div className="container">
    <div className='form-register'>
        <form onSubmit={handleSubmit}>
            <h1 style={{ color: 'white' }}>Login</h1>
            <br />

            <div className="form-group">
                <div>
                    
                    <input type='text' className="form-control" placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
                </div>
            </div>
            <br></br>
            <div className="form-group">
                <div >
                    
                    <input type='password' className="form-control" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                </div>
            </div>
            <br />
            <button type='submit' className='btn btn-primary'>Login</button>
        </form>
        <br />
        <p style={{ color: 'white' }}>Don't have an account? </p>
        <Link to='/register'><button className='btn btn-primary' style={{ marginRight: '10px' }}>Register</button></Link>
        <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
    </div>
</div>

    );
    
};
export default Login;
