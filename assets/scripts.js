document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");

  if (navToggle && navMenu) {
    const setNavState = (isOpen) => {
      navMenu.classList.toggle("site-nav__links--open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    const closeNav = (restoreFocus = false) => {
      const wasOpen = navMenu.classList.contains("site-nav__links--open");
      setNavState(false);
      if (wasOpen && restoreFocus) navToggle.focus();
    };

    navToggle.addEventListener("click", () => {
      const willOpen = !navMenu.classList.contains("site-nav__links--open");
      setNavState(willOpen);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeNav());
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        navMenu.classList.contains("site-nav__links--open")
      ) {
        event.preventDefault();
        closeNav(true);
      }
    });

    document.addEventListener("click", (event) => {
      if (!navMenu.classList.contains("site-nav__links--open")) return;
      if (
        !navMenu.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        closeNav();
      }
    });
  }

  const form = document.querySelector("#contactForm");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const submitButton = form.querySelector('button[type="submit"]');
  let isSubmitting = false;

  const setStatus = (state, message) => {
    if (!status) return;
    status.dataset.state = state;
    status.textContent = message;
    status.hidden = state === "idle";
  };

  setStatus("idle", "");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    isSubmitting = true;
    form.setAttribute("aria-busy", "true");
    if (submitButton) submitButton.disabled = true;
    setStatus("pending", "Sending your message...");

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      form.reset();
      setStatus("success", "Thank you! I'll be in touch shortly.");
    } catch (error) {
      const message =
        error.name === "AbortError"
          ? "Sending took too long. Please try again or email me at hi@guillermoyoga.com."
          : "Something went wrong. Please try again or email me at hi@guillermoyoga.com.";
      setStatus(
        "error",
        message
      );
    } finally {
      window.clearTimeout(timeoutId);
      isSubmitting = false;
      form.removeAttribute("aria-busy");
      if (submitButton) submitButton.disabled = false;
    }
  });
});
