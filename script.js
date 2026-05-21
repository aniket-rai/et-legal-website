// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Current date in runner
const dateEl = document.querySelector('[data-date]');
if (dateEl) {
  const d = new Date();
  const fmt = new Intl.DateTimeFormat('en-NZ', { day: '2-digit', month: 'short', year: 'numeric' });
  dateEl.textContent = fmt.format(d).toUpperCase();
}

// Netlify Forms — inline AJAX submission
const enquiryForm = document.getElementById('enquiry-form');
const enquirySuccess = document.getElementById('form-success');
if (enquiryForm && enquirySuccess) {
  enquiryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(enquiryForm);
    const body = new URLSearchParams();
    for (const [k, v] of data.entries()) body.append(k, v);
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!res.ok) throw new Error('submit failed');
      enquiryForm.style.display = 'none';
      enquirySuccess.classList.add('show');
      enquirySuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      // fall back to normal submit
      enquiryForm.removeEventListener('submit', arguments.callee);
      enquiryForm.submit();
    }
  });
}
