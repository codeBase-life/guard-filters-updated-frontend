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
    const middleFirst = product.middleProductFirst;
    const middleSecond = product.middleProductSecond;

    const ActualProduct = product.actualProduct;
    dynamicTitleSection(ActualProduct.title, ActualProduct.filter_type);
    onlyTitle(ActualProduct.title);
    displayTopProducts(firstTopProduct, secondTopProduct);
    productSlider(ActualProduct, middleFirst, middleSecond);
    productsPagination(middleFirst, middleSecond);
    productData(ActualProduct);
    similar(product.similar);
  } catch (error) {
    console.error("error fetching product details", error);
  }
}
// similar products
const similar = (product) => {
  const products_place = document.getElementById("similar-products");
  product.forEach((item) => {
    const product_col = document.createElement("div");
    product_col.className = "col";
    const first_div = document.createElement("div");
    first_div.className = "h-100";
    const second_div = document.createElement("div");
    second_div.className = "bg-white rounded p-3 product-image-container";
    second_div.innerHTML = ` <img class="img-fluid product-img" src="${item.image}"  alt="">`;
    const product_ul = document.createElement("ul");
    product_ul.className = "list unstyled d-flex flex-column gap-3";
    const first_para = document.createElement("p");
    first_para.className = "fw-semibold text-dark products-title";
    first_para.innerText = item.title;
    const second_para = document.createElement("p");
    second_para.className = "fw-semibold text-dark";

    second_para.innerHTML = `Brand: <span class="text-danger fw-light">${item.filter_type}</span>`;

    const link_btn = document.createElement("a");
    link_btn.href = `./product.html?id=${item.id}`;
    link_btn.role = "button";
    link_btn.className =
      "similar-products-btn rounded-pill text-center text-decoration-none py-2";
    link_btn.innerText = "View Product";
    product_ul.appendChild(first_para);
    product_ul.appendChild(second_para);
    product_ul.appendChild(link_btn);

    first_div.appendChild(second_div);
    first_div.appendChild(product_ul);
    product_col.appendChild(first_div);
    products_place.appendChild(product_col);
  });
};

// actual product meta data
const productData = (product) => {
  const product_features = product.key_features;
  const product_specifications = product.specifications;

  const part_no = document.getElementById("part_no");
  const oem = document.getElementById("oem_no");
  const quality = document.getElementById("product_quality");
  const brand = document.getElementById("brand");
  const price = document.getElementById("price");
  const availability = document.getElementById("availability");
  const description = document.getElementById("product-description");
  const efficiency_txt = document.getElementById("efficiency");
  const durability = document.getElementById("durability");
  const installation = document.getElementById("installation");
  const protection = document.getElementById("Protection");

  const material = document.getElementById("material");
  const filtration_effi = document.getElementById("filtration_efficiency");
  const dimension = document.getElementById("dimensions");
  const weight = document.getElementById("weight");
  part_no.innerText = product.part_no;
  oem.innerText = product.oem_number;
  quality.innerText = product.product_quality;
  brand.innerText = product.brand;
  price.innerText = ` ${product.price} PKR/-`;
  availability.innerText = product.availability;
  description.innerText = product.description;

  product_features.forEach((item) => {
    efficiency_txt.innerText = item.efficiency;
    durability.innerText = item.durability;
    installation.innerText = item.easy_installation;
    protection.innerText = item.engine_protection;
  });
  product_specifications.forEach((item) => {
    material.innerText = item.material;
    filtration_effi.innerText = item.filter_efficiency;
    dimension.innerText = item.dimensions;
    weight.innerText = item.weight;
  });
};

// products previous and next section
const productsPagination = (first, second) => {
  // previous-product

  const prev = document.getElementById("product-previous");
  const img = document.createElement("img");
  img.className = "img-fluid";
  img.src = second.image;
  img.width = 100;
  prev.appendChild(img);

  // left product
  const left = document.getElementById("left-product");
  left.href = `./product.html?id=${second.id}`;

  // left title
  const left_title = document.getElementById("left-title");
  left_title.innerText = second.title;

  // next product
  const next = document.getElementById("product-next");
  const img1 = document.createElement("img");
  img1.className = "img-fluid";
  img1.src = first.image;
  img1.width = 100;
  next.appendChild(img1);

  // right product
  const right = document.getElementById("right-product");
  right.href = `./product.html?id=${first.id}`;
  // right title
  const right_title = document.getElementById("right-title");
  right_title.innerText = first.title;
};

// product inside slider

const productSlider = (product, first, second) => {
  let slider = document.getElementById("swiper-wrapper");

  // First slide
  const box = document.createElement("div");
  box.className = "swiper-slide";
  const img = document.createElement("img");
  img.className = "swiper-img";
  img.src = second.image;
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
  img2.src = first.image;
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
