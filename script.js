// ── Year ──
document.getElementById("year").textContent = new Date().getFullYear();

// ── Contact form → mailto handler ──
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector("#cf-name").value.trim();
    const email = form.querySelector("#cf-email").value.trim();
    const subject = form.querySelector("#cf-subject").value.trim();
    const message = form.querySelector("#cf-message").value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) return;

    const body = `Hi Hamza,\n\nName: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:hs.456.king@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
}

// ── Scroll-reveal (respects prefers-reduced-motion) ──
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const targets = document.querySelectorAll(
    ".abstract, .practice, .experience, .notes, .contact, .role, .practice-grid article"
  );

  targets.forEach(function (el) {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
}
