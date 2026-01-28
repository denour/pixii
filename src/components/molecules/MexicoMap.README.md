# MexicoMap Component

Componente Astro para renderizar y manipular el mapa de México con estados destacados.

## Características

- ✅ Renderizado inline del SVG (mejor performance)
- ✅ Control dinámico de colores por estado
- ✅ Interactividad con hover effects
- ✅ Sin dependencias externas
- ✅ TypeScript support
- ✅ Animaciones suaves

## Uso Básico

```astro
---
import MexicoMap from '../molecules/MexicoMap.astro';
---

<MexicoMap />
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `highlightedStates` | `string[]` | `['baja-california', 'nuevo-leon', 'queretaro', 'san-luis-potosi']` | Estados a destacar |
| `highlightColor` | `string` | `'#E63946'` | Color para estados destacados |
| `defaultColor` | `string` | `'#b9b9b9'` | Color por defecto de estados |
| `interactive` | `boolean` | `true` | Habilitar interactividad (hover, click) |
| `class` | `string` | `''` | Clases CSS adicionales |

## Ejemplos

### Destacar diferentes estados

```astro
<MexicoMap
  highlightedStates={['jalisco', 'yucatan', 'oaxaca']}
  highlightColor="#0066CC"
/>
```

### Mapa sin interactividad

```astro
<MexicoMap
  interactive={false}
/>
```

### Con clases personalizadas

```astro
<MexicoMap
  class="my-custom-map"
  highlightColor="#FF5733"
/>
```

## Estados Disponibles

Actualmente mapeados:
- `baja-california` → path7285
- `nuevo-leon` → path7395
- `queretaro` → path7357
- `san-luis-potosi` → path7323

## Agregar más estados

Para agregar más estados al mapeo, edita el objeto `statePathIds` en el componente:

```typescript
const statePathIds: Record<string, string> = {
  'baja-california': 'path7285',
  'nuevo-leon': 'path7395',
  'queretaro': 'path7357',
  'san-luis-potosi': 'path7323',
  // Agregar nuevos estados aquí
  'jalisco': 'pathXXXX',
  'yucatan': 'pathYYYY'
};
```

Para encontrar el ID del path de un estado:
1. Abre `public/images/mexico.svg`
2. Busca el elemento `<path>` que corresponde al estado
3. Copia su atributo `id`

## Eventos

El componente emite eventos de click en la consola:

```javascript
path.addEventListener('click', (e) => {
  console.log(`Clicked on: ${stateName}`);
});
```

Puedes personalizar estos eventos modificando el script inline del componente.

## Performance

- El SVG se lee en build-time (SSG)
- No hay requests adicionales al servidor
- Manipulación del DOM solo en estados destacados
- CSS transitions para animaciones suaves

## Personalización Avanzada

### Estilos personalizados

```astro
<MexicoMap class="custom-map" />

<style>
  :global(.custom-map .interactive-state) {
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
  }
</style>
```

### Tooltips

Modifica el evento `mouseenter` en el componente:

```javascript
path.addEventListener('mouseenter', (e) => {
  // Mostrar tooltip con nombre del estado
  const tooltip = document.createElement('div');
  tooltip.textContent = stateName;
  // ... agregar positioning y estilos
});
```
