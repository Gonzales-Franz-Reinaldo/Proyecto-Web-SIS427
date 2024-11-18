const User = require('../models/User');
const Docente = require('../models/Docente');
const Estudiante = require('../models/Estudiante');
const { hashPassword, comparePassword } = require('../utils/hashUtils');
const { generateToken } = require('../utils/jwtUtils');

exports.register = async (req, res) => {

    const { nombre, apellido, email, ci, telefono, password, rol, ...additionalData } = req.body;

    try {

        const fecha_registro = new Date();
        // Crear usuario general
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ nombre, apellido, email, ci, telefono, password: hashedPassword, rol, fecha_registro });

        // Crear datos específicos según el rol
        if (rol === 'docente') {
            await Docente.create({ id_usuario: user.id, ...additionalData });
        } else if (rol === 'estudiante') {
            await Estudiante.create({ id_usuario: user.id, ...additionalData });
        }

        res.status(201).json({ message: 'Usuario registrado con éxito', user });
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar el usuario', details: error });
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

        // Generar token JWT
        const token = generateToken(user);
        res.status(200).json({ message: 'Login exitoso', token, user });
    } catch (error) {
        console.error('Error en login:', error); // Para depuración en consola
        res.status(400).json({ error: 'Error al iniciar sesión', details: error });
    }
};
