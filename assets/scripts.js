document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");

  if (navToggle && navMenu) {
    const setNavState = (isOpen) => {
      navMenu.classList.toggle("site-nav__links--open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    navToggle.addEventListener("click", () => {
      const willOpen = !navMenu.classList.contains("site-nav__links--open");
      setNavState(willOpen);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setNavState(false));
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        setNavState(false);
      }
    });

    document.addEventListener("click", (event) => {
      if (!navMenu.classList.contains("site-nav__links--open")) return;
      if (
        !navMenu.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        setNavState(false);
      }
    });
  }

  const form = document.querySelector("#contactForm");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const setStatus = (state, message) => {
    if (!status) return;
    status.dataset.state = state;
    status.textContent = message;
    status.hidden = state === "idle";
  };

  setStatus("idle", "");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("pending", "Sending your message...");

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      form.reset();
      setStatus("success", "Thank you! I'll be in touch shortly.");
    } catch (error) {
      setStatus(
        "error",
        "Something went wrong. Please try again or email me at hi@guillermoyoga.com."
      );
    }
  });
});
