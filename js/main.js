// Sparkle effect
function createSparkles() {
  const sparklesContainer = document.querySelector(".floating-shapes");
  if (!sparklesContainer) return;

  function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;
    sparklesContainer.appendChild(sparkle);

    // Remove sparkle after animation
    setTimeout(() => {
      sparkle.remove();
    }, 2000);
  }

  // Create initial sparkles
  for (let i = 0; i < 50; i++) {
    createSparkle();
  }

  // Continuously create new sparkles
  setInterval(createSparkle, 200);
}

// Handle navbar color change on scroll
function handleScroll() {
  const nav = document.querySelector(".main-nav");
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
}

// Smooth scroll for navigation
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}

// Initialize all animations and features
document.addEventListener("DOMContentLoaded", () => {
  createSparkles();
  initSmoothScroll();

  // GSAP animations
  gsap.from(".hero-content", {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: "power3.out",
  });

  gsap.from(".main-nav", {
    duration: 1,
    y: -100,
    opacity: 0,
    ease: "power3.out",
  });

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);

  // Add image error handling
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      console.error(`Failed to load image: ${this.src}`);
      this.src = "assets/images/placeholder.svg"; // Create a placeholder image
      this.alt = "Image not found";
    });
  });

  initRecipeSliders();

  // Add Leaflet CSS and JS
  const leafletCSS = document.createElement("link");
  leafletCSS.rel = "stylesheet";
  leafletCSS.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
  document.head.appendChild(leafletCSS);

  const leafletJS = document.createElement("script");
  leafletJS.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
  leafletJS.onload = initMap;
  document.head.appendChild(leafletJS);
});

// Add this to your existing main.js
function initRecipeSliders() {
  document.querySelectorAll(".slider").forEach((slider) => {
    const updateSlider = (e) => {
      const sliderPos = e.target.value;
      const imageContainer = e.target.closest(".recipe-image-container");
      const beforeImage = imageContainer.querySelector(".recipe-image.before");
      beforeImage.style.setProperty("--slider-position", `${sliderPos}%`);
    };

    slider.addEventListener("input", updateSlider);
    slider.addEventListener("change", updateSlider);

    // Initialize slider position
    slider.dispatchEvent(new Event("input"));
  });
}

// Add this to your existing main.js
function initMap() {
  // Initialize the map
  const map = L.map("map").setView([41.1579, -8.6291], 4); // Centered on Porto

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Define locations
  const locations = {
    porto: {
      coords: [41.1579, -8.6291],
      title: "Porto, Portugal",
      image: "images/rainbow.jpeg",
      description: "Our home and where our story began!",
    },
    uk: {
      coords: [51.5074, -0.1278],
      title: "United Kingdom",
      image: "images/fun_uk.jpeg",
      description: "Medieval adventures and castle explorations",
    },
    boom: {
      coords: [40.1572, -7.5062],
      title: "Boom Festival",
      image: "images/boom_festival.jpeg",
      description: "Dancing and celebrating life together",
    },
  };

  // Add markers and popups
  Object.entries(locations).forEach(([key, location]) => {
    const marker = L.marker(location.coords, {
      icon: L.divIcon({
        className: "map-marker",
        html: "<div></div>",
        iconSize: [30, 30],
      }),
    }).addTo(map);

    // Create popup content
    const popupContent = `
      <div class="map-popup">
        <img src="${location.image}" alt="${location.title}" />
        <h3>${location.title}</h3>
        <p>${location.description}</p>
      </div>
    `;

    marker.bindPopup(popupContent);

    // Link markers to story cards
    document
      .querySelector(`[data-location="${key}"]`)
      ?.addEventListener("click", () => {
        map.flyTo(location.coords, 12);
        marker.openPopup();
      });
  });
}
