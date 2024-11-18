import { motion } from 'framer-motion';

export const InicioDocente = () => {
    return (
        <motion.div
            className="bg-white p-6 rounded-lg shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800">Resumen General</h2>
            <p className="text-gray-600 mt-4">
                Bienvenido a la plataforma. Aquí podrás gestionar todas tus materias, estudiantes y actividades.
            </p>
        </motion.div>
    );
};


