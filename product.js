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
      `https://guard-filters-updated-frontend.vercel.app/api/product/${productId}`
    );
    const product = await response.json();
    const firstTopProduct = product.topProductFirst;
    const secondTopProduct = product.topProductSecond;
    const ActualProduct = product.actualProduct;

    displayTopProducts(firstTopProduct, secondTopProduct);
  } catch (error) {
    console.error("error fetching product details", error);
  }
}

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
    link.href = "";
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
    link.href = "";
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

document.addEventListener("DOMContentLoaded", function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
