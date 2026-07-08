document.documentElement.classList.add('js-enabled');

const consultationForm = document.querySelector('[data-consultation-form]');

if (consultationForm) {
  consultationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(consultationForm);
    const values = {};

    for (const [key, value] of formData.entries()) {
      if (values[key]) {
        values[key] = `${values[key]}, ${value}`;
      } else {
        values[key] = value;
      }
    }

    const message = [
      'Free consultation request',
      `Parent: ${values['Parent Name'] || ''}`,
      `Phone: ${values['Phone Number'] || ''}`,
      `Email: ${values['Email Address'] || ''}`,
      `Student grade: ${values['Student Grade Level'] || ''}`,
      `Subjects: ${values['Subjects Needed'] || ''}`,
      `Goals: ${values['Academic Goals'] || ''}`,
      `Preferred schedule: ${values['Preferred Schedule'] || ''}`,
      `Tutoring option: ${values['Tutoring Option'] || ''}`,
      `Get-to-know-you notes: ${values['Get To Know You Notes'] || ''}`,
    ].join('\n');

    const encodedMessage = encodeURIComponent(message);
    const isAppleDevice = /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
    const separator = isAppleDevice ? '&' : '?';
    window.location.href = `sms:9162712282${separator}body=${encodedMessage}`;

    const status = consultationForm.querySelector('[data-form-status]');
    if (status) {
      status.textContent = 'Your text message is opening now. If it does not open, please call or text 916-271-2282 and share the details from this form.';
    }
  });
}

const motionSafe = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

if (motionSafe && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll(
    '.section-pad, .service-card, .step, .sidebar-card, .hero-card, .mini-profile, .contact-form'
  );

  revealTargets.forEach((element, index) => {
    element.classList.add('reveal-on-scroll');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
  );

  revealTargets.forEach((element) => observer.observe(element));
}
