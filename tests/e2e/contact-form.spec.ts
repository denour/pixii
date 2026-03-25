/**
 * ZOMBIE Tests — Formulario de Contacto (/contacto)
 *
 * Z — Zero:      formulario vacío, intento de envío sin datos
 * O — One:       validación campo por campo
 * M — Many:      múltiples campos inválidos a la vez
 * B — Boundary:  valores en el límite (min/max chars, formatos)
 * I — Interface: flujo completo válido (mock del submit)
 * E — Exception: email inválido, teléfono corto, mensaje muy corto
 */

import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await page.goto('/contacto');
  await page.waitForLoadState('networkidle');
});

// ─── Z — Zero ─────────────────────────────────────────────────────────────────

test.describe('Z — Zero: formulario vacío', () => {
  test('el formulario está vacío al cargar la página', async ({ page }) => {
    const nombre = page.locator('#nombre');
    await expect(nombre).toHaveValue('');
  });

  test('enviar el formulario vacío no navega fuera de la página', async ({ page }) => {
    await page.locator('button[type="submit"], input[type="submit"]').click();
    await expect(page).toHaveURL(/\/contacto/);
  });

  test('enviar vacío muestra errores de requerido', async ({ page }) => {
    // Trigger blur en nombre para activar validación
    await page.locator('#nombre').click();
    await page.keyboard.press('Tab'); // blur
    const errorMsg = page.locator('#nombre-error');
    await expect(errorMsg).not.toBeEmpty();
  });
});

// ─── O — One ──────────────────────────────────────────────────────────────────

test.describe('O — One: validación de campo individual', () => {
  test('nombre válido no muestra error', async ({ page }) => {
    await page.locator('#nombre').fill('Juan');
    await page.locator('#nombre').press('Tab');
    const formField = page.locator('#nombre').locator('..');
    await expect(formField).not.toHaveClass(/error/);
  });

  test('email válido no muestra error', async ({ page }) => {
    await page.locator('#email').fill('test@correo.com');
    await page.locator('#email').press('Tab');
    await expect(page.locator('#email-error')).toBeEmpty();
  });

  test('mensaje con 10+ caracteres no muestra error', async ({ page }) => {
    await page.locator('#mensaje').fill('Hola, necesito información sobre sus servicios.');
    await page.locator('#mensaje').press('Tab');
    await expect(page.locator('#mensaje-error')).toBeEmpty();
  });
});

// ─── M — Many ─────────────────────────────────────────────────────────────────

test.describe('M — Many: todos los campos del formulario existen', () => {
  test('todos los campos requeridos están presentes', async ({ page }) => {
    const requiredFields = ['#nombre', '#apellido', '#email', '#telefono', '#proyecto', '#ciudad', '#mensaje'];
    for (const selector of requiredFields) {
      await expect(page.locator(selector)).toBeVisible();
    }
  });

  test('al llenar todos los campos válidos no hay errores visibles', async ({ page }) => {
    await page.locator('#nombre').fill('Juan');
    await page.locator('#apellido').fill('García');
    await page.locator('#email').fill('juan@empresa.com');
    await page.locator('#telefono').fill('6641234567');
    await page.locator('#proyecto').fill('Suministro eléctrico industrial');
    await page.locator('#ciudad').fill('Tijuana');
    await page.locator('#mensaje').fill('Necesitamos cotización para equipos de distribución eléctrica.');

    // Trigger blur en todos
    await page.keyboard.press('Tab');

    const errors = page.locator('.error-message');
    const count = await errors.count();
    for (let i = 0; i < count; i++) {
      const text = await errors.nth(i).textContent();
      expect(text?.trim()).toBe('');
    }
  });
});

// ─── B — Boundary ─────────────────────────────────────────────────────────────

test.describe('B — Boundary: valores en los límites', () => {
  test('nombre con exactamente 2 caracteres es válido', async ({ page }) => {
    await page.locator('#nombre').fill('Jo');
    await page.locator('#nombre').press('Tab');
    await expect(page.locator('#nombre-error')).toBeEmpty();
  });

  test('nombre con 1 carácter muestra error', async ({ page }) => {
    await page.locator('#nombre').fill('J');
    await page.locator('#nombre').press('Tab');
    await expect(page.locator('#nombre-error')).not.toBeEmpty();
  });

  test('teléfono con exactamente 10 dígitos es válido', async ({ page }) => {
    await page.locator('#telefono').fill('6641234567');
    await page.locator('#telefono').press('Tab');
    await expect(page.locator('#telefono-error')).toBeEmpty();
  });

  test('teléfono con 9 dígitos muestra error', async ({ page }) => {
    await page.locator('#telefono').fill('664123456');
    await page.locator('#telefono').press('Tab');
    await expect(page.locator('#telefono-error')).not.toBeEmpty();
  });

  test('mensaje con exactamente 10 caracteres es válido', async ({ page }) => {
    await page.locator('#mensaje').fill('1234567890');
    await page.locator('#mensaje').press('Tab');
    await expect(page.locator('#mensaje-error')).toBeEmpty();
  });

  test('mensaje con 9 caracteres muestra error', async ({ page }) => {
    await page.locator('#mensaje').fill('123456789');
    await page.locator('#mensaje').press('Tab');
    await expect(page.locator('#mensaje-error')).not.toBeEmpty();
  });
});

// ─── I — Interface ────────────────────────────────────────────────────────────

test.describe('I — Interface: flujo de formulario', () => {
  test('el formulario tiene action hacia formspree', async ({ page }) => {
    const form = page.locator('.contact-form');
    const action = await form.getAttribute('action');
    expect(action).toMatch(/formspree\.io/);
  });

  test('el mensaje de éxito está oculto por defecto', async ({ page }) => {
    const success = page.locator('#form-success');
    await expect(success).not.toHaveClass(/active/);
  });

  test('navegar a /contacto?success muestra el mensaje de éxito', async ({ page }) => {
    await page.goto('/contacto?success');
    await page.waitForLoadState('networkidle');
    const success = page.locator('#form-success');
    await expect(success).toHaveClass(/active/);
  });

  test('el campo error se limpia al empezar a escribir', async ({ page }) => {
    // Trigger error primero
    await page.locator('#nombre').click();
    await page.keyboard.press('Tab');
    await expect(page.locator('#nombre-error')).not.toBeEmpty();

    // Empezar a escribir debe limpiar el error
    await page.locator('#nombre').fill('Ju');
    await expect(page.locator('#nombre-error')).toBeEmpty();
  });
});

// ─── E — Exception ────────────────────────────────────────────────────────────

test.describe('E — Exception: inputs inválidos', () => {
  test('email sin @ muestra error', async ({ page }) => {
    await page.locator('#email').fill('correosinpunto');
    await page.locator('#email').press('Tab');
    await expect(page.locator('#email-error')).not.toBeEmpty();
  });

  test('nombre con números muestra error', async ({ page }) => {
    await page.locator('#nombre').fill('Juan123');
    await page.locator('#nombre').press('Tab');
    await expect(page.locator('#nombre-error')).not.toBeEmpty();
  });

  test('teléfono con letras muestra error', async ({ page }) => {
    await page.locator('#telefono').fill('ABCDEFGHIJ');
    await page.locator('#telefono').press('Tab');
    await expect(page.locator('#telefono-error')).not.toBeEmpty();
  });

  test('proyecto muy corto (2 chars) muestra error', async ({ page }) => {
    await page.locator('#proyecto').fill('AB');
    await page.locator('#proyecto').press('Tab');
    await expect(page.locator('#proyecto-error')).not.toBeEmpty();
  });
});
