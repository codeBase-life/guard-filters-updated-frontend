const apiUrl =
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000"
    : "https://guard-filters-updated-backend.vercel.app";

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

// flip logo
const logos = document.getElementById("logo");
let two_logos = ["./assets/logo.png", "./assets/super-gac.png"];
let current_logo = 0;

function swith_logo() {
  current_logo = (current_logo + 1) % two_logos.length;
  let logo = two_logos[current_logo];
  logos.src = logo;
}
setInterval(() => {
  swith_logo();
}, 3000);

// recently viewed products
const forRecentlyViewed = (product) => {
  const max_products = 4;
  const expire_time = 1000 * 60 * 60;

  // save recently viewed in local storage
  const save_local = (products) => {
    localStorage.setItem("recentlyViewed", JSON.stringify(products));
  };

  const get_local = () => {
    const item = localStorage.getItem("recentlyViewed");
    if (item) {
      try {
        return JSON.parse(item);
      } catch (error) {
        console.error("Error parsing local storage data", error);
        return [];
      }
    }
    return [];
  };

  let recentlyViewed = get_local();
  if (!Array.isArray(recentlyViewed)) {
    recentlyViewed = [];
  }

  // disply products in the client side
  const recentBox = document.getElementById("recentlyViewed");

  recentlyViewed.forEach((el) => {
    const div_col = document.createElement("div");
    div_col.className = "col";
    const first_div = document.createElement("div");
    first_div.className = "h-100";
    const second_div = document.createElement("div");
    second_div.className = "bg-white rounded p-3 product-image-container";
    const second_div_img = document.createElement("img");
    second_div_img.className = "img-fluid product-img ";
    second_div_img.src = el.image;
    // second_div.innerHTML = `img class="img-fluid product-img" src="${el.image}"  alt="no">`;
    second_div.appendChild(second_div_img);
    const item_ul = document.createElement("ul");
    item_ul.className = "list unstyled d-flex flex-column gap-3";
    const first_para = document.createElement("p");
    first_para.className = "fw-semibold text-dark products-title";
    first_para.innerText = el.title;
    const sec_para = document.createElement("p");
    sec_para.className = "fw-semibold text-dark";
    sec_para.innerHTML = `Brand: <span class="text-danger fw-light">${el.filter_type}</span>`;
    const link = document.createElement("a");
    link.role = "button";
    link.href = `./product.html?id=${el.id}`;
    link.className =
      "similar-products-btn rounded-pill text-center text-decoration-none py-2";
    link.innerText = "View Product";
    item_ul.appendChild(first_para);
    item_ul.appendChild(sec_para);
    item_ul.appendChild(link);
    first_div.appendChild(second_div);
    first_div.appendChild(item_ul);
    div_col.appendChild(first_div);
    recentBox.appendChild(div_col);
  });

  // add products
  // const add_products = (product) => {
  //   let current_time = Date.now();

  //   // remove expired products
  //   recentlyViewed = recentlyViewed.filter(
  //     (item) => current_time - item.timestamp < expire_time
  //   );

  //   // to avoid duplication
  //   const index = recentlyViewed.findIndex((item) => item.id === product.id);
  //   if (index !== -1) {
  //     // Update timestamp to extend the expiration
  //     recentlyViewed[index].timestamp = current_time;
  //   } else {
  //     if (recentlyViewed.length >= max_products) {
  //       recentlyViewed.shift();
  //     }
  //     recentlyViewed.push({ ...product, timestamp: current_time });
  //   }
  //   save_local(recentlyViewed);
  // };

  // add_products(product);
};

