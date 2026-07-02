document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        const icon = hamburger.querySelector("i");
        if(navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });

    // 2. Close mobile menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.querySelector("i").classList.remove("fa-times");
            hamburger.querySelector("i").classList.add("fa-bars");
        });
    });

    // 3. Navigation Background on Scroll
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.padding = "10px 5%";
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
        } else {
            navbar.style.padding = "20px 5%";
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        }
    });

    // 4. Reveal Elements on Scroll
    const reveals = document.querySelectorAll(".reveal");
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("active");
            observer.unobserve(entry.target); 
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 5. Active Navigation Link Highlighting (ScrollSpy)
    const sections = document.querySelectorAll("header, section");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            // The - 100 accounts for the sticky header offset
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach((item) => {
            item.classList.remove("active");
            // Check if the link's href matches the current section ID
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });
    });

    // 6. Form Submission Prevention (for demo purposes)
    const form = document.getElementById("afribridge-form");
    if(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = form.querySelector("button");
            const originalText = btn.innerText;
            btn.innerText = "Message Sent Successfully!";
            btn.style.backgroundColor = "#16a34a"; // Green success
            
            setTimeout(() => {
                form.reset();
                btn.innerText = originalText;
                btn.style.backgroundColor = ""; 
            }, 3000);
        });
    }
});