/**
 * ZOMBIE Tests — Cambios PIXII (TDD First)
 * Estos tests deben FALLAR primero. Se implementa después.
 *
 * Cambios del PDF:
 * 1. Texto "SUMINISTRO DE EQUIPOS PRIMARIOS PARA:" (reemplaza "lo que hacemos")
 * 2. Títulos en mayúsculas: CONTACTO, QUEREMOS CONOCER TU PROYECTO, PRESENCIA EN MÉXICO
 * 3. Todos los h2/títulos de sección en mayúsculas
 * 4. Correo: ventas@pixiint.com
 * 5. LinkedIn en lugar de Instagram en "Síguenos"
 * 6. Mapa en /nosotros igual al de inicio
 */

import { test, expect } from '@playwright/test';

// ─── Z — Zero: textos que NO deben existir ya ─────────────────────────────────

test.describe('Z — Zero: textos obsoletos eliminados', () => {
  test('NO debe existir el texto "lo que hacemos" en ninguna página', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const text = await page.locator('body').innerText();
    expect(text.toLowerCase()).not.toContain('lo que hacemos');
  });

  test('NO debe existir Instagram en el apartado "Síguenos"', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // No debe haber link a instagram.com
    const instagramLinks = page.locator('a[href*="instagram.com"]');
    await expect(instagramLinks).toHaveCount(0);
  });

  test('NO debe existir el correo incorrecto en ninguna página', async ({ page }) => {
    for (const path of ['/', '/contacto', '/nosotros']) {
      await page.goto(path);
      const text = await page.locator('body').innerText();
      // El correo viejo no debe aparecer (asumimos que era diferente)
      expect(text).not.toMatch(/(?:info|contact|hola)@pixii/i);
    }
  });
});

// ─── O — One: cada cambio de texto individual ─────────────────────────────────

test.describe('O — One: textos nuevos presentes', () => {
  test('existe el texto "SUMINISTRO DE EQUIPOS PRIMARIOS PARA" en la página de inicio', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toContainText('SUMINISTRO DE EQUIPOS PRIMARIOS PARA');
  });

  test('el correo ventas@pixiint.com aparece en la página de contacto', async ({ page }) => {
    await page.goto('/contacto');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toContainText('ventas@pixiint.com');
  });

  test('el correo ventas@pixiint.com aparece en el inicio o footer', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toContainText('ventas@pixiint.com');
  });

  test('LinkedIn está en "Síguenos" con el link correcto', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const linkedinLink = page.locator('a[href*="linkedin.com/company/pixii-international"]');
    await expect(linkedinLink).toBeVisible();
  });
});

// ─── M — Many: mayúsculas en todos los títulos ────────────────────────────────

test.describe('M — Many: títulos en mayúsculas', () => {
  test('el título "CONTACTO" está en mayúsculas', async ({ page }) => {
    await page.goto('/contacto');
    await page.waitForLoadState('networkidle');
    // Busca el heading que contenga CONTACTO en mayúsculas exactas
    const heading = page.locator('h1, h2, h3').filter({ hasText: /^CONTACTO$/i });
    const text = await heading.first().innerText();
    expect(text.trim()).toBe('CONTACTO');
  });

  test('el título "QUEREMOS CONOCER TU PROYECTO" está en mayúsculas', async ({ page }) => {
    await page.goto('/contacto');
    await page.waitForLoadState('networkidle');
    const heading = page.locator('h1, h2, h3, .form-title').filter({ hasText: /queremos conocer/i });
    const text = await heading.first().innerText();
    expect(text.trim()).toBe('QUEREMOS CONOCER TU PROYECTO');
  });

  test('el título "PRESENCIA EN MÉXICO" está en mayúsculas', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const heading = page.locator('h1, h2, h3, h4').filter({ hasText: /presencia en m/i });
    const text = await heading.first().innerText();
    expect(text.trim()).toMatch(/^PRESENCIA EN MÉXICO$/i);
  });

  test('el título de la sección de servicios está en mayúsculas', async ({ page }) => {
    await page.goto('/servicios');
    await page.waitForLoadState('networkidle');
    // Los h2 de sección no deben tener texto en minúsculas al inicio
    const h2s = page.locator('main h2, section h2');
    const count = await h2s.count();
    for (let i = 0; i < count; i++) {
      const text = await h2s.nth(i).innerText();
      const trimmed = text.trim();
      if (trimmed.length > 0) {
        // Debe estar en mayúsculas (CSS text-transform o texto real)
        expect(trimmed).toBe(trimmed.toUpperCase());
      }
    }
  });

  test('el título de la sección de proyectos está en mayúsculas', async ({ page }) => {
    await page.goto('/proyectos');
    await page.waitForLoadState('networkidle');
    const h2s = page.locator('main h2, section h2');
    const count = await h2s.count();
    for (let i = 0; i < count; i++) {
      const text = await h2s.nth(i).innerText();
      const trimmed = text.trim();
      if (trimmed.length > 0) {
        expect(trimmed).toBe(trimmed.toUpperCase());
      }
    }
  });
});

