const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());
app.use(express.static('public'));

// Configuración del puerto serie
let arduinoPort;
let parser;

const initializeSerialPort = async () => {
    try {
        const ports = await SerialPort.list();
        console.log('Puertos disponibles:', ports);
        
        arduinoPort = new SerialPort({
            path: '/dev/ttyACM0', // Ajusta según tu sistema
            baudRate: 9600,
            autoOpen: false
        });

        parser = new ReadlineParser({ delimiter: '\n' });
        arduinoPort.pipe(parser);

        arduinoPort.on('open', () => {
            console.log('Conexión con Arduino establecida.');
        });

        arduinoPort.on('error', (err) => {
            console.error('Error en el puerto serie:', err);
        });

        arduinoPort.on('close', () => {
            console.log('Conexión con Arduino perdida. Intentando reconectar...');
            setTimeout(connectArduino, 5000);
        });

        parser.on('data', (data) => {
            console.log('Datos recibidos desde Arduino:', data.trim());
        });

        return true;
    } catch (error) {
        console.error('Error al inicializar el puerto serie:', error);
        return false;
    }
};

const connectArduino = async () => {
    if (!arduinoPort) {
        await initializeSerialPort();
    }
    if (arduinoPort && !arduinoPort.isOpen) {
        arduinoPort.open(err => {
            if (err) {
                console.error('Error al abrir el puerto serie:', err);
                setTimeout(connectArduino, 5000);
            }
        });
    }
};

const sendCommand = (command) => {
    return new Promise((resolve, reject) => {
        if (!arduinoPort || !arduinoPort.isOpen) {
            reject(new Error('Puerto serie no disponible'));
            return;
        }
        arduinoPort.write(command + '\n', (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
};
// Mapeo correcto de número de LED a pin de Arduino
const LED_PIN_MAP = {
    '1': '1',  // LED 1 -> Pin 2
    '2': '2',  // LED 2 -> Pin 3
    '3': '3',  // LED 3 -> Pin 4
    '4': '4'   // LED 4 -> Pin 5
};


// Rutas para controlar los LEDs simples
app.get('/api/led/:id/:action', async (req, res) => {
    const { id, action } = req.params;
    
    console.log(`Recibida petición para LED ${id} acción ${action}`); // Log para debug
    
    // Verificar si el LED existe en nuestro mapeo
    if (!LED_PIN_MAP[id] || !['on', 'off'].includes(action)) {
        console.log('Parámetros inválidos:', { id, action }); // Log para debug
        return res.status(400).json({ error: 'Parámetros inválidos' });
    }

    const pin = LED_PIN_MAP[id];
    const command = `LED${pin}_${action.toUpperCase()}`;
    
    try {
        await sendCommand(command);
        res.json({ success: true, message: `LED ${id} ${action}` });
    } catch (error) {
        console.error('Error al procesar comando:', error); // Log para debug
        res.status(500).json({
            error: 'Error al enviar comando',
            details: error.message
        });
    }
});

// Ruta para controlar el LED RGB
app.post('/api/rgb', async (req, res) => {
    const { red, green, blue } = req.body;
    
    // Validar que los valores estén entre 0 y 255
    if (![red, green, blue].every(value => 
        Number.isInteger(value) && value >= 0 && value <= 255
    )) {
        return res.status(400).json({ error: 'Valores RGB inválidos. Deben ser enteros entre 0 y 255' });
    }

    const command = `RGB_${red}_${green}_${blue}`;
    try {
        await sendCommand(command);
        res.json({ 
            success: true, 
            message: `LED RGB configurado a R:${red} G:${green} B:${blue}` 
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al enviar comando',
            details: error.message
        });
    }
});

// Ruta para controlar el servomotor
app.post('/api/servo', async (req, res) => {
    const { angle } = req.body;
    
    // Validar que el ángulo esté entre 0 y 180 grados
    if (!Number.isInteger(angle) || angle < 0 || angle > 180) {
        return res.status(400).json({ 
            error: 'Ángulo inválido. Debe ser un número entero entre 0 y 180 grados' 
        });
    }

    const command = `SERVO_${angle}`;
    try {
        await sendCommand(command);
        res.json({
            success: true,
            message: `Servomotor girado a ${angle} grados`
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error al enviar comando',
            details: error.message
        });
    }
});


// Estado del servidor
app.get('/api/status', (req, res) => {
    res.json({
        serverStatus: 'running',
        arduinoConnected: arduinoPort && arduinoPort.isOpen
    });
});

// Iniciar servidor
app.listen(port, async () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    await initializeSerialPort();
    connectArduino();
});

// Manejo de cierre graceful
process.on('SIGINT', () => {
    if (arduinoPort && arduinoPort.isOpen) {
        arduinoPort.close();
    }
    process.exit();
});