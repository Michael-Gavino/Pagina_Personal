// =============================
// JS: Interactividad completa
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

// Validación básica del formulario
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  if (!nombre.value.trim() || !email.value.trim()) {
    e.preventDefault();
    alert('Por favor completa nombre y email.');
  }
});

// Manejo de expansión de reflexiones
document.querySelectorAll('.reflexiones .btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const article = btn.closest('article');
    const content = article.querySelector('.content');
    const isExpanded = content.classList.contains('expanded');
    
    if (isExpanded) {
      content.classList.remove('expanded');
      btn.textContent = 'Leer';
    } else {
      content.classList.add('expanded');
      btn.textContent = 'Cerrar';
    }
  });
});

// Scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});