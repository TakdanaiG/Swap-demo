import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser, FaWallet, FaPhone } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
    const [firstname, setfName] = useState('');
    const [lastname, setlName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register', { firstname, lastname, email, address, phone, username, password })
            .then(result => {
                console.log(result)
                navigate('/')

            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <div className='form-register'>
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>

                    <div>
                        <FaUser className='icon' />
                        <input type='text' placeholder='First name' onChange={(e) => setfName( e.target.value)} required />
                    </div>

                    <div>
                        <FaUser className='icon' />
                        <input type='text' placeholder='Last name' onChange={(e) => setlName(e.target.value)} required />
                    </div>

                    <div>
                        <MdEmail className='icon' />
                        <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div>
                        <FaWallet className='icon' />
                        <input type='text' placeholder='Wallet Address' onChange={(e) => setAddress(e.target.value)} required />
                    </div>

                    <div>
                        <FaPhone className='icon' />
                        <input type='text' placeholder='Phone number' onChange={(e) => setPhone(e.target.value)} required />
                    </div>

                    <div>
                        <FaUser className='icon' />
                        <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div>
                        <RiLockPasswordFill className='icon' />
                        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button type='submit' className='btn btn-primary'>Register</button>

                </form>
                <p>Already have an account? </p>
                <Link to='/'><button className='btn btn-primary'>Login</button></Link>
            </div>
        </div>
    );
}

export default Register;
