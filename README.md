# 🌱 Proyecto de Gestión de Plantas

Buenas! Este proyecto de práctica. Este repositorio contiene una aplicación web orientada al consumo de una API externa de plantas. El proyecto está diseñado con una arquitectura separada que sirve como entorno de aprendizaje y desarrollo continuo, abarcando tanto el backend como múltiples enfoques para el frontend.

## 🚀 Tecnologías Utilizadas

### Backend
* **Framework Core:** Django (Python)
* **Construcción de API:** Django REST Framework (DRF) para el desarrollo de los endpoints.
* **Autenticación:** JSON Web Tokens (JWT) para el manejo seguro de usuarios y sesiones.
* **Integración y Configuración:** CORS configurado para la comunicación entre aplicaciones desacopladas, y consumo de una API externa de plantas para popular la base de datos.

### Frontend
Actualmente, el proyecto cuenta con dos enfoques para la interfaz de usuario (ambos en fase de desarrollo):
1. **Frontend con Django:** Implementado inicialmente usando el sistema de plantillas de Django para levantar el servidor y las vistas.
2. **Frontend Moderno (SPA):** Desarrollado con **React** y empaquetado con **Vite**. Esta es la iteración más reciente, enfocada en mejorar la interactividad, el rendimiento y aplicar buenas prácticas en el ecosistema de JavaScript.

## 📁 Estructura del Proyecto

El repositorio está organizado de la siguiente manera:

* `/Backend/`: Contiene toda la lógica del servidor, modelos y la integración con la API externa usando Django.
* `/Frontend/`: Primera iteración de la interfaz construida con Django.
* `/Frontend+Vite+React/`: Segunda iteración de la interfaz, construida como una Single Page Application (SPA) utilizando React y Vite.
* `requeriment.txt`: Archivo con las dependencias necesarias de Python para ejecutar el backend.
* `.env.example`: Plantilla para las variables de entorno necesarias (como claves de la API externa).

## 🚧 Estado del Proyecto
**En Desarrollo.** Ambos frontends se encuentran actualmente en construcción. Este repositorio es un espacio de práctica activa para el desarrollo backend con Python/Django y la creación de interfaces dinámicas con React.

## ⚙️ Instalación y Configuración Local

Si deseas correr este proyecto de manera local, sigue estos pasos:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/JulianAstibia/Proyectos.git](https://github.com/JulianAstibia/Proyectos.git)
cd Proyectos
```

### 2. Configuracion del Backend (Django)
```bash
# 1. Entrar a la carpeta del backend
cd Backend

# 2. Crear y activar un entorno virtual (recomendado)
python -m venv venv
source venv/bin/activate  # En Windows usa: venv\Scripts\activate

# 3. Instalar las dependencias
pip install -r ../requeriment.txt

# 4. Configurar variables de entorno
# Copia el archivo .env.example, renómbralo a .env en la raíz del backend y completa los datos necesarios de la API.

# 5. Aplicar migraciones y levantar el servidor
python manage.py migrate
python manage.py runserver
```

### 3. Configuracion del Frontend (React + Vite)
# Abre una nueva terminal
```bash
# 1. Entrar a la carpeta del frontend moderno
cd Frontend+Vite+React

# 2. Instalar dependencias de Node
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```