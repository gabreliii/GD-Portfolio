const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const projects = {
  urban: {
    title: 'URBAN THREADS',
    type: 'WEB / DESIGN',
    description: 'A clothing website concept focused on a clean, youthful visual identity and a simple shopping experience.',
    url: 'https://urban-threads-landing-page.vercel.app/'
  },
  codeshark: {
    title: 'CODESHARK',
    type: 'GAME / DEVELOPMENT',
    description: 'A typing-based coding game concept where players practice programming under pressure while sharks move closer.',
    url: 'https://drive.google.com/drive/folders/1fra4YcWejXfrocQfoYDBPHqZmjQgm9KX'
  },
  warehouse: {
    title: 'WAREHOUSE MANAGEMENT SYSTEM',
    type: 'SYSTEM / UI',
    description: 'A warehouse management system designed to streamline inventory tracking, receiving, and dispatch operations.',
    url: 'https://gabreliii.github.io/HCI-proj-draft/'
  }
};

const modal = document.querySelector('.modal');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const modalType = document.querySelector('#modal-type');
const closeModal = () => {
  modal.hidden = true;
  document.body.style.overflow = '';
};

document.querySelectorAll('.project-card').forEach(card => {
  const openProject = event => {
    if (event.target.closest('a')) return;
    const project = projects[card.dataset.project];
    if (!project) return;
    if (project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer');
      return;
    }
    modalTitle.textContent = project.title;
    modalType.textContent = project.type;
    modalDescription.textContent = project.description;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  };
  card.addEventListener('click', openProject);
});

document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !modal.hidden) closeModal();
});

document.querySelector('#year').textContent = new Date().getFullYear();

const heroPhotoCard = document.querySelector('.hero-photo-card');
const heroPhoto = document.querySelector('.hero-photo');
let photoClicks = 0;
let currentRotation = 0;
let secretTimeout = null;

if (heroPhotoCard && heroPhoto) {
  heroPhotoCard.addEventListener('click', () => {
    photoClicks += 1;
    currentRotation += 360;
    heroPhotoCard.style.transform = `rotate(${currentRotation}deg)`;

    if (photoClicks === 10) {
      photoClicks = 0;
      heroPhoto.src = 'assets/elijah-secret.jpg';
      heroPhoto.style.objectPosition = 'center center';

      clearTimeout(secretTimeout);
      secretTimeout = setTimeout(() => {
        heroPhoto.src = 'assets/elijah.jpg';
        heroPhoto.style.objectPosition = 'center top';
      }, 3000);
    }
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section > *, .project-card, .skill-card, .work-widget').forEach(element => {
  element.classList.add('reveal');
  observer.observe(element);
});
