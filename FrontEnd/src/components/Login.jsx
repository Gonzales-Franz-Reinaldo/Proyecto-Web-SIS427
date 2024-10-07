import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';


// eslint-disable-next-line react/prop-types
export const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/login', { email, password }, { withCredentials: true });
            setUser(response.data);

            if (response.data.rol === 'Estudiante') {
                navigate('/estudiante');
            } else if (response.data.rol === 'Docente') {
                navigate('/docente');
            }
        } catch (error) {
            console.error('Error en el login:', error);
        }
    };

    return (
        <div className="login-container">
            <h2>Sign-In</h2>
            <form onSubmit={handleLogin}>
                <div className="input-box">
                    <label>Email</label>
                    <input type="email" placeholder="Enter Email" required
                        value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-box">
                    <label>Password</label>
                    <input type="password" placeholder="Enter Password" required
                        value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <button type="submit" className="login-btn">Log in</button>
                {error && <p>{error}</p>}

                <p>¿ No tienes cuenta?.</p>
                <Link to="/register" type="button" className="create-account-btn">Registrarse</Link>
            </form>
        </div>
    );
};