async function fetchProductDetails(productId) {
  try {
    const response = await fetch(`${apiUrl}/api/product/${productId}`);
    const product = await response.json();
    const firstTopProduct = product.topProductFirst;
    const secondTopProduct = product.topProductSecond;
    const middleFirst = product.middleProductFirst;
    const middleSecond = product.middleProductSecond;

    const ActualProduct = product.actualProduct;
    forRecentlyViewed(ActualProduct);
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
  let slider = document.getElementById("productSlider");

  // First slide
  const box = document.createElement("div");
  box.className = "product inactive1 bg-white";
  const img = document.createElement("img");
  img.className = "img-fluid";
  img.src = second.image;
  box.appendChild(img);
  slider.appendChild(box);

  // Second slide
  const box1 = document.createElement("div");
  box1.className = "product active1 bg-white"; // Use box1 here
  const img1 = document.createElement("img");
  img1.className = "img-fluid ";
  img1.src = product.image;
  box1.appendChild(img1); // Append to box1
  slider.appendChild(box1);

  // third slide

  const box2 = document.createElement("div");
  box2.className = "product inactive1 bg-white"; // Use box1 here
  const img2 = document.createElement("img");
  img2.className = "img-fluid";
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

// for search functionality

const get_data = async (search) => {
  try {
    const response = await fetch(`${apiUrl}/products/${search}`);
    const products = await response.json();
    displayResults(products);
  } catch (error) {
    console.error("error fetching products for search", error);
  }
};

const md_searchBox = document.getElementById("md-search-box");
const md_searchResults = document.getElementById("md-search-results");
// console.log(searchBox);

md_searchBox.addEventListener("input", () => {
  const query = md_searchBox.value.toLowerCase();
  console.log(query);

  get_data(query ? query : " ");
});

// for hide the search box if clicked outside the box
document.addEventListener("click", (e) => {
  if (
    !md_searchBox.contains(e.target) &&
    !md_searchResults.contains(e.target)
  ) {
    md_searchResults.style.display = "none";
  }
});

const displayResults = (products) => {
  const searchResults = document.getElementById("md-search-results");
  searchResults.innerHTML = "";
  if (products.length > 0) {
    searchResults.innerHTML = "";
    searchResults.style.display = "block";
    products.slice(0, 5).forEach((item) => {
      const first_ul = document.createElement("ul");
      first_ul.className = "list-unstyled ";
      const first_li = document.createElement("li");
      const second_ul = document.createElement("ul");
      second_ul.className =
        "list-unstyled d-flex justify-content-between px-3 align-items-center";

      const second_li = document.createElement("li");
      second_li.innerHTML = `<img class="img-fluid search-box-img fixed-size-img" src="${item.image}" alt="">`;
      second_ul.appendChild(second_li);

      const third_li = document.createElement("li");
      third_li.innerHTML = `<p class="text-dark">${item.title}</p>`;
      second_ul.appendChild(third_li);

      const forth_li = document.createElement("li");
      forth_li.innerHTML = `<a href='./product.html?id=${item.id}' role="button" class="text-dark text-decoration-none rounded-pill bg-light py-1 px-2">view</a>`;
      second_ul.appendChild(forth_li);

      first_li.appendChild(second_ul);
      first_ul.appendChild(first_li);
      const first_hr = document.createElement("hr");
      first_hr.className = "p-0 m-0 border border-1";
      first_ul.appendChild(first_hr);
      searchResults.appendChild(first_ul);
    });
  } else {
    searchResults.style.display = "none";
  }
};

//for small devices

const sm_get_data = async (search) => {
  try {
    const response = await fetch(`${apiUrl}/products/${search}`);
    const products = await response.json();
    sm_displayResults(products);
  } catch (error) {
    console.error("error fetching products for search", error);
  }
};

const sm_searchBox = document.getElementById("sm-search-box");
const sm_searchResults = document.getElementById("sm-search-results");
// console.log(searchBox);

sm_searchBox.addEventListener("input", () => {
  const query = sm_searchBox.value.toLowerCase();

  sm_get_data(query ? query : " ");
});

// for hide the search box if clicked outside the box
document.addEventListener("click", (e) => {
  if (
    !sm_searchBox.contains(e.target) &&
    !sm_searchResults.contains(e.target)
  ) {
    sm_searchResults.style.display = "none";
  }
});

const sm_displayResults = (products) => {
  const searchResults = document.getElementById("sm-search-results");
  searchResults.innerHTML = "";
  if (products.length > 0) {
    searchResults.innerHTML = "";
    searchResults.style.display = "block";
    products.slice(0, 5).forEach((item) => {
      const first_ul = document.createElement("ul");
      first_ul.className = "list-unstyled ";
      const first_li = document.createElement("li");
      const second_ul = document.createElement("ul");
      second_ul.className =
        "list-unstyled d-flex justify-content-between px-3 align-items-center";

      const second_li = document.createElement("li");
      second_li.innerHTML = `<img class="img-fluid search-box-img fixed-size-img" src="${item.image}" alt="">`;
      second_ul.appendChild(second_li);

      const third_li = document.createElement("li");
      third_li.innerHTML = `<p class="text-dark">${item.title}</p>`;
      second_ul.appendChild(third_li);

      const forth_li = document.createElement("li");
      forth_li.innerHTML = `<a href='./product.html?id=${item.id}' role="button" class="text-dark text-decoration-none rounded-pill bg-light py-1 px-2">view</a>`;
      second_ul.appendChild(forth_li);

      first_li.appendChild(second_ul);
      first_ul.appendChild(first_li);
      const first_hr = document.createElement("hr");
      first_hr.className = "p-0 m-0 border border-1";
      first_ul.appendChild(first_hr);
      searchResults.appendChild(first_ul);
    });
  } else {
    searchResults.style.display = "none";
  }
};
