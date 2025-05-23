document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const scrollAmount = 270; // largeur de carte + écart

  let autoScrollInterval;

  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      // Vérifie si on est presque à la fin
      if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 1) {
        carousel.scrollTo({ left: 0, behavior: "smooth" }); // retour au début
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  // Démarre le défilement automatique
  startAutoScroll();

  // Stoppe le scroll auto au survol
  carousel.addEventListener("mouseover", stopAutoScroll);
  carousel.addEventListener("mouseout", startAutoScroll);
});
const dotsContainer = document.getElementById("carousel-dots");
const cards = carousel.querySelectorAll(".service-card");

// Crée un point par carte visible
cards.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    carousel.scrollTo({ left: index * scrollAmount, behavior: "smooth" });
  });
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll(".dot");

// Met à jour les points selon la position du scroll
function updateDots() {
  const currentIndex = Math.round(carousel.scrollLeft / scrollAmount);
  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[currentIndex]) dots[currentIndex].classList.add("active");
}

carousel.addEventListener("scroll", () => {
  updateDots();
});
