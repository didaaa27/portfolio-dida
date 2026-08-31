/**
 * DIDA.DEV - Main Interactive Script
 */

document.addEventListener("DOMContentLoaded", () => {
    /* =========================================================
       1. SPLASH SCREEN & MATRIX CANVAS ANIMATION
    ========================================================= */
    const splashScreen = document.getElementById("splash-screen");
    const startBtn = document.getElementById("start-btn");
    const canvas = document.getElementById("splash-tech-bg");

    if (canvas && splashScreen) {
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const chars = "01010101ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[];:=+*#";
        const fontSize = 14;
        let columns = Math.floor(canvas.width / fontSize);
        let drops = Array(columns).fill(1);

        const drawMatrix = () => {
            ctx.fillStyle = "rgba(8, 9, 10, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#ccff00";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
            animationFrameId = requestAnimationFrame(drawMatrix);
        };
        drawMatrix();

        // Typewriter Effect
        const words = ["Junior Software Engineer", "Information Technology Graduate", "Web Developer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typewriterEl = document.getElementById("typewriter");

        const typeEffect = () => {
            if (!typewriterEl) return;
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1800; // Jeda sebelum menghapus
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400;
            }

            setTimeout(typeEffect, typeSpeed);
        };
        typeEffect();

        // Dismiss Splash Screen
        const dismissSplash = () => {
            splashScreen.classList.add("hidden");
            cancelAnimationFrame(animationFrameId);
        };

        if (startBtn) {
            startBtn.addEventListener("click", dismissSplash);
        }
    }

    /* =========================================================
       2. HERO PHOTO 3D TILT EFFECT
    ========================================================= */
    const heroContainer = document.querySelector(".hero-image-container");

    if (heroContainer) {
        heroContainer.addEventListener("mousemove", (e) => {
            const rect = heroContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            heroContainer.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        heroContainer.addEventListener("mouseleave", () => {
            heroContainer.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    }

    /* =========================================================
       3. MOBILE MENU TOGGLE
    ========================================================= */
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            const isActive = menuToggle.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", isActive);
        });

        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                mobileMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* =========================================================
       4. NAVBAR SCROLL SPY
    ========================================================= */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const scrollSpy = () => {
        const scrollY = window.pageYOffset;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };
    window.addEventListener("scroll", scrollSpy);

    /* =========================================================
       5. UNIVERSAL MODAL CONTROLLER (BNSP & PROJECTS)
    ========================================================= */
    const bnspBtn = document.getElementById("view-bnsp");
    const bnspModal = document.getElementById("certificate-modal");
    const bnspCloseBtn = document.getElementById("certificate-modal-close");
    const bnspOverlay = document.querySelector(".certificate-modal-overlay");

    const openModal = (modal) => {
        if (!modal) return;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // Kunci scroll latar
    };

    const closeModal = (modal) => {
        if (!modal) return;
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    if (bnspBtn && bnspModal) {
        bnspBtn.addEventListener("click", () => openModal(bnspModal));
    }
    if (bnspCloseBtn && bnspModal) {
        bnspCloseBtn.addEventListener("click", () => closeModal(bnspModal));
    }
    if (bnspOverlay && bnspModal) {
        bnspOverlay.addEventListener("click", () => closeModal(bnspModal));
    }

    // Dukungan Esc Key untuk menutup modal
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const activeModal = document.querySelector(".certificate-modal.active, .custom-modal.active");
            if (activeModal) closeModal(activeModal);
        }
    });

    // Helper Global untuk pemanggilan modal onclick di HTML
    window.openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) openModal(modal);
    };

    window.closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) closeModal(modal);
    };
});