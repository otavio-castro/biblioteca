const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'screenshots');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();

  // Desktop 1280x800
  await p.setViewportSize({ width: 1280, height: 800 });

  // Login
  await p.goto('http://localhost:5173/login');
  await wait(1500);
  await p.screenshot({ path: path.join(OUT, 'login.png') });
  console.log('login OK');

  // Do login
  await p.fill('#email', 'admin@biblioteca.com');
  await p.fill('#senha', 'Admin@123');
  await p.click('button[type=submit]');
  await wait(2500);

  // Home dashboard
  await p.screenshot({ path: path.join(OUT, 'home.png') });
  console.log('home OK');

  // Acervo
  await p.goto('http://localhost:5173/acervo');
  await wait(2000);
  await p.screenshot({ path: path.join(OUT, 'acervo.png') });
  console.log('acervo OK');

  // Emprestimos
  await p.goto('http://localhost:5173/emprestimos');
  await wait(2000);
  await p.screenshot({ path: path.join(OUT, 'emprestimos.png') });
  console.log('emprestimos OK');

  // Relatorios
  await p.goto('http://localhost:5173/relatorios');
  await wait(2000);
  await p.screenshot({ path: path.join(OUT, 'relatorios.png') });
  console.log('relatorios OK');

  // Usuarios
  await p.goto('http://localhost:5173/usuarios');
  await wait(2000);
  await p.screenshot({ path: path.join(OUT, 'usuarios.png') });
  console.log('usuarios OK');

  // Dark mode
  await p.goto('http://localhost:5173');
  await wait(1500);
  const themeBtn = p.locator('button[title="Modo escuro"]');
  if (await themeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await themeBtn.click();
  }
  await wait(400);
  await p.screenshot({ path: path.join(OUT, 'dark-home.png') });
  console.log('dark-home OK');

  await p.goto('http://localhost:5173/acervo');
  await wait(1800);
  await p.screenshot({ path: path.join(OUT, 'dark-acervo.png') });
  console.log('dark-acervo OK');

  // Mobile 390x844
  await p.setViewportSize({ width: 390, height: 844 });

  // Back to light
  await p.goto('http://localhost:5173');
  await wait(1500);
  const lightBtn = p.locator('button[title="Modo claro"]');
  if (await lightBtn.isVisible({ timeout: 1000 }).catch(() => false)) {
    await lightBtn.click();
    await wait(300);
  }
  await p.screenshot({ path: path.join(OUT, 'mobile-home.png') });
  console.log('mobile-home OK');

  // Open hamburger
  const ham = p.locator('button[aria-label="Menu"]');
  if (await ham.isVisible({ timeout: 2000 }).catch(() => false)) {
    await ham.click();
    await wait(400);
    await p.screenshot({ path: path.join(OUT, 'mobile-menu.png') });
    console.log('mobile-menu OK');
    await ham.click();
    await wait(200);
  }

  // Mobile emprestimos
  await p.goto('http://localhost:5173/emprestimos');
  await wait(2000);
  await p.screenshot({ path: path.join(OUT, 'mobile-emprestimos.png') });
  console.log('mobile-emprestimos OK');

  await b.close();
  console.log('All screenshots done!');
})().catch(e => { console.error(e); process.exit(1); });
