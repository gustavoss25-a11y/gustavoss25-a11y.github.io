(() => {
  "use strict";

  // ---------- Menu mobile ----------
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }

  // ---------- Modal de acesso ----------
  const overlay = document.getElementById("modalOverlay");
  const modal = document.getElementById("modal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalSub = document.getElementById("modalSub");
  const accessForm = document.getElementById("accessForm");
  const modalSuccess = document.getElementById("modalSuccess");
  const openTriggers = document.querySelectorAll("[data-open-modal]");

  const openModal = (isDemo) => {
    if (!overlay) return;

    modal.classList.remove("success");
    accessForm.reset();
    modalSuccess.classList.remove("show");

    if (isDemo) {
      modalTitle.textContent = "Agendar demonstração";
      modalSub.textContent = "Conte um pouco sobre o time e agendamos uma demonstração do piloto.";
    } else {
      modalTitle.textContent = "Solicitar acesso";
      modalSub.textContent = "Preencha os dados abaixo e o time da Nifrep libera sua credencial nominal.";
    }

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  openTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(trigger.hasAttribute("data-demo"));
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (overlay) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeModal();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay?.classList.contains("open")) {
      closeModal();
    }
  });

  if (accessForm) {
    accessForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // Protótipo estático: não há backend. A confirmação abaixo simula o envio
      // para validar o fluxo visual antes de existir uma integração real.
      modal.classList.add("success");
      modalSuccess.classList.add("show");
    });
  }

  // ---------- Sombra na barra ao rolar ----------
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 8 ? "0 8px 24px -18px rgba(0,0,0,0.5)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
