// =============================
// JS: Interactividad mínima
// - Modo claro/oscuro
// - Filtro de proyectos
// - Lightbox con <dialog>
// - Validación simple del formulario
// =============================

const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// Persistir preferencia de tema
const savedTheme = localStorage.getItem('theme') || 'dark';
if(savedTheme === 'light') document.body.classList.add('light');

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

// Año dinámico en footer
document.getElementById('year').textContent = new Date().getFullYear();

// Filtrado de proyectos por data-tags
const projectGrid = document.getElementById('projectGrid');
const filterButtons = document.querySelectorAll('[data-filter]');
filterButtons.forEach(btn => btn.addEventListener('click', () => {
  const tag = btn.getAttribute('data-filter');
  document.querySelectorAll('#proyectos .item').forEach(card => {
    const show = tag === 'all' || card.dataset.tags.includes(tag);
    card.style.display = show ? 'flex' : 'none';
  });
}));

// Lightbox con dialog: botones que abren por data-modal="pX"
const modals = {
  p1: document.getElementById('modal-p1'),
  p2: document.getElementById('modal-p2'),
  p3: document.getElementById('modal-p3')
};

document.querySelectorAll('[data-modal]').forEach(b => {
  b.addEventListener('click', () => {
    const key = b.getAttribute('data-modal');
    const dlg = modals[key];
    if (dlg) dlg.showModal();
  });
});
document.querySelectorAll('dialog [data-close]').forEach(b => b.addEventListener('click', e => {
  e.target.closest('dialog').close();
}));

// Galería: click para abrir imagen en modal genérico reutilizando modal-p1
const gallery = document.getElementById('gallery');
gallery?.addEventListener('click', (e) => {
  const img = e.target.closest('img');
  if(!img) return;
  // Reutilizamos modal-p1 para vista rápida
  const dlg = document.getElementById('modal-p1');
  dlg.querySelector('.modal-img').src = img.src;
  dlg.querySelector('.modal-img').alt = img.alt;
  dlg.querySelector('.modal-head strong').textContent = img.alt || 'Imagen';
  dlg.showModal();
});

// Validación básica del formulario (evitar envíos vacíos)
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  if (!nombre.value.trim() || !email.value.trim()) {
    e.preventDefault();
    alert('Por favor completa nombre y email.');
  }
});