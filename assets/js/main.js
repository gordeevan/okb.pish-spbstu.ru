/* ========================================================================
   ОБЩИЕ КОМПОНЕНТЫ (используются на всех страницах платформы)
======================================================================== */

/* ---------- Модальные окна ---------- */
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');

function openModal(html){
  if(!modalOverlay || !modalBody) return;
  modalBody.innerHTML = html;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  if(!modalOverlay) return;
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  if(modalOverlay && e.target === modalOverlay){ closeModal(); return; }
  if(e.target.closest && e.target.closest('#modalClose')){ closeModal(); }
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) closeModal();
});

/* ---------- Бургер-меню ---------- */
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');
if(burgerBtn && navMenu){
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('open');
    navMenu.classList.toggle('open');
  });
  navMenu.addEventListener('click', (e) => {
    if(e.target.tagName === 'A'){
      burgerBtn.classList.remove('open');
      navMenu.classList.remove('open');
    }
  });
}

/* ---------- Выпадающее меню «Проекты» (мобильная версия) ---------- */
document.addEventListener('click', (e) => {
  const caret = e.target.closest('.nav-caret-btn');
  if(caret){
    caret.closest('.nav-item').classList.toggle('dropdown-open');
  }
});

/* ---------- Аккордеон ---------- */
document.addEventListener('click', (e) => {
  const head = e.target.closest('.accordion-head');
  if(head){
    const item = head.closest('.accordion-item');
    item.classList.toggle('open');
  }
});

/* ---------- Форма "Задайте свой вопрос" ---------- */
function initContactForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const feedback = document.getElementById('formMsg');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#cf-name');
    const email = form.querySelector('#cf-email');
    const msg = form.querySelector('#cf-msg');

    const errors = [];
    [name, msg].forEach(field => {
      const group = field.closest('.form-group');
      const empty = !field.value.trim();
      group.classList.toggle('invalid', empty);
      if(empty) errors.push(field === name ? 'укажите имя' : 'напишите сообщение');
    });
    const emailGroup = email.closest('.form-group');
    const emailInvalid = !emailPattern.test(email.value.trim());
    emailGroup.classList.toggle('invalid', emailInvalid);
    if(emailInvalid) errors.push('укажите корректный email');

    feedback.classList.remove('success','error');
    if(errors.length){
      feedback.classList.add('show','error');
      feedback.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Проверьте поля: ${errors.join(', ')}.`;
      return;
    }

    feedback.classList.add('show','success');
    feedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Спасибо! Сообщение отправлено, мы свяжемся с вами.';
    form.reset();
    form.querySelectorAll('.form-group.invalid').forEach(g => g.classList.remove('invalid'));
    setTimeout(() => feedback.classList.remove('show'), 5000);
  });

  form.querySelectorAll('input,textarea').forEach(field => {
    field.addEventListener('input', () => field.closest('.form-group').classList.remove('invalid'));
  });
}

/* ---------- Scroll reveal (IntersectionObserver) ---------- */
function initScrollReveal(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initScrollReveal();
});
