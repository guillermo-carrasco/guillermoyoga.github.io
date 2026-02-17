document.addEventListener("DOMContentLoaded", () => {
  // Classes filtering
  const filtersContainer = document.querySelector("[data-classes-filters]");
  const classesList = document.querySelector("[data-classes-list]");
  const emptyState = document.querySelector("[data-classes-empty]");

  if (filtersContainer && classesList) {
    const activeFilters = { level: "all", duration: "all" };

    const applyFilters = () => {
      const cards = classesList.querySelectorAll(".class-card");
      let visibleCount = 0;

      cards.forEach((card) => {
        const levelMatch =
          activeFilters.level === "all" ||
          card.dataset.level === activeFilters.level;
        const durationMatch =
          activeFilters.duration === "all" ||
          card.dataset.duration === activeFilters.duration;

        const isVisible = levelMatch && durationMatch;
        card.hidden = !isVisible;
        if (isVisible) visibleCount++;
      });

      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
      }
    };

    const setActiveButton = (filterType, value) => {
      const buttons = filtersContainer.querySelectorAll(
        `[data-filter="${filterType}"]`
      );
      buttons.forEach((btn) => {
        btn.classList.toggle("filter-btn--active", btn.dataset.value === value);
      });
    };

    const handleFilter = (filterType, value) => {
      activeFilters[filterType] = value;
      setActiveButton(filterType, value);
      applyFilters();
    };

    // Filter buttons in the filter bar
    filtersContainer.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      handleFilter(btn.dataset.filter, btn.dataset.value);
    });

    // Clickable badges on cards
    classesList.addEventListener("click", (e) => {
      const badge = e.target.closest("[data-filter-click]");
      if (!badge) return;
      handleFilter(badge.dataset.filterClick, badge.dataset.value);
      // Scroll to filters
      filtersContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

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
