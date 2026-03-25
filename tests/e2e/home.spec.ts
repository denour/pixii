/**
 * ZOMBIE Tests — Página de Inicio (/)
 *
 * Z — Zero:      página carga sin contenido dinámico / estados vacíos
 * O — One:       elementos clave individuales presentes
 * M — Many:      múltiples secciones, slides del carrusel
 * B — Boundary:  límites del carrusel (primer/último slide)
 * I — Interface: navegación entre páginas, enlaces internos
 * E — Exception: rutas inválidas, comportamiento en error
 */

import { test, expect } from '@playwright/test';

// ─── Z — Zero ─────────────────────────────────────────────────────────────────

test.describe('Z — Zero: carga inicial', () => {
  test('la página carga con status 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('el título del documento está definido', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/PIXII/i);
  });

  test('no hay errores de consola críticos al cargar', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
  });
});

// ─── O — One ──────────────────────────────────────────────────────────────────

test.describe('O — One: elementos individuales presentes', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('el header es visible', async ({ page }) => {
    await expect(page.locator('header[role="banner"]')).toBeVisible();
  });

  test('el logo está en el header', async ({ page }) => {
    await expect(page.locator('header img, header svg').first()).toBeVisible();
  });

  test('el hero tiene un h1 con el tagline principal', async ({ page }) => {
    const h1 = page.locator('.hero h1, .hero-title');
    await expect(h1).toBeVisible();
    await expect(h1).toContainText('Smart link');
  });

  test('el botón "Ver Proyectos" está en el hero', async ({ page }) => {
    const btn = page.locator('a[href="/proyectos"]').first();
    await expect(btn).toBeVisible();
  });

  test('el footer está presente', async ({ page }) => {
    await expect(page.locator('footer')).toBeVisible();
  });
});

// ─── M — Many ─────────────────────────────────────────────────────────────────

test.describe('M — Many: múltiples secciones y slides', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('el carrusel tiene exactamente 4 slides', async ({ page }) => {
    const slides = page.locator('.slide');
    await expect(slides).toHaveCount(4);
  });

  test('hay 4 dots de control del carrusel', async ({ page }) => {
    const dots = page.locator('.dot-inside');
    await expect(dots).toHaveCount(4);
  });

  test('el menú de navegación tiene al menos 4 links', async ({ page }) => {
    const navLinks = page.locator('nav a, header nav a');
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('existen múltiples secciones en la página', async ({ page }) => {
    const sections = page.locator('section');
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});

// ─── B — Boundary ─────────────────────────────────────────────────────────────

test.describe('B — Boundary: límites del carrusel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('el primer slide está activo al cargar', async ({ page }) => {
    const firstSlide = page.locator('.slide').first();
    await expect(firstSlide).toHaveClass(/active/);
  });

  test('el primer dot está activo al cargar', async ({ page }) => {
    const firstDot = page.locator('.dot-inside').first();
    await expect(firstDot).toHaveClass(/active/);
  });

  test('al hacer click en el último dot cambia el slide activo', async ({ page }) => {
    const dots = page.locator('.dot-inside');
    const lastDot = dots.last();
    await lastDot.click();
    await expect(lastDot).toHaveClass(/active/);

    const lastSlide = page.locator('.slide').last();
    await expect(lastSlide).toHaveClass(/active/);
  });

  test('navegación con ArrowRight avanza al siguiente slide', async ({ page }) => {
    // Asegurar que el hero está en foco para capturar keydown
    await page.locator('.hero').hover();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);

    const secondSlide = page.locator('.slide').nth(1);
    await expect(secondSlide).toHaveClass(/active/);
  });

  test('navegación con ArrowLeft desde slide 0 no rompe el carrusel', async ({ page }) => {
    await page.locator('.hero').hover();
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(300);
    // Debe ir al último slide (wrapping)
    const lastSlide = page.locator('.slide').last();
    await expect(lastSlide).toHaveClass(/active/);
  });
});

// ─── I — Interface ────────────────────────────────────────────────────────────

test.describe('I — Interface: navegación y enlaces', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('el botón "Ver Proyectos" navega a /proyectos', async ({ page }) => {
    await page.locator('a[href="/proyectos"]').first().click();
    await expect(page).toHaveURL(/\/proyectos/);
  });

  test('el skip-link apunta al contenido principal', async ({ page }) => {
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  test('el header tiene role="banner"', async ({ page }) => {
    await expect(page.locator('[role="banner"]')).toBeVisible();
  });

  test('el carrusel tiene aria-label descriptivo', async ({ page }) => {
    await expect(page.locator('[aria-roledescription="carousel"]')).toBeVisible();
  });

  test('los dots tienen aria-label accesible', async ({ page }) => {
    const firstDot = page.locator('.dot-inside').first();
    const ariaLabel = await firstDot.getAttribute('aria-label');
    expect(ariaLabel).toMatch(/slide/i);
  });
});

// ─── E — Exception ────────────────────────────────────────────────────────────

test.describe('E — Exception: rutas inválidas y manejo de errores', () => {
  test('una ruta inexistente retorna 404', async ({ page }) => {
    const response = await page.goto('/ruta-que-no-existe-jamas');
    expect(response?.status()).toBe(404);
  });

  test('el autoplay del carrusel se detiene al hacer hover', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Hover para pausar el autoplay
    await page.locator('.hero').hover();
    const activeSlide = await page.locator('.slide.active').getAttribute('data-slide-index');

    // Esperar más que el intervalo de autoplay (5000ms) mientras hover está activo
    await page.waitForTimeout(5500);
    const activeSlideAfter = await page.locator('.slide.active').getAttribute('data-slide-index');

    // El slide no debe haber cambiado porque el autoplay está pausado
    expect(activeSlide).toBe(activeSlideAfter);
  });
});
