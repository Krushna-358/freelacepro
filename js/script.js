document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  const pageLoader = document.getElementById('pageLoader');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.animate-up').forEach((section) => observer.observe(section));

  navToggle.addEventListener('click', function () {
    nav.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });

  window.addEventListener('scroll', () => {
    const showButton = window.scrollY > 400;
    backToTop.style.display = showButton ? 'grid' : 'none';
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        card.style.display = filter === 'all' || category === filter ? 'grid' : 'none';
      });
    });
  });

  if (pageLoader) {
    window.addEventListener('load', () => {
      pageLoader.style.opacity = '0';
      pageLoader.style.pointerEvents = 'none';
      setTimeout(() => pageLoader.remove(), 600);
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const inputFields = {
      fullName: {
        element: document.getElementById('fullName'),
        validate: (value) => /^[A-Za-z ]{3,}$/.test(value.trim()),
        message: 'Enter a valid name with at least 3 letters.',
      },
      email: {
        element: document.getElementById('email'),
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
        message: 'Enter a valid email address.',
      },
      phone: {
        element: document.getElementById('phone'),
        validate: (value) => /^[5-9]\d{9}$/.test(value.trim()),
        message: 'Enter a valid 10 digit phone number starting with 5-9.',
      },
      subject: {
        element: document.getElementById('subject'),
        validate: (value) => value.trim().length >= 5,
        message: 'Subject must be at least 5 characters.',
      },
      service: {
        element: document.getElementById('service'),
        validate: (value) => value.trim().length > 0,
        message: 'Please select a service.',
      },
      budget: {
        element: document.getElementById('budget'),
        validate: (value) => value.trim().length > 0,
        message: 'Please select a budget range.',
      },
      message: {
        element: document.getElementById('message'),
        validate: (value) => value.trim().length >= 20 && value.trim().length <= 500,
        message: 'Message should be between 20 and 500 characters.',
      },
    };

    const showError = (field, message) => {
      const small = field.parentElement.querySelector('.error-message');
      small.textContent = message;
      field.classList.add('invalid');
      field.classList.remove('valid');
    };

    const showSuccess = (field) => {
      const small = field.parentElement.querySelector('.error-message');
      small.textContent = '';
      field.classList.remove('invalid');
      field.classList.add('valid');
    };

    const validateField = (fieldKey) => {
      const field = inputFields[fieldKey];
      const value = field.element.value;
      const isValid = field.validate(value);
      if (!isValid) {
        showError(field.element, field.message);
      } else {
        showSuccess(field.element);
      }
      return isValid;
    };

    Object.keys(inputFields).forEach((key) => {
      const field = inputFields[key];
      field.element.addEventListener('input', () => validateField(key));
      field.element.addEventListener('blur', () => validateField(key));
    });

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let formIsValid = true;
      Object.keys(inputFields).forEach((key) => {
        const isValid = validateField(key);
        if (!isValid) formIsValid = false;
      });

      const successMessage = document.getElementById('formSuccess');
      if (!formIsValid) {
        successMessage.style.display = 'none';
        return;
      }

      successMessage.style.display = 'block';
      contactForm.reset();
      Object.keys(inputFields).forEach((key) => {
        const field = inputFields[key].element;
        field.classList.remove('valid');
      });
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
    });
  }
});
