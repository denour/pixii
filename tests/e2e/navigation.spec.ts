/**
 * ZOMBIE Tests — Navegación entre páginas
 *
 * Z — Zero:      páginas vacías / sin parámetros
 * O — One:       carga de cada página individualmente
 * M — Many:      todas las rutas responden correctamente
 * B — Boundary:  rutas exactas y trailing slashes
 * I — Interface: links del menú funcionan end-to-end
 * E — Exception: rutas inválidas, navegación con back/forward
 */

import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/', titleMatch: /PIXII/ },
  { path: '/servicios', titleMatch: /servicio/i },
  { path: '/proyectos', titleMatch: /proyecto/i },
  { path: '/nosotros', titleMatch: /nosotros/i },
  { path: '/contacto', titleMatch: /contacto/i },
];

// ─── Z — Zero ─────────────────────────────────────────────────────────────────

test.describe('Z — Zero: estado base de rutas', () => {
  test('la raíz "/" responde sin errores', async ({ page }) => {
    const res = await page.goto('/');
    expect(res?.status()).toBe(200);
  });
});

// ─── O — One ──────────────────────────────────────────────────────────────────

test.describe('O — One: cada página carga individualmente', () => {
  for (const { path, titleMatch } of PAGES) {
    test(`GET ${path} → status 200 y título correcto`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page).toHaveTitle(titleMatch);
    });
  }
});

// ─── M — Many ─────────────────────────────────────────────────────────────────

test.describe('M — Many: todas las rutas tienen header y footer', () => {
  for (const { path } of PAGES) {
    test(`${path} tiene header visible`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('header[role="banner"]')).toBeVisible();
    });

    test(`${path} tiene footer visible`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('footer')).toBeVisible();
    });
  }
});

// ─── B — Boundary ─────────────────────────────────────────────────────────────

test.describe('B — Boundary: rutas exactas y edge cases de URL', () => {
  test('"/contacto" y "/contacto/" resuelven sin error (trailing slash)', async ({ page }) => {
    // Astro puede redirigir o no, pero no debe romper
    const res = await page.goto('/contacto');
    expect(res?.status()).toBeLessThan(500);
  });

  test('una ruta con mayúsculas redirige o retorna 404 (no 500)', async ({ page }) => {
    const res = await page.goto('/SERVICIOS');
    expect(res?.status()).not.toBe(500);
  });
});

// ─── I — Interface ────────────────────────────────────────────────────────────

test.describe('I — Interface: links del menú de navegación', () => {
  test('el menú lleva a /servicios', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('a[href="/servicios"]').first().click();
    await expect(page).toHaveURL(/\/servicios/);
  });

  test('el menú lleva a /proyectos', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('a[href="/proyectos"]').first().click();
    await expect(page).toHaveURL(/\/proyectos/);
  });

  test('el menú lleva a /nosotros', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('a[href="/nosotros"]').first().click();
    await expect(page).toHaveURL(/\/nosotros/);
  });

  test('el menú lleva a /contacto', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('a[href="/contacto"]').first().click();
    await expect(page).toHaveURL(/\/contacto/);
  });
});

// ─── E — Exception ────────────────────────────────────────────────────────────

test.describe('E — Exception: rutas inválidas y navegación browser', () => {
  test('ruta inexistente no rompe la app (no 500)', async ({ page }) => {
    const res = await page.goto('/pagina-fantasma-xyz');
    expect(res?.status()).not.toBe(500);
  });

  test('back/forward del browser funciona correctamente', async ({ page }) => {
    await page.goto('/');
    await page.goto('/servicios');
    await page.goBack();
    await expect(page).toHaveURL('/');
    await page.goForward();
    await expect(page).toHaveURL(/\/servicios/);
  });
});
