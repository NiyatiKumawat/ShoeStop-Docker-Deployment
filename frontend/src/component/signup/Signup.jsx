import React, { useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_BASE_URL from '../../apiConfig'

const Signup = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const url = `${API_BASE_URL}/signup`

    const changeNameHandler = (e) => {
        setName(e.target.value)
    }
    const changeMailHandler = (e) => {
        setMail(e.target.value)
    }
    const changePasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    const submitHandler = (e) => {
        if (e) e.preventDefault();
        setErrorMsg('');
        axios.post(url, { name, email, password })
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    if (res.data?.token) {
                        localStorage.setItem('token', res.data.token);
                    }
                    alert('Signup successful! Welcome to ShoeStop.');
                    navigate('/home');
                    window.location.reload();
                } else {
                    setErrorMsg('Signup failed. Please try again.');
                }
            })
            .catch(err => {
                console.error(err);
                setErrorMsg(err.response?.data?.error || 'Registration failed. User may already exist.');
            });
    }

    return (
        <div className='signup'>
            <h3 style={{ marginBottom: '20px', color: '#1e293b' }}>Create a ShoeStop Account</h3>
            {errorMsg && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '10px' }}>{errorMsg}</p>}
            <input type="text" placeholder='username' value={name} onChange={changeNameHandler} />
            <input type="text" placeholder='email' value={email} onChange={changeMailHandler} />
            <input type="password" placeholder='password' value={password} onChange={changePasswordHandler} />
            <button onClick={submitHandler}>Sign Up</button>
            <p style={{ marginTop: '18px', color: '#64748b', fontSize: '14px' }}>
                Already have an account?{' '}
                <span
                    style={{ color: '#0284c7', cursor: 'pointer', fontWeight: '600' }}
                    onClick={() => navigate('/login')}
                >
                    Login here
                </span>
            </p>
        </div>
    )
}

export default Signup