const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const router = express.Router();

// Configuración del puerto serie
let arduinoPort;
let parser;

// Inicializa la conexión al puerto serie
const initializeSerialPort = async () => {
    try {
        const ports = await SerialPort.list();
        console.log('Puertos disponibles:', ports);

        // Forzar el puerto COM4 si no se encuentra el Arduino automáticamente
        const arduinoPortInfo = ports.find(port => port.manufacturer && port.manufacturer.includes('Arduino')) || ports.find(port => port.path === 'COM4');

        if (!arduinoPortInfo) {
            console.error('No se encontró ningún Arduino conectado.');
            return;
        }

        arduinoPort = new SerialPort({
            path: arduinoPortInfo.path, // Usar COM4 si no se detecta automáticamente
            baudRate: 9600,
            autoOpen: false,
        });

        parser = new ReadlineParser({ delimiter: '\n' });
        arduinoPort.pipe(parser);

        arduinoPort.on('open', () => {
            console.log('Conexión con Arduino establecida en', arduinoPortInfo.path);
        });

        arduinoPort.on('error', (err) => {
            console.error('Error en el puerto serie:', err);
        });

        arduinoPort.on('close', () => {
            console.log('Conexión con Arduino cerrada.');
            setTimeout(connectArduino, 5000); // Intentar reconectar
        });

        parser.on('data', (data) => {
            console.log('Datos recibidos desde Arduino:', data.trim());
        });

        connectArduino();
    } catch (error) {
        console.error('Error al inicializar el puerto serie:', error);
    }
};

// Función para abrir la conexión al Arduino
const connectArduino = () => {
    if (arduinoPort && !arduinoPort.isOpen) {
        arduinoPort.open((err) => {
            if (err) {
                console.error('Error al abrir el puerto serie:', err);
                setTimeout(connectArduino, 5000); // Reintentar conexión
            }
        });
    }
};

// Enviar comandos al Arduino
const sendCommand = (command) => {
    return new Promise((resolve, reject) => {
        if (!arduinoPort || !arduinoPort.isOpen) {
            return reject(new Error('Puerto serie no disponible'));
        }
        console.log(`Enviando comando: ${command}`);
        arduinoPort.write(command + '\n', (error) => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
};

// Ruta para verificar el estado de conexión
router.get('/status', (req, res) => {
    res.json({
        serverStatus: 'running',
        arduinoConnected: arduinoPort && arduinoPort.isOpen,
    });
});

// Ruta para controlar LEDs simples
router.get('/led/:id/:action', async (req, res) => {
    const { id, action } = req.params;
    const validIds = ['1', '2', '3', '4'];
    const validActions = ['on', 'off'];

    if (!validIds.includes(id) || !validActions.includes(action)) {
        return res.status(400).json({ error: 'Parámetros inválidos' });
    }

    const command = `LED${id}_${action.toUpperCase()}`;
    try {
        await sendCommand(command);
        res.json({ success: true, message: `LED ${id} ${action}` });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar comando', details: error.message });
    }
});

// Ruta para controlar el LED RGB
router.post('/rgb', async (req, res) => {
    const { red, green, blue } = req.body;

    if (![red, green, blue].every(value => Number.isInteger(value) && value >= 0 && value <= 255)) {
        return res.status(400).json({ error: 'Valores RGB inválidos' });
    }

    const command = `RGB_${red}_${green}_${blue}`;
    try {
        await sendCommand(command);
        res.json({ success: true, message: `RGB configurado a R:${red}, G:${green}, B:${blue}` });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar comando', details: error.message });
    }
});

// Ruta para controlar el servomotor
router.post('/servo', async (req, res) => {
    const { angle } = req.body;

    if (!Number.isInteger(angle) || angle < 0 || angle > 180) {
        return res.status(400).json({ error: 'Ángulo inválido' });
    }

    const command = `SERVO_${angle}`;
    try {
        await sendCommand(command);
        res.json({ success: true, message: `Servomotor girado a ${angle} grados` });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar comando', details: error.message });
    }
});

// Inicializar conexión al arrancar
initializeSerialPort();

module.exports = router;
