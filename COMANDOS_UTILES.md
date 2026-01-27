# Comandos Útiles - PIXII Astro

## 🚀 Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
# Abre: http://localhost:4321

# Iniciar con host expuesto (para acceso desde red local)
npm run dev -- --host

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📝 Agregar Componentes

### Crear nuevo átomo
```bash
touch src/components/atoms/NuevoAtomo.astro
```

### Crear nueva molécula
```bash
touch src/components/molecules/NuevaMolecula.astro
```

### Crear nuevo organismo
```bash
touch src/components/organisms/NuevoOrganismo.astro
```

### Crear nueva página
```bash
touch src/pages/nueva-pagina.astro
```

## 🎨 Estructura de archivos

```
src/components/
├── atoms/           # 5 componentes
│   ├── Button.astro
│   ├── Icon.astro
│   ├── Input.astro
│   ├── Logo.astro
│   └── Textarea.astro
├── molecules/       # 4 componentes
│   ├── ContactItem.astro
│   ├── FormField.astro
│   ├── NavMenu.astro
│   └── ServiceCard.astro
├── organisms/       # 6 componentes
│   ├── ContactSection.astro
│   ├── Footer.astro
│   ├── Header.astro
│   ├── HeroSection.astro
│   ├── PresenceSection.astro
│   └── ServicesSection.astro
└── templates/       # 1 componente
    └── HomePage.astro
```

## 🔧 Integrations comunes

### Agregar Tailwind CSS
```bash
npx astro add tailwind
```

### Agregar React
```bash
npx astro add react
```

### Agregar Vue
```bash
npx astro add vue
```

### Agregar Vercel adapter
```bash
npx astro add vercel
```

## 📦 Deploy

### Vercel
```bash
npm run build
# Luego conecta el repo en Vercel
```

### Netlify
```bash
npm run build
# Build command: npm run build
# Publish directory: dist
```

### GitHub Pages
```bash
# En astro.config.mjs agrega:
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repo-name',
})

npm run build
# Luego sube la carpeta dist/
```

## 🐛 Debug

### Ver errores en consola
```bash
npm run dev -- --verbose
```

### Limpiar caché
```bash
rm -rf .astro node_modules/.astro
npm run dev
```

### Ver qué componentes se están usando
```bash
grep -r "import.*from.*components" src/
```

## 📊 Performance

### Analizar bundle size
```bash
npm run build -- --verbose
```

### Ver estadísticas
```bash
npm run build
ls -lh dist/
```

## 🔍 Búsqueda

### Buscar un componente
```bash
find src/components -name "*Button*"
```

### Buscar uso de un componente
```bash
grep -r "Button" src/ --include="*.astro"
```

### Listar todos los componentes
```bash
find src/components -name "*.astro" | sort
```

## 💡 Tips

- Los componentes Astro son zero-JS por defecto
- Usa `client:load` para hacer componentes interactivos
- CSS es scoped por defecto en cada componente
- Props son TypeScript por defecto con `interface Props`

## 📝 Ejemplos de uso

### Usar un componente con props
```astro
---
import Button from '../components/atoms/Button.astro';
---

<Button variant="red" type="submit">
  Enviar
</Button>
```

### Pasar slots
```astro
<Button variant="black">
  <Icon name="mail" /> Contactar
</Button>
```

### Usar CSS variables
```astro
<style>
  .mi-componente {
    color: var(--color-primary);
    padding: var(--spacing-md);
  }
</style>
```
