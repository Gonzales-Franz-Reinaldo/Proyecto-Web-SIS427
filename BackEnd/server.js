// index.js
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Configurar sesiones
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
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



// Ruta de registro
app.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, hashedPassword, role], (err, results) => {
        if (err) {
            console.error('Error registrando usuario:', err.stack);
            res.status(500).send('Error registrando usuario');
            return;
        }
        res.status(201).send('Usuario registrado');
    });
});

// Ruta de login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error en el login:', err.stack);
            res.status(500).send('Error en el login');
            return;
        }
        if (results.length > 0 && await bcrypt.compare(password, results[0].password)) {
            req.session.user = { id: results[0].id, role: results[0].role };
            res.send('Login exitoso');
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    });
});

// Ruta protegida
app.get('/protected', (req, res) => {
    if (req.session.user) {
        res.send(`Hola ${req.session.user.role}`);
    } else {
        res.status(401).send('No autorizado');
    }
});

// Ruta de logout
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logout exitoso');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});