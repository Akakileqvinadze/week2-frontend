// ===== Navbar Mobile Toggle =====
const menuBtn = document.querySelector('.menu-toggle');
const links = document.getElementById('nav-links');

menuBtn.addEventListener('click', () => {
  const isOpen = links.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

// Close menu when clicking a link (mobile UX)
links.addEventListener('click', (e) => {
  if(e.target.tagName === 'A' && links.classList.contains('open')){
    links.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// ===== Hero CTA Smooth Scroll =====
document.querySelector('.cta-btn').addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// ===== Projects: Dynamic Cards =====
const projects = [
  { title: "Project 1", desc: "პირველი პროექტი", img: "images/img1.jpg" },
  { title: "Project 2", desc: "მეორე პროექტი", img: "images/img2.jpg" },
  { title: "Project 3", desc: "მესამე პროექტი", img: "images/img3.jpg" }
];

const container = document.querySelector('.projects');
projects.forEach(p => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `<img src="${p.img}" alt="${p.title}"><h3>${p.title}</h3><p>${p.desc}</p>`;
  container.appendChild(card);
});

// ===== Gallery: Modal Open/Close =====
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('.gallery-item').forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.dataset.large || img.src;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
});

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && modal.classList.contains('open')){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
});

modal.addEventListener('click', (e) => {
  if(e.target === modal){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
});

// ===== Contact Form Validation =====
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

function setError(el, message){
  const small = el.parentElement.querySelector('.error');
  small.textContent = message || '';
}

function isEmailValid(value){
  // Simple email pattern for demo
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  let valid = true;

  if(!name){ setError(form.name, 'სახელი სავალდებულოა'); valid = false; } else setError(form.name, '');
  if(!email){ setError(form.email, 'Email სავალდებულოა'); valid = false; }
  else if(!isEmailValid(email)){ setError(form.email, 'Email ფორმატი არასწორია'); valid = false; }
  else setError(form.email, '');

  if(!message){ setError(form.message, 'მესიჯი სავალдებულოა'); valid = false; } else setError(form.message, '');

  if(valid){
    statusEl.textContent = 'მესიჯი გაიგზავნა!';
    statusEl.style.color = 'var(--ok)';
    form.reset();
  } else {
    statusEl.textContent = 'გთხოვთ შეავსოთ აუცილებელი ველები.';
    statusEl.style.color = 'var(--danger)';
  }
});

// ===== Footer Year =====
document.getElementById('year').textContent = new Date().getFullYear();
