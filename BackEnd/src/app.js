const express = require('express');
const cors = require('cors'); // permitir que el frontend se comunique con el backend.
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/database'); // Importa la conexión a la BD
const authRoutes = require('./routes/authRoutes'); // Importa las rutas de autenticación
const materiasRouter = require('./routes/materiasRoutes'); // Importa las rutas de materias
const tareasRoutes = require('./routes/tareasRoutes'); // Importa las rutas de tareas
const materialesRouter = require('./routes/materialesRoutes'); // Importa las rutas de materiales
const examenesRoutes = require('./routes/examenesRoutes'); // Importa las rutas de exámenes
const preguntasRoutes = require('./routes/preguntasRoutes'); // Importa las rutas de preguntas
const opcionesRoutes = require('./routes/opcionesRoutes'); // Importa las rutas de opciones
const respuestasRoutes = require('./routes/respuestasRoutes'); // Importa las rutas de respuestas
const resultadosRoutes = require('./routes/resultadosRoutes'); // Importa las rutas de resultados


dotenv.config();

const app = express();
const path = require('path');

// Configuración global
app.use(cors());
app.use(bodyParser.json());

// Rutas principales
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de materias
app.use('/api/materias', materiasRouter);

// Rutas de tareas
app.use('/api/tareas', tareasRoutes);

// Rutas de materiales
app.use('/api/materiales', materialesRouter);

// Rutas de exámenes
app.use('/api/examenes', examenesRoutes);

// Rutas de preguntas
app.use('/api/preguntas', preguntasRoutes);

// Rutas de opciones
app.use('/api/opciones', opcionesRoutes);

// Rutas de respuestas
// app.use('/api/respuestas', respuestasRoutes);

// Rutas de resultados
// app.use('/api/resultados', resultadosRoutes);



// Servir la carpeta uploads como estática
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Sincronizar modelos con la base de datos
// Sincronizar modelos
// Sincronizar modelos con la base de datos
sequelize.sync({ alter: false }).then(() => {
    console.log('Base de datos sincronizada');
}).catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});


// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    try {
        await sequelize.sync(); // Sincroniza los modelos con la base de datos
        console.log('Modelos sincronizados con la base de datos.');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
});
