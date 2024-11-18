import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';

const HeaderDocente = ({ activeSection }) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="bg-white shadow p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{activeSection}</h2>
            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <p className="font-bold">{`${user?.user?.nombre} ${user?.user?.apellido}`}</p>
                    <p className="text-sm text-gray-500">{user?.user?.email}</p>
                </div>
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.user?.nombre?.[0]}
                </div>
                {/* Botón de Cerrar Sesión */}
                <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

HeaderDocente.propTypes = {
    activeSection: PropTypes.string.isRequired,
};

export default HeaderDocente;
