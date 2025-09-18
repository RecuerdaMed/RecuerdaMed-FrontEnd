# 📌 RecuerdaMed

## 📝 Descripción

**RecuerdaMed** es una aplicación web desarrollada en el marco del **Hackathon F5 (septiembre 2025)**.  

Su objetivo es ayudar a las personas usuarias a **gestionar sus medicamentos, programar recordatorios y llevar un control de la toma diaria** de forma clara y accesible.

El proyecto busca mejorar la experiencia en salud digital, fomentando la **responsabilidad en el consumo de medicamentos** y ofreciendo una interfaz **sencilla e inclusiva**.

---

## 📸 Capturas del Proyecto

*(Aquí irán capturas de pantalla de la app funcionando: formulario de registro, listado de medicamentos, recordatorio visual, etc.)*

---

## 🎯 Objetivos del Proyecto

- Registrar medicamentos con persistencia en base de datos
- Listar medicamentos activos y marcarlos como "tomados"
- Visualizar el estado según la hora del día
- Integrar **frontend y backend** mediante API REST

---

## 🛠️ Tecnologías

- **Frontend**: React.js, Tailwind CSS, Vite
- **Gestión de datos**: Axios para consumo de API
- **Testing**: Vitest

---

## 📚 Herramientas

- Figma (diseño UI/UX)
- Visual Studio Code (desarrollo)
- Trello / GitHub Projects (gestión de tareas)
- Git / GitHub (control de versiones)

---

## 🔗 Endpoints de la API

- **POST** `/medicamentos` → Registrar medicamento
- **GET** `/medicamentos` → Obtener todos los medicamentos
- **PUT** `/medicamentos/:id/tomado` → Marcar medicamento como tomado
- **DELETE** `/medicamentos/:id` → Eliminar medicamento

---

## 📁 Estructura del Proyecto

```
RECUERDAMED-FR.../
├── 📁 node_modules/
├── 📁 public/
├── 📁 src/
│   ├── 📁 assets/
│   │   └── 📁 images/
│   │       ├── sanitas-logo.png
│   │       └── sanitas-logo2.png
│   ├── 📁 components/
│   │   ├── 📁 common/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── NavBar.jsx
│   │   └── 📁 medication/
│   │       ├── DrugCalendar.jsx
│   │       ├── DrugCard.jsx
│   │       ├── DrugForm.jsx
│   │       └── DrugList.jsx
│   ├── 📁 ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Input.jsx
│   ├── 📁 pages/
│   │   ├── CalendarPage.jsx
│   │   ├── Dashboard.jsx
│   │   └── Medications.jsx
│   ├── 📁 routes/
│   │   └── Routes.jsx
│   ├── 📁 services/
│   │   └── Services.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── Layout.jsx
│   └── main.jsx
├── .gitignore
├── .js.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

---

## ⚙️ Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/RecuerdaMed/RecuerdaMed-FrontEnd.git
   ```

2. **Acceder al proyecto:**
   ```bash
   cd recuerdamed-frontend
   ```

3. **Instalar las dependencias:**
   ```bash
   npm install
   npm install react-router-dom
   npm install axios
   ```

4. **Ejecutar el frontend:**
   ```bash
   npm run dev
   ```

¡Listo! Ya puedes empezar a usar la aplicación.

---

## 🚀 Uso

1. Abrir la aplicación en el navegador
2. Registrar medicamentos con su dosis y horario
3. Consultar el listado de medicamentos activos
4. Marcar cada dosis como "tomada" en su momento
5. Visualizar el historial de tomas y dosis restantes

---

## 📦 Dependencias Principales

- **react-router-dom** → Navegación en la aplicación
- **axios** → Cliente HTTP para consumir la API
- **vitest / @testing-library/jest-dom** → Ejecución de los tests del frontend

---

## 👩‍💻 Colaboradoras

- Ana Aguilera
- Andrea Olivera
- Priscelis Codrington
- Ana Muruzabal
- Ingrid Martínez
- Mayleth Carrascal

---

## 📄 Licencia

Este proyecto fue desarrollado para el Hackathon F5 2025.



