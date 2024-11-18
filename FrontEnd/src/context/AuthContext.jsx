import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.token); // Guardar token en localStorage
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Remover token de localStorage
        navigate('/login'); // Redirigir al login
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