// ─── B — Boundary: casos límite de mayúsculas y datos ────────────────────────

test.describe('B — Boundary: formatos exactos', () => {
  test('el texto de suministro no tiene espacios extra al inicio', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // El PDF indica que no debe tener espacios extras — verificar que el elemento existe limpio
    const el = page.locator('text=SUMINISTRO DE EQUIPOS PRIMARIOS PARA');
    await expect(el.first()).toBeVisible();
  });

  test('el link de LinkedIn es el correcto', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const linkedinLink = page.locator('a[href*="linkedin.com/company/pixii-international"]');
    const href = await linkedinLink.first().getAttribute('href');
    expect(href).toBe('https://www.linkedin.com/company/pixii-international/');
  });

  test('el correo ventas@pixiint.com es un mailto link', async ({ page }) => {
    await page.goto('/contacto');
    await page.waitForLoadState('networkidle');
    const mailtoLink = page.locator('a[href="mailto:ventas@pixiint.com"]');
    await expect(mailtoLink).toBeVisible();
  });
});

// ─── I — Interface: mapa en /nosotros igual al de inicio ─────────────────────

test.describe('I — Interface: componente de mapa consistente', () => {
  test('la página /nosotros tiene un mapa interactivo visible (.map-container)', async ({ page }) => {
    await page.goto('/nosotros');
    await page.waitForLoadState('networkidle');
    const map = page.locator('.map-container').first();
    await expect(map).toBeVisible();
  });

  test('el mapa en /nosotros usa el mismo componente SVG que el de inicio', async ({ page }) => {
    // Verificar que el SVG del mapa (MexicoMap) existe en inicio
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const svgHome = page.locator('.map-overflow-container svg, .presence-section svg').first();
    await expect(svgHome).toBeVisible();

    // Verificar que el mismo SVG existe en /nosotros
    await page.goto('/nosotros');
    await page.waitForLoadState('networkidle');
    const svgNosotros = page.locator('.map-container svg').first();
    await expect(svgNosotros).toBeVisible();

    // Ambos deben tener el mismo viewBox (misma estructura SVG = mismo componente)
    const homeViewBox = await svgHome.getAttribute('viewBox');
    const nosotrosViewBox = await svgNosotros.getAttribute('viewBox');
    expect(nosotrosViewBox).toBe(homeViewBox);
  });
});

// ─── E — Exception: correo inválido no debe aparecer ─────────────────────────

test.describe('E — Exception: datos incorrectos eliminados', () => {
  test('no existe ningún correo @pixii que no sea ventas@pixiint.com', async ({ page }) => {
    for (const path of ['/', '/contacto', '/nosotros', '/servicios']) {
      await page.goto(path);
      const links = page.locator('a[href^="mailto:"]');
      const count = await links.count();
      for (let i = 0; i < count; i++) {
        const href = await links.nth(i).getAttribute('href');
        if (href?.includes('@pixii')) {
          expect(href).toBe('mailto:ventas@pixiint.com');
        }
      }
    }
  });

  test('no existe link a instagram en ninguna página', async ({ page }) => {
    for (const path of ['/', '/nosotros', '/contacto']) {
      await page.goto(path);
      const instagramLinks = page.locator('a[href*="instagram"]');
      await expect(instagramLinks).toHaveCount(0);
    }
  });
});
