import { useState } from 'react';
import axios from 'axios';
import MonacoEditor from '@monaco-editor/react';

const CodeCompiler = () => {
    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const languages = [
        { name: 'Python', id: 71 },
        { name: 'JavaScript', id: 63 },
        { name: 'Java', id: 62 },
        { name: 'C++', id: 54 },
        { name: 'PHP', id: 68 },
        { name: 'C#', id: 51 },
    ];

    const handleRunCode = async () => {
        setLoading(true);
        setOutput('');

        try {
            const response = await axios.post('http://localhost:3000/api/compiler/execute', {
                code,
                language: languages.find((lang) => lang.name.toLowerCase() === language).id,
                stdin: '5', // Aquí puedes enviar entrada estándar si es necesaria
            });

            const result = response.data;
            setOutput(result.stdout || result.stderr || 'No output');
        } catch (error) {
            console.error('Error al ejecutar el código:', error);
            setOutput('Error al ejecutar el código.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Compilador de Código</h2>

            {/* Selector de lenguaje */}
            <div className="mb-4">
                <label htmlFor="language" className="block text-gray-700 font-bold mb-2">
                    Seleccionar lenguaje:
                </label>
                <select
                    id="language"
                    className="w-full border-gray-300 rounded-lg"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    {languages.map((lang) => (
                        <option key={lang.id} value={lang.name.toLowerCase()}>
                            {lang.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Editor de código */}
            <div className="mb-4">
                <MonacoEditor
                    height="300px"
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value)}
                    theme="vs-dark"
                />
            </div>

            {/* Botón de ejecutar */}
            <button
                className={`px-4 py-2 rounded bg-blue-500 text-white font-bold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleRunCode}
                disabled={loading}
            >
                {loading ? 'Ejecutando...' : 'Ejecutar'}
            </button>

            {/* Contenedor de resultados */}
            <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold text-lg">Resultado:</h3>
                <pre className="mt-2 bg-black text-white p-2 rounded">{output}</pre>
            </div>
        </div>
    );
};

export default CodeCompiler;
