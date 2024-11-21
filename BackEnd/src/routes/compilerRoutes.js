const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/execute', async (req, res) => {

    const { code, language } = req.body;

    try {
        const response = await axios.post('https://judge0.p.rapidapi.com/submissions', {
            source_code: code,
            language_id: language, // Identificador del lenguaje, por ejemplo: 63 para Python
            stdin: '', // Si el código necesita entrada estándar, lo puedes pasar aquí
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': '6fd59321a1msh51b1a473dda782bp1207c0jsn35685a497a4d', // Sustituye con tu clave de Judge0
                'X-RapidAPI-Host': 'judge0.p.rapidapi.com',
            },
        });

        // Esperar el resultado
        const result = await axios.get(`https://judge0.p.rapidapi.com/submissions/${response.data.token}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': '6fd59321a1msh51b1a473dda782bp1207c0jsn35685a497a4d',
                'X-RapidAPI-Host': 'judge0.p.rapidapi.com',
            },
        });

        res.status(200).json(result.data); // Devuelve el resultado al frontend
    } catch (error) {
        console.error('Error al ejecutar el código:', error);
        res.status(500).json({ error: 'Error al ejecutar el código' });
    }
});

module.exports = router;
