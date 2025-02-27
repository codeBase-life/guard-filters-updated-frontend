var splide = new Splide(".splide", {
  type: "loop",
  perPage: 3,
  focus: "center",
  pagination: false,
  gap: "1rem",
  breakpoints: {
    768: {
      perPage: 1,
    },
  },
});

splide.mount();

// select js
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("filterSelect").value = "";
});

fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((product) => console.log(product));
