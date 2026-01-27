# Estructura Atomic Design - PIXII

## 🧬 Metodología Atomic Design

### 📌 ÁTOMOS (Atoms)
Componentes más pequeños e indivisibles. Son los bloques de construcción básicos.

**Ubicación:** `src/components/atoms/`

- **Button.astro** - Botón con variantes (red, white, black)
  - Props: `variant`, `type`, `class`
  - Uso: `<Button variant="red">Ver más</Button>`

- **Logo.astro** - Logo de PIXII
  - Props: `size` (small/medium/large), `color` (white/black)
  - Uso: `<Logo size="large" color="black" />`

- **Input.astro** - Campo de entrada
  - Props: `type`, `name`, `id`, `placeholder`, `required`
  - Uso: `<Input type="email" name="email" />`

- **Textarea.astro** - Área de texto
  - Props: `name`, `id`, `placeholder`, `rows`, `required`
  - Uso: `<Textarea name="message" rows={4} />`

- **Icon.astro** - Iconos SVG
  - Props: `name` (mail/phone/map-pin), `color`, `size`
  - Uso: `<Icon name="mail" color="#E63946" />`

---

### 🔗 MOLÉCULAS (Molecules)
Grupos de átomos que trabajan juntos como una unidad.

**Ubicación:** `src/components/molecules/`

- **NavMenu.astro** - Menú de navegación
  - Combina: múltiples enlaces (`<a>`)
  - Uso: `<NavMenu />`

- **FormField.astro** - Campo de formulario completo
  - Combina: `Label` + `Input` o `Textarea`
  - Props: `label`, `name`, `type`, `placeholder`, `required`
  - Uso: `<FormField label="Email" name="email" type="email" />`

- **ContactItem.astro** - Item de información de contacto
  - Combina: `Icon` + texto (label + value)
  - Props: `icon`, `label`, `value`
  - Uso: `<ContactItem icon="mail" label="EMAIL" value="info@pixii.com" />`

- **ServiceCard.astro** - Tarjeta de servicio
  - Combina: título + descripción + `Button`
  - Props: `title`, `description`, `variant`, `imageUrl`, `buttonVariant`
  - Uso: `<ServiceCard variant="dark" title="..." description="..." />`

---

### 🏗️ ORGANISMOS (Organisms)
Grupos complejos de moléculas y/o átomos que forman secciones distintas.

**Ubicación:** `src/components/organisms/`

- **Header.astro** - Cabecera del sitio
  - Combina: `Logo` + `NavMenu`
  - Características: Fixed position, backdrop blur

- **HeroSection.astro** - Sección hero principal
  - Combina: badge + título + descripción + carousel dots
  - Características: Background image, overlay

- **ServicesSection.astro** - Sección de servicios
  - Combina: título + grid de `ServiceCard`
  - Características: Grid 3 columnas (responsive)

- **PresenceSection.astro** - Sección de presencia global
  - Combina: `Logo` grande + descripción + mapa SVG
  - Características: Grid 2 columnas con mapa interactivo

- **ContactSection.astro** - Sección de contacto
  - Combina: panel de contacto + formulario
  - Incluye: múltiples `ContactItem` + múltiples `FormField`
  - Características: Grid 40/60

- **Footer.astro** - Pie de página
  - Combina: `Logo` + navegación + copyright
  - Características: Centered, dark background

---

### 📄 TEMPLATES (Templates)
Composiciones de organismos que definen la estructura de una página.

**Ubicación:** `src/components/templates/`

- **HomePage.astro** - Template de la página principal
  - Combina todos los organismos en orden:
    1. Header
    2. HeroSection
    3. ServicesSection
    4. PresenceSection
    5. ContactSection
    6. Footer

---

### 🎯 PAGES (Pages)
Instancias específicas de templates con datos reales.

**Ubicación:** `src/pages/`

- **index.astro** - Página principal
  - Usa: `BaseLayout` + `HomePage`

---

## 🔄 Flujo de Composición

```
Átomos → Moléculas → Organismos → Templates → Pages
```

### Ejemplo práctico:

```
Button (átomo)
  ↓
ServiceCard (molécula) usa Button
  ↓
ServicesSection (organismo) usa múltiples ServiceCard
  ↓
HomePage (template) usa ServicesSection
  ↓
index.astro (página) usa HomePage
```

---

## 💡 Ventajas de esta estructura

✅ **Reutilización** - Los componentes se reutilizan en múltiples lugares
✅ **Mantenibilidad** - Cambios en un átomo se propagan automáticamente
✅ **Escalabilidad** - Fácil agregar nuevas páginas y secciones
✅ **Testing** - Cada nivel se puede probar independientemente
✅ **Colaboración** - Estructura clara para trabajo en equipo
✅ **Documentación** - Jerarquía auto-explicativa

---

## 📋 Cómo agregar nuevos componentes

### Agregar un nuevo átomo:
1. Crear archivo en `src/components/atoms/NuevoAtomo.astro`
2. Definir props interface
3. Agregar estilos con scoped CSS

### Agregar una nueva molécula:
1. Crear archivo en `src/components/molecules/NuevaMolecula.astro`
2. Importar átomos necesarios
3. Componer la molécula

### Agregar un nuevo organismo:
1. Crear archivo en `src/components/organisms/NuevoOrganismo.astro`
2. Importar moléculas y átomos
3. Estructurar la sección completa

### Agregar una nueva página:
1. Crear archivo en `src/pages/nueva-pagina.astro`
2. Usar `BaseLayout`
3. Componer con organismos o crear nuevo template

---

## 🎨 Sistema de diseño

### Variables CSS (en `src/styles/global.css`):

```css
/* Colores */
--color-primary: #E63946
--color-black: #000000
--color-white: #FFFFFF
--color-gray-light: #F5F5F5

/* Espaciado */
--spacing-xs: 8px
--spacing-sm: 16px
--spacing-md: 24px
--spacing-lg: 32px
--spacing-xl: 40px
--spacing-2xl: 60px
--spacing-3xl: 80px

/* Tipografía */
--font-size-base: 14px
--font-size-lg: 18px
--font-size-hero: 56px

/* Border Radius */
--radius-sm: 6px
--radius-md: 8px
--radius-lg: 12px
--radius-full: 20px
```

---

## 📚 Referencias

- [Atomic Design por Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)
- [Astro Documentation](https://docs.astro.build)
