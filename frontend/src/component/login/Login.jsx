import React, { useContext, useState } from 'react'
import '../signup/signup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { productContext } from '../contextAPI/Context'
import API_BASE_URL from '../../apiConfig'

const Login = () => {
    const navigate = useNavigate()
    const { setToken } = useContext(productContext)
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const url = `${API_BASE_URL}/login`

    const changeMailHandler = (e) => {
        setMail(e.target.value)
    }
    const changePasswordHandler = (e) => {
        setPassword(e.target.value)
    }

    const submitHandler = (e) => {
        if (e) e.preventDefault();
        setErrorMsg('');
        axios.post(url, { email, password })
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    localStorage.setItem('token', res.data.token);
                    setToken(res.data.token);
                    navigate('/home');
                    window.location.reload();
                } else {
                    setErrorMsg('Login failed. Please check credentials.');
                }
            })
            .catch(err => {
                console.error(err);
                setErrorMsg(err.response?.data?.error || 'Invalid email or password.');
            });
    }

    return (
        <div className='signup'>
            <h3 style={{ marginBottom: '20px', color: '#1e293b' }}>Login to ShoeStop</h3>
            {errorMsg && <p style={{ color: '#dc2626', fontSize: '13px', marginBottom: '10px' }}>{errorMsg}</p>}
            <input type="text" placeholder='email' value={email} onChange={changeMailHandler} />
            <input type="password" placeholder='password' value={password} onChange={changePasswordHandler} />
            <button onClick={submitHandler}>Login</button>
            <p style={{ marginTop: '18px', color: '#64748b', fontSize: '14px' }}>
                Don't have an account?{' '}
                <span
                    style={{ color: '#0284c7', cursor: 'pointer', fontWeight: '600' }}
                    onClick={() => navigate('/signup')}
                >
                    Sign up here
                </span>
            </p>
        </div>
    )
}

export default Login