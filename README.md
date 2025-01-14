# Sistema de Gestión de Riesgos (RiskMed)

Este proyecto es un sistema backend diseñado para gestionar riesgos, evaluaciones, usuarios, y otras entidades relacionadas con la administración de riesgos en establecimientos médicos y proveedores.

## Requisitos Previos
- Node.js v14 o superior.
- Base de datos Microsoft SQL Server configurada.
- Tener configurado un entorno con las siguientes variables en un archivo `.env`:

```env
PORT=3000
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_SERVER=localhost
DB_PORT=1433
DB_DATABASE=nombre_base_datos
```

## Instalación
1. Clona este repositorio:

```bash
git clone https://github.com/tuusuario/riskmed.git
```

2. Navega al directorio del proyecto:

```bash
cd riskmed
```

3. Instala las dependencias:

```bash
npm install or node server.js
```

## Ejecución del Proyecto
1. Asegúrate de que tu base de datos MSSQL esté activa y configurada.
2. Ejecuta el servidor:

```bash
npm start
```

3. Accede a la documentación Swagger en:

```
http://localhost:3000/api-docs
```
