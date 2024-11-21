import { useState, useEffect } from 'react';

const ControladorArduino = () => {
    const [ledStatus, setLedStatus] = useState({ led1: false, led2: false, led3: false, led4: false });
    const [rgbColor, setRgbColor] = useState({ r: 0, g: 0, b: 0 });
    const [servoAngle, setServoAngle] = useState(90);
    const [connectionStatus, setConnectionStatus] = useState('Verificando conexión...');

    // Verificar conexión con Arduino
    const checkConnection = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/status'); // Verifica la ruta
            const data = await response.json();
            if (data.arduinoConnected) {
                setConnectionStatus('Arduino conectado');
            } else {
                setConnectionStatus('Arduino desconectado');
            }
        } catch (error) {
            setConnectionStatus('Error de conexión');
            console.error(error);
        }
    };

    useEffect(() => {
        checkConnection();
        const interval = setInterval(checkConnection, 5000); // Verificar cada 5 segundos
        return () => clearInterval(interval);
    }, []);

    // Controlar LEDs
    const toggleLed = async (id, action) => {
        try {
            await fetch(`http://localhost:3000/api/led/${id}/${action}`);
            setLedStatus((prev) => ({
                ...prev,
                [`led${id}`]: action === 'on',
            }));
        } catch (error) {
            console.error('Error al controlar el LED:', error);
        }
    };

    // Configurar LED RGB
    const applyRgbColor = async () => {
        try {
            await fetch('http://localhost:3000/api/rgb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rgbColor),
            });
        } catch (error) {
            console.error('Error al configurar el LED RGB:', error);
        }
    };

    // Configurar Servomotor
    const rotateServo = async () => {
        try {
            await fetch('http://localhost:3000/api/servo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ angle: servoAngle }),
            });
        } catch (error) {
            console.error('Error al controlar el servomotor:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-gray-200 p-6">
            <h2 className="text-4xl font-bold mb-8 text-center tracking-wide">Controlador Arduino</h2>
            <div className="mb-6 p-4 text-center bg-gray-900 shadow rounded animate-fade">
                <p className={`font-bold text-lg ${connectionStatus.includes('conectado') ? 'text-green-400' : 'text-red-500'}`}>
                    {connectionStatus}
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Control LEDs */}
                <div className="bg-gray-900 p-6 rounded-lg shadow hover:scale-105 transition-transform">
                    <h3 className="text-xl font-semibold mb-6 text-center text-yellow-400">Control LEDs</h3>
                    <div className="grid grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((id) => (
                            <div key={id} className="text-center">
                                <h4 className="font-bold text-lg">LED {id}</h4>
                                <button
                                    onClick={() => toggleLed(id, 'on')}
                                    className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded shadow animate-pulse"
                                >
                                    Encender
                                </button>
                                <button
                                    onClick={() => toggleLed(id, 'off')}
                                    className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded shadow"
                                >
                                    Apagar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Control LED RGB */}
                <div className="bg-gray-900 p-6 rounded-lg shadow hover:scale-105 transition-transform">
                    <h3 className="text-xl font-semibold mb-6 text-center text-blue-400">Control LED RGB</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {['r', 'g', 'b'].map((color) => (
                            <div key={color} className="text-center">
                                <label className="block mb-1 font-bold text-sm uppercase">{color.toUpperCase()}</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="255"
                                    value={rgbColor[color]}
                                    onChange={(e) =>
                                        setRgbColor((prev) => ({
                                            ...prev,
                                            [color]: parseInt(e.target.value, 10),
                                        }))
                                    }
                                    className="w-full cursor-pointer"
                                />
                                <span className="text-lg">{rgbColor[color]}</span>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={applyRgbColor}
                        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow animate-bounce"
                    >
                        Aplicar Color
                    </button>
                </div>

                {/* Control Servomotor */}
                <div className="bg-gray-900 p-6 rounded-lg shadow col-span-2 hover:scale-105 transition-transform">
                    <h3 className="text-xl font-semibold mb-6 text-center text-purple-400">Control Servomotor</h3>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            min="0"
                            max="180"
                            value={servoAngle}
                            onChange={(e) => setServoAngle(parseInt(e.target.value, 10))}
                            className="flex-1 cursor-pointer"
                        />
                        <span className="text-lg">{servoAngle}°</span>
                    </div>
                    <button
                        onClick={rotateServo}
                        className="mt-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded shadow animate-bounce"
                    >
                        Girar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ControladorArduino;
