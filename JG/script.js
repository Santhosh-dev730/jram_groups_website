if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}
// window.addEventListener("scroll", function(){
//     const navbar = document.querySelector(".navbar");
//     if(window.scrollY > 50){
//         navbar.classList.add("scrolled");
//     }else{
//         navbar.classList.remove("scrolled");
//     }
// });


const toggler = document.querySelector(".custom-toggler");
toggler.addEventListener("click", function () {
    this.classList.toggle("active");
});



const scards = document.querySelectorAll(".service-card");

const sobserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("show");
            }, index * 150);
        }
    });
}, { threshold: 0.2 });

scards.forEach(card => sobserver.observe(card));


scards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * -10;

        card.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });

});


const footerCols = document.querySelectorAll(".footer-col");

const observerd = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("show");
            }, index * 200);
        }
    });
}, { threshold: 0.2 });

footerCols.forEach(col => observerd.observe(col));




const slider = document.getElementById("slider");
if (slider) {
    const cards = slider.querySelectorAll(".card");
    let order = [...cards];

    function updateCards() {
        order.forEach((card, index) => {
            let offset = index * 20;
            let scale = 1 - index * 0.1;
            card.style.zIndex = order.length - index;
            card.style.transform = `translateX(${-offset}px) scale(${scale})`;
            card.style.opacity = 1 - index * 0.15;
        });
    }

    updateCards();

    /* DRAG SLIDER */
    let startX = 0;
    let isDragging = false;

    slider.addEventListener("mousedown", e => {
        isDragging = true;
        startX = e.clientX;
    });

    slider.addEventListener("mousemove", e => {
        if (!isDragging) return;
        let diff = e.clientX - startX;
        order[0].style.transform = `translateX(${diff}px) rotate(${diff / 10}deg)`;
    });

    slider.addEventListener("mouseup", e => {
        isDragging = false;
        let diff = e.clientX - startX;
        if (diff < -80) {
            let first = order.shift();
            order.push(first);
        }
        updateCards();
    });

    /* TOUCH SUPPORT */
    slider.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", e => {
        let end = e.changedTouches[0].clientX;
        let diff = end - startX;
        if (diff < -80) {
            let first = order.shift();
            order.push(first);
        }
        updateCards();
    });

    const listItems = document.querySelectorAll("#itemList li");
    listItems.forEach(item => {
        item.addEventListener("click", () => {
            let slideIndex = parseInt(item.getAttribute("data-slide"));
            let selectedCard = order.find(card =>
                card.textContent == (slideIndex + 1)
            );
            order = order.filter(card => card !== selectedCard);
            order.unshift(selectedCard);
            updateCards();
        });
    });
}


const section = document.getElementById("progressSection");
const fill = document.querySelector(".progress-fill");

if (section && fill) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fill.style.width = "100%"; // progress end position (same as image)
                observer.unobserve(section);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(section);
}

const words = ["Websites", "Mobile Apps", "AI Systems", "Dashboards"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const textElement = document.getElementById("text");

function typeEffect() {
    if (!textElement) return;

    let currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    textElement.textContent = currentWord.substring(0, charIndex);

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1500; // pause after typing
        isDeleting = true;
    }
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 500; // pause before next word
    }

    setTimeout(typeEffect, speed);
}

if (textElement) {
    typeEffect();
}



const about = document.getElementById("aboutParallax");
const galleryCard = document.querySelector(".about-gallery-card");
const glassBg = document.querySelector(".glass-bg");

if (about) {
    about.addEventListener("mousemove", (e) => {
        const rect = about.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) / 25;
        const moveY = (y - centerY) / 25;

        if (galleryCard) galleryCard.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.01)`;
        if (glassBg) glassBg.style.transform = `translate(${moveX / 2}px, ${moveY / 2}px)`;
    });

    about.addEventListener("mouseleave", () => {
        if (galleryCard) galleryCard.style.transform = "translate(0px, 0px) scale(1)";
        if (glassBg) glassBg.style.transform = "translate(0px, 0px)";
    });
}

// About Us Vertical Scroll Gallery Auto-Scroll (Step Rotation)
const aboutScrollContainer = document.querySelector(".about-scroll-container");
if (aboutScrollContainer) {
    const images = aboutScrollContainer.querySelectorAll(".about-scroll-img");
    const imgHeight = 300;
    const gap = 16;
    const totalImages = images.length;
    let activeIdx = 0;
    let isHovered = false;

    function updateActiveImage() {
        const scrollPos = aboutScrollContainer.scrollTop;
        const unit = imgHeight + gap;
        const currentActiveIdx = Math.max(0, Math.min(totalImages - 1, Math.round(scrollPos / unit)));
        
        images.forEach((img, idx) => {
            if (idx === currentActiveIdx) {
                img.classList.add("active");
            } else {
                img.classList.remove("active");
            }
        });
        
        activeIdx = currentActiveIdx;
    }

    function scrollNext() {
        if (isHovered) return;
        activeIdx = (activeIdx + 1) % totalImages;
        const targetScrollTop = activeIdx * (imgHeight + gap);
        aboutScrollContainer.scrollTo({
            top: targetScrollTop,
            behavior: "smooth"
        });
    }

    aboutScrollContainer.addEventListener("scroll", updateActiveImage);
    updateActiveImage();

    let intervalId = setInterval(scrollNext, 3000);

    aboutScrollContainer.addEventListener("mouseenter", () => {
        isHovered = true;
        clearInterval(intervalId);
    });

    aboutScrollContainer.addEventListener("mouseleave", () => {
        isHovered = false;
        intervalId = setInterval(scrollNext, 3000);
    });
}



// Testimonial Card Interactivity (Tilt Effect)
const tCards = document.querySelectorAll(".testimonial-card-premium");

tCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * -10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)`;
    });
});

const backToTop = document.getElementById("backToTop");
const aboutSection = document.getElementById("about");

window.addEventListener("scroll", () => {
    if (aboutSection) {
        const aboutTop = aboutSection.offsetTop;
        if (window.scrollY > aboutTop) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }
});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


window.addEventListener("load", () => {
    if (document.querySelector(".progress-fill")) {
        document.querySelector(".progress-fill").style.width = "100%";
    }
});

