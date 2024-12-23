import PropTypes from 'prop-types';

const HeaderEstudiante = ({ user }) => {
    return (
        <header className="bg-white shadow-md px-8 py-6 flex items-center justify-between rounded-b-2xl">
            <h1 className="text-3xl font-extrabold text-orange-600">Bienvenido, {user?.user?.nombre}</h1>
            <div className="flex items-center space-x-4">
                <img
                    src="https://via.placeholder.com/50"
                    alt="Avatar"
                    className="w-12 h-12 rounded-full border-4 border-purple-600"
                />
                <div>
                    <p className="font-bold text-purple-600">{user?.user?.nombre}</p>
                    <p className="text-sm text-gray-500">{user?.user?.email}</p>
                </div>
            </div>
        </header>
    );
};


HeaderEstudiante.propTypes = {
    user: PropTypes.object.isRequired
};

export default HeaderEstudiante;
