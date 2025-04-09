# Sistema de Gestión de Permisos y Licencias

Sistema web para la gestión de permisos y licencias de empleados, con funcionalidades de arrastrar y soltar, menú contextual y soporte multiidioma.

## Características

- 🎯 Gestión de permisos y licencias en tiempo real
- 🔄 Drag and Drop para asignar permisos
- 📅 Vista de calendario con períodos diario/semanal/mensual
- 🌐 Soporte multiidioma (Español/Inglés)
- 🖱️ Menú contextual para asignación rápida
- 🎨 Interfaz moderna y responsive
- 🔍 Búsqueda y filtrado de empleados

## Tecnologías Utilizadas

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- DND Kit
- Date-fns
- Lucide React

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:

```bash
git clone [url-del-repositorio]
cd [nombre-del-proyecto]
```

2. Instalar dependencias:

```bash
npm install
```

3. Instalar librerías específicas:

```bash
# UI Components y Utilidades
npm install @radix-ui/react-slot
npm install @radix-ui/react-select
npm install @radix-ui/react-popover
npm install class-variance-authority
npm install clsx
npm install tailwind-merge

# Drag and Drop
npm install @dnd-kit/core

# Fechas
npm install date-fns

# Iconos
npm install lucide-react

# Tailwind y sus plugins
npm install -D tailwindcss
npm install -D @tailwindcss/forms
```

4. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

## Estructura del Proyecto

src/
├── components/
│ ├── ui/ # Componentes base de Shadcn/ui
│ ├── header.tsx # Encabezado con controles principales
│ ├── footer.tsx # Pie con leyendas y elementos arrastrables
│ └── schedule-grid.tsx # Cuadrícula principal de horarios
├── data/
│ └── mock-data.ts # Datos de ejemplo
├── types/
│ └── index.ts # Definiciones de tipos TypeScript
└── App.tsx # Componente principal
