# RecuerdaMed

## Descripción

RecuerdaMed es una aplicación web desarrollada en el marco del Hackathon F5 de septiembre de 2025. Su objetivo es ayudar a las personas usuarias a gestionar sus medicamentos, programar recordatorios y llevar un control de la toma diaria de forma clara y accesible.

El proyecto busca mejorar la experiencia en salud digital, fomentando la responsabilidad en el consumo de medicamentos y ofreciendo una interfaz sencilla e inclusiva.

## Capturas del Proyecto

(Aquí irían capturas de pantalla de la app funcionando: formulario de registro, listado de medicamentos, recordatorio visual, etc.)

## Objetivos del Proyecto

- Registrar medicamentos con persistencia en base de datos.

- Listar medicamentos activos y marcarlos como “tomados”.

- Visualizar el estado según la hora del día.

- Integrar frontend y backend mediante API REST.

Opcionales:

- Registro de alergias y validación cruzada con medicamentos.

- Notificaciones visuales en la hora de toma.

- Filtros y cálculo de dosis restantes.

- Modo oscuro y mejoras de accesibilidad.

## Tecnologías

Frontend: React.js, Tailwind CSS, Vite
Backend: Node.js / Express.js, Base de datos (ej. SQLite o MongoDB según implementación)

## Gestión de datos: 

- Axios para consumo de API
- Testing: Vitest

## Herramientas

- Figma (diseño UI/UX)

- Visual Studio Code (desarrollo)

- Trello / Jira (gestión ágil)

- Git / GitHub (control de versiones)

## Endpoints de la API

- POST /medicamentos → Registrar medicamento.

- GET /medicamentos → Obtener todos los medicamentos.

- PUT /medicamentos/:id/tomado → Marcar medicamento como tomado.

- DELETE /medicamentos/:id → Eliminar medicamento.

(Opcionales: endpoints para alergias y validaciones adicionales).

## Metodología y Fases

- Trabajo en equipo usando Scrum y Kanban.

- Desarrollo en sprints con revisiones y entregas parciales.

- Iteración basada en feedback continuo para mejorar la experiencia de usuario.

- Pruebas Unitarias (Vitest)

- Este proyecto utiliza Vitest para validar las funcionalidades principales.

## Cómo ejecutar las pruebas
npm run test

## Uso

- Abrir la aplicación en el navegador.

- Registrar medicamentos con su dosis y horario.

- Consultar el listado de medicamentos activos.

- Marcar cada dosis como “tomada” en su momento.

- Visualizar el historial de tomas y dosis restantes.

(Opcional) Gestionar alergias y recibir validaciones cruzadas.

## Instalación

https://github.com/RecuerdaMed


## Accede al proyecto e instala dependencias:

- cd recordatorio-medicacion
- npm install
- npm install react-router-dom
- npm install axios


## Ejecuta el backend (ejemplo con json-server):

npx json-server --watch db.json --port 3001


## Ejecuta el frontend:

npm run dev


¡Listo! 🎉 Ya puedes empezar a usar la aplicación.

## Dependencias principales

react-router-dom → Navegación en la aplicación.

axios → Cliente HTTP para consumir la API.

express / json-server → API REST para el backend.

## Colaboradoras

- Ana Aguilera - https://github.com/AnaAguileraMorales88 

- Andrea Olivera - https://github.com/andreaonweb

- Priscelis Codrington

- Ana Muruzabal

- Ingrid Martínez

- Mayleth Carrascal

- Judit Corbalán

