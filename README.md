# PIXII - Landing Page

<div align="center">

![Astro](https://img.shields.io/badge/Astro-5.16.15-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Atomic Design](https://img.shields.io/badge/Atomic-Design-61DAFB?style=for-the-badge)
![SEO](https://img.shields.io/badge/SEO-Optimized-4CAF50?style=for-the-badge)

**Smart link to Global flow**

Landing page moderna y responsive construida con Astro v5, siguiendo metodología Atomic Design y optimizada para SEO.

[Demo](#) · [Documentación](#-documentación) · [Reportar Bug](https://github.com/pixii/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Comandos](#️-comandos)
- [Atomic Design](#-atomic-design)
- [SEO y Accesibilidad](#-seo-y-accesibilidad)
- [Responsive Design](#-responsive-design)
- [Documentación](#-documentación)

---

## ✨ Características

- 🎨 **Diseño Pixel-Perfect** - Implementación fiel al diseño original
- 📱 **100% Responsive** - Burger menu adaptativo para móviles
- ⚡ **Performance Optimizada** - Astro con zero-JS por defecto
- 🔍 **SEO First** - Optimizado para motores de búsqueda
- ♿ **Accesibilidad WCAG 2.1 AA** - Aria labels, skip links, keyboard navigation
- 🧩 **Atomic Design** - Arquitectura escalable y mantenible
- 🎯 **Smooth Scroll** - Navegación fluida entre secciones
- 🎭 **Active States** - Detección automática de sección actual
- 🍔 **Burger Menu** - Panel deslizante con animaciones suaves
- 🌐 **Multi-Section** - Inicio, Nosotros, Proyectos, Servicios, Contacto

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Astro** | 5.16.15 | Framework principal |
| **TypeScript** | Latest | Type safety |
| **CSS3** | - | Estilos con variables y scoped styles |
| **Vanilla JS** | - | Interacciones ligeras |

**Sin dependencias externas** - Solo Astro core para máximo performance.

---

## 🚀 Estructura del Proyecto

```
pixii-astro/
├── src/
│   ├── components/
│   │   ├── atoms/                    # Componentes básicos indivisibles
│   │   │   ├── Button.astro          # Botones reutilizables
│   │   │   ├── Icon.astro            # Sistema de iconos
│   │   │   ├── Input.astro           # Campos de entrada
│   │   │   ├── Logo.astro            # Logo PIXII
│   │   │   └── Textarea.astro        # Área de texto
│   │   │
│   │   ├── molecules/                # Combinaciones de átomos
│   │   │   ├── ContactItem.astro     # Item de contacto con icono
│   │   │   ├── FormField.astro       # Campo de formulario completo
│   │   │   ├── NavMenu.astro         # ⭐ Navegación desktop + mobile
│   │   │   └── ServiceCard.astro     # Tarjeta de servicio
│   │   │
│   │   ├── organisms/                # Secciones completas
│   │   │   ├── ContactSection.astro  # Sección de contacto (#contacto)
│   │   │   ├── Footer.astro          # Footer del sitio
│   │   │   ├── Header.astro          # ⭐ Header fijo con burger menu
│   │   │   ├── HeroSection.astro     # Hero principal (#inicio)
│   │   │   ├── PresenceSection.astro # Presencia global (#nosotros)
│   │   │   ├── ProjectsSection.astro # Proyectos (#proyectos)
│   │   │   └── ServicesSection.astro # Servicios (#servicios)
│   │   │
│   │   └── templates/                # Templates de página
│   │       └── HomePage.astro        # Template principal del home
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro          # Layout base con meta tags
│   │
│   ├── pages/
│   │   └── index.astro               # Página principal (/)
│   │
│   └── styles/
│       └── global.css                # Variables CSS y estilos globales
│
├── public/                           # Assets estáticos
├── CAMBIOS_NAVEGACION.md             # Doc: Actualización de navegación
├── BURGER_MENU.md                    # Doc: Implementación burger menu
└── README.md                         # Este archivo
```

---

## 📦 Instalación

### Prerrequisitos

- Node.js 18+
- npm o pnpm

### Pasos

1. **Clona el repositorio**
```bash
git clone https://github.com/pixii/pixii-astro.git
cd pixii-astro
```

2. **Instala dependencias**
```bash
npm install
```

3. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

4. **Abre tu navegador**
```
http://localhost:4321
```

---

## 🖥️ Comandos

| Comando | Acción |
|---------|--------|
| `npm install` | Instala todas las dependencias |
| `npm run dev` | Inicia servidor en `localhost:4321` |
| `npm run build` | Construye el sitio para producción |
| `npm run preview` | Preview del build de producción |
| `npm run astro ...` | Ejecuta comandos de Astro CLI |

---

## 🧩 Atomic Design

Este proyecto sigue la metodología **Atomic Design** de Brad Frost:

### 🔹 Atoms (Átomos)
Componentes básicos e indivisibles que no pueden descomponerse más:
- `Button.astro` - Botones con variantes
- `Logo.astro` - Logo con tamaños y colores
- `Icon.astro` - Sistema de iconos
- `Input.astro` - Inputs de formulario
- `Textarea.astro` - Áreas de texto

### 🔸 Molecules (Moléculas)
Combinaciones simples de átomos que forman unidades funcionales:
- `NavMenu.astro` - Navegación con links y separadores
- `ContactItem.astro` - Icono + texto de contacto
- `FormField.astro` - Label + Input/Textarea
- `ServiceCard.astro` - Tarjeta de servicio

### 🔶 Organisms (Organismos)
Secciones completas y complejas que combinan moléculas y átomos:
- `Header.astro` - Header con logo + navegación + burger
- `HeroSection.astro` - Sección hero principal
- `ServicesSection.astro` - Grid de servicios
- `PresenceSection.astro` - Mapa de presencia
- `ContactSection.astro` - Formulario de contacto
- `Footer.astro` - Footer del sitio

### 🔷 Templates (Plantillas)
Estructura de página que organiza organismos:
- `HomePage.astro` - Template del home page

### 🔵 Pages (Páginas)
Instancias específicas de templates con contenido real:
- `index.astro` - Página principal

---

## 🔍 SEO y Accesibilidad

### SEO Optimizations

✅ **Meta Tags Completos**
- Title, description, viewport
- Open Graph para redes sociales
- Canonical URLs

✅ **Semantic HTML5**
- `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Estructura jerárquica de headings (h1, h2, h3)

✅ **Performance**
- Zero-JS por defecto con Astro
- CSS scoped para mejor caching
- Imágenes optimizadas

### Accesibilidad (WCAG 2.1 AA)

✅ **ARIA Labels**
```html
<nav role="navigation" aria-label="Navegación principal">
<a aria-label="Ir a Inicio" aria-current="page">Inicio</a>
```

✅ **Skip Navigation**
```html
<a href="#main-content" class="skip-link">Saltar al contenido</a>
```

✅ **Keyboard Navigation**
- Tab para navegar
- Enter para activar
- ESC para cerrar menú móvil

✅ **Screen Reader Friendly**
- Roles ARIA (`banner`, `navigation`, `main`)
- `aria-current="page"` en links activos
- `aria-expanded` en burger menu
- `aria-hidden` en elementos decorativos

---

## 📱 Responsive Design

### Breakpoint: 768px

#### Desktop (> 768px)
```
┌────────────────────────────────────────────────────┐
│ PIXII  Inicio → Nosotros → Proyectos → Servicios  │
└────────────────────────────────────────────────────┘
```
- Navegación horizontal con separadores de flecha
- Todos los links visibles
- Hover states con color rojo

#### Mobile (≤ 768px)
```
┌─────────────────────┐
│ PIXII          ☰    │  ← Burger a la derecha
└─────────────────────┘
```

**Al hacer click en burger:**
```
┌─────────────────────┐─────────────┐
│ PIXII          ✕    │             │
└─────────────────────┘  Inicio     │ ← Color rojo si activo
                      │ ─────────── │
                      │  Nosotros   │
                      │ ─────────── │
                      │  Proyectos  │
                      │ ─────────── │
                      │  Servicios  │
                      │ ─────────── │
                      │  Contacto   │
                      └─────────────┘
```

### Características Mobile

- 🍔 **Burger Menu** - Animación suave a X
- 📱 **Panel Deslizante** - 280px desde la derecha
- 🔒 **Scroll Lock** - Body bloqueado cuando el menú está abierto
- ✨ **Hover Effects** - Slide-in con color rojo
- ⚡ **Auto-close** - Cierre automático al navegar
- ⌨️ **ESC Key** - Cerrar con tecla ESC

---

## 📚 Documentación

### Archivos de Documentación

- **`README.md`** - Este archivo (overview general)
- **`CAMBIOS_NAVEGACION.md`** - Detalles de la implementación de navegación
- **`BURGER_MENU.md`** - Documentación completa del burger menu responsive

### Documentación Inline

Todos los componentes incluyen:
- Props interfaces con TypeScript
- Comentarios descriptivos
- Estilos scoped documentados

---

## 🎨 Sistema de Diseño

### Variables CSS (Design Tokens)

```css
:root {
  /* Colores principales */
  --color-primary: #E63946;      /* Rojo PIXII */
  --color-black: #000000;        /* Negro principal */
  --color-white: #FFFFFF;        /* Blanco puro */
  --color-gray-light: #F5F5F5;   /* Gris claro */
  --color-gray-dark: #333333;    /* Gris oscuro */

  /* Espaciado */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;

  /* Transiciones */
  --transition-base: 0.3s ease;
}
```

### Componentes Reutilizables

Todos los componentes siguen estos principios:
- **Props tipadas** con TypeScript
- **Estilos scoped** para evitar conflictos
- **Variantes** configurables (size, color, variant)
- **Accesibilidad** por defecto

---

## 🚀 Roadmap

- [ ] Implementar contenido real en ProjectsSection
- [ ] Agregar animaciones con Intersection Observer
- [ ] Optimizar imágenes con Picture element
- [ ] Agregar tests con Playwright
- [ ] Implementar dark mode
- [ ] Añadir i18n (ES/EN)
- [ ] PWA capabilities
- [ ] Analytics integration

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es propiedad de **PIXII**. Todos los derechos reservados.

---

## 👥 Equipo

**PIXII** - Smart link to Global flow

- Website: [pixii.com](#)
- Email: contact@pixii.com

---

<div align="center">

**Hecho con ❤️ usando Astro**

⭐ Si te gusta este proyecto, dale una estrella en GitHub

</div>
