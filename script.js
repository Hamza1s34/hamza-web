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

// ── Less-Dense Static Binary Columns Background for Hero Portrait ──
(function initBinaryColumns() {
  const canvas = document.getElementById("hero-binary-rain");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  function renderStaticBinaryGrid() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    const isMobile = window.innerWidth <= 760;
    const fontSize = isMobile ? 10 : 11;
    const colSpacing = isMobile ? 20 : 26; // generous horizontal spacing between columns
    const rowSpacing = isMobile ? 18 : 22; // generous vertical spacing between digits

    ctx.font = `${fontSize}px "DM Mono", Consolas, monospace`;

    const numCols = Math.floor(rect.width / colSpacing);
    const numRows = Math.floor(rect.height / rowSpacing);

    let seed = 42;
    function pseudoRandom() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    }

    for (let c = 0; c < numCols; c++) {
      // Skip roughly 35% of columns for a clean, spacious look
      if (pseudoRandom() < 0.35) continue;

      const colStartRow = Math.floor(pseudoRandom() * 3);
      const colLength = Math.floor(5 + pseudoRandom() * (numRows - 3));

      for (let r = colStartRow; r < colStartRow + colLength; r++) {
        if (r >= numRows) break;
        if (pseudoRandom() < 0.15) continue; // occasional organic gap inside column

        const char = pseudoRandom() > 0.5 ? "1" : "0";
        const x = c * colSpacing + (colSpacing - fontSize) / 2;
        const y = (r + 1) * rowSpacing;

        const val = pseudoRandom();
        if (val > 0.85) {
          ctx.fillStyle = "rgba(10, 10, 10, 0.75)";
        } else if (val > 0.45) {
          ctx.fillStyle = "rgba(90, 90, 90, 0.35)";
        } else {
          ctx.fillStyle = "rgba(130, 130, 125, 0.22)";
        }

        ctx.fillText(char, x, y);
      }
    }
  }

  window.addEventListener("resize", renderStaticBinaryGrid);
  window.addEventListener("orientationchange", renderStaticBinaryGrid);
  renderStaticBinaryGrid();
})();
