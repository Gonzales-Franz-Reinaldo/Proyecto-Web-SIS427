// index.js
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;


// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173', // El origen de tu frontend (puerto de Vite)
    credentials: true // Permite enviar cookies y encabezados de autenticación
}));

// Middleware para parsear JSON y habilitar CORS
app.use(bodyParser.json());





// Configuración de sesiones
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,  // Solo guardar si la sesión cambia
    cookie: { secure: false }  // Cambiar a true si usas HTTPS
}));




// Conectar a MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_sis427'
});


connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});



app.post('/login', (req, res) => {

    const { email, password } = req.body;

    var sql = 'SELECT * FROM usuarios WHERE email = ?';
    connection.query(sql, [email], async (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (results.length > 0) {
            const user = results[0];  

            // console.log('Resultado de la consulta SQL:', user);  // Revisa aquí si tiene el id_usuario
            
            if (await bcrypt.compare(password, user.password)) {
                req.session.user = {
                    id: user.id_usuario,  // Usar el id_usuario si este es el nombre correcto
                    email: user.email,
                    nombre: user.nombre,
                    rol: user.rol
                };
                // console.log('Sesión iniciada:', req.session.user);
                res.json(req.session.user);
            } else {
                res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        } else {
            res.status(401).json({ message: 'Usuario no encontrado' });
        }
    });

});





app.post('/register', (req, res) => {
    const { nombre, apellido, email, ci, telefono, password, rol, especialidad, nivel_academico, experiencia, categoria, matricula, carrera, cu } = req.body;

    // Fecha de registro y ajuste de zona horaria
    const fecha_registro = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const fecha_ingreso = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const sqlUsuario = "INSERT INTO usuarios (`nombre`, `apellido`, `email`, `ci`, `telefono`, `password`, `rol`, `fecha_registro`) VALUES (?)";

    // Hash de la contraseña
    const saltRounds = 10;
    bcrypt.hash(password.toString(), saltRounds, (err, hash) => {

        if (err) return res.json({ Error: "Error hashing password" });

        const userValues = [nombre, apellido, email, ci, telefono, hash, rol, fecha_registro];

        connection.query(sqlUsuario, [userValues], (err, result) => {
            if (err) {
                console.error("Error al registrar el usuario:", err);
                return res.json({ Error: "Error al registrar el usuario", Details: err });
            }

            const id_usuario = result.insertId; // Obtener el ID insertado

            if (rol === 'Docente') {
                const sqlDocente = "INSERT INTO docente (`id_usuario`, `especialidad`, `nivel_academico`, `experiencia`, `categoria`) VALUES (?)";

                const docenteValues = [id_usuario, especialidad, nivel_academico, experiencia, categoria];

                connection.query(sqlDocente, [docenteValues], (err, result) => {
                    if (err) {
                        console.error("Error al registrar el docente:", err);
                        return res.json({ Error: "Error al registrar el docente", Details: err });
                    }
                    return res.json({ Status: "Success" });
                });

            } else if (rol === 'Estudiante') {
                const sqlEstudiante = "INSERT INTO estudiante (`id_usuario`, `matricula`, `carrera`, `cu`, `fecha_ingreso`) VALUES (?)";
                const estudianteValues = [id_usuario, matricula, carrera, cu, fecha_ingreso];

                connection.query(sqlEstudiante, [estudianteValues], (err, result) => {
                    if (err) {
                        console.error("Error al registrar el estudiante:", err);
                        return res.json({ Error: "Error al registrar el estudiante", Details: err });
                    }
                    return res.json({ Status: "Success" });
                });
            }
        });
    });
});





// Ruta protegida 
app.get('/protected', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).send('No autorizado');
    }
});



// Cerrar sesión
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Error al cerrar sesión' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Sesión cerrada correctamente' });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});





//? Ruta para obtener las asignaturas de un docente

app.get('/asignaturas', (req, res) => {

    const usuarioId = req.query.id_usuario;  // Obtener el id_usuario del query param

    if (!usuarioId) {
        console.error('ID de usuario no proporcionado');
        return res.status(400).json({ error: 'Falta el id_usuario' });
    }

    // console.log('ID del usuario recibido:', usuarioId);

    // Obtener el id_docente correspondiente al id_usuario
    const docenteSql = 'SELECT id_docente FROM docente WHERE id_usuario = ?';

    connection.query(docenteSql, [usuarioId], (error, docenteResult) => {
        if (error) {
            console.error('Error al obtener el id_docente:', error);  // Log de error
            return res.status(500).json({ error: 'Error al obtener datos del docente' });
        }
        
        if (docenteResult.length === 0) {
            console.error('Docente no encontrado');
            return res.status(404).json({ error: 'Docente no encontrado' });
        }

        const docenteId = docenteResult[0].id_docente;
        // console.log('ID del docente:', docenteId);

        const asignaturaSql = `
            SELECT a.id_asignatura, a.nombre, a.sigla, a.creditos, a.curso
            FROM asignatura a
            JOIN docente_asignatura da ON a.id_asignatura = da.id_asignatura
            WHERE da.id_docente = ?
        `;

        connection.query(asignaturaSql, [docenteId], (error, results) => {
            if (error) {
                console.error('Error al obtener asignaturas:', error);  // Log de error
                return res.status(500).json({ error: 'Error al obtener asignaturas' });
            }

            res.json(results);
        });
    });
});