// --- INTERACTIVE DOT CANVAS ---
const canvas = document.getElementById("dotCanvas");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let width, height;
    let dots = [];

    // Configuration
    const dotSpacing = 25; // Distance between dots
    const dotRadius = 1.2; // Base radius
    const interactionRadius = 100; // REDUCED: How far mouse affects dots
    const maxRepel = 20; // REDUCED: Max distance dot is pushed away
    const returnSpeed = 0.15; // Speed of returning to original position

    let mouse = { x: -1000, y: -1000 };

    function initCanvas() {
        width = canvas.parentElement.offsetWidth;
        height = canvas.parentElement.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        dots = [];
        // Create grid of dots
        for (let x = 0; x < width; x += dotSpacing) {
            for (let y = 0; y < height; y += dotSpacing) {
                dots.push({
                    x: x,
                    y: y,
                    baseX: x,
                    baseY: y,
                    size: dotRadius
                });
            }
        }
    }

    function animateDots() {
        ctx.clearRect(0, 0, width, height);

        dots.forEach(dot => {
            let dx = mouse.x - dot.baseX;
            let dy = mouse.y - dot.baseY;
            let distance = Math.sqrt(dx * dx + dy * dy);

            let targetX = dot.baseX;
            let targetY = dot.baseY;
            let targetSize = dotRadius;
            let isDistorted = false;

            if (distance < interactionRadius) {
                // Calculate push away
                let force = (interactionRadius - distance) / interactionRadius;
                let angle = Math.atan2(dy, dx);

                targetX -= Math.cos(angle) * force * maxRepel;
                targetY -= Math.sin(angle) * force * maxRepel;
                targetSize = dotRadius + (force * 1); // Increase size slightly
                isDistorted = true;
            }

            // Lerp towards target position
            dot.x += (targetX - dot.x) * returnSpeed;
            dot.y += (targetY - dot.y) * returnSpeed;
            dot.size += (targetSize - dot.size) * returnSpeed;

            // Dynamic color based on distortion
            if (isDistorted) {
                ctx.fillStyle = "#2563eb"; // Darker, vivid blue when distorted
            } else {
                ctx.fillStyle = "rgba(37, 99, 235, 0.4)"; // Soft blue normally
            }

            // Draw dot
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, Math.max(0.1, dot.size), 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animateDots);
    }

    // Event listeners
    window.addEventListener("resize", initCanvas);

    const heroSection = canvas.parentElement;

    heroSection.addEventListener("mousemove", (e) => {
        const rect = heroSection.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    heroSection.addEventListener("mouseleave", () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    heroSection.addEventListener("touchmove", (e) => {
        if (e.touches.length > 0) {
            const rect = heroSection.getBoundingClientRect();
            mouse.x = e.touches[0].clientX - rect.left;
            mouse.y = e.touches[0].clientY - rect.top;
        }
    });

    heroSection.addEventListener("touchend", () => {
        mouse.x = -1000;
        mouse.y = -1000;
    });

    initCanvas();
    animateDots();

    // ==========================================
    // AUTO-MORPHING DEVICE SHOWCASE
    // ==========================================
    const deviceAssembly = document.querySelector(".macbook-straight-assembly");
    if (deviceAssembly) {
        const states = ["state-laptop", "state-tablet", "state-mobile"];
        let currentStateIndex = 0;

        // Make sure it starts in laptop state
        deviceAssembly.classList.add(states[currentStateIndex]);

        setInterval(() => {
            // Remove previous state
            deviceAssembly.classList.remove(states[currentStateIndex]);

            // Advance to next state
            currentStateIndex = (currentStateIndex + 1) % states.length;

            // Add new state
            deviceAssembly.classList.add(states[currentStateIndex]);
        }, 4000); // Morph every 4 seconds
    }
}

// ==========================================
// SCALING SECTION COUNTER ANIMATION
// ==========================================
const counterValues = document.querySelectorAll('.counter-value');
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    entry.target.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    entry.target.innerText = target;
                }
            };

            updateCount();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counterValues.forEach(counter => {
    counterObserver.observe(counter);
});

// ==========================================
// WHAT WE DO: ROTATING UPDATES CARDS ANIMATION
// ==========================================
function rotateUpdatesCards() {
    const container = document.querySelector(".updates-cards-container");
    if (!container) return;
    const cards = container.querySelectorAll(".updates-notification-card");
    if (cards.length < 3) return;

    let activeCard, secondCard, thirdCard;
    cards.forEach(card => {
        if (card.classList.contains("active")) activeCard = card;
        else if (card.classList.contains("second")) secondCard = card;
        else if (card.classList.contains("third")) thirdCard = card;
    });

    if (activeCard && secondCard && thirdCard) {
        activeCard.classList.remove("active");
        activeCard.classList.add("third");

        secondCard.classList.remove("second");
        secondCard.classList.add("active");

        thirdCard.classList.remove("third");
        thirdCard.classList.add("second");
    }
}

setInterval(rotateUpdatesCards, 3000);

// ==========================================
// WHAT WE DO: TYPING SEARCH ANIMATION
// ==========================================
const searchSpan = document.getElementById('typingSearchText');
const suggestBox = document.querySelector('.google-suggest-box');
const suggestTitle = document.getElementById('suggestTitle');
if (searchSpan && suggestBox) {
    const searchPhrases = [
        "best website creation",
        "best mobile app creation",
        "best UI/UX Designing",
        "Best Digital Marketing"
    ];
    let phraseIndex = 0;
    let searchIndex = 0;
    let isDeletingSearch = false;

    function typeSearch() {
        const fullText = searchPhrases[phraseIndex];

        if (!isDeletingSearch && searchIndex <= fullText.length) {
            searchSpan.textContent = fullText.substring(0, searchIndex);
            searchIndex++;
            if (searchIndex > fullText.length) {
                // Done typing, show suggest box
                suggestBox.classList.add('show');
                if (suggestTitle) suggestTitle.textContent = "JRAM GROUPS";
                setTimeout(() => {
                    isDeletingSearch = true;
                    typeSearch();
                }, 3000);
            } else {
                setTimeout(typeSearch, Math.random() * 50 + 50); // random typing speed
            }
        } else if (isDeletingSearch && searchIndex >= 0) {
            suggestBox.classList.remove('show');
            searchSpan.textContent = fullText.substring(0, searchIndex);
            searchIndex--;
            if (searchIndex === 0) {
                isDeletingSearch = false;
                phraseIndex = (phraseIndex + 1) % searchPhrases.length;
                setTimeout(typeSearch, 1000);
            } else {
                setTimeout(typeSearch, 30);
            }
        }
    }

    // Start typing after a short delay
    setTimeout(typeSearch, 1000);
}

// ==========================================
// WHAT WE DO: GEMINI SVG ANIMATION
// ==========================================
const geminiPaths = document.querySelectorAll(".gemini-animated");
if (geminiPaths.length > 0) {
    geminiPaths.forEach((path, index) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        function animateLine() {
            path.style.transition = "none";
            path.style.strokeDashoffset = length;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    path.style.transition = "stroke-dashoffset 3s ease-in-out";
                    path.style.strokeDashoffset = 0;
                });
            });
        }

        setTimeout(() => {
            animateLine();
            setInterval(animateLine, 4500);
        }, index * 400);
    });
}

