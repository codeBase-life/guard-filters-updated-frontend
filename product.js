var swiper = new Swiper(".swiper", {
  effect: "coverflow", // Enable coverflow effect
  // grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",

  allowTouchMove: false,
  loop: true,
  coverflowEffect: {
    rotate: 0, // Slide rotate in degrees
    stretch: 0, // Stretch space between slides (in px)
    depth: 100, // Depth offset in px (slides translate in Z axis)
    modifier: 6, // Effect multiplier (change from 0 to 1)
    slideShadows: true, // Enables slide shadows
  },

  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // },
});

document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
async function fetchProductDetails(productId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/product/${productId}`
    );
    const product = await response.json();
    const firstTopProduct = product.topProductFirst;
    const secondTopProduct = product.topProductSecond;
    const ActualProduct = product.actualProduct;
    dynamicTitleSection(ActualProduct.title, ActualProduct.filter_type);
    onlyTitle(ActualProduct.title);
    displayTopProducts(firstTopProduct, secondTopProduct);
    productSlider(ActualProduct);
  } catch (error) {
    console.error("error fetching product details", error);
  }
}

// product inside slider

const productSlider = (product) => {
  let slider = document.getElementById("swiper-wrapper");

  // First slide
  const box = document.createElement("div");
  box.className = "swiper-slide";
  const img = document.createElement("img");
  img.className = "swiper-img";
  img.src = product.image;
  box.appendChild(img);
  slider.appendChild(box);

  // Second slide
  const box1 = document.createElement("div");
  box1.className = "swiper-slide"; // Use box1 here
  const img1 = document.createElement("img");
  img1.className = "swiper-img";
  img1.src = product.image;
  box1.appendChild(img1); // Append to box1
  slider.appendChild(box1);

  // third slide

  const box2 = document.createElement("div");
  box2.className = "swiper-slide"; // Use box1 here
  const img2 = document.createElement("img");
  img2.className = "swiper-img";
  img2.src = product.image;
  box2.appendChild(img2); // Append to box1
  slider.appendChild(box2);
};

// for dynamic title
const dynamicTitleSection = (title, type) => {
  const titleSec = document.getElementById("breadcrumb-ol");
  // for filter type
  const titleLi = document.createElement("li");
  titleLi.className = "breadcrumb-item";
  const hrefLi = document.createElement("a");
  hrefLi.href = "./index.html";
  hrefLi.className = "text-decoration-none text-dark";
  hrefLi.innerText = `${type}`;
  titleLi.appendChild(hrefLi);
  titleSec.appendChild(titleLi);

  // for dynamic title
  const titleSecLi = document.createElement("li");
  titleSecLi.className = "breadcrumb-item active";
  const hrefSecLi = document.createElement("a");
  hrefSecLi.href = "#";
  hrefSecLi.className = "text-decoration-none fw-bold text-dark";
  hrefSecLi.setAttribute("area-current", "page");
  hrefSecLi.innerText = `${title}`;
  titleSecLi.appendChild(hrefSecLi);
  titleSec.appendChild(titleSecLi);
};

const onlyTitle = (title) => {
  const item = document.getElementById("productTitleBox");
  const para = document.createElement("p");
  para.innerText = title;
  para.classList.add("text-align-center", "fs-1", "product-title");
  item.appendChild(para);
};

function displayTopProducts(first, second) {
  const firstProduct = document.getElementById("firstTopProductBox");
  firstProduct.innerHTML = "";
  first.forEach((element) => {
    const tooltipButton = document.createElement("button");
    tooltipButton.type = "button";
    tooltipButton.className = "btn py-2 px-3 bg-light rounded-pill";
    tooltipButton.setAttribute("data-bs-toggle", "tooltip");
    tooltipButton.setAttribute("data-bs-placement", "bottom");
    tooltipButton.setAttribute("data-bs-html", "true");
    tooltipButton.setAttribute(
      "data-bs-title",
      `<div class='d-flex gap-2 align-items-center custom-tooltip'>
                    <img class='img-fluid' src='${element.image}' alt=''>
                    <p class='mb-0'>${element.title}</p>
                  </div>`
    );
    tooltipButton.innerHTML = '<i class="bi bi-chevron-left text-dark"></i>';
    const link = document.createElement("a");
    link.href = `./product.html?id=${element.id}`;
    link.className = "text-decoration-none";
    link.appendChild(tooltipButton);
    firstProduct.appendChild(link);
  });

  const tooltipButton = document.createElement("button");
  tooltipButton.type = "button";
  tooltipButton.className = "btn";
  tooltipButton.setAttribute("data-bs-toggle", "tooltip");
  tooltipButton.setAttribute("data-bs-placement", "top");
  tooltipButton.setAttribute("data-bs-title", "product page");
  tooltipButton.innerHTML = '<i class="bi bi-grid-fill text-dark"></i>';
  const link2 = document.createElement("a");
  link2.href = "./All_filters.html";
  link2.className = "text-decoration-none";
  link2.appendChild(tooltipButton);
  firstProduct.appendChild(link2);

  second.forEach((element) => {
    const tooltipButton = document.createElement("button");
    tooltipButton.type = "button";
    tooltipButton.className = "btn py-2 px-3 bg-light rounded-pill";
    tooltipButton.setAttribute("data-bs-toggle", "tooltip");
    tooltipButton.setAttribute("data-bs-placement", "bottom");
    tooltipButton.setAttribute("data-bs-html", "true");
    tooltipButton.setAttribute(
      "data-bs-title",
      `<div class='d-flex gap-2 align-items-center custom-tooltip'>
                    <img class='img-fluid' src='${element.image}' alt=''>
                    <p class='mb-0'>${element.title}</p>
                  </div>`
    );
    tooltipButton.innerHTML = '<i class="bi bi-chevron-right text-dark"></i>';
    const link = document.createElement("a");
    link.href = `./product.html?id=${element.id}`;
    link.className = "text-decoration-none";
    link.appendChild(tooltipButton);
    firstProduct.appendChild(link);
  });

  // for reinitialize the tooltip
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

const productId = getQueryParam("id");
if (productId) {
  fetchProductDetails(productId);
} else {
  console.error("product ID not found in the url");
}
