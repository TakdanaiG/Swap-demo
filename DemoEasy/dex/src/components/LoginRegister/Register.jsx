import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser, FaWallet, FaPhone } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


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
                alert('Register Success')

                

            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <div className='form-register'>
                <form onSubmit={handleSubmit}>
                    <h1 style={{ color: 'white' }} >Register</h1>
                    <br></br>
                    <div className="form-group">
                        <div >

                            <input type='text' className="form-control" placeholder='First name' onChange={(e) => setfName(e.target.value)} required />
                        </div>
                    </div>
                    <br></br>  
                    <div className="form-group">
                        <div >

                            <input type='text' className="form-control" placeholder='Last name' onChange={(e) => setlName(e.target.value)} required />
                        </div>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <div >

                            <input type='email' className="form-control" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <div >

                            <input type='text' className="form-control" placeholder='Wallet Address' onChange={(e) => setAddress(e.target.value)} required />
                        </div>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <div >

                            <input type='text' className="form-control" placeholder='Phone number' onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <div >

                            <input type='text' className="form-control" placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                    </div>
                    <br></br>
                    <div className="form-group">
                        <div >

                            <input type='password' className="form-control" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div>
                    <br></br>
                    <button type='submit' className='btn btn-primary'>Register</button>

                </form>
                <p style={{ color: 'white' }}s>Already have an account? </p>
                <Link to='/'><button className='btn btn-primary'>Login</button></Link>
            </div>
        </div>

    );
}

export default Register;