// ==========================================
// SERVICES SECTION MOCKUP INTERACTIONS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // --- WEBSITE DEVELOPMENT MULTI-TAB PLAYGROUND ---
    const tabButtons = document.querySelectorAll(".mockup-tab-btn");
    const tabPanes = {
        requirements: document.getElementById("mockupTabContentSitemap"),
        wireframe: document.getElementById("mockupTabContentWireframe"),
        style: document.getElementById("mockupTabContentStyle")
    };
    const mockupBody = document.getElementById("interactiveMockupBody");
    const guestCursor = document.getElementById("guestCursor");
    if (guestCursor) guestCursor.style.opacity = "0"; // Start hidden by default

    // Tab Switching Logic
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab");
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            Object.keys(tabPanes).forEach(paneKey => {
                if (tabPanes[paneKey]) {
                    if (paneKey === targetTab) {
                        tabPanes[paneKey].style.display = "block";
                    } else {
                        tabPanes[paneKey].style.display = "none";
                    }
                }
            });
        });
    });




    // --- TAB 1: SITEMAP BUILDER INTERACTIONS ---
    const sitemapInputText = document.getElementById("sitemapInputText");
    const presetPills = document.querySelectorAll(".preset-pill");
    const btnGenerateSitemap = document.getElementById("btnGenerateSitemap");
    const sitemapLoading = document.getElementById("sitemapLoading");
    const reqState = document.getElementById("reqState");
    const sitemapState = document.getElementById("sitemapState");
    const sitemapBranches = document.getElementById("sitemapBranches");

    // Preset pills click
    presetPills.forEach(pill => {
        pill.addEventListener("click", () => {
            presetPills.forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            if (sitemapInputText) {
                sitemapInputText.value = pill.getAttribute("data-desc");
            }
        });
    });

    // Generate Sitemap Action
    if (btnGenerateSitemap && sitemapLoading && reqState && sitemapState) {
        btnGenerateSitemap.addEventListener("click", () => {
            reqState.style.display = "none";
            sitemapLoading.classList.remove("d-none");
            sitemapLoading.classList.add("d-flex");

            // Simulate AI Generating Sitemap
            setTimeout(() => {
                sitemapLoading.classList.remove("d-flex");
                sitemapLoading.classList.add("d-none");
                sitemapState.style.display = "block";

                // Animate nodes entry
                const cols = sitemapBranches.querySelectorAll(".sitemap-branch-col");
                cols.forEach((col, idx) => {
                    col.style.opacity = "0";
                    col.style.transform = "translateY(15px)";
                    setTimeout(() => {
                        col.style.opacity = "1";
                        col.style.transform = "translateY(0)";
                    }, idx * 200);
                });
            }, 1500);
        });
    }

    // Interactive Sitemap Nodes Event Bindings
    function bindNodeEvents(nodeElement) {
        // Select Node
        nodeElement.addEventListener("click", (e) => {
            if (e.target.closest("button")) return; // skip if clicked add/delete button
            document.querySelectorAll(".sitemap-node-item").forEach(item => item.classList.remove("selected"));
            nodeElement.classList.add("selected");
        });

        // Double-click to edit text
        const textSpan = nodeElement.querySelector(".node-text");
        if (textSpan) {
            textSpan.addEventListener("dblclick", function () {
                const currentText = textSpan.innerText;
                const input = document.createElement("input");
                input.type = "text";
                input.className = "sitemap-node-input";
                input.value = currentText;

                textSpan.replaceWith(input);
                input.focus();
                input.select();

                function saveRename() {
                    const newText = input.value.trim() || currentText;
                    textSpan.innerText = newText;
                    input.replaceWith(textSpan);
                }

                input.addEventListener("blur", saveRename);
                input.addEventListener("keydown", (event) => {
                    if (event.key === "Enter") saveRename();
                });
            });
        }

        // Add node button
        const addBtn = nodeElement.querySelector(".add-node-btn");
        if (addBtn) {
            addBtn.addEventListener("click", () => {
                const newBranchId = "branch_" + Date.now();
                const newCol = document.createElement("div");
                newCol.className = "sitemap-branch-col text-center d-flex flex-column align-items-center gap-2";
                newCol.setAttribute("data-branch-id", newBranchId);
                newCol.innerHTML = `
                    <div class="sitemap-node-item py-1 px-2 bg-light border rounded fw-bold text-dark d-inline-flex align-items-center gap-2" style="font-size:0.65rem;" data-node-id="${newBranchId}">
                        <span class="node-text">New Page</span>
                        <button class="delete-node-btn border-0 bg-transparent text-danger p-0 lh-1" title="Delete" style="font-size:0.75rem;"><i class="fa-solid fa-circle-xmark"></i></button>
                    </div>
                `;
                sitemapBranches.appendChild(newCol);

                // Bind events to new node
                const newNodeItem = newCol.querySelector(".sitemap-node-item");
                bindNodeEvents(newNodeItem);

                // Animate entry
                newCol.style.opacity = "0";
                newCol.style.transform = "translateY(10px)";
                setTimeout(() => {
                    newCol.style.opacity = "1";
                    newCol.style.transform = "translateY(0)";
                }, 50);
            });
        }

        // Delete node button
        const deleteBtn = nodeElement.querySelector(".delete-node-btn");
        if (deleteBtn) {
            deleteBtn.addEventListener("click", () => {
                const branchCol = nodeElement.closest(".sitemap-branch-col");
                if (branchCol) {
                    branchCol.style.opacity = "0";
                    branchCol.style.transform = "translateY(10px)";
                    setTimeout(() => {
                        branchCol.remove();
                    }, 300);
                }
            });
        }
    }

    // Bind initial sitemap nodes
    document.querySelectorAll(".sitemap-node-item").forEach(node => {
        bindNodeEvents(node);
    });

    // --- TAB 2: HOMEPAGE WIREFRAME INTERACTIONS (Two-Panel Figma Layout) ---
    const btnWfDesktop = document.getElementById("btnWfDesktop");
    const btnWfMobile = document.getElementById("btnWfMobile");
    const wfLeftPanel = document.getElementById("wfLeftPanel");
    const wfRightPanel = document.getElementById("wfRightPanel");
    const wfCanvasPanels = document.getElementById("wfCanvasPanels");
    const wfHeroSection = document.getElementById("wfHeroSection");
    const wfFeaturesSection = document.getElementById("wfFeaturesSection");
    const wireframeTab = document.getElementById("mockupTabContentWireframe");
    const guestCursorWf = document.getElementById("guestCursor");

    // Device toggle: Desktop = show left panel only, Mobile = show right panel only
    function setWfDesktopView() {
        // Style buttons
        btnWfDesktop.style.background = "#6248ff";
        btnWfDesktop.style.color = "#fff";
        btnWfDesktop.style.borderColor = "#6248ff";
        btnWfMobile.style.background = "#fff";
        btnWfMobile.style.color = "#64748b";
        btnWfMobile.style.borderColor = "#e2e8f0";
        // Show left (desktop), hide right (mobile)
        if (wfLeftPanel) {
            wfLeftPanel.style.display = "block";
            wfLeftPanel.style.width = "100%";
            wfLeftPanel.style.flex = "1 1 100%";
        }
        if (wfRightPanel) {
            wfRightPanel.style.display = "none";
        }
    }

    function setWfMobileView() {
        // Style buttons
        btnWfMobile.style.background = "#6248ff";
        btnWfMobile.style.color = "#fff";
        btnWfMobile.style.borderColor = "#6248ff";
        btnWfDesktop.style.background = "#fff";
        btnWfDesktop.style.color = "#64748b";
        btnWfDesktop.style.borderColor = "#e2e8f0";
        // Hide left (desktop), show right (mobile) — centered
        if (wfLeftPanel) {
            wfLeftPanel.style.display = "none";
        }
        if (wfRightPanel) {
            wfRightPanel.style.display = "block";
            wfRightPanel.style.flex = "0 0 260px";
            wfRightPanel.style.maxWidth = "260px";
            wfRightPanel.style.margin = "0 auto";
        }
        if (wfCanvasPanels) {
            wfCanvasPanels.style.justifyContent = "center";
        }
    }

    if (btnWfDesktop && btnWfMobile) {
        btnWfDesktop.addEventListener("click", () => {
            if (wfCanvasPanels) wfCanvasPanels.style.justifyContent = "";
            setWfDesktopView();
        });
        btnWfMobile.addEventListener("click", setWfMobileView);
        // Default: Desktop view on load
        setWfDesktopView();
    }

    // Hero Layout Toggle (Click to change layout)
    if (wfHeroSection) {
        wfHeroSection.addEventListener("click", (e) => {
            if (e.target.closest(".wf-live-cursor")) return;
            const currentLayout = wfHeroSection.getAttribute("data-layout");
            if (currentLayout === "split") {
                wfHeroSection.setAttribute("data-layout", "center");
                wfHeroSection.classList.add("layout-center");
            } else {
                wfHeroSection.setAttribute("data-layout", "split");
                wfHeroSection.classList.remove("layout-center");
            }
        });
    }

    // Features Layout Toggle
    if (wfFeaturesSection) {
        wfFeaturesSection.addEventListener("click", (e) => {
            if (e.target.closest(".wf-live-cursor")) return;
            const currentLayout = wfFeaturesSection.getAttribute("data-layout");
            if (currentLayout === "grid") {
                wfFeaturesSection.setAttribute("data-layout", "2cols");
                wfFeaturesSection.classList.remove("layout-1col");
                wfFeaturesSection.classList.add("layout-2cols");
            } else if (currentLayout === "2cols") {
                wfFeaturesSection.setAttribute("data-layout", "1col");
                wfFeaturesSection.classList.remove("layout-2cols");
                wfFeaturesSection.classList.add("layout-1col");
            } else {
                wfFeaturesSection.setAttribute("data-layout", "grid");
                wfFeaturesSection.classList.remove("layout-1col", "layout-2cols");
            }
        });
    }

    // Animate Jessica cursor gently
    const jessicaCursor = document.getElementById("jessicaCursor");
    if (jessicaCursor) {
        let jx = 55, jy = 28, jdx = 0.4, jdy = 0.2;
        function animateJessica() {
            jx += jdx; jy += jdy;
            if (jx > 80 || jx < 20) jdx *= -1;
            if (jy > 55 || jy < 15) jdy *= -1;
            jessicaCursor.style.left = jx + "%";
            jessicaCursor.style.top = jy + "%";
            requestAnimationFrame(animateJessica);
        }
        animateJessica();
    }

    // --- TAB 3: DESIGN SYSTEM CUSTOMIZER (Style Guide) ---
    const btnPalettes = document.querySelectorAll(".btn-palette-choice");
    const btnFonts = document.querySelectorAll(".btn-font-choice");
    const btnRadii = document.querySelectorAll(".btn-radius-choice");
    const wireframeBrowser = document.getElementById("wfCanvasPanels");

    // Color theme change
    btnPalettes.forEach(btn => {
        btn.addEventListener("click", () => {
            btnPalettes.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const theme = btn.getAttribute("data-theme");
            if (mockupBody) {
                mockupBody.setAttribute("data-theme", theme);
            }
        });
    });

    // Typography change
    btnFonts.forEach(btn => {
        btn.addEventListener("click", () => {
            btnFonts.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const font = btn.getAttribute("data-font");

            if (wireframeBrowser) {
                if (font === "manrope") {
                    wireframeBrowser.style.fontFamily = '"Manrope", sans-serif';
                } else if (font === "roboto") {
                    wireframeBrowser.style.fontFamily = '"Roboto", sans-serif';
                }
            }
        });
    });

    // Border Radius change
    btnRadii.forEach(btn => {
        btn.addEventListener("click", () => {
            btnRadii.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const radius = btn.getAttribute("data-radius");

            // Apply corner radius to nodes and elements
            const targets = document.querySelectorAll("#interactiveMockupBody .sitemap-node-item, #interactiveMockupBody .wf-browser-window, #interactiveMockupBody .wf-btn, #interactiveMockupBody .wf-btn-large, #interactiveMockupBody .wf-image-box");
            targets.forEach(el => {
                el.style.borderRadius = radius;
            });
        });
    });
    // --- AUTOMATIC INTERACTIVE DEMOS FOR ALL SLIDES (Added by Antigravity) ---
    let isDemoRunning = [false, false, false, false];
    let demoInteracted = [false, false, false, false];
    let demoTimeouts = [[], [], [], []];
    let activeSlideIndex = 0;
    const originalSitemapHTML = sitemapState ? sitemapState.innerHTML : "";

    function scheduleDemo(slideIdx, fn, delay) {
        demoTimeouts[slideIdx].push(setTimeout(() => {
            if (!isDemoRunning[slideIdx] || demoInteracted[slideIdx]) return;
            fn();
        }, delay));
    }

    function clearDemoTimeouts(slideIdx) {
        demoTimeouts[slideIdx].forEach(id => clearTimeout(id));
        demoTimeouts[slideIdx] = [];
    }

    function moveCursorToElement(guestCursor, mockupBody, element) {
        if (element && guestCursor && mockupBody) {
            const bodyRect = mockupBody.getBoundingClientRect();
            const elemRect = element.getBoundingClientRect();
            const targetLeft = elemRect.left - bodyRect.left + (elemRect.width / 2);
            const targetTop = elemRect.top - bodyRect.top + (elemRect.height / 2);
            guestCursor.style.left = `${targetLeft}px`;
            guestCursor.style.top = `${targetTop}px`;
        }
    }

    function startWebsiteDemo() {
        if (demoInteracted[0]) return;
        isDemoRunning[0] = true;
        
        const gCursor = document.getElementById("guestCursor");
        const mBody = document.getElementById("interactiveMockupBody");
        if (!gCursor || !mBody) return;

        // Reset elements to initial states
        if (tabButtons[0]) tabButtons[0].click();
        if (reqState) reqState.style.display = "block";
        if (sitemapLoading) {
            sitemapLoading.classList.remove("d-flex");
            sitemapLoading.classList.add("d-none");
        }
        if (sitemapState) {
            sitemapState.style.display = "none";
            if (originalSitemapHTML) {
                sitemapState.innerHTML = originalSitemapHTML;
                sitemapState.querySelectorAll(".sitemap-node-item").forEach(node => {
                    bindNodeEvents(node);
                });
            }
        }
        if (presetPills[0] && sitemapInputText) {
            presetPills.forEach(p => p.classList.remove("active"));
            presetPills[0].classList.add("active");
            sitemapInputText.value = presetPills[0].getAttribute("data-desc") || "";
        }

        gCursor.style.opacity = "1";
        gCursor.style.transition = "left 1.2s cubic-bezier(0.25, 1, 0.5, 1), top 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
        gCursor.style.left = "10%";
        gCursor.style.top = "70%";

        // Step 1: Move cursor to "Generate sitemap" button
        scheduleDemo(0, () => {
            if (btnGenerateSitemap) moveCursorToElement(gCursor, mBody, btnGenerateSitemap);
        }, 1500);

        // Step 2: Click "Generate sitemap"
        scheduleDemo(0, () => {
            if (btnGenerateSitemap) {
                btnGenerateSitemap.style.transform = "scale(0.95)";
                setTimeout(() => { if (btnGenerateSitemap) btnGenerateSitemap.style.transform = ""; }, 150);
                reqState.style.display = "none";
                sitemapLoading.classList.remove("d-none");
                sitemapLoading.classList.add("d-flex");

                setTimeout(() => {
                    if (!isDemoRunning[0] || demoInteracted[0]) return;
                    sitemapLoading.classList.remove("d-flex");
                    sitemapLoading.classList.add("d-none");
                    sitemapState.style.display = "block";

                    const cols = sitemapBranches.querySelectorAll(".sitemap-branch-col");
                    cols.forEach((col, idx) => {
                        col.style.opacity = "0";
                        col.style.transform = "translateY(15px)";
                        setTimeout(() => {
                            if (!isDemoRunning[0] || demoInteracted[0]) return;
                            col.style.transition = "all 0.4s ease";
                            col.style.opacity = "1";
                            col.style.transform = "translateY(0)";
                        }, idx * 100);
                    });
                }, 1000);
            }
        }, 3000);

        // Step 3: Move cursor to Home page node
        scheduleDemo(0, () => {
            const homeNode = sitemapState.querySelector('[data-node-id="root"]');
            if (homeNode) moveCursorToElement(gCursor, mBody, homeNode);
        }, 4800);

        // Step 4: Double click Home page node text
        scheduleDemo(0, () => {
            const homeNode = sitemapState.querySelector('[data-node-id="root"]');
            if (homeNode) {
                const textSpan = homeNode.querySelector('.node-text');
                if (textSpan) textSpan.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
            }
        }, 6200);

        // Step 5: Change the input to "Main"
        scheduleDemo(0, () => {
            const homeNode = sitemapState.querySelector('[data-node-id="root"]');
            if (homeNode) {
                const inputEl = homeNode.querySelector('.sitemap-node-input');
                if (inputEl) {
                    inputEl.value = "Main";
                    inputEl.blur();
                }
            }
        }, 7000);

        // Step 6: Move cursor to add child button
        scheduleDemo(0, () => {
            const homeNode = sitemapState.querySelector('[data-node-id="root"]');
            if (homeNode) {
                const addBtn = homeNode.querySelector('.add-node-btn');
                if (addBtn) moveCursorToElement(gCursor, mBody, addBtn);
            }
        }, 8300);

        // Step 7: Click add child button
        scheduleDemo(0, () => {
            const homeNode = sitemapState.querySelector('[data-node-id="root"]');
            if (homeNode) {
                const addBtn = homeNode.querySelector('.add-node-btn');
                if (addBtn) addBtn.click();
            }
        }, 9500);

        // Step 8: Find new node and move cursor to it
        scheduleDemo(0, () => {
            const newNodes = sitemapState.querySelectorAll('.sitemap-node-item');
            const newNode = newNodes[newNodes.length - 1];
            if (newNode) moveCursorToElement(gCursor, mBody, newNode);
        }, 10800);

        // Step 9: Double click to rename
        scheduleDemo(0, () => {
            const newNodes = sitemapState.querySelectorAll('.sitemap-node-item');
            const newNode = newNodes[newNodes.length - 1];
            if (newNode) {
                const newTextSpan = newNode.querySelector('.node-text');
                if (newTextSpan) newTextSpan.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
            }
        }, 12200);

        // Step 10: Rename to "Contact"
        scheduleDemo(0, () => {
            const newNodes = sitemapState.querySelectorAll('.sitemap-node-item');
            const newNode = newNodes[newNodes.length - 1];
            if (newNode) {
                const newInputEl = newNode.querySelector('.sitemap-node-input');
                if (newInputEl) {
                    newInputEl.value = "Contact";
                    newInputEl.blur();
                }
            }
        }, 13000);

        // Step 11: Move to Wireframe Tab
        scheduleDemo(0, () => {
            if (tabButtons[1]) moveCursorToElement(gCursor, mBody, tabButtons[1]);
        }, 14300);

        // Step 12: Click Wireframe Tab
        scheduleDemo(0, () => {
            if (tabButtons[1]) tabButtons[1].click();
        }, 15500);

        // Step 13: Move to Hero Section inside wireframe
        scheduleDemo(0, () => {
            if (wfHeroSection) moveCursorToElement(gCursor, mBody, wfHeroSection);
        }, 16800);

        // Step 14: Click Hero Section
        scheduleDemo(0, () => {
            if (wfHeroSection) wfHeroSection.click();
        }, 18000);

        // Step 15: Move to Features Section
        scheduleDemo(0, () => {
            if (wfFeaturesSection) moveCursorToElement(gCursor, mBody, wfFeaturesSection);
        }, 19300);

        // Step 16: Click Features Section
        scheduleDemo(0, () => {
            if (wfFeaturesSection) wfFeaturesSection.click();
        }, 20500);

        // Step 17: Move to Style Guide Tab
        scheduleDemo(0, () => {
            if (tabButtons[2]) moveCursorToElement(gCursor, mBody, tabButtons[2]);
        }, 21800);

        // Step 18: Click Style Guide Tab
        scheduleDemo(0, () => {
            if (tabButtons[2]) tabButtons[2].click();
        }, 23000);

        // Step 19: Move to second palette button
        scheduleDemo(0, () => {
            if (btnPalettes[1]) moveCursorToElement(gCursor, mBody, btnPalettes[1]);
        }, 24300);

        // Step 20: Click second palette button
        scheduleDemo(0, () => {
            if (btnPalettes[1]) btnPalettes[1].click();
        }, 25500);

        // Step 21: Move to second typography button
        scheduleDemo(0, () => {
            if (btnFonts[1]) moveCursorToElement(gCursor, mBody, btnFonts[1]);
        }, 26800);

        // Step 22: Click second typography button
        scheduleDemo(0, () => {
            if (btnFonts[1]) btnFonts[1].click();
        }, 28000);

        // Step 23: Move to third border radius button
        scheduleDemo(0, () => {
            if (btnRadii[2]) moveCursorToElement(gCursor, mBody, btnRadii[2]);
        }, 29300);

        // Step 24: Click third radius button
        scheduleDemo(0, () => {
            if (btnRadii[2]) btnRadii[2].click();
        }, 30500);

        // Step 25: Loop back
        scheduleDemo(0, () => {
            if (btnPalettes[0]) btnPalettes[0].click();
            if (btnRadii[0]) btnRadii[0].click();
            startWebsiteDemo();
        }, 34000);
    }

    function startEcomDemo() {
        if (demoInteracted[1]) return;
        isDemoRunning[1] = true;

        const gCursor = document.getElementById("ecomGuestCursor");
        const mBody = document.getElementById("ecommerceInteractiveMockupBody");
        if (!gCursor || !mBody) return;

        // Reset storefront state
        const ecomTabButtons = document.querySelectorAll(".mockup-tab-btn-ecom");
        if (ecomTabButtons[0]) ecomTabButtons[0].click();
        
        const swatches = document.querySelectorAll(".color-swatch");
        if (swatches[0]) swatches[0].click();
        
        cartQty = 0;
        if (mockCartCount) mockCartCount.innerText = "0";
        updateCheckout();
        if (addedToast) addedToast.classList.remove("show");
        if (checkoutSuccessMsg) {
            checkoutSuccessMsg.style.display = "none";
            checkoutSuccessMsg.style.opacity = "0";
        }
        if (btnPayNow) {
            btnPayNow.style.display = "flex";
            btnPayNow.innerHTML = '<i class="fa-brands fa-apple"></i> Pay';
        }

        gCursor.style.opacity = "1";
        gCursor.style.transition = "left 1.2s cubic-bezier(0.25, 1, 0.5, 1), top 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
        gCursor.style.left = "10%";
        gCursor.style.top = "70%";

        // Step 1: Move to Blue Color Swatch
        scheduleDemo(1, () => {
            const blueSwatch = document.querySelector('.color-options-picker [data-color="blue"]');
            if (blueSwatch) moveCursorToElement(gCursor, mBody, blueSwatch);
        }, 1500);

        // Step 2: Click Blue Color Swatch
        scheduleDemo(1, () => {
            const blueSwatch = document.querySelector('.color-options-picker [data-color="blue"]');
            if (blueSwatch) blueSwatch.click();
        }, 3000);

        // Step 3: Move to Add to Cart button
        scheduleDemo(1, () => {
            const btnCart = document.getElementById("btnAddToCart");
            if (btnCart) moveCursorToElement(gCursor, mBody, btnCart);
        }, 4500);

        // Step 4: Click Add to Cart button
        scheduleDemo(1, () => {
            const btnCart = document.getElementById("btnAddToCart");
            if (btnCart) {
                btnCart.style.transform = "scale(0.95)";
                setTimeout(() => { if (btnCart) btnCart.style.transform = ""; }, 150);
                btnCart.click();
            }
        }, 6000);

        // Step 5: Move to Checkout Tab
        scheduleDemo(1, () => {
            if (ecomTabButtons[1]) moveCursorToElement(gCursor, mBody, ecomTabButtons[1]);
        }, 7500);

        // Step 6: Click Checkout Tab
        scheduleDemo(1, () => {
            if (ecomTabButtons[1]) ecomTabButtons[1].click();
        }, 9000);

        // Step 7: Move to Pay Now button
        scheduleDemo(1, () => {
            const btnPay = document.getElementById("btnPayNow");
            if (btnPay) moveCursorToElement(gCursor, mBody, btnPay);
        }, 10500);

        // Step 8: Click Pay Now button
        scheduleDemo(1, () => {
            const btnPay = document.getElementById("btnPayNow");
            if (btnPay) btnPay.click();
        }, 12000);

        // Step 9: Move to Analytics Tab
        scheduleDemo(1, () => {
            if (ecomTabButtons[2]) moveCursorToElement(gCursor, mBody, ecomTabButtons[2]);
        }, 14500);

        // Step 10: Click Analytics Tab
        scheduleDemo(1, () => {
            if (ecomTabButtons[2]) ecomTabButtons[2].click();
        }, 16000);

        // Step 11: Loop back
        scheduleDemo(1, () => {
            startEcomDemo();
        }, 20000);
    }

    function startMobileDemo() {
        if (demoInteracted[2]) return;
        isDemoRunning[2] = true;

        const gCursor = document.getElementById("mobileGuestCursor");
        const mBody = document.getElementById("mobileInteractiveMockupBody");
        if (!gCursor || !mBody) return;

        // Reset mobile app state
        const mobileTabButtons = document.querySelectorAll(".mockup-tab-btn-mobile");
        if (mobileTabButtons[0]) mobileTabButtons[0].click();
        
        const btnWfPortrait = document.getElementById("btnMobileWfPortrait");
        if (btnWfPortrait) btnWfPortrait.click();

        if (mobileWfHero) mobileWfHero.setAttribute("data-layout", "normal");
        if (mobileWfList) {
            mobileWfList.setAttribute("data-layout", "list");
            const listItems = document.querySelectorAll(".mobile-wf-item");
            listItems.forEach(item => {
                item.classList.remove("col-6");
                item.classList.add("col-12", "mb-1");
            });
        }
        
        const btnPalettesMobile = document.querySelectorAll(".btn-palette-choice-mobile");
        const btnFontsMobile = document.querySelectorAll(".btn-font-choice-mobile");
        const btnRadiiMobile = document.querySelectorAll(".btn-radius-choice-mobile");
        if (btnPalettesMobile[0]) btnPalettesMobile[0].click();
        if (btnFontsMobile[0]) btnFontsMobile[0].click();
        if (btnRadiiMobile[0]) btnRadiiMobile[0].click();

        gCursor.style.opacity = "1";
        gCursor.style.transition = "left 1.2s cubic-bezier(0.25, 1, 0.5, 1), top 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
        gCursor.style.left = "10%";
        gCursor.style.top = "70%";

        // Step 1: Move to Landscape Button
        scheduleDemo(2, () => {
            const btnLandscape = document.getElementById("btnMobileWfLandscape");
            if (btnLandscape) moveCursorToElement(gCursor, mBody, btnLandscape);
        }, 1500);

        // Step 2: Click Landscape Button
        scheduleDemo(2, () => {
            const btnLandscape = document.getElementById("btnMobileWfLandscape");
            if (btnLandscape) btnLandscape.click();
        }, 3000);

        // Step 3: Move to Portrait Button
        scheduleDemo(2, () => {
            const btnPortrait = document.getElementById("btnMobileWfPortrait");
            if (btnPortrait) moveCursorToElement(gCursor, mBody, btnPortrait);
        }, 4500);

        // Step 4: Click Portrait Button
        scheduleDemo(2, () => {
            const btnPortrait = document.getElementById("btnMobileWfPortrait");
            if (btnPortrait) btnPortrait.click();
        }, 6000);

        // Step 5: Move to Hero section inside device
        scheduleDemo(2, () => {
            const wfHero = document.getElementById("mobileWfHero");
            if (wfHero) moveCursorToElement(gCursor, mBody, wfHero);
        }, 7500);

        // Step 6: Click Hero section
        scheduleDemo(2, () => {
            const wfHero = document.getElementById("mobileWfHero");
            if (wfHero) wfHero.click();
        }, 9000);

        // Step 7: Move to List section inside device
        scheduleDemo(2, () => {
            const wfList = document.getElementById("mobileWfList");
            if (wfList) moveCursorToElement(gCursor, mBody, wfList);
        }, 10500);

        // Step 8: Click List section
        scheduleDemo(2, () => {
            const wfList = document.getElementById("mobileWfList");
            if (wfList) wfList.click();
        }, 12000);

        // Step 9: Move to Style Guide Tab Button
        scheduleDemo(2, () => {
            if (mobileTabButtons[1]) moveCursorToElement(gCursor, mBody, mobileTabButtons[1]);
        }, 13500);

        // Step 10: Click Style Guide Tab Button
        scheduleDemo(2, () => {
            if (mobileTabButtons[1]) mobileTabButtons[1].click();
        }, 15000);

        // Step 11: Move to Sunset Peach Theme
        scheduleDemo(2, () => {
            const sunsetPaletteBtn = document.querySelector('.btn-palette-choice-mobile[data-theme="sunset"]');
            if (sunsetPaletteBtn) moveCursorToElement(gCursor, mBody, sunsetPaletteBtn);
        }, 16500);

        // Step 12: Click Sunset Peach Theme
        scheduleDemo(2, () => {
            const sunsetPaletteBtn = document.querySelector('.btn-palette-choice-mobile[data-theme="sunset"]');
            if (sunsetPaletteBtn) sunsetPaletteBtn.click();
        }, 18000);

        // Step 13: Move to Pill border radius button
        scheduleDemo(2, () => {
            const pillRadiusBtn = document.querySelector('.btn-radius-choice-mobile[data-radius="20px"]');
            if (pillRadiusBtn) moveCursorToElement(gCursor, mBody, pillRadiusBtn);
        }, 19500);

        // Step 14: Click Pill border radius
        scheduleDemo(2, () => {
            const pillRadiusBtn = document.querySelector('.btn-radius-choice-mobile[data-radius="20px"]');
            if (pillRadiusBtn) pillRadiusBtn.click();
        }, 21000);

        // Step 15: Loop back
        scheduleDemo(2, () => {
            startMobileDemo();
        }, 25000);
    }

    function startDmDemo() {
        if (demoInteracted[3]) return;
        isDemoRunning[3] = true;

        const gCursor = document.getElementById("dmGuestCursor");
        const mBody = document.getElementById("dmInteractiveMockupBody");
        if (!gCursor || !mBody) return;

        // Reset digital marketing state
        const dmTabButtons = document.querySelectorAll(".mockup-tab-btn-dm");
        if (dmTabButtons[0]) dmTabButtons[0].click();
        
        const adSlider = document.getElementById("adBudgetSlider");
        if (adSlider) {
            adSlider.value = 500;
            adSlider.dispatchEvent(new Event('input'));
        }

        const seoInput = document.getElementById("seoDomainInput");
        if (seoInput) seoInput.value = "";
        
        const seoResults = document.getElementById("seoResultsArea");
        if (seoResults) seoResults.style.display = "none";
        
        const chartToggles = document.querySelectorAll(".mockup-chart-toggle");
        if (chartToggles[0]) chartToggles[0].click();
        
        if (chartTooltip) chartTooltip.style.display = "none";

        gCursor.style.opacity = "1";
        gCursor.style.transition = "left 1.2s cubic-bezier(0.25, 1, 0.5, 1), top 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
        gCursor.style.left = "10%";
        gCursor.style.top = "70%";

        // Step 1: Move to Ad Budget Slider
        scheduleDemo(3, () => {
            if (adSlider) moveCursorToElement(gCursor, mBody, adSlider);
        }, 1500);

        // Step 2: Drag Slider Simulation
        scheduleDemo(3, () => {
            if (adSlider) {
                let val = 500;
                const dragInterval = setInterval(() => {
                    if (!isDemoRunning[3] || demoInteracted[3]) {
                        clearInterval(dragInterval);
                        return;
                    }
                    val += 1000;
                    if (val <= 4500) {
                        adSlider.value = val;
                        adSlider.dispatchEvent(new Event('input'));
                        // Animate cursor along with slider drag
                        const bodyRect = mBody.getBoundingClientRect();
                        const sliderRect = adSlider.getBoundingClientRect();
                        const percent = (val - 100) / (10000 - 100);
                        const targetLeft = sliderRect.left - bodyRect.left + (sliderRect.width * percent);
                        const targetTop = sliderRect.top - bodyRect.top + (sliderRect.height / 2);
                        gCursor.style.left = `${targetLeft}px`;
                        gCursor.style.top = `${targetTop}px`;
                    } else {
                        clearInterval(dragInterval);
                    }
                }, 200);
            }
        }, 3000);

        // Step 3: Move to SEO Tab
        scheduleDemo(3, () => {
            if (dmTabButtons[1]) moveCursorToElement(gCursor, mBody, dmTabButtons[1]);
        }, 4500);

        // Step 4: Click SEO Tab
        scheduleDemo(3, () => {
            if (dmTabButtons[1]) dmTabButtons[1].click();
        }, 6000);

        // Step 5: Move to SEO input
        scheduleDemo(3, () => {
            if (seoInput) moveCursorToElement(gCursor, mBody, seoInput);
        }, 7500);

        // Step 6: Type domain
        scheduleDemo(3, () => {
            if (seoInput) {
                const text = "jramdigital.com";
                let currentText = "";
                for (let i = 0; i < text.length; i++) {
                    setTimeout(() => {
                        if (!isDemoRunning[3] || demoInteracted[3]) return;
                        currentText += text[i];
                        seoInput.value = currentText;
                    }, i * 80);
                }
            }
        }, 9000);

        // Step 7: Move to Audit Button
        scheduleDemo(3, () => {
            const btnAudit = document.getElementById("btnRunAudit");
            if (btnAudit) moveCursorToElement(gCursor, mBody, btnAudit);
        }, 11000);

        // Step 8: Click Audit Button
        scheduleDemo(3, () => {
            const btnAudit = document.getElementById("btnRunAudit");
            if (btnAudit) btnAudit.click();
        }, 12500);

        // Step 9: Move to Analytics Tab
        scheduleDemo(3, () => {
            if (dmTabButtons[2]) moveCursorToElement(gCursor, mBody, dmTabButtons[2]);
        }, 15000);

        // Step 10: Click Analytics Tab
        scheduleDemo(3, () => {
            if (dmTabButtons[2]) dmTabButtons[2].click();
        }, 16500);

        // Step 11: Hover over chart dots sequentially
        const dots = document.querySelectorAll("#dmTabContentAnalytics .chart-dot-spot");
        if (dots && dots.length > 0) {
            dots.forEach((dot, dIdx) => {
                scheduleDemo(3, () => {
                    moveCursorToElement(gCursor, mBody, dot);
                    setTimeout(() => {
                        if (!isDemoRunning[3] || demoInteracted[3]) return;
                        const bodyRect = mBody.getBoundingClientRect();
                        const dotRect = dot.getBoundingClientRect();
                        const clientX = dotRect.left + (dotRect.width / 2);
                        const clientY = dotRect.top + (dotRect.height / 2);
                        dot.dispatchEvent(new MouseEvent('mousemove', {
                            bubbles: true,
                            clientX: clientX,
                            clientY: clientY
                        }));
                    }, 500);
                }, 18000 + (dIdx * 2000));
            });
        }

        // Step 12: Move to Monthly button
        scheduleDemo(3, () => {
            const monthlyBtn = document.querySelector('#dmTabContentAnalytics .mockup-chart-toggle[data-period="monthly"]');
            if (monthlyBtn) moveCursorToElement(gCursor, mBody, monthlyBtn);
        }, 26500);

        // Step 13: Click Monthly button
        scheduleDemo(3, () => {
            const monthlyBtn = document.querySelector('#dmTabContentAnalytics .mockup-chart-toggle[data-period="monthly"]');
            if (monthlyBtn) monthlyBtn.click();
        }, 28000);

        // Step 14: Loop back
        scheduleDemo(3, () => {
            startDmDemo();
        }, 32000);
    }

    function activateSlideDemo(slideIdx) {
        if (slideIdx < 0 || slideIdx > 3) return;
        
        for (let i = 0; i < 4; i++) {
            if (i !== slideIdx) {
                stopSlideDemo(i, false);
            }
        }

        if (demoInteracted[slideIdx]) return;
        if (isDemoRunning[slideIdx]) return;

        setTimeout(() => {
            if (activeSlideIndex === slideIdx && !demoInteracted[slideIdx] && !isDemoRunning[slideIdx]) {
                if (slideIdx === 0) startWebsiteDemo();
                else if (slideIdx === 1) startEcomDemo();
                else if (slideIdx === 2) startMobileDemo();
                else if (slideIdx === 3) startDmDemo();
            }
        }, 800);
    }

    function stopSlideDemo(slideIdx, markInteracted = true) {
        if (slideIdx < 0 || slideIdx > 3) return;
        
        if (markInteracted) {
            demoInteracted[slideIdx] = true;
        }
        
        isDemoRunning[slideIdx] = false;
        clearDemoTimeouts(slideIdx);
        
        const cursors = [
            document.getElementById("guestCursor"),
            document.getElementById("ecomGuestCursor"),
            document.getElementById("mobileGuestCursor"),
            document.getElementById("dmGuestCursor")
        ];
        
        const gCursor = cursors[slideIdx];
        if (gCursor) {
            gCursor.style.opacity = "0";
            gCursor.style.transition = "left 0.1s ease, top 0.1s ease";
        }
    }

    let lastMouseCoords = [
        { x: null, y: null },
        { x: null, y: null },
        { x: null, y: null },
        { x: null, y: null }
    ];

    function setupMouseListeners() {
        const mockups = [
            document.getElementById("interactiveMockupBody"),
            document.getElementById("ecommerceInteractiveMockupBody"),
            document.getElementById("mobileInteractiveMockupBody"),
            document.getElementById("dmInteractiveMockupBody")
        ];
        
        const cursors = [
            document.getElementById("guestCursor"),
            document.getElementById("ecomGuestCursor"),
            document.getElementById("mobileGuestCursor"),
            document.getElementById("dmGuestCursor")
        ];

        const cards = [
            document.querySelector(".services-slide:nth-child(1) .service-split-card"),
            document.querySelector(".services-slide:nth-child(2) .service-split-card"),
            document.querySelector(".services-slide:nth-child(3) .service-split-card"),
            document.querySelector(".services-slide:nth-child(4) .service-split-card")
        ];

        mockups.forEach((mBody, i) => {
            if (!mBody) return;
            
            mBody.addEventListener("mousemove", (e) => {
                const gCursor = cursors[i];
                if (isDemoRunning[i]) {
                    const coords = lastMouseCoords[i];
                    if (coords.x === null || coords.y === null) {
                        coords.x = e.screenX;
                        coords.y = e.screenY;
                        return;
                    }
                    if (Math.abs(e.screenX - coords.x) > 2 || Math.abs(e.screenY - coords.y) > 2) {
                        stopSlideDemo(i, true);
                    }
                    coords.x = e.screenX;
                    coords.y = e.screenY;
                }
                
                if (!isDemoRunning[i] && gCursor) {
                    const rect = mBody.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;
                    gCursor.style.transition = "none";
                    gCursor.style.opacity = "1";
                    
                    if (i === 2) {
                        gCursor.style.left = `${mouseX - 50}px`;
                        gCursor.style.top = `${mouseY + 25}px`;
                    } else {
                        gCursor.style.left = `${mouseX}px`;
                        gCursor.style.top = `${mouseY}px`;
                    }
                }
            });

            mBody.addEventListener("mouseleave", () => {
                const gCursor = cursors[i];
                if (!isDemoRunning[i] && gCursor) {
                    gCursor.style.opacity = "0";
                }
            });
        });

        cards.forEach((card, i) => {
            if (!card) return;
            card.addEventListener("mousedown", () => stopSlideDemo(i, true));
            card.addEventListener("touchstart", () => stopSlideDemo(i, true));
        });
    }

    setupMouseListeners();

    // Intersection observers for slide tracking
    const servicesSlides = document.querySelectorAll(".services-slide");
    const slideVisibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(servicesSlides).indexOf(entry.target);
                if (index !== -1) {
                    activeSlideIndex = index;
                    activateSlideDemo(index);
                }
            }
        });
    }, {
        threshold: 0.6
    });

    servicesSlides.forEach(slide => slideVisibilityObserver.observe(slide));

    const servicesSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                for (let i = 0; i < 4; i++) {
                    stopSlideDemo(i, false);
                }
            } else {
                activateSlideDemo(activeSlideIndex);
            }
        });
    }, { threshold: 0.05 });

    const servicesSection = document.getElementById("service");
    if (servicesSection) {
        servicesSectionObserver.observe(servicesSection);
    }

    // --- STICKY VERTICAL-TO-HORIZONTAL SCROLL HANDLER (GSAP & SCROLLTRIGGER) ---
    const stickySection = document.getElementById("service");
    const sliderTrack = document.getElementById("servicesHorizontalTrack");
    const sliderProgressBar = document.getElementById("sliderProgressBar");
    const sliderIndicatorDots = document.querySelectorAll(".slider-indicator-dot");

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    let mainScrollTrigger = null;

    function initGSAPSlider() {
        if (!stickySection || !sliderTrack) return;

        // Clean up previous ScrollTrigger if exists
        if (mainScrollTrigger) {
            mainScrollTrigger.kill();
            mainScrollTrigger = null;
        }

        // On mobile/tablet view (max-width: 991px), we don't pin/scroll-translate with GSAP
        if (window.innerWidth <= 991) {
            // Reset track transform in case it was translated
            gsap.set(sliderTrack, { clearProps: "transform,x" });
            return;
        }

        const translateVal = sliderTrack.scrollWidth - window.innerWidth;

        mainScrollTrigger = ScrollTrigger.create({
            id: "servicesSliderTrigger",
            trigger: stickySection,
            pin: true,
            scrub: 1.5, // Smoother scrolling transition
            start: "top top",
            end: () => "+=" + (translateVal * 1.5), // Slower scroll speed by requiring more vertical scrolling
            invalidateOnRefresh: true,
            animation: gsap.to(sliderTrack, {
                x: -translateVal,
                ease: "none"
            }),
        });
    }

    // Initialize GSAP Slider on load
    initGSAPSlider();

    // Mobile Swipe Scroll Progress
    function handleMobileScroll() {
        if (window.innerWidth > 991) return;
        if (!sliderTrack) return;

        const trackScrollLeft = sliderTrack.scrollLeft;
        const trackScrollWidth = sliderTrack.scrollWidth - sliderTrack.clientWidth;

        if (trackScrollWidth > 0) {
            const pct = Math.max(0, Math.min(1, trackScrollLeft / trackScrollWidth));
            if (sliderProgressBar) {
                sliderProgressBar.style.width = `${pct * 100}%`;
            }

            // Update active indicator dot
            const activeCardIdx = Math.min(3, Math.round(trackScrollLeft / window.innerWidth));
            sliderIndicatorDots.forEach((dot, idx) => {
                if (idx === activeCardIdx) {
                    dot.classList.add("active");
                } else {
                    dot.classList.remove("active");
                }
            });
        }
    }

    if (sliderTrack) {
        sliderTrack.addEventListener("scroll", handleMobileScroll);
    }

    // Click dot indicator to scroll to that slide (on desktop we vertical scroll, on mobile we horizontal scroll)
    sliderIndicatorDots.forEach((dot, idx) => {
        dot.addEventListener("click", () => {
            if (window.innerWidth <= 991) {
                // Mobile: horizontal scroll snap
                const slideWidth = sliderTrack.clientWidth;
                sliderTrack.scrollTo({
                    left: idx * slideWidth,
                    behavior: "smooth"
                });
            } else {
                // Desktop: vertical scroll offset mapped to ScrollTrigger
                const trigger = ScrollTrigger.getById("servicesSliderTrigger");
                if (trigger) {
                    const startY = trigger.start;
                    const totalScrollHeight = trigger.end - trigger.start;
                    // There are 4 slides, index is 0, 1, 2, 3. The target progress for slide idx is idx / 3
                    const targetScrollY = startY + (idx / 3) * totalScrollHeight;
                    window.scrollTo({
                        top: targetScrollY,
                        behavior: "smooth"
                    });
                } else {
                    // Fallback using manual calculation if ScrollTrigger is not active
                    const sectionTop = stickySection.offsetTop;
                    const sectionHeight = stickySection.offsetHeight;
                    const maxScroll = sectionHeight - window.innerHeight;
                    const targetScrollY = sectionTop + (idx / 3) * maxScroll;
                    window.scrollTo({
                        top: targetScrollY,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Re-initialize GSAP on resize
    window.addEventListener("resize", () => {
        initGSAPSlider();
        handleMobileScroll();
    });

    // Handle initial refresh check
    window.addEventListener("load", () => {
        initGSAPSlider();
        ScrollTrigger.refresh();
    });

    // Trigger initial calculation
    setTimeout(() => {
        initGSAPSlider();
        ScrollTrigger.refresh();
    }, 200);


    // --- MOCKUP 2: COLOR PICKER & CART (Ecommerce Development) ---
    const swatches = document.querySelectorAll(".color-swatch");
    const productImageBg = document.getElementById("productImageBg");
    const productIcon = document.getElementById("productIcon");
    const btnAddToCart = document.getElementById("btnAddToCart");
    const mockCartCount = document.getElementById("mockCartCount");
    const addedToast = document.getElementById("addedToast");

    let cartQty = 0;

    if (swatches && productImageBg && productIcon) {
        swatches.forEach(swatch => {
            swatch.addEventListener("click", () => {
                swatches.forEach(s => s.classList.remove("active"));
                swatch.classList.add("active");

                const selectedColor = swatch.getAttribute("data-color");

                if (selectedColor === "orange") {
                    productImageBg.style.background = "#ffedd5";
                    productIcon.style.color = "#ea580c";
                } else if (selectedColor === "blue") {
                    productImageBg.style.background = "#dbeafe";
                    productIcon.style.color = "#2563eb";
                } else if (selectedColor === "green") {
                    productImageBg.style.background = "#d1fae5";
                    productIcon.style.color = "#10b981";
                }
            });
        });
    }

    if (btnAddToCart && mockCartCount && addedToast) {
        btnAddToCart.addEventListener("click", () => {
            cartQty++;
            mockCartCount.innerText = cartQty;
            mockCartCount.classList.add("bump");

            // Pop Toast
            addedToast.classList.add("show");

            setTimeout(() => {
                mockCartCount.classList.remove("bump");
            }, 300);

            setTimeout(() => {
                addedToast.classList.remove("show");
            }, 2000);

            updateCheckout();
        });
    }

    // --- ECOMMERCE TABS ---
    const ecomTabButtons = document.querySelectorAll(".mockup-tab-btn-ecom");
    const ecomTabPanes = {
        store: document.getElementById("ecomTabContentStore"),
        checkout: document.getElementById("ecomTabContentCheckout"),
        analytics: document.getElementById("ecomTabContentAnalytics")
    };

    ecomTabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab-ecom");
            ecomTabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            Object.keys(ecomTabPanes).forEach(paneKey => {
                if (ecomTabPanes[paneKey]) {
                    if (paneKey === targetTab) {
                        // Use flex to keep alignment
                        ecomTabPanes[paneKey].classList.remove("d-none");
                        ecomTabPanes[paneKey].style.display = "flex";
                    } else {
                        ecomTabPanes[paneKey].style.display = "none";
                    }
                }
            });
        });
    });

    // --- CHECKOUT LOGIC ---
    const checkoutItemCount = document.getElementById("checkoutItemCount");
    const checkoutSubtotal = document.getElementById("checkoutSubtotal");
    const checkoutTotal = document.getElementById("checkoutTotal");
    const btnPayNow = document.getElementById("btnPayNow");
    const checkoutSuccessMsg = document.getElementById("checkoutSuccessMsg");

    function updateCheckout() {
        if (checkoutItemCount && checkoutSubtotal && checkoutTotal) {
            checkoutItemCount.innerText = cartQty;
            const subtotal = cartQty * 45;
            checkoutSubtotal.innerText = "$" + subtotal.toFixed(2);
            // Assuming $5 shipping/tax
            const total = subtotal > 0 ? subtotal + 5 : 0;
            checkoutTotal.innerText = "$" + total.toFixed(2);
        }
    }

    if (btnPayNow && checkoutSuccessMsg) {
        btnPayNow.addEventListener("click", () => {
            if (cartQty > 0) {
                const originalBtnHtml = btnPayNow.innerHTML;
                btnPayNow.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

                setTimeout(() => {
                    btnPayNow.style.display = "none";
                    checkoutSuccessMsg.style.display = "block";
                    setTimeout(() => {
                        checkoutSuccessMsg.style.opacity = "1";
                    }, 50);

                    // Update Analytics Mockup Revenue
                    const analyticsRevenue = document.getElementById("analyticsRevenue");
                    if (analyticsRevenue) {
                        const currentRev = parseFloat(analyticsRevenue.innerText.replace('$', '')) || 0;
                        const addedRev = (cartQty * 45) + 5;
                        analyticsRevenue.innerText = "$" + (currentRev + addedRev).toFixed(2);
                    }

                    // Reset Cart
                    cartQty = 0;
                    if (mockCartCount) mockCartCount.innerText = "0";
                    updateCheckout();

                    // Reset Button after 3 seconds so they can do it again
                    setTimeout(() => {
                        checkoutSuccessMsg.style.opacity = "0";
                        setTimeout(() => {
                            checkoutSuccessMsg.style.display = "none";
                            btnPayNow.style.display = "flex";
                            btnPayNow.innerHTML = originalBtnHtml;
                        }, 300);
                    }, 3000);

                }, 1200);
            } else {
                alert("Your cart is empty! Go back to the Storefront to add items.");
            }
        });
    }

    // --- MOCKUP 3: PHONE APP NAVIGATION (Mobile Development) ---
    const phoneNavItems = document.querySelectorAll(".phone-nav-item");
    const phoneTabContents = document.querySelectorAll(".phone-tab-content");
    const appNotification = document.getElementById("appNotification");
    const btnCloseNotification = document.getElementById("btnCloseNotification");

    if (phoneNavItems && phoneTabContents) {
        phoneNavItems.forEach(item => {
            item.addEventListener("click", () => {
                phoneNavItems.forEach(n => n.classList.remove("active"));
                item.classList.add("active");

                const targetTab = item.getAttribute("data-phone-tab");

                phoneTabContents.forEach(tab => {
                    tab.classList.remove("active");
                    if (tab.id === `phoneTab${targetTab}`) {
                        tab.classList.add("active");
                    }
                });
            });
        });
    }

    if (appNotification && btnCloseNotification) {
        // Trigger alert popup in 3 seconds
        setTimeout(() => {
            appNotification.classList.add("show");
        }, 3000);

        btnCloseNotification.addEventListener("click", () => {
            appNotification.classList.remove("show");
        });
    }

    // --- DIGITAL MARKETING TABS ---
    const dmTabButtons = document.querySelectorAll(".mockup-tab-btn-dm");
    const dmTabPanes = {
        ad: document.getElementById("dmTabContentAd"),
        seo: document.getElementById("dmTabContentSeo"),
        analytics: document.getElementById("dmTabContentAnalytics")
    };

    dmTabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab-dm");
            dmTabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            Object.keys(dmTabPanes).forEach(paneKey => {
                if (dmTabPanes[paneKey]) {
                    if (paneKey === targetTab) {
                        dmTabPanes[paneKey].style.display = "flex";
                    } else {
                        dmTabPanes[paneKey].style.display = "none";
                    }
                }
            });
        });
    });

    // --- AD CAMPAIGN SIMULATOR LOGIC ---
    const adBudgetSlider = document.getElementById("adBudgetSlider");
    const adBudgetDisplay = document.getElementById("adBudgetDisplay");
    const adReachDisplay = document.getElementById("adReachDisplay");
    const adClicksDisplay = document.getElementById("adClicksDisplay");
    const adRoiDisplay = document.getElementById("adRoiDisplay");

    if (adBudgetSlider) {
        adBudgetSlider.addEventListener("input", (e) => {
            const val = parseInt(e.target.value);
            if (adBudgetDisplay) adBudgetDisplay.innerText = "$" + val;

            // Mock calculations
            let reachNum = val * 25;
            let reachStr = reachNum > 1000 ? (reachNum / 1000).toFixed(1) + "k" : reachNum;
            const clicks = Math.floor(val * 0.9).toLocaleString();
            const roi = "$" + (val * 2.5).toLocaleString();

            if (adReachDisplay) adReachDisplay.innerText = reachStr;
            if (adClicksDisplay) adClicksDisplay.innerText = clicks;
            if (adRoiDisplay) adRoiDisplay.innerText = roi;
        });
    }

    // --- SEO ANALYZER LOGIC ---
    const btnRunAudit = document.getElementById("btnRunAudit");
    const seoDomainInput = document.getElementById("seoDomainInput");
    const seoResultsArea = document.getElementById("seoResultsArea");
    const seoLoadingSpinner = document.getElementById("seoLoadingSpinner");
    const seoReport = document.getElementById("seoReport");

    if (btnRunAudit && seoResultsArea) {
        btnRunAudit.addEventListener("click", () => {
            const domain = seoDomainInput ? seoDomainInput.value.trim() : "";
            if (domain !== "") {
                seoResultsArea.style.display = "block";
                if (seoLoadingSpinner) seoLoadingSpinner.style.display = "flex";
                if (seoReport) seoReport.style.display = "none";

                setTimeout(() => {
                    if (seoLoadingSpinner) seoLoadingSpinner.style.display = "none";
                    if (seoReport) seoReport.style.display = "block";
                }, 1500);
            } else {
                alert("Please enter a domain name to audit.");
            }
        });
    }

    // --- MOCKUP 4: SVG CHART HOVER TOOLTIPS (Digital Marketing) ---
    const chartToggles = document.querySelectorAll(".mockup-chart-toggle");
    const chartLinePath = document.getElementById("chartLinePath");
    const chartAreaPath = document.getElementById("chartAreaPath");
    const dotSpots = document.querySelectorAll(".chart-dot-spot");
    const chartTooltip = document.getElementById("chartTooltip");

    if (chartToggles && chartLinePath && chartAreaPath) {
        const paths = {
            weekly: {
                line: "M 0 150 Q 100 100, 200 40 T 400 20",
                area: "M 0 150 Q 100 100, 200 40 T 400 20 L 400 150 Z"
            },
            monthly: {
                line: "M 0 120 Q 80 50, 180 90 T 400 35",
                area: "M 0 120 Q 80 50, 180 90 T 400 35 L 400 150 Z"
            }
        };

        chartToggles.forEach(toggle => {
            toggle.addEventListener("click", () => {
                chartToggles.forEach(t => t.classList.remove("active"));
                toggle.classList.add("active");

                const period = toggle.getAttribute("data-period");
                chartLinePath.setAttribute("d", paths[period].line);
                chartAreaPath.setAttribute("d", paths[period].area);
            });
        });
    }

    if (dotSpots && chartTooltip) {
        dotSpots.forEach(spot => {
            spot.addEventListener("mousemove", (e) => {
                const tooltipText = spot.getAttribute("data-tooltip");
                chartTooltip.innerText = tooltipText;
                chartTooltip.style.display = "block";

                const containerRect = spot.closest(".svg-chart-container").getBoundingClientRect();
                const x = e.clientX - containerRect.left + 10;
                const y = e.clientY - containerRect.top - 35;

                chartTooltip.style.left = `${x}px`;
                chartTooltip.style.top = `${y}px`;
            });

            spot.addEventListener("mouseleave", () => {
                chartTooltip.style.display = "none";
            });
        });
    }

    // --- MOCKUP 5: MOBILE APP MULTI-TAB PLAYGROUND ---
    const mobileTabButtons = document.querySelectorAll(".mockup-tab-btn-mobile");
    const mobileTabPanes = {
        wireframe: document.getElementById("mobileMockupTabContentWireframe"),
        style: document.getElementById("mobileMockupTabContentStyle")
    };
    const mobileMockupBody = document.getElementById("mobileInteractiveMockupBody");
    const mobileGuestCursor = document.getElementById("mobileGuestCursor");

    // Tab Switching Logic for Mobile
    mobileTabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-tab-mobile");
            mobileTabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            Object.keys(mobileTabPanes).forEach(paneKey => {
                if (mobileTabPanes[paneKey]) {
                    if (paneKey === targetTab) {
                        mobileTabPanes[paneKey].style.display = "block";
                    } else {
                        mobileTabPanes[paneKey].style.display = "none";
                    }
                }
            });
        });
    });

    // Guest Cursor follow effect on hover
    if (mobileMockupBody && mobileGuestCursor) {
        mobileMockupBody.addEventListener("mousemove", (e) => {
            const rect = mobileMockupBody.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Follow effect
            mobileGuestCursor.style.left = `${mouseX - 50}px`;
            mobileGuestCursor.style.top = `${mouseY + 25}px`;
        });
    }

    // --- TAB 2: MOBILE WIREFRAME INTERACTIONS ---
    const btnMobileWfPortrait = document.getElementById("btnMobileWfPortrait");
    const btnMobileWfLandscape = document.getElementById("btnMobileWfLandscape");
    const mobileWireframeDevice = document.getElementById("mobileWireframeDevice");
    const mobileWfHero = document.getElementById("mobileWfHero");
    const mobileWfList = document.getElementById("mobileWfList");

    // Orientation toggle
    if (btnMobileWfPortrait && btnMobileWfLandscape && mobileWireframeDevice) {
        btnMobileWfPortrait.addEventListener("click", () => {
            btnMobileWfLandscape.classList.remove("active");
            btnMobileWfPortrait.classList.add("active");
            mobileWireframeDevice.style.width = "250px";
            mobileWireframeDevice.style.height = "350px";
        });

        btnMobileWfLandscape.addEventListener("click", () => {
            btnMobileWfPortrait.classList.remove("active");
            btnMobileWfLandscape.classList.add("active");
            mobileWireframeDevice.style.width = "360px";
            mobileWireframeDevice.style.height = "250px";
        });
    }

    // App Hero Layout Toggle
    if (mobileWfHero) {
        mobileWfHero.addEventListener("click", () => {
            const currentLayout = mobileWfHero.getAttribute("data-layout");
            if (currentLayout === "normal") {
                mobileWfHero.setAttribute("data-layout", "centered");
            } else {
                mobileWfHero.setAttribute("data-layout", "normal");
            }
        });
    }

    // App List/Grid Toggle
    if (mobileWfList) {
        mobileWfList.addEventListener("click", () => {
            const currentLayout = mobileWfList.getAttribute("data-layout");
            const listItems = document.querySelectorAll(".mobile-wf-item");
            if (currentLayout === "list") {
                mobileWfList.setAttribute("data-layout", "grid");
                listItems.forEach(item => {
                    item.classList.remove("col-12", "mb-1");
                    item.classList.add("col-6");
                });
            } else {
                mobileWfList.setAttribute("data-layout", "list");
                listItems.forEach(item => {
                    item.classList.remove("col-6");
                    item.classList.add("col-12", "mb-1");
                });
            }
        });
    }

    // --- TAB 3: DESIGN SYSTEM CUSTOMIZER (Mobile Style Guide) ---
    const btnPalettesMobile = document.querySelectorAll(".btn-palette-choice-mobile");
    const btnFontsMobile = document.querySelectorAll(".btn-font-choice-mobile");
    const btnRadiiMobile = document.querySelectorAll(".btn-radius-choice-mobile");

    // Theme Picker for Mobile
    btnPalettesMobile.forEach(btn => {
        btn.addEventListener("click", () => {
            btnPalettesMobile.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const theme = btn.getAttribute("data-theme");
            if (mobileMockupBody) {
                mobileMockupBody.setAttribute("data-theme", theme);
            }
        });
    });

    // Font Picker for Mobile
    btnFontsMobile.forEach(btn => {
        btn.addEventListener("click", () => {
            btnFontsMobile.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const font = btn.getAttribute("data-font");
            if (mobileWireframeDevice) {
                if (font === "manrope") {
                    mobileWireframeDevice.style.fontFamily = '"Manrope", sans-serif';
                } else if (font === "roboto") {
                    mobileWireframeDevice.style.fontFamily = '"Roboto", sans-serif';
                }
            }
        });
    });

    // Border Radius Picker for Mobile
    btnRadiiMobile.forEach(btn => {
        btn.addEventListener("click", () => {
            btnRadiiMobile.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const radius = btn.getAttribute("data-radius");

            // Apply corner radius to mobile sitemap and wireframe elements
            const targets = document.querySelectorAll("#mobileInteractiveMockupBody .sitemap-node-item, #mobileInteractiveMockupBody .mobile-wireframe-device, #mobileInteractiveMockupBody .wf-btn, #mobileInteractiveMockupBody .wf-btn-large, #mobileInteractiveMockupBody .wf-image-box, #mobileInteractiveMockupBody .wf-app-hero, #mobileInteractiveMockupBody .wf-app-list");
            targets.forEach(el => {
                el.style.borderRadius = radius;
            });
        });
    });
});
