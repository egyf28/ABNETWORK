document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.getElementById("carousel");
  const carousel = carouselContainer.querySelector(".carousel");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const dotsContainer = document.getElementById("carousel-dots");
  const cards = carousel.querySelectorAll(".service-card");

  const scrollAmount = cards[0].offsetWidth + 20; // largeur carte + gap
  let autoScrollInterval;

  // Crée les points de navigation
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      carouselContainer.scrollTo({ left: i * scrollAmount, behavior: "smooth" });
    });
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll(".dot");

  function updateDots() {
    const currentIndex = Math.round(carouselContainer.scrollLeft / scrollAmount);
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentIndex]) dots[currentIndex].classList.add("active");
  }

  // Auto-scroll
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (carouselContainer.scrollLeft + carouselContainer.offsetWidth >= carouselContainer.scrollWidth - 1) {
        carouselContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  nextBtn.addEventListener("click", () => {
    carouselContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    carouselContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  carouselContainer.addEventListener("mouseover", stopAutoScroll);
  carouselContainer.addEventListener("mouseout", startAutoScroll);
  carouselContainer.addEventListener("scroll", updateDots);

  // Démarre le défilement automatique
  setTimeout(() => startAutoScroll(), 100); // petit délai pour s'assurer que les largeurs sont correctes
});
