// script.js - Interactive features, Carousel Modal, Before-After Slider & FAQs
document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. Mobile Navigation Toggle
    // ----------------------------------------------------
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // ----------------------------------------------------
    // 2. Navbar Scroll Glass Effect
    // ----------------------------------------------------
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 20) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }

    // ----------------------------------------------------
    // 3. GSAP Animations (Fail-safe)
    // ----------------------------------------------------
    if (typeof gsap !== "undefined") {
        try {
            // Navbar entry
            gsap.from(".navbar", {
                y: -40,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            });

            // Hero section animations (Home page)
            if (document.querySelector(".hero-title")) {
                const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
                heroTl.from(".badge", { y: -15, opacity: 0, duration: 0.4 })
                      .from(".hero-title", { y: 25, opacity: 0, duration: 0.6 }, "-=0.2")
                      .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
                      .from(".hero-actions .btn", { scale: 0.9, opacity: 0, stagger: 0.1, duration: 0.4 }, "-=0.2")
                      .from(".stat-card", { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.2")
                      .from(".hero-tooth-stage", { scale: 0.85, opacity: 0, duration: 0.8, ease: "back.out(1.4)" }, "-=0.5");
            }

            // Subpage Hero
            if (document.querySelector(".page-hero")) {
                gsap.from(".page-hero h1", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" });
                gsap.from(".page-hero p", { y: 15, opacity: 0, duration: 0.5, delay: 0.15, ease: "power2.out" });
            }

            // Service Cards
            if (document.querySelectorAll(".service-card").length > 0) {
                gsap.fromTo(".service-card", 
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out", delay: 0.2 }
                );
            }

            // Gallery Cards
            if (document.querySelectorAll(".gallery-card").length > 0) {
                gsap.fromTo(".gallery-card",
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.08, duration: 0.55, ease: "power2.out", delay: 0.2 }
                );
            }

            // Highlight boxes
            if (document.querySelectorAll(".highlight-box").length > 0) {
                gsap.fromTo(".highlight-box",
                    { y: 25, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.12, duration: 0.6, ease: "power2.out", delay: 0.3 }
                );
            }

            // Review Cards
            if (document.querySelectorAll(".review-card").length > 0) {
                gsap.fromTo(".review-card",
                    { y: 25, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: "power2.out", delay: 0.25 }
                );
            }

            // Forms & Contact Cards
            if (document.querySelector(".form-card")) {
                gsap.fromTo(".form-card, .contact-info-card",
                    { y: 25, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: "power2.out", delay: 0.2 }
                );
            }
        } catch (err) {
            console.warn("GSAP animation fallback triggered:", err);
            document.querySelectorAll(".service-card, .gallery-card, .highlight-box, .review-card, .form-card, .contact-info-card").forEach(el => {
                el.style.opacity = "1";
                el.style.transform = "none";
            });
        }
    }

    // ----------------------------------------------------
    // 3.5. Background Free-Floating / Drifting Tooth (Hero Section)
    // ----------------------------------------------------
    const bgDriftingTooth = document.getElementById("bgDriftingTooth");
    const bgToothAura = document.getElementById("bgToothAura");

    if (bgDriftingTooth && typeof gsap !== "undefined") {
        // Wide-roaming perimeter orbit: starts at Center-Right margin,
        // sweeps naturally around the outer edges of the hero banner.
        // x/y are relative offsets from the CSS center-right anchor.
        // Negative x = moves left, Negative y = moves up, Positive y = moves down.
        const driftTl = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } });
        driftTl
            // 1. Gently rise into top-right margin
            .to(bgDriftingTooth, { x: -40,  y: -90,  rotation: 6,  duration: 6 })
            // 2. High top-right corner
            .to(bgDriftingTooth, { x: -100, y: -160, rotation: -6, duration: 7 })
            // 3. Glide across top banner (above title text)
            .to(bgDriftingTooth, { x: -550, y: -170, rotation: 8,  duration: 9 })
            // 4. Descend into left margin (outside text on left)
            .to(bgDriftingTooth, { x: -720, y: -50,  rotation: -7, duration: 8 })
            // 5. Bob in center-left margin (clear of buttons)
            .to(bgDriftingTooth, { x: -750, y: 60,   rotation: 6,  duration: 7 })
            // 6. Drift down to bottom-left (below stats)
            .to(bgDriftingTooth, { x: -580, y: 160,  rotation: -8, duration: 8 })
            // 7. Sweep across bottom perimeter
            .to(bgDriftingTooth, { x: -240, y: 170,  rotation: 7,  duration: 9 })
            // 8. Return back to center-right origin
            .to(bgDriftingTooth, { x: 0,    y: 0,    rotation: 0,  duration: 8 });

        // Click trigger: True HORIZONTAL 360 spin + High-visibility Aura & Sparkle burst
        bgDriftingTooth.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();

            // Horizontal 360° flip (rotationY) with bouncy ease
            gsap.fromTo(bgDriftingTooth,
                { rotationY: 0, scale: 0.95 },
                { 
                    rotationY: 360, 
                    scale: 1.18, 
                    duration: 1.15, 
                    ease: "back.out(2)",
                    onComplete: () => {
                        gsap.to(bgDriftingTooth, { scale: 1, duration: 0.4 });
                    }
                }
            );

            // Vivid high-contrast expanding aura burst (electric cyan to warm gold)
            if (bgToothAura) {
                gsap.fromTo(bgToothAura,
                    { scale: 0.5, opacity: 1 },
                    { scale: 3.2, opacity: 0, duration: 1.25, ease: "power2.out" }
                );
            }

            // High-contrast Golden/Emerald sparkle burst
            gsap.fromTo(".tooth-sparkle",
                { scale: 0, opacity: 0 },
                { 
                    scale: 2.2, 
                    opacity: 1, 
                    stagger: 0.08, 
                    duration: 0.5, 
                    ease: "back.out(2.5)",
                    onComplete: () => {
                        gsap.to(".tooth-sparkle", { scale: 1, opacity: 0.8, duration: 0.4 });
                    }
                }
            );
        });
    }

    // ----------------------------------------------------
    // 3.6. GSAP INTERACTIVE 2: Tooth Shield Defense ScrollTrigger
    // ----------------------------------------------------
    const shieldSection = document.getElementById("shieldSection");
    if (shieldSection && typeof gsap !== "undefined") {
        if (typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            // Set initial hidden states explicitly so they don't pop prematurely
            gsap.set("#shieldToothCore", { scale: 0.1, opacity: 0, rotation: -18 });
            gsap.set(".shield-pulse-ring, .shield-orbit-circle", { scale: 0.1, opacity: 0 });
            gsap.set(".defense-node.node-left", { x: -80, opacity: 0 });
            gsap.set(".defense-node.node-right", { x: 80, opacity: 0 });

            const shieldTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#shieldSection",
                    start: "top 65%", // triggers when user reaches comfortable view
                    toggleActions: "play none none reverse"
                }
            });

            // 1. Center Tooth Bounces in with high impact
            shieldTl.to("#shieldToothCore", {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 1.1,
                ease: "back.out(2)"
            })
            // 2. Rings and orbital planetary circle expand outwards
            .to(".shield-pulse-ring, .shield-orbit-circle", {
                scale: 1,
                opacity: 1,
                duration: 1.0,
                stagger: 0.2,
                ease: "power2.out"
            }, "-=0.6")
            // 3. Left defense pillars slide in smoothly
            .to(".defense-node.node-left", {
                x: 0,
                opacity: 1,
                duration: 0.85,
                stagger: 0.22,
                ease: "power3.out"
            }, "-=0.4")
            // 4. Right defense pillars slide in smoothly
            .to(".defense-node.node-right", {
                x: 0,
                opacity: 1,
                duration: 0.85,
                stagger: 0.22,
                ease: "power3.out"
            }, "-=0.65");
        } else {
            // Fallback if ScrollTrigger script is blocked
            gsap.fromTo("#shieldToothCore, .defense-node",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, delay: 0.3 }
            );
        }
    }

    // ----------------------------------------------------
    // 4. Interactive Before & After Comparison Slider
    // ----------------------------------------------------
    const baComparisons = document.querySelectorAll(".ba-comparison");
    baComparisons.forEach(container => {
        const overlay = container.querySelector(".ba-overlay-before");
        const handle = container.querySelector(".ba-handle");
        const range = container.querySelector(".ba-range-input");
        const beforeImg = overlay ? overlay.querySelector("img") : null;

        function updateSlider(val) {
            if (overlay) overlay.style.width = `${val}%`;
            if (handle) handle.style.left = `${val}%`;
            // Keep inner before-image matched to the container width so it doesn't squish
            if (beforeImg) {
                beforeImg.style.width = `${container.offsetWidth}px`;
            }
        }

        if (range) {
            range.addEventListener("input", (e) => {
                updateSlider(e.target.value);
            });
            // Initial call
            updateSlider(range.value || 50);
        }

        // Keep responsive on resize
        window.addEventListener("resize", () => {
            if (range) updateSlider(range.value || 50);
        });
    });

    // ----------------------------------------------------
    // 5. Interactive FAQ Accordion
    // ----------------------------------------------------
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const questionBtn = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (questionBtn && answer) {
            questionBtn.addEventListener("click", () => {
                const isActive = item.classList.contains("active");

                // Close other open items (Accordion behavior)
                faqItems.forEach(other => {
                    if (other !== item) {
                        other.classList.remove("active");
                        const otherAns = other.querySelector(".faq-answer");
                        if (otherAns) otherAns.style.maxHeight = null;
                    }
                });

                // Toggle current
                if (isActive) {
                    item.classList.remove("active");
                    answer.style.maxHeight = null;
                } else {
                    item.classList.add("active");
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        }
    });

    // ----------------------------------------------------
    // 6. Gallery Carousel Lightbox Modal
    // ----------------------------------------------------
    const galleryData = {
        "reception": {
            title: "Reception & Patient Waiting Lounge",
            desc: "A clean, calm, and soothing reception designed to reduce dental anxiety.",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
                    caption: "Front Desk & Consultation Check-in"
                },
                {
                    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
                    caption: "Comfortable Air-Conditioned Patient Seating"
                },
                {
                    url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
                    caption: "Modern Architectural Clinic Ambience"
                },
                {
                    url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80",
                    caption: "Consultation & Refreshment Zone"
                }
            ]
        },
        "operatory": {
            title: "Ergonomic Treatment Suites",
            desc: "Fully equipped dental operatory with computerized delivery systems.",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
                    caption: "Main Operatory Chair with Overhead Surgical Illumination"
                },
                {
                    url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80",
                    caption: "Dr. Nawaf's Clinical Examination Setup"
                },
                {
                    url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80",
                    caption: "Ergonomic Patient Chair for Maximum Comfort"
                },
                {
                    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
                    caption: "Intraoral Monitor & Chairside Treatment View"
                }
            ]
        },
        "sterilization": {
            title: "Autoclave & Multi-Stage Sterilization",
            desc: "Hospital-grade sterilization protocols following international hygiene guidelines.",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
                    caption: "Class-B Vacuum Autoclave Equipment"
                },
                {
                    url: "https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&w=1200&q=80",
                    caption: "Ultrasonic Cleaning Bath & Disinfection Basin"
                },
                {
                    url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
                    caption: "Vacuum Sealed Pouched Instruments Ready for Use"
                },
                {
                    url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
                    caption: "Daily UV Surface Disinfection System"
                }
            ]
        },
        "radiography": {
            title: "Digital Radiography & Diagnostics",
            desc: "Instant high-definition dental X-rays with minimal radiation exposure.",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
                    caption: "High-Definition Digital RVG Sensor Setup"
                },
                {
                    url: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80",
                    caption: "Chairside Digital Radiograph Review"
                },
                {
                    url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
                    caption: "Digital OPG & Panoramic Examination"
                },
                {
                    url: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1200&q=80",
                    caption: "Computerized Treatment Simulation Screen"
                }
            ]
        },
        "cosmetic": {
            title: "Cosmetic Smile Transformations",
            desc: "Aesthetic porcelain veneers, composite bonding, and teeth whitening results.",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=80",
                    caption: "Complete Smile Makeover & Enamel Polishing"
                },
                {
                    url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
                    caption: "Precision Shade Matching for Natural Teeth"
                },
                {
                    url: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1200&q=80",
                    caption: "Diastema Closure & Porcelain Veneer Application"
                },
                {
                    url: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80",
                    caption: "Post-Whitening Radiant Smile Result"
                }
            ]
        },
        "instruments": {
            title: "Advanced Rotary & Microsurgical Tools",
            desc: "Rotary endodontic motors, apex locators, and ultrasonic instruments.",
            images: [
                {
                    url: "https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&w=1200&q=80",
                    caption: "Rotary Endodontic Motor & Root Canal Files"
                },
                {
                    url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
                    caption: "Ultrasonic Scaler & Periodontal Tips"
                },
                {
                    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
                    caption: "Dental Implant Surgical Torque Driver"
                },
                {
                    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
                    caption: "Curing Light & Aesthetic Composite Kit"
                }
            ]
        }
    };

    const carouselModal = document.getElementById("carouselModal");
    const carouselImg = document.getElementById("carouselImg");
    const carouselCaption = document.getElementById("carouselCaption");
    const carouselTitle = document.getElementById("carouselTitle");
    const carouselCounter = document.getElementById("carouselCounter");
    const carouselDots = document.getElementById("carouselDots");
    const carouselPrev = document.getElementById("carouselPrev");
    const carouselNext = document.getElementById("carouselNext");
    const carouselClose = document.getElementById("carouselClose");

    let currentCategory = null;
    let currentSlideIndex = 0;

    function renderSlide(index) {
        if (!currentCategory || !galleryData[currentCategory]) return;
        const items = galleryData[currentCategory].images;
        
        if (index < 0) currentSlideIndex = items.length - 1;
        else if (index >= items.length) currentSlideIndex = 0;
        else currentSlideIndex = index;

        const currentItem = items[currentSlideIndex];

        if (typeof gsap !== "undefined" && carouselImg) {
            gsap.fromTo(carouselImg, { opacity: 0.4, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.3 });
        }

        if (carouselImg) {
            carouselImg.src = currentItem.url;
            carouselImg.alt = currentItem.caption;
        }
        if (carouselCaption) carouselCaption.textContent = currentItem.caption;
        if (carouselCounter) carouselCounter.textContent = `${currentSlideIndex + 1} / ${items.length}`;

        if (carouselDots) {
            const dots = carouselDots.querySelectorAll(".carousel-dot");
            dots.forEach((dot, idx) => {
                dot.classList.toggle("active", idx === currentSlideIndex);
            });
        }
    }

    function openCarousel(categoryKey) {
        const data = galleryData[categoryKey];
        if (!data || !carouselModal) return;

        currentCategory = categoryKey;
        currentSlideIndex = 0;

        if (carouselTitle) carouselTitle.textContent = data.title;

        if (carouselDots) {
            carouselDots.innerHTML = "";
            data.images.forEach((_, idx) => {
                const dot = document.createElement("button");
                dot.classList.add("carousel-dot");
                dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
                dot.addEventListener("click", () => renderSlide(idx));
                carouselDots.appendChild(dot);
            });
        }

        renderSlide(0);

        carouselModal.classList.add("open");
        document.body.style.overflow = "hidden";

        if (typeof gsap !== "undefined") {
            gsap.fromTo(".carousel-box", 
                { scale: 0.9, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }
            );
        }
    }

    function closeCarousel() {
        if (!carouselModal) return;
        carouselModal.classList.remove("open");
        document.body.style.overflow = "";
    }

    document.querySelectorAll(".gallery-card[data-category]").forEach(card => {
        card.addEventListener("click", () => {
            const cat = card.getAttribute("data-category");
            openCarousel(cat);
        });
    });

    if (carouselPrev) carouselPrev.addEventListener("click", () => renderSlide(currentSlideIndex - 1));
    if (carouselNext) carouselNext.addEventListener("click", () => renderSlide(currentSlideIndex + 1));
    if (carouselClose) carouselClose.addEventListener("click", closeCarousel);

    if (carouselModal) {
        carouselModal.addEventListener("click", (e) => {
            if (e.target === carouselModal) closeCarousel();
        });
    }

    window.addEventListener("keydown", (e) => {
        if (!carouselModal || !carouselModal.classList.contains("open")) return;
        if (e.key === "Escape") closeCarousel();
        if (e.key === "ArrowLeft") renderSlide(currentSlideIndex - 1);
        if (e.key === "ArrowRight") renderSlide(currentSlideIndex + 1);
    });

    // ----------------------------------------------------
    // 7. Contact Form Handler (LocalStorage + WhatsApp Option)
    // ----------------------------------------------------
    const contactForm = document.getElementById("contactForm");
    const contactSuccessMsg = document.getElementById("contactSuccessMsg");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("contactName").value.trim();
            const phone = document.getElementById("contactPhone").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const message = document.getElementById("contactMessage").value.trim();

            const entry = {
                id: Date.now(),
                timestamp: new Date().toLocaleString(),
                name,
                phone,
                email,
                message
            };

            try {
                const existing = JSON.parse(localStorage.getItem("clinic_contact_submissions") || "[]");
                existing.unshift(entry);
                localStorage.setItem("clinic_contact_submissions", JSON.stringify(existing));
            } catch (err) {
                console.error("Storage error:", err);
            }

            let waMsg = `*New Inquiry - Dr Nawaf's Dental Clinic*\n\n`;
            waMsg += `\u{1F464} *Name:* ${name}\n`;
            waMsg += `\u{1F4DE} *Phone:* ${phone}\n`;
            if (email) waMsg += `\u{2709}\u{FE0F} *Email:* ${email}\n`;
            waMsg += `\u{1F4AC} *Message:* ${message}`;

            const waUrl = `https://wa.me/918108736216?text=${encodeURIComponent(waMsg)}`;

            if (contactSuccessMsg) {
                contactSuccessMsg.style.display = "block";
            }
            const waButton = document.getElementById("waContactBtn");
            if (waButton) {
                waButton.href = waUrl;
                waButton.style.display = "inline-flex";
            }

            contactForm.reset();

            // Direct WhatsApp launch with prefilled message
            window.open(waUrl, "_blank");
        });
    }

    // ----------------------------------------------------
    // 8. Appointment Form Handler (LocalStorage + Direct WhatsApp Booking)
    // ----------------------------------------------------
    const appointmentForm = document.getElementById("appointmentForm");
    const appointmentSuccessMsg = document.getElementById("appointmentSuccessMsg");

    if (appointmentForm) {
        appointmentForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("pName").value.trim();
            const phone = document.getElementById("pPhone").value.trim();
            const email = document.getElementById("pEmail") ? document.getElementById("pEmail").value.trim() : "";
            const date = document.getElementById("pDate").value;
            const timeSlot = document.getElementById("pTime").value;
            const service = document.getElementById("serviceType").value;
            const notes = document.getElementById("notes") ? document.getElementById("notes").value.trim() : "";

            const booking = {
                id: Date.now(),
                timestamp: new Date().toLocaleString(),
                patientName: name,
                patientPhone: phone,
                email,
                appointmentDate: date,
                timeSlot,
                service,
                notes
            };

            try {
                const existingBookings = JSON.parse(localStorage.getItem("clinic_appointment_bookings") || "[]");
                existingBookings.unshift(booking);
                localStorage.setItem("clinic_appointment_bookings", JSON.stringify(existingBookings));
            } catch (err) {
                console.error("Storage error:", err);
            }

            let waMsg = `*New Appointment Request - Dr Nawaf's Dental Clinic*\n\n`;
            waMsg += `\u{1F464} *Patient Name:* ${name}\n`;
            waMsg += `\u{1F4DE} *Phone:* ${phone}\n`;
            if (email) waMsg += `\u{2709}\u{FE0F} *Email:* ${email}\n`;
            waMsg += `\u{1F4C5} *Date:* ${date}\n`;
            waMsg += `\u{23F0} *Time Slot:* ${timeSlot}\n`;
            waMsg += `\u{1F9B7} *Treatment:* ${service}\n`;
            if (notes) waMsg += `\u{1F4DD} *Notes/Symptoms:* ${notes}`;

            const waUrl = `https://wa.me/918108736216?text=${encodeURIComponent(waMsg)}`;

            if (appointmentSuccessMsg) {
                appointmentSuccessMsg.style.display = "block";
            }
            const waApptBtn = document.getElementById("waApptBtn");
            if (waApptBtn) {
                waApptBtn.href = waUrl;
                waApptBtn.style.display = "inline-flex";
            }

            appointmentForm.reset();

            // Direct WhatsApp launch with prefilled message
            window.open(waUrl, "_blank");
        });
    }
});
