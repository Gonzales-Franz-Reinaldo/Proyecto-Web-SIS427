-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-12-2024 a las 00:42:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_sis427`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignatura`
--

CREATE TABLE `asignatura` (
  `id` int(50) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `sigla` varchar(255) NOT NULL,
  `curso` int(11) NOT NULL,
  `creditos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asignatura`
--

INSERT INTO `asignatura` (`id`, `nombre`, `descripcion`, `sigla`, `curso`, `creditos`) VALUES
(1, 'Programación en Python', 'Introducción al lenguaje de programación Python.', 'PROG101', 1, 3),
(2, 'Estructuras de Datos', 'Estudio de estructuras de datos y su implementación.', 'EDU201', 2, 4),
(3, 'Desarrollo Web', 'Fundamentos de desarrollo de aplicaciones web modernas.', 'DW302', 3, 7),
(4, 'Bases de Datos', 'Diseño y gestión de bases de datos relacionales.', 'BD401', 4, 4),
(5, 'Algoritmos y Complejidad', 'Análisis de algoritmos y su eficiencia.', 'AC502', 5, 3),
(6, 'Programación Orientada a Objetos', 'Principios de la programación orientada a objetos utilizando Java.', 'POO603', 6, 4),
(7, 'Ingeniería de Software', 'Metodologías y herramientas para el desarrollo de software.', 'IS704', 7, 4),
(8, 'Redes de Computadoras', 'Conceptos básicos sobre redes de computadoras y comunicación.', 'RC805', 8, 3),
(9, 'Sistemas Operativos', 'Fundamentos de la arquitectura y uso de sistemas operativos.', 'SO906', 9, 3),
(10, 'Inteligencia Artificial', 'Introducción a los conceptos y técnicas de inteligencia artificial.', 'IA1007', 10, 4),
(11, 'Desarrollo de Aplicaciones Móviles', 'Creación de aplicaciones para plataformas móviles.', 'DAM1108', 8, 4),
(12, 'Seguridad Informática', 'Principios básicos de la seguridad en sistemas informáticos.', 'SI1209', 9, 3),
(13, 'Metodología de la Investigación', 'Metodologías aplicadas a la investigación en tecnología.', 'MI1308', 6, 3),
(14, 'Computación en la Nube', 'Fundamentos y prácticas de computación en la nube.', 'CC1407', 10, 4),
(15, 'Programación Avanzada', 'Temas avanzados de programación en C++.', 'PA1506', 7, 4),
(16, 'Visualización de Datos', 'Metodologías de visualización de datos y herramientas.', 'VD1605', 5, 3),
(17, 'Tecnologías de la Información', 'Uso y gestión de tecnologías de la información.', 'TI1704', 3, 4),
(18, 'Desarrollo de Juegos', 'Principios y técnicas para el desarrollo de videojuegos.', 'DG1803', 6, 4),
(19, 'Sistemas de Información', 'Diseño y gestión de sistemas de información organizacionales.', 'SI1902', 4, 3),
(20, 'Computación Cuántica', 'Introducción a los principios de la computación cuántica.', 'CQ2001', 10, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contactos`
--

CREATE TABLE `contactos` (
  `id_contacto` int(50) NOT NULL,
  `id_usuario` int(50) NOT NULL,
  `id_contacto_usuario` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docentes`
--

CREATE TABLE `docentes` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `especialidad` varchar(255) NOT NULL,
  `nivel_academico` varchar(255) NOT NULL,
  `experiencia` int(11) NOT NULL,
  `categoria` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `docentes`
--

INSERT INTO `docentes` (`id`, `id_usuario`, `especialidad`, `nivel_academico`, `experiencia`, `categoria`) VALUES
(1, 14, 'Matemáticas', 'Licenciatura', 10, 'A');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docente_asignatura`
--

CREATE TABLE `docente_asignatura` (
  `id` int(50) NOT NULL,
  `id_docente` int(11) NOT NULL,
  `id_asignatura` int(11) NOT NULL,
  `fecha_asignacion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `docente_asignatura`
--

INSERT INTO `docente_asignatura` (`id`, `id_docente`, `id_asignatura`, `fecha_asignacion`) VALUES
(1, 1, 1, '2024-01-15 09:00:00'),
(3, 1, 3, '2024-01-17 09:00:00'),
(5, 1, 5, '2024-01-19 09:00:00'),
(8, 1, 8, '2024-01-22 09:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrega_tareas`
--

CREATE TABLE `entrega_tareas` (
  `id` int(11) NOT NULL,
  `id_tarea` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `archivo_estudiante` varchar(255) NOT NULL,
  `fecha_entrega` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `matricula` varchar(255) NOT NULL,
  `carrera` varchar(255) NOT NULL,
  `cu` varchar(255) NOT NULL,
  `fecha_ingreso` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `id_usuario`, `matricula`, `carrera`, `cu`, `fecha_ingreso`) VALUES
(1, 15, '202201234', 'Ingeniería en Sistemas', '12345678IS', '2023-01-15 00:00:00'),
(3, 9, '234532', 'Inge Sitemas', '3425633', '2024-11-21 00:24:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante_asignatura`
--

CREATE TABLE `estudiante_asignatura` (
  `id` int(50) NOT NULL,
  `id_estudiante` int(50) NOT NULL,
  `id_asignatura` int(50) NOT NULL,
  `fecha_inscripcion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiante_asignatura`
--

INSERT INTO `estudiante_asignatura` (`id`, `id_estudiante`, `id_asignatura`, `fecha_inscripcion`) VALUES
(4, 1, 1, '2023-01-15 00:00:00'),
(5, 3, 1, '2023-01-16 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examenes`
--

CREATE TABLE `examenes` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `id_asignatura` int(11) NOT NULL,
  `fecha_publicacion` datetime NOT NULL,
  `fecha_entrega` datetime NOT NULL,
  `estado` enum('borrador','publicado') DEFAULT 'borrador',
  `puntuacion_total` int(11) DEFAULT 100,
  `duracion` int(11) DEFAULT 60
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `examenes`
--

INSERT INTO `examenes` (`id`, `titulo`, `descripcion`, `id_asignatura`, `fecha_publicacion`, `fecha_entrega`, `estado`, `puntuacion_total`, `duracion`) VALUES
(6, 'Desarrollo Web 2', 'Examena a resolver', 1, '2024-11-21 06:27:00', '2024-12-01 06:25:00', 'publicado', 100, 50),
(7, 'Arquitectura de software', 'Resolver examen', 1, '2024-11-20 02:02:00', '2024-11-29 17:05:00', 'borrador', 100, 30),
(8, 'App movilesss', 'Resolver examen', 1, '2024-11-18 23:37:00', '2024-11-22 01:39:00', 'borrador', 100, 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiales`
--

CREATE TABLE `materiales` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `archivo` varchar(255) NOT NULL,
  `fecha_publicacion` datetime DEFAULT NULL,
  `id_asignatura` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materiales`
--

INSERT INTO `materiales` (`id`, `titulo`, `descripcion`, `archivo`, `fecha_publicacion`, `id_asignatura`) VALUES
(1, 'Programacion', 'Contenido para el estudio', '1731900308480-factura_pago.pdf', '2024-11-18 02:52:25', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id_mensaje` int(50) NOT NULL,
  `id_remitente` int(50) NOT NULL,
  `id_destinatario` int(50) NOT NULL,
  `contenido` text NOT NULL,
  `fecha_envio` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opciones`
--

CREATE TABLE `opciones` (
  `id` int(11) NOT NULL,
  `id_pregunta` int(11) NOT NULL,
  `texto` varchar(255) NOT NULL,
  `es_correcta` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `id` int(11) NOT NULL,
  `id_examen` int(11) NOT NULL,
  `tipo` enum('multiple','unica','falso_verdadero','completar') NOT NULL,
  `texto` text NOT NULL,
  `puntuacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`id`, `id_examen`, `tipo`, `texto`, `puntuacion`) VALUES
(7, 6, 'completar', 'Que es la programacion?', 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas_estudiantes`
--

CREATE TABLE `respuestas_estudiantes` (
  `id` int(11) NOT NULL,
  `id_examen` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `id_pregunta` int(11) NOT NULL,
  `respuesta` text DEFAULT NULL,
  `es_correcta` tinyint(1) DEFAULT NULL,
  `completado` tinyint(1) DEFAULT 1,
  `estado` enum('pendiente','finalizada') NOT NULL DEFAULT 'pendiente',
  `fecha_respuesta` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `respuestas_estudiantes`
--

INSERT INTO `respuestas_estudiantes` (`id`, `id_examen`, `id_estudiante`, `id_pregunta`, `respuesta`, `es_correcta`, `completado`, `estado`, `fecha_respuesta`) VALUES
(1, 6, 3, 7, 'Opción A', 1, 1, 'finalizada', '2024-11-21 04:37:11'),
(2, 6, 3, 7, 'Opción A', 1, 1, 'finalizada', '2024-11-21 07:36:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados_examenes`
--

CREATE TABLE `resultados_examenes` (
  `id` int(11) NOT NULL,
  `id_examen` int(11) NOT NULL,
  `id_estudiante` int(11) NOT NULL,
  `puntuacion_obtenida` int(11) NOT NULL,
  `fecha_completado` datetime NOT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `estado` enum('pendiente','completado') NOT NULL DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resultados_examenes`
--

INSERT INTO `resultados_examenes` (`id`, `id_examen`, `id_estudiante`, `puntuacion_obtenida`, `fecha_completado`, `fecha_inicio`, `estado`) VALUES
(2, 6, 3, 90, '2024-11-21 04:38:17', '2024-11-21 02:23:33', 'completado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` int(50) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_publicacion` datetime NOT NULL,
  `fecha_entrega` datetime NOT NULL,
  `id_asignatura` int(11) NOT NULL,
  `archivo_docente` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `titulo`, `descripcion`, `fecha_publicacion`, `fecha_entrega`, `id_asignatura`, `archivo_docente`) VALUES
(4, 'mi tarea de web', 'Esta es una tarea de prueba web', '2024-11-17 23:22:20', '2024-12-01 00:00:00', 3, '1731885740512-lechuga_17.jpg'),
(5, 'mi tarea de redes', 'Esta es una tarea de prueba redes', '2024-11-17 23:22:37', '2024-12-01 00:00:00', 5, '1731885757822-lechuga_17.jpg'),
(6, 'mi tarea de redes compeljas', 'Esta es una tarea de prueba compleja', '2024-11-17 23:27:16', '2024-12-01 00:00:00', 8, '1731886036727-lechuga_17.jpg'),
(10, 'Aplicacion movil', 'Realizar una app para peliculas', '2024-11-18 01:10:42', '2024-11-23 00:00:00', 1, '1731892242693-2do_practica.pdf'),
(11, 'Sistemas de tiempo real 1', 'Describir los conceptos mas importes sobre el tema', '2024-11-18 02:25:34', '2024-11-22 00:00:00', 1, '1731896811827-Laboratorio Soquets RMI.pdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `ci` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('docente','estudiante') NOT NULL,
  `fecha_registro` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `apellido`, `email`, `ci`, `telefono`, `password`, `rol`, `fecha_registro`) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@example.com', '1298323', '76395832', '$2b$10$siX6JNijuClVpEJAJ0ps1.sAnrL0P4XRwS.J7L2Czs2XgKqNYV7be', 'docente', '2024-11-16 16:27:09'),
(2, 'Carlos', 'Pérez', 'carlos.perez@example.com', '1298323', '76395832', '$2b$10$6Irb3w9unrMTJqWZyFoWwuyzrvuhT1Syqm2A1/npr3QLQvk6kUeTG', 'estudiante', '2024-11-16 16:35:05'),
(4, 'Mario', 'Días', 'mario.dias@example.com', '1298323', '76395832', '$2b$10$4f1ErdwO.qyoVkQFqKnnFu3sUTtYdn8fCeuKxSWkzUNNOLKxMB6DO', 'estudiante', '2024-11-16 20:39:45'),
(6, 'Valeria', 'Días', 'vale.dias@example.com', '1298323', '76395832', '$2b$10$bUEPEWbZz1cPX7e2N1l.R.gCwhmtDc81u74i/CGV.qLN06u8QbFY2', 'estudiante', '2024-11-16 16:43:11'),
(7, 'Alissandra', 'Romero', 'alis.romero@example.com', '1238323', '76395832', '$2b$10$twlHJFIAtxMUqwGB..NUVuqIrqQIjB/jFyKxwGccXK.w80JOyyr4W', 'estudiante', '2024-11-16 18:55:11'),
(8, 'Franz', 'Gonzales', 'gonzales@example.com', '1238323', '76395832', '$2b$10$J2W9D5IAGKBHDcBu1LGM1u/bOu5f3XG.gA6LW9yDaFp9LmNeTdtyG', 'docente', '2024-11-16 19:11:46'),
(9, 'Camila', 'Gallardo', 'camila@example.com', '1238323', '76395832', '$2b$10$QWv3PexW9jpvlQWYi8f2Ie3NtTj6v9eZlzvYq.9X6JoeCTxocXKDm', 'estudiante', '2024-11-16 20:29:54'),
(14, 'Roberto', 'Pérez', 'roberto@example.com', '12345678', '789456123', '$2b$10$fOzfh9o38UWb/olKVx.vrOA3tfNs0AmcxopsatpKNesA6FVPVxryq', 'docente', '2024-11-16 21:21:25'),
(15, 'María', 'Gómez', 'maria.gomez@example.com', '87654321', '654321987', '$2b$10$lNzxER/D7JbPxWbYmYqUy.G.uq3cl.7Xib0WGgn3YXWNYUJ52KbLq', 'estudiante', '2024-11-16 21:22:16');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignatura`
--
ALTER TABLE `asignatura`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contactos`
--
ALTER TABLE `contactos`
  ADD PRIMARY KEY (`id_contacto`);

--
-- Indices de la tabla `docentes`
--
ALTER TABLE `docentes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `docente_asignatura`
--
ALTER TABLE `docente_asignatura`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_docente` (`id_docente`),
  ADD KEY `id_asignatura` (`id_asignatura`);

--
-- Indices de la tabla `entrega_tareas`
--
ALTER TABLE `entrega_tareas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tarea` (`id_tarea`),
  ADD KEY `id_estudiante` (`id_estudiante`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cu` (`cu`),
  ADD UNIQUE KEY `matricula_2` (`matricula`),
  ADD UNIQUE KEY `cu_2` (`cu`),
  ADD UNIQUE KEY `matricula_3` (`matricula`),
  ADD UNIQUE KEY `cu_3` (`cu`),
  ADD UNIQUE KEY `matricula_4` (`matricula`),
  ADD UNIQUE KEY `cu_4` (`cu`),
  ADD UNIQUE KEY `matricula_5` (`matricula`),
  ADD UNIQUE KEY `cu_5` (`cu`),
  ADD UNIQUE KEY `matricula_6` (`matricula`),
  ADD UNIQUE KEY `cu_6` (`cu`),
  ADD UNIQUE KEY `matricula_7` (`matricula`),
  ADD UNIQUE KEY `cu_7` (`cu`),
  ADD UNIQUE KEY `matricula_8` (`matricula`),
  ADD UNIQUE KEY `cu_8` (`cu`),
  ADD UNIQUE KEY `matricula_9` (`matricula`),
  ADD UNIQUE KEY `cu_9` (`cu`),
  ADD UNIQUE KEY `matricula_10` (`matricula`),
  ADD UNIQUE KEY `cu_10` (`cu`),
  ADD UNIQUE KEY `matricula_11` (`matricula`),
  ADD UNIQUE KEY `cu_11` (`cu`),
  ADD UNIQUE KEY `matricula_12` (`matricula`),
  ADD UNIQUE KEY `cu_12` (`cu`),
  ADD UNIQUE KEY `matricula_13` (`matricula`),
  ADD UNIQUE KEY `cu_13` (`cu`),
  ADD UNIQUE KEY `matricula_14` (`matricula`),
  ADD UNIQUE KEY `cu_14` (`cu`),
  ADD UNIQUE KEY `matricula_15` (`matricula`),
  ADD UNIQUE KEY `cu_15` (`cu`),
  ADD UNIQUE KEY `matricula_16` (`matricula`),
  ADD UNIQUE KEY `cu_16` (`cu`),
  ADD UNIQUE KEY `matricula_17` (`matricula`),
  ADD UNIQUE KEY `cu_17` (`cu`),
  ADD UNIQUE KEY `matricula_18` (`matricula`),
  ADD UNIQUE KEY `cu_18` (`cu`),
  ADD UNIQUE KEY `matricula_19` (`matricula`),
  ADD UNIQUE KEY `cu_19` (`cu`),
  ADD UNIQUE KEY `matricula_20` (`matricula`),
  ADD UNIQUE KEY `cu_20` (`cu`),
  ADD UNIQUE KEY `matricula_21` (`matricula`),
  ADD UNIQUE KEY `cu_21` (`cu`),
  ADD UNIQUE KEY `matricula_22` (`matricula`),
  ADD UNIQUE KEY `cu_22` (`cu`),
  ADD UNIQUE KEY `matricula_23` (`matricula`),
  ADD UNIQUE KEY `cu_23` (`cu`),
  ADD UNIQUE KEY `matricula_24` (`matricula`),
  ADD UNIQUE KEY `cu_24` (`cu`),
  ADD UNIQUE KEY `matricula_25` (`matricula`),
  ADD UNIQUE KEY `cu_25` (`cu`),
  ADD UNIQUE KEY `matricula_26` (`matricula`),
  ADD UNIQUE KEY `cu_26` (`cu`),
  ADD UNIQUE KEY `matricula_27` (`matricula`),
  ADD UNIQUE KEY `cu_27` (`cu`),
  ADD UNIQUE KEY `matricula_28` (`matricula`),
  ADD UNIQUE KEY `cu_28` (`cu`),
  ADD UNIQUE KEY `matricula_29` (`matricula`),
  ADD UNIQUE KEY `cu_29` (`cu`),
  ADD UNIQUE KEY `matricula_30` (`matricula`),
  ADD UNIQUE KEY `cu_30` (`cu`),
  ADD UNIQUE KEY `matricula_31` (`matricula`),
  ADD UNIQUE KEY `cu_31` (`cu`),
  ADD UNIQUE KEY `cu_32` (`cu`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `estudiante_asignatura`
--
ALTER TABLE `estudiante_asignatura`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `estudiante_asignatura_id_estudiante_id_asignatura` (`id_estudiante`,`id_asignatura`),
  ADD KEY `id_asignatura` (`id_asignatura`);

--
-- Indices de la tabla `examenes`
--
ALTER TABLE `examenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_asignatura` (`id_asignatura`);

--
-- Indices de la tabla `materiales`
--
ALTER TABLE `materiales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_asignatura` (`id_asignatura`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id_mensaje`);

--
-- Indices de la tabla `opciones`
--
ALTER TABLE `opciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pregunta` (`id_pregunta`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_examen` (`id_examen`);

--
-- Indices de la tabla `respuestas_estudiantes`
--
ALTER TABLE `respuestas_estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_examen` (`id_examen`),
  ADD KEY `id_estudiante` (`id_estudiante`),
  ADD KEY `id_pregunta` (`id_pregunta`);

--
-- Indices de la tabla `resultados_examenes`
--
ALTER TABLE `resultados_examenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_examen` (`id_examen`),
  ADD KEY `id_estudiante` (`id_estudiante`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_asignatura` (`id_asignatura`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD UNIQUE KEY `email_35` (`email`),
  ADD UNIQUE KEY `email_36` (`email`),
  ADD UNIQUE KEY `email_37` (`email`),
  ADD UNIQUE KEY `email_38` (`email`),
  ADD UNIQUE KEY `email_39` (`email`),
  ADD UNIQUE KEY `email_40` (`email`),
  ADD UNIQUE KEY `email_41` (`email`),
  ADD UNIQUE KEY `email_42` (`email`),
  ADD UNIQUE KEY `email_43` (`email`),
  ADD UNIQUE KEY `email_44` (`email`),
  ADD UNIQUE KEY `email_45` (`email`),
  ADD UNIQUE KEY `email_46` (`email`),
  ADD UNIQUE KEY `email_47` (`email`),
  ADD UNIQUE KEY `email_48` (`email`),
  ADD UNIQUE KEY `email_49` (`email`),
  ADD UNIQUE KEY `email_50` (`email`),
  ADD UNIQUE KEY `email_51` (`email`),
  ADD UNIQUE KEY `email_52` (`email`),
  ADD UNIQUE KEY `email_53` (`email`),
  ADD UNIQUE KEY `email_54` (`email`),
  ADD UNIQUE KEY `email_55` (`email`),
  ADD UNIQUE KEY `email_56` (`email`),
  ADD UNIQUE KEY `email_57` (`email`),
  ADD UNIQUE KEY `email_58` (`email`),
  ADD UNIQUE KEY `email_59` (`email`),
  ADD UNIQUE KEY `email_60` (`email`),
  ADD UNIQUE KEY `email_61` (`email`),
  ADD UNIQUE KEY `email_62` (`email`),
  ADD UNIQUE KEY `email_63` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asignatura`
--
ALTER TABLE `asignatura`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `contactos`
--
ALTER TABLE `contactos`
  MODIFY `id_contacto` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `docentes`
--
ALTER TABLE `docentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `docente_asignatura`
--
ALTER TABLE `docente_asignatura`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `entrega_tareas`
--
ALTER TABLE `entrega_tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `estudiante_asignatura`
--
ALTER TABLE `estudiante_asignatura`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `examenes`
--
ALTER TABLE `examenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `materiales`
--
ALTER TABLE `materiales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id_mensaje` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `opciones`
--
ALTER TABLE `opciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `respuestas_estudiantes`
--
ALTER TABLE `respuestas_estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `resultados_examenes`
--
ALTER TABLE `resultados_examenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `docente_asignatura`
--
ALTER TABLE `docente_asignatura`
  ADD CONSTRAINT `docente_asignatura_ibfk_14` FOREIGN KEY (`id_docente`) REFERENCES `docentes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `docente_asignatura_ibfk_15` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `entrega_tareas`
--
ALTER TABLE `entrega_tareas`
  ADD CONSTRAINT `entrega_tareas_ibfk_1` FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id`),
  ADD CONSTRAINT `entrega_tareas_ibfk_2` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id`);

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `estudiante_asignatura`
--
ALTER TABLE `estudiante_asignatura`
  ADD CONSTRAINT `estudiante_asignatura_ibfk_75` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `estudiante_asignatura_ibfk_76` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `examenes`
--
ALTER TABLE `examenes`
  ADD CONSTRAINT `examenes_ibfk_1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `materiales`
--
ALTER TABLE `materiales`
  ADD CONSTRAINT `materiales_ibfk_1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `opciones`
--
ALTER TABLE `opciones`
  ADD CONSTRAINT `opciones_ibfk_1` FOREIGN KEY (`id_pregunta`) REFERENCES `preguntas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`id_examen`) REFERENCES `examenes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `respuestas_estudiantes`
--
ALTER TABLE `respuestas_estudiantes`
  ADD CONSTRAINT `respuestas_estudiantes_ibfk_1` FOREIGN KEY (`id_examen`) REFERENCES `examenes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `respuestas_estudiantes_ibfk_2` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `respuestas_estudiantes_ibfk_3` FOREIGN KEY (`id_pregunta`) REFERENCES `preguntas` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `resultados_examenes`
--
ALTER TABLE `resultados_examenes`
  ADD CONSTRAINT `resultados_examenes_ibfk_1` FOREIGN KEY (`id_examen`) REFERENCES `examenes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `resultados_examenes_ibfk_2` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
